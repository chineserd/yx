// Explicit one-time migration of this prototype's unlocked historical releases.
// Backups are mandatory before any remote overwrite. No versions are deleted.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const base = 'https://www.htmlcode.fun';
const code = 'zhongwenke-prototype';
const [mode, directory] = process.argv.slice(2);
if (!['backup', 'pilot', 'migrate', 'verify'].includes(mode) || !directory || !path.isAbsolute(directory)) throw new Error('Usage: node scripts/migrate-history-links.mjs backup|pilot|migrate|verify ABSOLUTE_BACKUP_DIRECTORY');
const digest = s => createHash('sha256').update(s).digest('hex');
const redirect = `<!doctype html><html lang="zh-CN" data-history-redirect="latest-v1"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>正在打开最新版 · 中文科</title><script>location.replace('https://www.htmlcode.fun/s/zhongwenke-prototype?latest='+Date.now()+location.hash)</script><noscript><meta http-equiv="refresh" content="0;url=https://www.htmlcode.fun/s/zhongwenke-prototype"></noscript></head><body><p>历史链接已统一到最新版，正在跳转……</p><a href="https://www.htmlcode.fun/s/zhongwenke-prototype">打开最新原型</a></body></html>`;
const pause = ms => new Promise(r=>setTimeout(r,ms));
async function api(endpoint, method='GET', payload) {
  for(let attempt=0;attempt<6;attempt++) {
    const response=await fetch(base+endpoint,{method,headers:{Accept:'application/json',...(payload?{'Content-Type':'application/json'}:{})},body:payload?JSON.stringify(payload):undefined,signal:AbortSignal.timeout(60000)});
    const data=await response.json();
    if(response.status===429) { console.log('Rate limit; retry after',data.retryAfterSeconds??10,'seconds'); await pause((data.retryAfterSeconds??10)*1000+250); continue; }
    if(!response.ok || data.success===false) throw new Error(JSON.stringify({status:response.status,...data}));
    return data;
  }
  throw new Error('Rate limit retries exhausted');
}
async function workers(items, action, concurrency=4) {
  let next=0;
  await Promise.all(Array.from({length:concurrency},async()=>{while(next<items.length){const item=items[next++];await action(item);}}));
}
const endpoint=`/api/deploys/${code}/versions`;
if(mode==='backup') {
  await mkdir(directory,{recursive:true});
  const manifest=await api(endpoint);
  await writeFile(path.join(directory,'manifest.json'),JSON.stringify(manifest,null,2));
  let done=0;
  await workers(manifest.versions,async version=>{
    const data=await api(`/api/deploy/content?code=${code}&version=${version.versionNumber}`);
    if(typeof data.content!=='string') throw new Error('Missing source '+version.versionNumber);
    const {content,...metadata}=data;
    await writeFile(path.join(directory,`v${version.versionNumber}.html`),content);
    await writeFile(path.join(directory,`v${version.versionNumber}.json`),JSON.stringify({...metadata,sha256:digest(content)},null,2));
    if(++done%20===0||done===manifest.versions.length) console.log(`Backed up ${done}/${manifest.versions.length}`);
  });
  console.log('History backup complete:',directory);
}
if(mode==='migrate'||mode==='pilot') {
  const original=JSON.parse(await readFile(path.join(directory,'manifest.json'),'utf8'));
  const live=await api(endpoint);
  const newest=live.versions.filter(v=>v.status==='active').sort((a,b)=>b.versionNumber-a.versionNumber)[0];
  if(newest.versionNumber<=Math.max(...original.versions.map(v=>v.versionNumber))) throw new Error('Publish and verify the new guarded release before migrating history.');
  const targets=original.versions.filter(v=>mode!=='pilot'||v.versionNumber===Math.max(...original.versions.map(x=>x.versionNumber))).map(v=>live.versions.find(x=>x.id===v.id));
  // Preflight every exact target before making the first remote edit.
  for(const v of targets) {
    if(!v||v.likeCount>0||v.id===newest.id) throw new Error('Missing, locked or current target');
    const content=await readFile(path.join(directory,`v${v.versionNumber}.html`),'utf8');
    const metadata=JSON.parse(await readFile(path.join(directory,`v${v.versionNumber}.json`),'utf8'));
    if(digest(content)!==metadata.sha256) throw new Error('Backup integrity failure '+v.versionNumber);
  }
  let done=0;
  // Keep mutation concurrency low and respect host cooldown responses.
  await workers(targets,async v=>{
    const receiptPath=path.join(directory,`v${v.versionNumber}-redirect.json`);
    try{await access(receiptPath); console.log('Already migrated',v.versionNumber);return;}catch{}
    const receipt=await api(`${endpoint}/${v.versionNumber}`,'PATCH',{content:redirect,filename:'latest-redirect.html',description:'历史链接统一跳转最新原型；原始版本已本地备份，不再用于查看旧版。'});
    await writeFile(receiptPath,JSON.stringify(receipt,null,2));
    console.log(`Redirected v${v.versionNumber} (${++done}/${targets.length})`);
  },2);
  console.log('Historical redirect migration complete. Newest release:',newest.versionNumber);
}
if(mode==='verify') {
  const original=JSON.parse(await readFile(path.join(directory,'manifest.json'),'utf8'));
  let done=0;
  const failures=[];
  await workers(original.versions,async v=>{
    const data=await api(`/api/deploy/content?code=${code}&version=${v.versionNumber}&t=${Date.now()}`);
    if(data.content!==redirect) failures.push(v.versionNumber);
    if(++done%30===0||done===original.versions.length) console.log(`Verified ${done}/${original.versions.length}`);
  },8);
  await writeFile(path.join(directory,'verification.json'),JSON.stringify({checked:done,failures,checkedAt:new Date().toISOString()},null,2));
  if(failures.length) throw new Error('Historical content verification failed: '+failures.join(','));
  console.log('All historical versions return the exact latest-redirect content.');
}

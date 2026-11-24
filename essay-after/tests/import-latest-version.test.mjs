import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/latest-version.js', import.meta.url), 'utf8');
const latest = { versionNumber: 235, status: 'active', filePath: 'https://assets.example/v235-release.html' };
async function run({ path='/s/zhongwenke-prototype/v/28', search='', host='www.htmlcode.fun', fail=false, versions=[latest] }={}) {
  const redirects = [], listeners = {}, requests = [];
  const context = { location: { hostname: host, pathname: path, search, hash:'#dialog-atlas', replace:url=>redirects.push(url) },
    fetch: async (url, options) => { requests.push({ url, options }); if(fail) throw new Error('offline'); return {ok:true,json:async()=>({success:true,versions})}; },
    AbortController, URLSearchParams, setTimeout, clearTimeout, addEventListener:(name,fn)=>listeners[name]=fn };
  vm.runInNewContext(source, context);
  await new Promise(resolve=>setImmediate(resolve));
  return { redirects, requests, listeners };
}
test('historical paths route directly to newest active revision preserving hash', async()=>{
  const r=await run({versions:[{...latest,versionNumber:236,status:'inactive'},latest]});
  assert.deepEqual(r.redirects,['/s/zhongwenke-prototype/v/235?rev=v235-release.html#dialog-atlas']);
  assert.equal(r.requests[0].options.cache,'no-store');
});
test('current revision does not loop; stale revision is refreshed',async()=>{
  assert.deepEqual((await run({path:'/s/zhongwenke-prototype/v/235',search:'?rev=v235-release.html'})).redirects,[]);
  assert.equal((await run({path:'/s/zhongwenke-prototype/v/235',search:'?rev=old'})).redirects.length,1);
});
test('local development, other projects and offline errors are safe',async()=>{
  assert.equal((await run({host:'a.localhost'})).requests.length,0);
  assert.equal((await run({path:'/s/zhongwenke-dialog-assets/v/3'})).requests.length,0);
  assert.deepEqual((await run({fail:true})).redirects,[]);
  assert.deepEqual((await run({versions:[]})).redirects,[]);
});
test('back-forward cache restore checks again',async()=>{
  const r=await run(); r.listeners.pageshow({persisted:true});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(r.requests.length,2);
});

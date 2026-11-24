// Read the first XLSX worksheet without executing workbook formulas or macros.
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = name => name.trim().replace(/^[一二三四五六七八九十\d]+[、.．\s]+/, '').replace(/\s+/g,'');
const safeUrl = value => { try { const u = new URL(value, location.href); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } };
let rows = [], prototypes = [], fingerprint = '', reading = false;
function xml(text) { const doc = new DOMParser().parseFromString(text, 'application/xml'); if (doc.querySelector('parsererror')) throw Error('工作表格式无法解析'); return doc; }
async function unzip(buffer) {
  const view = new DataView(buffer), bytes = new Uint8Array(buffer), decoder = new TextDecoder();
  let end = bytes.length - 22;
  while (end >= Math.max(0, bytes.length - 65557) && view.getUint32(end,true) !== 0x06054b50) end--;
  if (end < 0 || view.getUint32(end,true) !== 0x06054b50) throw Error('文件不是有效的 XLSX');
  const files = new Map(); let offset = view.getUint32(end+16,true);
  for (let i=0; i<view.getUint16(end+10,true); i++) {
    if (view.getUint32(offset,true)!==0x02014b50) throw Error('工作簿压缩目录损坏');
    const method=view.getUint16(offset+10,true), size=view.getUint32(offset+20,true), expanded=view.getUint32(offset+24,true), len=view.getUint16(offset+28,true), local=view.getUint32(offset+42,true);
    const name=decoder.decode(bytes.subarray(offset+46,offset+46+len));
    if (expanded>20_000_000) throw Error('工作表过大，无法读取');
    const start=local+30+view.getUint16(local+26,true)+view.getUint16(local+28,true);
    files.set(name, async () => {
      const data=bytes.slice(start,start+size);
      if (method===0) return decoder.decode(data);
      if(method!==8) throw Error('不支持此工作簿压缩格式');
      const stream=new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return new Response(stream).text();
    });
    offset+=46+len+view.getUint16(offset+30,true)+view.getUint16(offset+32,true);
  }
  return async name => { if(!files.has(name)) throw Error('缺少工作表文件：'+name); return files.get(name)(); };
}
export async function readWorkbook(buffer) {
  const read=await unzip(buffer), book=xml(await read('xl/workbook.xml')), rels=xml(await read('xl/_rels/workbook.xml.rels'));
  const first=book.getElementsByTagName('sheet')[0]; if(!first) throw Error('工作簿没有工作表');
  const rid=first.getAttribute('r:id'); const rel=[...rels.getElementsByTagName('Relationship')].find(x=>x.getAttribute('Id')===rid);
  if(!rel) throw Error('找不到第一张工作表');
  const target=rel.getAttribute('Target'); const path=target.startsWith('/')?target.slice(1):'xl/'+target;
  let strings=[], rich=[];
  const stringRel=[...rels.getElementsByTagName('Relationship')].find(x=>x.getAttribute('Type')?.endsWith('/sharedStrings'));
  if(stringRel) { const target=stringRel.getAttribute('Target'); const doc=xml(await read(target.startsWith('/')?target.slice(1):'xl/'+target)); rich=[...doc.getElementsByTagName('si')]; strings=rich.map(x=>[...x.getElementsByTagName('t')].map(t=>t.textContent).join('')); }
  const sheet=xml(await read(path)), cells=new Map();
  for(const c of sheet.getElementsByTagName('c')) {
    let value=c.getElementsByTagName('v')[0]?.textContent||'';
    if(c.getAttribute('t')==='s') value=strings[Number(value)]||'';
    if(c.getAttribute('t')==='inlineStr') value=[...c.getElementsByTagName('t')].map(x=>x.textContent).join('');
    cells.set(c.getAttribute('r'),value);
  }
  const rawCells=new Map(cells);
  // Excel hyperlink display text can differ from its actual destination.
  const hyperlinks=[...sheet.getElementsByTagName('hyperlink')];
  if(hyperlinks.some(h=>h.hasAttribute('r:id'))) {
    const slash=path.lastIndexOf('/'), relPath=path.slice(0,slash+1)+'_rels/'+path.slice(slash+1)+'.rels';
    const links=xml(await read(relPath));
    for(const h of hyperlinks) {
      const link=[...links.getElementsByTagName('Relationship')].find(r=>r.getAttribute('Id')===h.getAttribute('r:id'));
      if(link && /^G\d+$/.test(h.getAttribute('ref')))cells.set(h.getAttribute('ref'),link.getAttribute('Target'));
    }
  }
  // Expand only actual merges; ordinary blanks must not inherit a previous requirement.
  for(const merge of sheet.getElementsByTagName('mergeCell')) {
    const m=merge.getAttribute('ref').match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
    if(m && m[1]===m[3]) for(let row=Number(m[2]);row<=Number(m[4]);row++) cells.set(m[1]+row,cells.get(m[1]+m[2])||'');
  }
  const sourceRows=[...sheet.getElementsByTagName('row')];
  const header=sourceRows.find(r=>[...r.getElementsByTagName('c')].some(c=>cells.get(c.getAttribute('r'))==='需求内容'));
  if(!header) throw Error('未找到“需求内容”表头');
  const headers=new Map([...header.getElementsByTagName('c')].map(c=>[cells.get(c.getAttribute('r')),c.getAttribute('r').replace(/\d/g,'')]));
  const required=['日期','需求内容','端口','涉及菜单','涉及需求点','需求说明','原型链接'];
  for(const name of required) if(!headers.has(name)) throw Error('缺少表头：'+name);
  const result = sourceRows.filter(r=>Number(r.getAttribute('r'))>Number(header.getAttribute('r'))).map(r=>{
    const row=Number(r.getAttribute('r')); const values=required.map(h=>cells.get(headers.get(h)+row)||'');
    if (/^\d{5}(\.\d+)?$/.test(values[0])) values[0]=new Date(Date.UTC(1899,11,30)+Number(values[0])*86400000).toISOString().slice(0,10);
    return {row,values,sheet:first.getAttribute('name')};
  }).filter(r=>r.values.some(Boolean));
  result.model={sheet,rawCells,rich,styles:xml(await read('xl/styles.xml'))};
  return result;
}
function match(row) {
  const explicit=row.values[6].trim();
  if(explicit) { const url=/^(https?:\/\/|\.\.?\/|\/)/i.test(explicit)?safeUrl(explicit):''; return url?[{title:'表格原型链接',url,source:true}]:[]; }
  const name=normalize(row.values[1]), student=/学生|學生|平板/.test(row.values[2]);
  return prototypes.flatMap(p=>(p.requirementBindings||[]).filter(b=>b.names.some(n=>normalize(n)===name)).flatMap(b=>{
    const hash=student?b.student:b.backend;
    const base=p.previewUrl;
    return hash && base && base!=='#' && safeUrl(base) ? [{title:student?'学生端原型':'后台原型',url:safeUrl(base.split('#')[0]+hash),source:false}] : [];
  }));
}
// Homepage display rule: equivalent red emphasis shares one color and weight.
// Keep the source workbook untouched; apply this again on every refresh.
function displayFontColor(value) {
  if (!value || !/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)) return '';
  const hex=value.slice(-6), [r,g,b]=hex.match(/../g).map(v=>parseInt(v,16));
  // Saturated, red-dominant shades (including C00000 and FF0000).
  return r>=128 && g<=r*0.45 && b<=r*0.45 ? '#C00000' : '#'+hex.toUpperCase();
}
function fontCss(font, inheritedFont) {
  if(!font && !inheritedFont)return '';
  const bold=font?.querySelector('b'), color=displayFontColor(font?.querySelector('color')?.getAttribute('rgb') || inheritedFont?.querySelector('color')?.getAttribute('rgb')), size=font?.querySelector('sz')?.getAttribute('val');
  return `${color==='#C00000'?'font-weight:700;':bold?'font-weight:'+(bold.getAttribute('val')==='0'?'400':'700')+';':''}${color?'color:'+color+';':''}${size?'font-size:'+Number(size)+'pt;':''}`;
}
function render() {
  if(!rows.model)return;
  const {sheet,rawCells,rich,styles}=rows.model;
  const fonts=[...styles.getElementsByTagName('fonts')[0].children], fills=[...styles.getElementsByTagName('fills')[0].children], xfs=[...styles.getElementsByTagName('cellXfs')[0].children];
  const widths=Array(7).fill(64), covered=new Set(), spans=new Map();
  for(const col of sheet.getElementsByTagName('col')) for(let i=Number(col.getAttribute('min'))-1;i<Math.min(7,Number(col.getAttribute('max')));i++) widths[i]=Math.floor(Number(col.getAttribute('width'))*7+5);
  for(const merge of sheet.getElementsByTagName('mergeCell')) {
    const m=merge.getAttribute('ref').match(/^([A-G])(\d+):([A-G])(\d+)$/);if(!m)continue;
    const start=m[1].charCodeAt(0)-65,end=m[3].charCodeAt(0)-65,top=Number(m[2]),bottom=Number(m[4]);
    spans.set(m[1]+m[2],{colspan:end-start+1,rowspan:bottom-top+1});
    for(let row=top;row<=bottom;row++)for(let col=start;col<=end;col++)if(row!==top||col!==start)covered.add(String.fromCharCode(65+col)+row);
  }
  const cells=new Map([...sheet.getElementsByTagName('c')].map(c=>[c.getAttribute('r'),c]));
  const html=[...sheet.getElementsByTagName('row')].map(row=>{
    const num=Number(row.getAttribute('r')), height=row.getAttribute('ht');
    return `<tr${height?' style="height:'+Number(height)+'pt"':''}>`+widths.map((_,col)=>{
      const ref=String.fromCharCode(65+col)+num;if(covered.has(ref))return '';
      const cell=cells.get(ref),xf=xfs[Number(cell?.getAttribute('s')||0)],font=fonts[Number(xf?.getAttribute('fontId')||0)],fill=fills[Number(xf?.getAttribute('fillId')||0)],alignment=xf?.querySelector('alignment');
      const bg=fill?.querySelector('fgColor')?.getAttribute('rgb'),align=alignment?.getAttribute('horizontal')||'left';
      let value=esc(rawCells.get(ref)||'');
      if(['s','inlineStr'].includes(cell?.getAttribute('t'))) {
        const si=cell.getAttribute('t')==='s'?rich[Number(cell.querySelector('v')?.textContent)]:cell.querySelector('is'),runs=si?[...si.children].filter(c=>c.localName==='r'):[];
        if(runs.length)value=runs.map(run=>`<span style="${fontCss(run.querySelector('rPr'),font)}">${esc(run.querySelector('t')?.textContent||'')}</span>`).join('');
      }
      if(col===6&&num>1) {const record=rows.find(r=>r.row===num);const links=record?match(record):[];if(links.length)value=links.map(link=>`<a target="_blank" rel="noopener noreferrer" href="${esc(link.url)}">${esc(link.title)}</a>`).join('<br>');}
      const span=spans.get(ref)||{colspan:1,rowspan:1},tag=num===1?'th':'td';
      return `<${tag} data-cell="${ref}" rowspan="${span.rowspan}" colspan="${span.colspan}" style="${fontCss(font)}${bg?'background:#'+bg.slice(-6)+';':''}text-align:${['left','center','right'].includes(align)?align:'left'}">${value}</${tag}>`;
    }).join('')+'</tr>';
  }).join('');
  $('requirements-content').innerHTML=`<div class="sheet-scroll" tabindex="0" aria-label="需求更新记录，按原表排列，可横向滚动"><table class="source-sheet" aria-label="需求更新记录" ><colgroup>${[8,12,10,12,23,25,10].map(w=>`<col style="width:${w}%">`).join('')}</colgroup><tbody>${html}</tbody></table></div>`;
}
async function refresh() {
  if(reading)return; reading=true; $('refresh-requirements').disabled=true;
  try {
    const response=await fetch('./需求更新记录.xlsx',{cache:'no-store',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error('无法读取同目录的需求更新记录.xlsx');
    const buffer=await response.arrayBuffer(); if(buffer.byteLength>20_000_000)throw Error('工作簿超过 20MB');
    // Byte fingerprint works over HTTP as well as HTTPS (including LAN preview).
    const bytes=new Uint8Array(buffer); let hash=2166136261; for(const b of bytes)hash=Math.imul(hash^b,16777619); const next=bytes.length+':'+(hash>>>0);
    if(next!==fingerprint) {
      const nextRows=await readWorkbook(buffer); rows=nextRows;fingerprint=next;
      render();
    }
    // Display the latest requirement date, never the polling/check time.
    const dates=rows.map(row=>row.values[0].trim().replace(/[年/.]/g,'-').replace(/月/g,'-').replace(/日/g,'')).map(value=>{
      const m=value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if(!m)return '';
      const date=`${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
      const parsed=new Date(date+'T00:00:00Z');
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10)===date ? date : '';
    }).filter(Boolean).sort();
    $('requirements-sync').textContent=`更新日期：${dates.at(-1)||'—'}`;
  } catch(error) { $('requirements-sync').textContent=`更新失败：${error.message}。${fingerprint?'当前保留上次成功读取的内容。':'请检查文件后点击“检查更新”。'}`; }
  finally {reading=false;$('refresh-requirements').disabled=false;}
}
function acceptConfig(config) {prototypes=config.groups.flatMap(g=>g.items).filter(p=>p.hidden!==true);render();}
window.addEventListener('prototype-config',event=>acceptConfig(event.detail));
// The inline loader can finish before this module loads.
if(typeof config!=='undefined'&&config)acceptConfig(config);
$('refresh-requirements').addEventListener('click',refresh);
for(const [id,show] of [['requirements-view',true],['prototypes-view',false]])$(id).addEventListener('click',()=>{
  $('requirements-panel').hidden=!show;$('timeline').hidden=show;
  document.querySelector('.search-box').hidden=show;
  for(const [button,active] of [['requirements-view',show],['prototypes-view',!show]]) {$(button).classList.toggle('active',active);$(button).setAttribute('aria-pressed',String(active));}
});
document.querySelector('.search-box').hidden=false;
refresh();setInterval(()=>{if(!document.hidden)refresh();},30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});

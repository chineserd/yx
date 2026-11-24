/* Local prototype persistence. Replace with authenticated submission APIs in production. */
const writingRecordStorageKey = 'writingGuideSubmissionsV1';
const seededWritingSubmissions = writingSubmissions.map(row => ({...row,category:'essay',activity:'guidance',origin:'fixture'}));
let writingRecordReadError = false;
function validWritingSnapshot(row) {
 return row && typeof row.id==='string' && /^WG[0-9a-z]+$/.test(row.id) && writingStudents.some(s=>s.id===row.studentId) && row.category==='essay' && row.activity==='guidance' && ['submittedAt','topic','genre','keywords','thesis','signature'].every(k=>typeof row[k]==='string') && ['materials','outline','techniques'].every(k=>Array.isArray(row[k])&&row[k].every(x=>typeof x==='string'));
}
function loadWritingSnapshots() {
 const raw=localStorage.getItem(writingRecordStorageKey);
 if(!raw)return [];
 const data=JSON.parse(raw);
 if(data.version!==1 || !Array.isArray(data.records) || !data.records.every(validWritingSnapshot))throw new Error('Invalid snapshot store');
 return data.records;
}
function refreshWritingSnapshots() {
 try {const saved=loadWritingSnapshots();writingSubmissions.splice(0,writingSubmissions.length,...seededWritingSubmissions,...saved);writingRecordReadError=false;}
 catch {writingRecordReadError=true;}
}
function distinctPracticeRecords(rows){
 const seen=new Set();
 return [...rows].sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt)).filter(row=>{
  const topic=row.topic.normalize('NFKC').replace(/[\s\p{P}]/gu,'');
  const key=JSON.stringify([row.studentId,row.category,row.activity,topic]);
  if(seen.has(key))return false;seen.add(key);return true;
 });
}
// 練習記錄與「寫前指導記錄」共用同一份提交快照；W001 是当前学生的首条写前指导记录。
const studentFlowRowsFor = id => distinctPracticeRecords(writingRowsFor(id).filter(row=>row.origin==='student-flow'||row.id==='W001'));
function syncDirectPracticeDetailLink(rows){
 const link=document.querySelector('[data-student-page="record-detail"]');
 if(!link)return;
 const record=rows?.[0]||writingSubmissions.find(row=>row.id==='W001'&&row.studentId===previewStudentId);
 link.href=record?`${practiceRoute('essay','guidance')}/result/${encodeURIComponent(record.id)}`:practiceRoute('essay','guidance');
}
function saveWritingSnapshot(draft,source) {
 if(!draft.topic?.trim() || !draft.keywords?.length || !draft.ideas?.length || draft.selectedMaterials?.length<(draft.genre==='narrative'?1:2)) return {ok:false,error:`請完成審題並至少選擇${draft.genre==='narrative'?1:2}項材料，再保存藍圖。`};
 const content={studentId:previewStudentId,category:'essay',activity:'guidance',topic:draft.topic.trim(),genre:labels.genres[draft.genre],stance:draft.prototypeStance||labels.stances[draft.stance]||'—',keywords:draft.keywords.join('、'),thesis:draft.prototypeThesis||getThesis(draft),materials:draft.prototypeMaterials||materials.filter(x=>draft.selectedMaterials.includes(x.id)).map(x=>`${x.title}：${x.usage}`),outline:draft.prototypeOutline||buildOutline(draft).map(x=>`${x.label} · ${x.role}：${x.text}`),techniques:draft.prototypeTechniques||techniques.filter(x=>draft.techniques.includes(x.id)).map(x=>`${x.title}：${x.description}`)};
 if(!content.techniques.length)content.techniques=['以準確、自然的語言完成文章。'];
 const signature=JSON.stringify({source,...content});
 try {
  const saved=loadWritingSnapshots(),existing=saved.find(x=>{
   if(x.signature===signature)return true;
   try{const previous=JSON.parse(x.signature);return JSON.stringify({...previous,genre:displayGenreLabel(previous.genre)})===signature;}catch{return false;}
  });
  if(existing){refreshWritingSnapshots();return {ok:true,existing:true,record:existing};}
  const now=new Date(),pad=n=>String(n).padStart(2,'0');
  const submittedAt=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const record={...content,id:`WG${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`,submittedAt,source,origin:'student-flow',durationSeconds:Number.isFinite(draft.durationSeconds)&&draft.durationSeconds>=0?Math.floor(draft.durationSeconds):null,signature};
  localStorage.setItem(writingRecordStorageKey,JSON.stringify({version:1,records:[...saved,record]}));
  refreshWritingSnapshots();
  window.dispatchEvent(new CustomEvent('writingrecordschange'));
  return {ok:true,existing:false,record};
 }catch {return {ok:false,error:'保存失敗，藍圖已保留。請稍後重試；尚未新增練習記錄。'};}
}
const practiceCategories=[['all','全部'],['assigned','指定篇章'],['outside','課外篇章'],['classical','文言文-專項練習'],['reading','閱讀理解'],['modern','白話文-專項練習'],['essay','命題作文'],['practical','實用文']];
const practiceActivities=[['all','全部'],['guidance','寫前指導'],['correction','AI作文批改']];
function practiceRoute(category='all',activity='all'){const path=`#/student-records/${category}/${activity}`;return window.studentSurface==='web'?`${path}?surface=web`:path;}
function splitSnapshotItem(value){const match=String(value).match(/^(.+?)[：:](.*)$/);return match?{title:match[1],text:match[2]}:{title:String(value),text:''};}
function practiceResultMarkup(record){
 const text=escapeWritingText;
 const legacy=String(record.keywords).split(' · '),keywords=legacy[0],stance=record.stance||legacy[1]||'—';
 const genre=displayGenreLabel(record.genre),narrative=genre===labels.genres.narrative;
 const checklist=narrative?['段落圍繞題目','細節帶出感受','結尾回應題目']:['每段緊扣立意','事例後有分析','結尾回應題目'];
 const materialCards=record.materials.map(value=>{const item=splitSnapshotItem(value);return `<article><b>${text(item.title)}</b><p>${text(item.text)}</p></article>`;}).join('');
 const outlineRows=record.outline.map((value,index)=>{const item=splitSnapshotItem(value),label=item.title.split(' · ')[0];return `<article><span>${String(index+1).padStart(2,'0')}</span><b>${text(label)}</b><p>${text(item.text)}</p></article>`;}).join('');
 const techniqueRows=record.techniques.map(value=>{const item=splitSnapshotItem(value);return item.text?`<span><b>${text(item.title)}</b>｜${text(item.text)}</span>`:`<span>${text(item.title)}</span>`;}).join('');
 return `<article class="pad-card pad-blueprint pad-guidance-sheet practice-guidance-sheet"><header class="pad-sheet-header"><h3>作文寫前藍圖</h3></header><section class="pad-sheet-topic"><span class="pad-sheet-label">作文題目</span><p>${text(record.topic)}</p></section><div class="pad-sheet-grid"><section><span class="pad-sheet-label">審題結論</span><dl class="pad-analysis-list"><div><dt>關鍵詞</dt><dd>${text(keywords)}</dd></div><div><dt>文體</dt><dd>${text(genre)}</dd></div><div><dt>${narrative?'角度':'立場'}</dt><dd>${text(stance)}</dd></div></dl></section><section><span class="pad-sheet-label">中心立意</span><p class="pad-sheet-thesis">${text(record.thesis)}</p></section></div><section><span class="pad-sheet-label">文章結構</span><div class="pad-sheet-outline">${outlineRows}</div></section><section><span class="pad-sheet-label">表達策略</span><div class="pad-sheet-techniques">${techniqueRows}</div></section><section><span class="pad-sheet-label">核心材料 <small>共 ${record.materials.length} 項</small></span><div class="pad-sheet-materials">${materialCards}</div></section><footer class="pad-sheet-footer"><div>${checklist.map(item=>`<span>□ ${item}</span>`).join('')}</div><p>「先想清楚，再寫精彩。」</p></footer></article>`;
}
function renderPracticeRecords(){
 if(!location.hash.startsWith('#/student-records'))return;
 refreshWritingSnapshots();
 const parts=location.hash.slice(2).split('/'), clean=value=>String(value||'').split('?')[0];
 const category=practiceCategories.some(x=>x[0]===clean(parts[1]))?clean(parts[1]):'all';
 const activity=category==='essay'&&practiceActivities.some(x=>x[0]===clean(parts[2]))?clean(parts[2]):'all';
 const text=escapeWritingText,root=document.getElementById('practiceApp'),detail=clean(parts[3])==='result';
 const availableRows=studentFlowRowsFor(previewStudentId);
 syncDirectPracticeDetailLink(availableRows);
 const back=detail?practiceRoute(category,activity):window.studentSurface==='web'?'#/student':'#/student-learning';
 let html=`<header class="practice-header ${detail?'practice-header-detail':''}"><a href="${back}" aria-label="${detail?'返回練習記錄':'返回'}">‹ <span>${detail?'返回練習記錄':'返回'}</span></a><h1>${detail?'寫前指導記錄':'練習記錄'}</h1>${detail?'<span class="practice-header-spacer" aria-hidden="true"></span>':`<span class="practice-student">${text(previewStudent.name)} · ${previewStudent.id}</span>`}</header>`;
 if(detail){
  const record=writingSubmissions.find(x=>x.id===clean(parts[4])&&x.studentId===previewStudentId&&(x.origin==='student-flow'||x.id==='W001'));
  html+=record?`<div class="practice-detail">${practiceResultMarkup(record)}</div>`:'<section class="practice-empty"><h2>找不到這份已保存記錄</h2><p>請返回練習記錄重新選擇。</p></section>';
 }else{
  const rows=studentFlowRowsFor(previewStudentId).filter(x=>(category==='all'||x.category===category)&&(activity==='all'||x.activity===activity));
  html+=`<div class="practice-content"><nav class="practice-categories" aria-label="練習分類">${practiceCategories.map(([id,label])=>`<a href="${practiceRoute(id)}" ${category===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
  if(category==='essay')html+=`<nav class="practice-activities" aria-label="作文活動類型">${practiceActivities.map(([id,label])=>`<a href="${practiceRoute(category,id)}" ${activity===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
  html+=`<div class="practice-list-heading"><span>共 ${rows.length} 項記錄</span><span>按保存時間由新到舊排列</span></div>`;
  if(writingRecordReadError)html+='<p class="practice-error" role="alert">部分記錄暫時無法讀取，請重新載入後再試。</p>';
  html+=rows.length?`<div class="practice-list">${rows.map(row=>`<a class="practice-record" href="${practiceRoute(category,activity)}/result/${encodeURIComponent(row.id)}"><span class="practice-record-icon" aria-hidden="true">✎</span><div><div class="practice-meta"><span class="practice-kind">命題作文</span><span>寫前指導</span><time>${text(formatWritingTime(row.submittedAt))}</time></div><h2>${text(row.topic)}</h2></div><span class="practice-chevron" aria-hidden="true">›</span></a>`).join('')}</div><p class="practice-end">已載入全部練習記錄</p>`:`<section class="practice-empty"><h2>暫無${activity==='correction'?'作文批改':'練習'}記錄</h2><p>${category==='all'||category==='essay'&&activity!=='correction'?'完成寫前指導並保存後，即可在這裡回看。':'這個分類目前沒有已保存的記錄。'}</p>${category==='all'||category==='essay'&&activity!=='correction'?`<a class="pad-primary" href="${window.studentSurface==='web'?'#/student-improved?surface=web':'#/student-improved'}">開始寫前指導</a>`:''}</section>`;
  html+='</div>';
 }
 root.innerHTML=html;
}
document.getElementById('savePCBlueprint')?.addEventListener('click',()=>{
 const result=saveWritingSnapshot(state,'pc');
 document.getElementById('pcRecordStatus').textContent=result.ok?(result.existing?'這份藍圖已保存，沒有新增重複記錄。':'已保存至練習記錄。'):result.error;
});
window.addEventListener('previewview',event=>{if(event.detail==='student-records')renderPracticeRecords();if(event.detail==='backend'){refreshWritingSnapshots();renderWritingRoute();}});
window.addEventListener('storage',event=>{if(event.key===writingRecordStorageKey){refreshWritingSnapshots();syncDirectPracticeDetailLink(studentFlowRowsFor(previewStudentId));renderPracticeRecords();if(location.hash.startsWith('#/backend'))renderWritingRoute();}});
window.addEventListener('writingrecordschange',()=>{syncDirectPracticeDetailLink(studentFlowRowsFor(previewStudentId));if(location.hash.startsWith('#/backend'))renderWritingRoute();renderPracticeRecords();});
refreshWritingSnapshots();
syncDirectPracticeDetailLink(studentFlowRowsFor(previewStudentId));

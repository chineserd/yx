const defaults=essayData.notes.map(n=>[n.category,n.quote,n.comment,n.good]);
const $=s=>document.querySelector(s);let notes=structuredClone(defaults),active=1,editing=-1,dirty=false,mode='image',currentTab='score',summaryEditing=false;
try{const saved=JSON.parse(localStorage.getItem('essay-handwritten-lin-junxi-v1'));if(Array.isArray(saved)&&saved.length===8)notes=saved}catch{}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function notify(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').style.display='none',2600)}
function markDirty(){dirty=true;$('#dirty').textContent='未保存'}
function render(){
$('#count').textContent=notes.length;$('#cards').innerHTML=notes.map((n,i)=>`<article class="note ${n[3]?'good':''} ${active===i?'active':''}" data-note="${i}" tabindex="0" aria-label="批註 ${i+1} ${n[0]}"><div class="note-header"><span class="number">${String(i+1).padStart(2,'0')}</span><span>${n[3]?'佳句賞析':'優化建議'}</span><span class="tag">${esc(n[0])}</span><button class="edit" data-edit="${i}" aria-label="編輯批註 ${i+1}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15zM4 23h16"/></svg></button></div><blockquote class="quote">${esc(n[1])}</blockquote>${editing===i?`<textarea aria-label="批註內容">${esc(n[2])}</textarea><div class="edit-actions"><button data-cancel>取消</button><button class="primary" data-done="${i}">保存批註</button></div>`:`<p>${esc(n[2])}</p>${essayData.notes[i].unlocated?'<small class=unlocated>暫無對應位置</small>':''}`}</article>`).join('');
$('.paper').innerHTML=essayData.pages.map((page,index)=>`<section class="source-page" aria-label="作文第 ${index+1} 頁"><small>第 ${index+1} 頁 / 共 ${essayData.pages.length} 頁</small><div class="source-image"><img src="./assets/lin-junxi-${index+1}.jpg" alt="${essayData.student}作文第 ${index+1} 頁">${page.marks.map(mark=>mark.anchor?`<button class="anchor ${mark.className.includes('highlight')?'good':''} ${active===Number(mark.anchor.split('-')[1])?'active':''}" style="${mark.style}" data-anchor="${mark.anchor.split('-')[1]}" aria-label="查看批註 ${Number(mark.anchor.split('-')[1])+1}"></button>`:`<span class="typo-mark" style="${mark.style}" title="${esc(mark.label)}" aria-label="${esc(mark.label)}"></span>`).join('')}</div></section>`).join('');
const cellMarkup=c=>{const ids=(c.ids||c.anchor||'').split(/[\s,]+/).map(x=>x.replace('annotation-',''));const chosen=ids.includes(String(active));return `<span class="${esc(c.cls.replace(/\bactive\b/g,'').trim())}${chosen?' active':''}" ${c.anchor?`data-anchor="${c.anchor.replace('annotation-','')}" data-note-ids="${ids.join(',')}" role="button" tabindex="0" aria-label="查看批註：${esc(c.text)}"`:''} ${c.title?`title="${esc(c.title)}"`:''} ${c.cls.includes('blank')?'aria-hidden="true"':''}>${esc(c.text)}</span>`};
$('#text-view').innerHTML=`<div class="manuscript-document">${essayData.gridRows.map((rows,i)=>`<section class="manuscript-paragraph" aria-label="作文第 ${i+1} 段">${rows.map(row=>`<div class="manuscript-row"><div class="manuscript-group grid">${row.slice(0,20).map(cellMarkup).join('')}</div>${row.length>20?`<div class="manuscript-group overflow">${row.slice(20).map(cellMarkup).join('')}</div>`:''}</div>`).join('')}</section>`).join('')}</div>`;
document.querySelectorAll('.source-image img').forEach(img=>img.onload=lines);
requestAnimationFrame(lines)}
function lines(){const svg=$('.connections'),base=$('.workspace').getBoundingClientRect(),paper=$('.paper-scroll').getBoundingClientRect(),panel=$('.notes-scroll').getBoundingClientRect();svg.innerHTML='';if(!['image','text'].includes(mode)||currentTab!=='notes'||innerWidth<1200||$('.workspace').hidden)return;notes.forEach((n,i)=>{const anchor=findAnchor(i);if(!anchor)return;const a=anchor.getBoundingClientRect(),b=document.querySelector(`[data-note="${i}"]`).getBoundingClientRect();let ay=a.top+a.height/2,by=b.top+31;if(ay<paper.top||ay>paper.bottom||by<panel.top||by>panel.bottom)return;let x=a.right-base.left,y=ay-base.top,x2=b.left-base.left,y2=by-base.top;svg.innerHTML+=`<path class="${i===active?'active':''}" stroke="${n[3]?'#89ac6c':'#4998dc'}" ${n[3]?'':'stroke-dasharray="3 4"'} d="M${x},${y} C${x+95},${y} ${x2-90},${y2} ${x2},${y2}"/>`})}
function findAnchor(i){const scope=mode==='text'?'#text-view':'.paper';return [...document.querySelectorAll(`${scope} [data-anchor]`)].find(el=>(el.dataset.noteIds||el.dataset.anchor).split(',').includes(String(i)))}
function highlightCells(){document.querySelectorAll('#text-view [data-note-ids]').forEach(el=>el.classList.toggle('active',el.dataset.noteIds.split(',').includes(String(active))))}
function select(i,from){if(editing>=0&&editing!==i){notify('請先保存或取消正在編輯的批註');return}active=i;document.querySelectorAll('[data-note]').forEach(el=>el.classList.toggle('active',+el.dataset.note===i));document.querySelectorAll('.anchor').forEach(el=>el.classList.toggle('active',+el.dataset.anchor===i));highlightCells();if(from==='anchor'){setTab('notes');document.querySelector(`[data-note="${i}"]`).scrollIntoView({block:'nearest',behavior:'smooth'});if(innerWidth<1200)setPane('marking')}else if(mode==='image'||mode==='text'){const anchor=findAnchor(i);if(anchor)anchor.scrollIntoView({block:'nearest',behavior:'smooth'});else notify('此批註暫無對應位置')}lines()}
$('#cards').onclick=e=>{const edit=e.target.closest('[data-edit]'),done=e.target.closest('[data-done]');if(edit){if(editing>=0&&editing!==+edit.dataset.edit){notify('請先保存或取消正在編輯的批註');return}editing=+edit.dataset.edit;active=editing;render();$('#cards textarea').focus()}else if(done){const v=$('#cards textarea').value.trim();if(!v){notify('請輸入批註內容');return}notes[+done.dataset.done][2]=v;editing=-1;markDirty();render()}else if(e.target.closest('[data-cancel]')){editing=-1;render()}else if(!e.target.closest('textarea')&&e.target.closest('[data-note]'))select(+e.target.closest('[data-note]').dataset.note,'card')};
$('#cards').onkeydown=e=>{if(e.target.matches('[data-note]')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(+e.target.dataset.note,'card')}};
$('.paper-scroll').onkeydown=e=>{if(e.target.matches('[data-anchor]')&&e.target.classList.contains('paper-cell')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(+e.target.dataset.anchor,'anchor')}};
$('.paper-scroll').onclick=e=>{let a=e.target.closest('[data-anchor]');if(a)select(+a.dataset.anchor,'anchor')};
function setMode(m){mode=m;$('.paper').hidden=m!=='image';$('#text-view').hidden=m!=='text';for(const name of ['image','text']){const button=$('#'+name+'-tab');button.classList.toggle('selected',m===name);button.setAttribute('aria-selected',String(m===name))}$('.counts').innerHTML='總字數 <b>497</b> 字 <i>｜</i> 疑似錯別字 <strong>17</strong> 字';$('.paper-scroll').scrollTop=0;highlightCells();lines()}
$('#image-tab').onclick=()=>setMode('image');$('#text-tab').onclick=()=>setMode('text');
function setTab(t){if(summaryEditing){notify('請先確認或取消正在編輯的總評');return}if(editing>=0&&t!=='notes'){notify('請先保存或取消正在編輯的批註');return}currentTab=t;$('#notes-panel').hidden=t!=='notes';$('#score-panel').hidden=t!=='score';$('#notes-tab').classList.toggle('active',t==='notes');$('#notes-tab').setAttribute('aria-selected',String(t==='notes'));$('#score-tab').setAttribute('aria-selected',String(t==='score'));$('#score-mode').hidden=t!=='score';$('#score-tab').classList.toggle('active',t==='score');lines()}
$('#notes-tab').onclick=()=>setTab('notes');$('#score-tab').onclick=()=>setTab('score');
$('#save').onclick=()=>{if(editing>=0){notify('請先保存正在編輯的批註');return}try{localStorage.setItem('essay-handwritten-lin-junxi-v1',JSON.stringify(notes));dirty=false;$('#dirty').textContent='';notify('修改已保存')}catch{notify('保存失敗，請重試')}};
$('#collapse').onclick=()=>{document.body.classList.toggle('collapsed');$('#collapse').setAttribute('aria-label',document.body.classList.contains('collapsed')?'展開選單':'收合選單');requestAnimationFrame(lines)};
function leave(){if((dirty||editing>=0||summaryEditing)&&!confirm('修改尚未保存，確定放棄並離開？'))return false;if(dirty||editing>=0||summaryEditing){try{notes=JSON.parse(localStorage.getItem('essay-handwritten-lin-junxi-v1'))||structuredClone(defaults)}catch{notes=structuredClone(defaults)}dirty=false;editing=-1;$('#dirty').textContent='';render()}return true}
function showTaskPage(page){if(!leave())return;$('.workspace').hidden=page!=='detail';$('.heading').hidden=page!=='detail';$('.mobile-tabs').hidden=page!=='detail';$('#task-view').hidden=page!=='overview';$('#task-list').hidden=page!=='tasks';history.replaceState(null,'','#'+page);if(page==='detail')requestAnimationFrame(lines)}
function task(){showTaskPage('overview')}
function taskList(){showTaskPage('tasks')}
$('#task').onclick=taskList;$('#back').onclick=task;$('#back-to-task-list').onclick=taskList;
function openReport(){showTaskPage('detail')}
$('.history').onclick=e=>{if(!leave())e.preventDefault()};window.onbeforeunload=e=>{if(dirty||editing>=0||summaryEditing){e.preventDefault();e.returnValue=''}};
function setPane(p){document.body.classList.toggle('show-marking',p==='marking');document.querySelectorAll('[data-pane]').forEach(x=>x.classList.toggle('active',x.dataset.pane===p))}document.querySelectorAll('[data-pane]').forEach(b=>b.onclick=()=>setPane(b.dataset.pane));
$('.paper-scroll').onscroll=lines;$('.notes-scroll').onscroll=lines;window.onresize=lines;render();

const requirementDrawer=$('#overview-requirement-dialog');
const requirementTrigger=$('#open-overview-requirements');
requirementTrigger.onclick=()=>{requirementDrawer.showModal();$('#close-overview-requirements').focus()};
$('#close-overview-requirements').onclick=()=>requirementDrawer.close();
requirementDrawer.onclick=e=>{if(e.target===requirementDrawer)requirementDrawer.close()};
requirementDrawer.addEventListener('close',()=>requirementTrigger.focus());
const publishKey='essay-print-results-visible-v1';
let resultsPublished=false;
try{resultsPublished=localStorage.getItem(publishKey)==='true'}catch{}
function renderPublishStatus(){
 const button=$('#overview-publish-switch');
 button.classList.toggle('on',resultsPublished);
 button.setAttribute('aria-checked',String(resultsPublished));
 $('#overview-publish-status').textContent=resultsPublished?'已公布':'未公布';
}
renderPublishStatus();
const publishDialog=$('#publish-confirm-dialog');
$('#overview-publish-switch').onclick=()=>{
 $('#publish-confirm-title').textContent=resultsPublished?'關閉成績和報告公布？':'公布成績和報告？';
 $('#publish-confirm-message').textContent=resultsPublished?'關閉後學生將無法查看本人的報告。':'公布後學生可查看本人的作文報告和最終評語。';
 publishDialog.showModal();
 $('#cancel-publish').focus();
};
$('#cancel-publish').onclick=()=>publishDialog.close();
$('#confirm-publish').onclick=()=>{
 resultsPublished=!resultsPublished;
 try{localStorage.setItem(publishKey,String(resultsPublished))}catch{}
 renderPublishStatus();
 publishDialog.close();
 notify(resultsPublished?'成績和報告已公布':'成績和報告已關閉公布');
};
publishDialog.addEventListener('close',()=>$('#overview-publish-switch').focus());

const students=[{number:'1',name:'林雋羲',complete:true,submittedAt:'2026-11-09 09:08',guidance:'已完成',grading:'已批改'},...['小鹿B8','小鹿B7','小鹿B6','小鹿B5','小鹿B4','小鹿B3','小鹿B2','小鹿B1','小鹿2','小鹿3','小鹿4'].map((name,i)=>({number:String(i+2),name,complete:false,submittedAt:'—',guidance:'未完成',grading:'未批改'}))];
function drawStudents(){const q=$('#student-search').value.trim().toLowerCase(),list=students.filter(s=>s.name.toLowerCase().includes(q)||s.number.includes(q));$('#student-rows').innerHTML=list.map(s=>`<tr><td>${s.complete?'<span class="rank-one">1</span>':'-'}</td><td>${esc(s.name)}</td><td class="${s.complete?'low-score':''}">${s.complete?'52':'-'}</td><td>${s.complete?'—':'-'}</td><td>${s.submittedAt}</td><td><span class="status-tag ${s.complete?'completed':'pending'}">${s.guidance}</span></td><td><span class="status-tag ${s.complete?'completed':'pending'}">${s.grading}</span></td><td><button class="detail-link" ${s.complete?'':'disabled'}>查看詳情</button></td></tr>`).join('')||'<tr><td colspan="8">未找到符合條件的學生</td></tr>';const link=$('#student-rows button:not([disabled])');if(link)link.onclick=openReport}
$('#student-search').oninput=drawStudents;$('#student-reset').onclick=()=>{$('#student-search').value='';drawStudents();$('#student-search').focus()};drawStudents();
const taskItems=[{name:'《我最喜歡的故事人物》',progress:'1/12',kind:'命題作文',className:'1A',grade:'S1',start:'2026-10-29',deadline:'2026-11-30',average:'52.0',highest:'52',status:'進行中',report:true},{name:'「一個寒冷的冬天」寫作練習',progress:'0/6',kind:'命題作文',className:'C班',grade:'P2',start:'2026-11-23',deadline:'2026-11-30',average:'0',highest:'0',status:'進行中',report:false},{name:'「一個寒冷的冬天」寫作練習',progress:'0/6',kind:'命題作文',className:'D班',grade:'S4',start:'2026-11-23',deadline:'2026-11-30',average:'0',highest:'0',status:'進行中',report:false}];
let activeTaskType='命題作文';
function drawTaskList(){const q=$('#task-search').value.trim().toLowerCase(),cls=$('#task-class').value,grade=$('#task-grade').value,status=$('#task-status').value;const list=taskItems.filter(t=>(activeTaskType==='全部任務'||t.kind===activeTaskType)&&(!q||t.name.toLowerCase().includes(q))&&(!cls||t.className===cls)&&(!grade||t.grade===grade)&&(!status||t.status===status));$('#task-list-rows').innerHTML=list.map((t,i)=>`<tr><td class="task-name">${esc(t.name)}</td><td><span class="task-progress">${t.status}</span><br>${t.progress}</td><td><span class="task-kind">${t.kind}</span></td><td>${t.className}</td><td>${t.grade}</td><td>${t.start}</td><td class="task-deadline">${t.deadline}</td><td>${t.average}</td><td>${t.highest}</td><td class="task-row-actions"><button class="task-batch-submit" data-task-index="${taskItems.indexOf(t)}" type="button">⇧ 批量提交</button><button class="task-view-detail" data-task-index="${taskItems.indexOf(t)}" ${t.report?'':'disabled'}>查看詳情</button><button class="task-delete" data-task-index="${taskItems.indexOf(t)}" type="button">刪除</button></td></tr>`).join('')||'<tr><td colspan="10" class="task-empty">沒有符合條件的任務</td></tr>'}
$('#task-query').onclick=drawTaskList;$('#task-search').oninput=drawTaskList;$('#task-class').onchange=drawTaskList;$('#task-grade').onchange=drawTaskList;$('#task-status').onchange=drawTaskList;$('#task-reset').onclick=()=>{$('#task-search').value='';$('#task-class').value='';$('#task-grade').value='';$('#task-status').value='';drawTaskList()};
$('.task-type-tabs').onclick=e=>{const b=e.target.closest('[data-task-type]');if(!b)return;activeTaskType=b.dataset.taskType;document.querySelectorAll('[data-task-type]').forEach(x=>x.classList.toggle('active',x===b));drawTaskList()};
let uploadingTaskIndex=-1;
$('#task-create').onclick=()=>{const name=prompt('輸入任務名稱');if(name===null)return;const title=name.trim();if(!title){notify('請輸入任務名稱');return}taskItems.unshift({name:title,progress:'0/12',kind:'命題作文',className:'1A',grade:'S1',start:new Date().toISOString().slice(0,10),deadline:'—',average:'0',highest:'0',status:'進行中',report:false});activeTaskType='命題作文';document.querySelectorAll('[data-task-type]').forEach(x=>x.classList.toggle('active',x.dataset.taskType===activeTaskType));drawTaskList();notify('任務已加入列表')};
$('#task-files').onchange=e=>{const files=[...e.target.files];if(!files.length||uploadingTaskIndex<0)return;const item=taskItems[uploadingTaskIndex];const total=Number(item.progress.split('/')[1])||12;const count=Math.min(total,Number(item.progress.split('/')[0])+files.length);item.progress=count+'/'+total;item.status='進行中';drawTaskList();notify('已加入 '+files.length+' 份作文，等待批改');e.target.value='';uploadingTaskIndex=-1};
$('#task-list-rows').onclick=e=>{const view=e.target.closest('.task-view-detail');if(view&&!view.disabled){task();return}const upload=e.target.closest('.task-batch-submit');if(upload){uploadingTaskIndex=Number(upload.dataset.taskIndex);$('#task-files').click();return}const remove=e.target.closest('.task-delete');if(remove&&confirm('確定刪除此任務？')){taskItems.splice(Number(remove.dataset.taskIndex),1);drawTaskList();notify('任務已刪除')}};
drawTaskList();
$('#dimension-bars').innerHTML=[['內容',55,'blue'],['結構',50,'blue'],['表達',46.7,'red'],['標點字體',60,'blue']].map(([label,value,color])=>`<div class="dimension-bar ${color}"><div>${label} <small>平均: ${value}%</small></div><div class="dimension-track"></div><div class="dimension-counts"><span>🔴 ${color==='red'?1:0}人</span><span>🔵 ${color==='blue'?1:0}人</span><span>🟢 ${color==='green'?1:0}人</span></div></div>`).join('');
$('#refresh-scores').onclick=()=>{drawStudents();notify('成績已刷新')};
const downloadExportTrigger=$('#download-export-trigger'),downloadExportMenu=$('#download-export-menu');
function setDownloadExportOpen(open){downloadExportMenu.hidden=!open;downloadExportTrigger.setAttribute('aria-expanded',String(open))}
downloadExportTrigger.onclick=()=>setDownloadExportOpen(downloadExportMenu.hidden);
downloadExportTrigger.onkeydown=e=>{if(e.key==='Escape'&&!downloadExportMenu.hidden){e.preventDefault();setDownloadExportOpen(false)}else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setDownloadExportOpen(true);const items=[...downloadExportMenu.querySelectorAll('button')];items[e.key==='ArrowDown'?0:items.length-1].focus()}};
downloadExportMenu.onkeydown=e=>{const items=[...downloadExportMenu.querySelectorAll('button')],index=items.indexOf(downloadExportTrigger.getRootNode().activeElement);if(e.key==='Escape'){e.preventDefault();setDownloadExportOpen(false);downloadExportTrigger.focus()}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();items[e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}};
downloadExportMenu.addEventListener('click',e=>{const item=e.target.closest('button');if(item){setDownloadExportOpen(false);if(item.id==='export-scores')downloadExportTrigger.focus()}});
const isInsideDownloadExport=e=>e.composedPath().some(node=>node?.classList?.contains?.('download-export'));
window.addEventListener('pointerdown',e=>{if(!isInsideDownloadExport(e))setDownloadExportOpen(false)});
window.addEventListener('focusin',e=>{if(!isInsideDownloadExport(e))setDownloadExportOpen(false)});
$('#export-scores').onclick=()=>{const csv='\uFEFF排名,班級編號,學生,得分,品第,提交日期,寫前指導,作文批改狀態\r\n'+students.map(s=>`${s.complete?'1':'-'},${s.number},${s.name},${s.complete?'52':'-'},${s.complete?'中中（下）':'-'},${s.submittedAt},${s.guidance},${s.grading}`).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='我最喜歡的故事人物-成績表.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
let printTrigger;
function showPrint(all){if(editing>=0||dirty||summaryEditing){notify(all?'請先確認修改，再導出作文報告':'請先確認修改，再下載作文報告');return}printTrigger=all?downloadExportTrigger:$('#print-one');if(!all){printDirectly();return}$('#print-title').textContent=all?'導出全部作文報告':'下載作文報告';$('#print-scope').textContent=all?'1A · 共12名學生，1份作文報告可導出；11名未完成學生不納入本次導出。':`當前學生：${essayData.student} · 1份作文報告 · 共${essayData.pages.length+1}頁`;$('#print-dialog .print-selected span:first-child').textContent=essayData.student;$('#print-dialog .print-selected span:nth-child(2)').textContent='《'+essayData.essayTitle+'》';$('#print-dialog').showModal()}
$('#print-one').onclick=()=>showPrint(false);$('#print-all').onclick=()=>showPrint(true);
function closePrint(){$('#print-dialog').close();printTrigger?.focus()}
$('#cancel-print').onclick=closePrint;$('#close-print').onclick=closePrint;$('#print-dialog').addEventListener('close',()=>printTrigger?.focus());
$('#do-print').onclick=()=>openPaperPreview();
$('.preview .current').onclick=e=>{e.preventDefault();taskList()};
if(location.hash==='#detail')openReport();else if(location.hash==='#overview')task();else taskList();

const aiParagraphs=["在中國眾多故事人物中，我最喜歡的是《三國演義》中的楊修。他才思敏捷，善於從細微之處察覺他人的心意。雖然他最終因恃才放曠而招致殺身之禍，我仍欣賞他的才智，也從他的遭遇中得到警惕。", "楊修擔任曹操的行軍主簿時，曾遇到一件與「雞肋」有關的事。曹操因見碗中雞肋，便以「雞肋」為夜間口令。楊修聽後，認為雞肋食之無味、棄之可惜，正像當時進退兩難的戰局，於是喚隨行軍士收拾行裝，準備回程。他能把一句口令與眼前的處境聯繫起來，顯出敏銳的觀察力和推斷能力。", "除了洞察局勢，楊修也擅長拆解文字。塞北送來一盒酥餅，曹操在盒上寫下「一盒酥」。楊修看見後，便拿匙子與眾人分吃，並將三字拆解為「一人一口酥」。這份機智讓我佩服，但他未經詢問便行動，也顯出過於自信的一面。", "花園門上題「活」字的故事，更讓我看見他的聰慧與張揚。眾人不解曹操的意思，楊修卻指出，門內添「活」便成了「闊」，是嫌園門太寬。改建後曹操果然滿意。楊修雖猜中了心意，卻也在眾人面前顯露自己能看穿曹操，沒有顧及對方的感受。", "楊修的悲劇使我明白，才智固然可貴，謙遜與審慎同樣重要。我欣賞他的敏銳，卻不願重蹈他恃才放曠的覆轍。往後學習和與人相處時，我希望自己既肯動腦思考，也懂得先聆聽、再表達，讓才智用得恰當。"];
const aiWordCount=aiParagraphs.join('').replace(/[\s\p{P}\p{S}]/gu,'').length;
$('#ai-view').innerHTML=`<div class="ai-version-label">✧ AI 修改版</div><h2>我最喜歡的故事人物</h2><div class="ai-essay-body">${aiParagraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div>`;

// 范文为独立的同题阅读内容，与学生原文、修改版和打印旁批分别维护。
const modelParagraphs=["翻開《三國演義》，眾多英雄謀士躍然紙上，最讓我反覆思量的，卻是楊修。他沒有叱吒戰場的威風，只有一顆敏銳的心，能從隻字片語讀出別人的心思。我欣賞這份才智，也因他的悲劇而懂得：聰明之外，人還需要分寸。", "「雞肋」本是一個尋常的詞，楊修卻從中聽出了退兵的意味。面對進退兩難的戰局，他把曹操的口令、食物的特點和眼前的處境連在一起，作出判斷。我佩服的不是他猜中答案的結果，而是他善於觀察、肯於思考的過程。別人只聽到兩個字，他卻看見了字背後的局勢。", "然而，聰明也可能成為一面鏡子，照出人的自負。曹操在園門上題了一個「活」字，眾人面面相覷，楊修立即解出「闊」字，指出園門過寬。他的解釋清楚巧妙，卻忽略了當眾揭破別人心思可能帶來的感受。這件事使我看見，他不只善於理解文字，也急於顯露自己理解得比別人多。", "我曾在小組討論時搶着指出同學的錯誤，以為答案正確便值得讚賞，卻讓對方難堪。讀到楊修的故事，我才想起那次沉默的討論。後來再遇到分歧，我先聽完同學的理由，再提出自己的依據。當大家願意一起核對時，我發現，讓人接受的表達，往往比急着證明自己更有力量。", "因此，我喜歡楊修，並不表示認同他的每一個選擇。他的敏銳激勵我多看、多想，他的遭遇則提醒我收起自滿。真正值得學習的，不是在人前處處搶先，而是讓才智與謙遜同行。在一次次思考與相處之中，我願把這份啟發帶出書頁，放進自己的生活。"];
const modelWordCount=modelParagraphs.join('').replace(/[\s\p{P}\p{S}]/gu,'').length;
$('#model-view').innerHTML=`<div class="ai-version-label">AI 範文</div><h2>我最喜歡的故事人物</h2><div class="ai-essay-body">${modelParagraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div>`;


// 打印短评是派生视图；不修改 notes，也不写回 localStorage。
const shortPrintComments=["改為「他出自《三國演義》中的《楊修之死》……但我欣賞的正是他的才智」。", "悲劇結局與喜愛之情形成張力，引出對「才」與「命」的思考。", "精簡為：曹操以「雞肋」為夜間口令，楊修聞之便喚軍士收拾行裝。", "具體動作寫出了楊修機敏大膽、不拘小節的性格。", "清晰還原拆字過程，呈現人物的聰慧與才思敏捷。", "結尾聯繫自身，寫清如何謙遜、審慎地運用才智。", "以過渡句連接事例，突出楊修對曹操心思的揣摩。", "補寫賣弄聰明帶來的影響，深化人物性格分析。"];
function simplifyPrintComment(note,index){
 if(note[2]===defaults[index]?.[2])return shortPrintComments[index];
 const text=String(note[2]).trim();
 if(text.length<=70)return text;
 const sentences=text.match(/[^。！？]+[。！？]?/g)||[text];
 const action=sentences.find(x=>/建議|改為|改成|刪|補充|避免|應|可以|可將/.test(x));
 const evaluation=sentences.find(x=>/生動|形象|清晰|具體|不足|重複|偏離|欠缺|真摯/.test(x));
 const chosen=[evaluation,action].filter((x,i,a)=>x&&a.indexOf(x)===i);
 return (chosen.length?chosen:sentences.slice(0,1)).join('');
}
const printNumbers=['①','②','③','④','⑤','⑥','⑦','⑧'];
function makePrintPage(){
 return essayData.pages.map((page,pageIndex)=>{const ids=pageIndex===0?[0,1,2,3,6]:[4,5,7];return `<article class="report-sheet" data-scan="${pageIndex+1}"><header class="sheet-heading"><div class="print-student-meta"><span>姓名：${esc(essayData.student)}</span><span>題目：${esc(essayData.essayTitle)}</span></div><span>第 ${pageIndex+1} / ${essayData.pages.length} 頁</span></header><div class="annotated-layout"><div class="manuscript-column"><div class="sheet-manuscript"><img src="./assets/lin-junxi-${pageIndex+1}.jpg" alt="${esc(essayData.student)}作文原稿第 ${pageIndex+1} 頁">${makePrintUnderlines(page)}${ids.map(i=>{const mark=page.marks.find(m=>m.anchor===`annotation-${i}`);if(!mark)return '';const top=mark.style.match(/top: ([\d.]+)%/)[1];return `<span class="sheet-anchor ${notes[i][3]?'praise':'correction'}" style="top:${top}%;left:${i===1?94:1}%">${printNumbers[i]}</span>`}).join('')}</div></div><aside class="marginal-column"><h3>— 旁批 —</h3>${ids.map(i=>`<p class="marginal-note ${notes[i][3]?'praise':'correction'}"><span>${printNumbers[i]}</span>${esc(simplifyPrintComment(notes[i],i))}${essayData.notes[i].unlocated?'<small>（暫無對應位置）</small>':''}</p>`).join('')}</aside></div></article>`}).join('');
}
// 旁批起排位置：起於原稿首行正文（作文標題行下方），避免旁批與作文標題同行。
// 比例依各頁原稿實際高度換算，第 1 頁標題行底部約在原稿高度 21.5% 處，故取 22.5%。
const MARGINAL_START_RATIO=0.225;
function syncMarginalStart(){
 const previews=[...document.querySelectorAll('#preview-pages .report-sheet')];
 const prints=[...document.querySelectorAll('#print-output .report-sheet')];
 previews.forEach((sheet,index)=>{
  const img=sheet.querySelector('.sheet-manuscript img');
  if(!img)return;
  const apply=()=>{
   const height=img.offsetHeight;
   if(!height)return;
   const offset=Math.round(height*MARGINAL_START_RATIO)+'px';
   [sheet,prints[index]].forEach(item=>{
    const column=item&&item.querySelector('.marginal-column');
    if(column)column.style.setProperty('--marginal-start',offset);
   });
  };
  if(img.complete&&img.naturalWidth)apply();else img.addEventListener('load',apply,{once:true});
 });
}
function openPaperPreview(){
 $('#paper-preview-scope').textContent=printTrigger?.id==='download-export-trigger'?'A4 · 210 × 297 mm · 全部可導出報告 · 1份 · 共3頁':`A4 · 210 × 297 mm · ${essayData.student} · 1份作文報告 · 共${essayData.pages.length+1}頁`;
 const markup=makePrintPage();$('#preview-pages').innerHTML=markup;$('#print-output').innerHTML=markup;
 closePrint();$('#paper-preview').showModal();fitPaperPreview();syncMarginalStart();
}
// 预览窗操作：返回关闭弹窗并把焦点还给触发按钮；打印走系统打印，打印内容由 @media print 下的 #print-output 提供。
$('#exit-paper-preview').onclick=()=>$('#paper-preview').close();
$('#print-paper').onclick=()=>printReportDocument();
$('#paper-preview').addEventListener('close',()=>printTrigger?.focus());
// 打印预览按可用区域缩放，保证一屏能看到完整 A4 页面；实际打印仍为 210 × 297 mm。
function fitPaperPreview(){
 const box=$('.paper-preview-scroll');
 const pages=$('#preview-pages');
 if(!box||!pages||!pages.children.length)return;
 const n=pages.children.length;
 const totalH=1123*n+24*(n-1);
 const scale=Math.min(1,(box.clientWidth-52)/794,(box.clientHeight-52)/1123);
 pages.style.width=(794*scale)+'px';
 pages.style.height=(totalH*scale)+'px';
 pages.style.transform='scale('+scale+')';
 pages.style.transformOrigin='top center';
}
// 打印版式：左栏原稿按原始比例铺满并垂直居中，右栏旁批顶部与原稿顶部对齐（由 .annotated-layout 的 align-content/align-items 控制），
// 旁批内容再由 --marginal-start 整体下移至作文標題行下方，分隔線長度不受影響。
new ResizeObserver(fitPaperPreview).observe($('.paper-preview-scroll'));

// 单份报告直接进入浏览器打印；图片就绪后按A4成品宽度计算旁批起排位置。
let directPrinting=false;
async function printDirectly(){
 if(directPrinting)return;
 directPrinting=true;
 const button=$('#print-one');button.disabled=true;
 try{
  $('#print-output').innerHTML=makePrintPage();
  const images=[...document.querySelectorAll('#print-output .sheet-manuscript>img')];
  await Promise.all(images.map(img=>img.decode()));
  images.forEach(img=>{
   const manuscriptWidth=(794-60)*0.76;
   img.closest('.report-sheet').querySelector('.marginal-column').style.setProperty('--marginal-start',Math.round(manuscriptWidth*img.naturalHeight/img.naturalWidth*MARGINAL_START_RATIO)+'px');
  });
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  printReportDocument();
 }catch{notify('報告載入失敗，請重試')}
 finally{directPrinting=false;button.disabled=false;button.focus()}
}

// Chrome 另存为PDF使用打印时的文档标题作为建议文件名。
function printReportDocument(){
 const originalTitle=document.title;
 const clean=value=>String(value).replace(/[\\/:*?"<>|\x00-\x1f]/g,' ').replace(/\s+/g,' ').trim();
 document.title=[essayData.studentNumber,essayData.student,essayData.essayTitle].map(clean).join(' ')+'-作文报告';
 const restore=()=>{document.title=originalTitle;window.removeEventListener('afterprint',restore)};
 window.addEventListener('afterprint',restore);
 try{window.print()}catch(error){restore();throw error}
}

// 将原文逐行锚点转为打印用浅色下划线，不复制后台矩形选框。
function makePrintUnderlines(page){
 return page.marks.filter(mark=>mark.anchor).map(mark=>{
  const i=Number(mark.anchor.split('-')[1]);
  const position=Object.fromEntries([...mark.style.matchAll(/(left|top|width|height):\s*([\d.]+)%/g)].map(m=>[m[1],Number(m[2])]));
  if(!Object.values(position).every(Number.isFinite)||Object.keys(position).length!==4)return '';
  const praise=notes[i][3];
  return `<span class="print-quote-line ${praise?'praise':'correction'}" data-print-note="${i+1}" aria-hidden="true" style="left:${position.left}%;top:${position.top+position.height-0.35}%;width:${position.width}%"></span>`;
 }).join('');
}

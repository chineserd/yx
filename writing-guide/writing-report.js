// 学生作文报告：按任务配置展示写前指导与作文批改报告。
const reportText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reportScoreTotal=()=>scoreSource.dimensions.reduce((sum,item)=>sum+item.score,0);
const reportPercent=(score,max)=>Math.round(score/max*100);
const reportSectionLabels={guidance:'写前指导',grading:'作文批改报告',post:'写后指导（待上线）'};
const reportGenreLabel=value=>['記敍文','記敘文','記敘抒情','记叙文'].includes(value)?'記敍抒情':['議論文','议论文'].includes(value)?'論說文':value;
const reportGuidanceSteps=result=>[
 {title:'審題立意',label:reportGenreLabel(result.genre)||'命題作文',body:[result.stance,result.keywords,result.thesis].filter(Boolean)},
 {title:'選材構思',label:'核心材料',body:result.materials||[]},
 {title:'結構表達',label:'文章結構',body:result.outline||[]},
 {title:'完整指導',label:'表達策略與下一步',body:[...(result.techniques||[]),'完成修改後，再次核對題意、事例詳略與結尾回扣。']}
];
function reportNoteMarkup(note,index){
 const kind=note.good?'praise':'correction';
 return `<article class="writing-report-note ${kind}" data-note-card="${index}"><button type="button" data-report-note="${index}"><span class="writing-report-note-number">${index+1}</span><span><b>${reportText(note.category)}</b><small>${note.unlocated?'暫無對應位置':'原文批註'}</small></span></button><p>${reportText(note.comment)}</p><blockquote>「${reportText(note.quote)}」</blockquote></article>`;
}
function reportPageMarkup(page,pageIndex){
 const marks=page.marks.map(mark=>{
  const noteIndex=Number(String(mark.anchor||'').split('-')[1]);
  if(!Number.isFinite(noteIndex))return '';
  const type=mark.className.includes('highlight')?'praise':'correction';
  return `<button type="button" class="writing-report-mark ${type}" data-report-note="${noteIndex}" style="${mark.style}" aria-label="查看批註 ${noteIndex+1}">${noteIndex+1}</button>`;
 }).join('');
 return `<article class="writing-report-page"><div class="writing-report-page-meta"><span>第 ${pageIndex+1} 頁 / 共 ${essayData.pages.length} 頁</span><span>${reportText(essayData.student)}</span></div><div class="writing-report-image-wrap"><img src="report-assets/lin-junxi-${pageIndex+1}.jpg" alt="${reportText(essayData.student)}作文原稿第${pageIndex+1}頁">${marks}</div></article>`;
}
function guidanceCardsMarkup(result){
 return '<div class="writing-report-guidance-blueprint-frame"><img class="writing-report-guidance-blueprint" src="report-assets/作文寫前藍圖.png" alt="作文寫前藍圖"><span class="writing-report-blueprint-label-mask mask-analysis" aria-hidden="true"></span><span class="writing-report-blueprint-label-mask mask-thesis" aria-hidden="true"></span><span class="writing-report-blueprint-label-mask mask-materials" aria-hidden="true"></span><span class="writing-report-blueprint-label-mask mask-structure" aria-hidden="true"></span></div>';
}
function writingReportMarkup(student,result,initialSection='guidance'){
 const activeSection=['guidance','grading'].includes(initialSection)?initialSection:'grading';
 const overall=scoreSource.overall.replace(/\d+\s*$/,'').trim();
 const scoreRows=scoreSource.dimensions.map(item=>`<article class="writing-report-score-row"><div class="writing-report-score-heading"><b>${reportText(item.label)}</b><span><strong>${item.score}</strong> / ${item.max}</span><button type="button" data-report-score="${scoreSource.dimensions.indexOf(item)}" aria-expanded="false" aria-label="${reportText(item.label)}評語">⌄</button></div><div class="writing-report-score-track"><i style="width:${reportPercent(item.score,item.max)}%"></i></div><p hidden>${reportText(item.comment)}</p></article>`).join('');
 const activeClass=name=>activeSection===name?'active':'';
 const hidden=name=>activeSection===name?'':' hidden';
 return `<div class="writing-report-shell"><header class="writing-report-header"><div class="writing-report-heading-main"><a class="writing-report-back" href="#/backend/tasks/${encodeURIComponent(result.taskId||'T001')}?section=students" aria-label="返回學生答題情況" title="返回學生答題情況">←</a><div><h2>學習作文報告</h2><p><span>命題作文</span>《${reportText(result.topicTitle||essayData.essayTitle)}》</p></div></div><div class="writing-report-header-actions"><span>提交編號：${reportText(result.id)}</span><button type="button" class="admin-button" hidden data-report-print>打印報告</button></div></header><nav class="writing-report-section-tabs" role="tablist" aria-label="學習作文報告內容"><button type="button" class="${activeClass('guidance')}" data-report-section="guidance" role="tab" aria-selected="${activeSection==='guidance'}">${reportSectionLabels.guidance}</button><button type="button" class="${activeClass('grading')}" data-report-section="grading" role="tab" aria-selected="${activeSection==='grading'}">${reportSectionLabels.grading}</button><button type="button" class="${activeClass('post')}" data-report-section="post" role="tab" aria-selected="${activeSection==='post'}">${reportSectionLabels.post}</button></nav><section class="writing-report-section-pane writing-report-guidance-view" data-report-section-pane="guidance"${hidden('guidance')}>${result.guidanceEnabled?guidanceCardsMarkup(result):'<div class="writing-report-guidance-empty">此任務未開啟寫前指導，暫無寫前指導內容。</div>'}</section><section class="writing-report-section-pane" data-report-section-pane="grading"${hidden('grading')}><div class="writing-report-workspace"><section class="writing-report-original"><div class="writing-report-toolbar"><div class="writing-report-segmented" role="tablist" aria-label="作文版本"><button type="button" role="tab" aria-selected="true" class="selected" data-report-view="image">▧ 圖片</button><button type="button" role="tab" aria-selected="false" data-report-view="text">▤ 文字</button></div><div class="writing-report-counts" data-report-counts>總字數 <b>${essayData.wordCount}</b> 字 <i>｜</i> 疑似錯別字 <strong>${essayData.typoCount}</strong> 字</div></div><div class="writing-report-pages" data-report-pages>${essayData.pages.map(reportPageMarkup).join('')}</div><article class="writing-report-text" hidden data-report-text>${essayData.paragraphs.map(p=>`<p>${reportText(p)}</p>`).join('')}</article><footer class="writing-report-legend"><span>ⓘ 點擊原文標記可查看批註</span><span><i class="legend-praise"></i>佳句賞析 <i class="legend-correction"></i>優化建議</span></footer></section><aside class="writing-report-review"><div class="writing-report-review-tabs" role="tablist" aria-label="作文批改報告內容"><button type="button" class="active" data-report-pane="score" role="tab" aria-selected="true">評分與評語</button><button type="button" data-report-pane="notes" role="tab" aria-selected="false">批改信息</button></div><section class="writing-report-score-pane" data-report-score-pane><div class="writing-report-summary"><div class="writing-report-summary-copy"><h3>總評</h3><p class="writing-report-overall">${reportText(overall)}</p></div><div class="writing-report-total" aria-label="作文總評 ${reportScoreTotal()} 分"><div><strong>${reportScoreTotal()}</strong><small>/100</small></div><b>等級：5</b></div></div><div class="writing-report-score-list">${scoreRows}</div><section class="writing-report-insights"><h3>整體優點</h3><ul>${scoreSource.strengths.map(item=>`<li>${reportText(item)}</li>`).join('')}</ul></section><section class="writing-report-insights"><h3>整體改善建議</h3><ol>${scoreSource.suggestions.map(item=>`<li>${reportText(item)}</li>`).join('')}</ol></section></section><section class="writing-report-notes-pane" data-report-notes-pane hidden><p class="writing-report-note-count">共 ${essayData.notes.length} 條批改 · 原文與評語雙向聯動</p>${essayData.notes.map(reportNoteMarkup).join('')}</section></aside></div></section><section class="writing-report-section-pane writing-report-post-view" data-report-section-pane="post"${hidden('post')}><div class="writing-report-post-intro"><b>寫後指導（待上線）</b><span>本功能尚未開放，後續将提供作文完成後的修改建議與範文參考。</span></div><div class="writing-report-post-grid"><article class="writing-report-post-card is-disabled"><b>寫後指導修改版</b><span>待上線</span></article></div></section></div>`;
}
function renderWritingReport(student,result,initialSection='guidance'){
 const panel=document.getElementById('studentWritingReport');
 if(!panel||!student||!result)return;
 const requestedSection=['guidance','grading'].includes(initialSection)?initialSection:'grading';
 const activeSection=result.guidanceEnabled?requestedSection:'grading';
 panel.innerHTML=writingReportMarkup(student,result,activeSection);
 if(!result.guidanceEnabled){
  panel.querySelector('[data-report-section="guidance"]')?.remove();
  panel.querySelector('[data-report-section-pane="guidance"]')?.remove();
 }
 const scoreKey=`writingReportScore:${result.taskId||'T001'}:${student.id||result.id}`;
 const defaultScore={scores:scoreSource.dimensions.map(item=>item.score),overall:scoreSource.overall.replace(/\d+\s*$/,'').trim()};
 let savedScore=defaultScore;
 try{const stored=JSON.parse(localStorage.getItem(scoreKey));if(Array.isArray(stored?.scores)&&stored.scores.length===scoreSource.dimensions.length&&stored.scores.every((value,index)=>Number.isFinite(value)&&value>=0&&value<=scoreSource.dimensions[index].max)&&typeof stored.overall==='string')savedScore=stored;}catch(error){}
 let scoreDraft={scores:[...savedScore.scores],overall:savedScore.overall},scoreMode='overall',scoreDirty=false;
 const gradeNames=['未達品第','下下','下中','下上','中下','中中（下）','中中（上）','中上','上下','上中','上上'];
 const gradeName=score=>gradeNames[Math.max(0,Math.min(10,Math.round(score/10)))];
 const totalScore=()=>Math.round(scoreDraft.scores.reduce((sum,value)=>sum+value,0)*10)/10;
 const headerActions=panel.querySelector('.writing-report-header-actions');
 headerActions.innerHTML=`<span class="writing-report-current-student">${reportText(student.name)}</span><button type="button" class="writing-report-student-nav" data-report-nav="${reportText(result.prevHref||'')}" ${result.prevHref?'':'disabled'}>‹ 上一位</button><button type="button" class="writing-report-student-nav" data-report-nav="${reportText(result.nextHref||'')}" ${result.nextHref?'':'disabled'}>下一位 ›</button><button type="button" class="writing-report-save" data-report-save>確認修改</button><span class="writing-report-save-status" role="status" hidden></span>`;
 const reviewTabs=panel.querySelector('.writing-report-review-tabs');
 reviewTabs.insertAdjacentHTML('beforeend','<div class="writing-report-score-modes" role="group" aria-label="評分方式"><button type="button" data-report-score-mode="overall" aria-pressed="true">整體評分</button><button type="button" data-report-score-mode="grade" aria-pressed="false">品第評分</button></div>');
 const scoreRows=[...panel.querySelectorAll('.writing-report-score-row')];
 scoreRows.forEach((row,index)=>{row.querySelector('.writing-report-score-heading>span').innerHTML=`<input type="number" data-report-score-input="${index}" aria-label="${reportText(scoreSource.dimensions[index].label)}分數"><small data-report-score-limit></small><span class="writing-report-dimension-grade" data-report-dimension-grade></span>`;});
 const overallParagraph=panel.querySelector('.writing-report-overall');overallParagraph.textContent=scoreDraft.overall;
 const overallEditor=document.createElement('textarea');overallEditor.className='writing-report-overall-editor';overallEditor.setAttribute('aria-label','編輯總評');overallEditor.hidden=true;overallParagraph.after(overallEditor);
 const overallEdit=document.createElement('button');overallEdit.type='button';overallEdit.className='writing-report-overall-edit';overallEdit.setAttribute('aria-label','編輯總評');overallEdit.textContent='✎';overallParagraph.after(overallEdit);
 const markDirty=()=>{scoreDirty=true;const status=panel.querySelector('.writing-report-save-status');status.hidden=false;status.textContent='尚未保存';};
 const syncScoreView=()=>{
  panel.querySelectorAll('[data-report-score-mode]').forEach(button=>{const active=button.dataset.reportScoreMode===scoreMode;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
  scoreRows.forEach((row,index)=>{const dimension=scoreSource.dimensions[index],input=row.querySelector('[data-report-score-input]'),grade=scoreMode==='grade',value=grade?Math.round(scoreDraft.scores[index]/dimension.max*10):scoreDraft.scores[index];input.max=String(grade?10:dimension.max);input.min='0';input.step=grade?'1':'0.1';input.value=String(value);row.querySelector('[data-report-score-limit]').textContent=`/${grade?10:dimension.max}`;row.querySelector('[data-report-dimension-grade]').textContent=grade?gradeNames[value]:'';row.querySelector('.writing-report-score-track i').style.width=`${scoreDraft.scores[index]/dimension.max*100}%`;});
  const total=totalScore(),badge=panel.querySelector('.writing-report-total');badge.querySelector('strong').textContent=String(total);badge.querySelector('b').textContent=`品第：${gradeName(total)}`;badge.setAttribute('aria-label',`作文總評 ${total} 分，${gradeName(total)}`);
 };
 syncScoreView();
 panel.querySelectorAll('[data-report-score-mode]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.reportScoreMode===scoreMode)return;const invalid=panel.querySelector('[data-report-score-input]:invalid');if(invalid){invalid.focus();return;}scoreMode=button.dataset.reportScoreMode;syncScoreView();}));
 panel.querySelectorAll('[data-report-score-input]').forEach(input=>input.addEventListener('input',()=>{const index=Number(input.dataset.reportScoreInput),value=Number(input.value),dimension=scoreSource.dimensions[index];if(input.value===''||!input.checkValidity()||!Number.isFinite(value))return;scoreDraft.scores[index]=scoreMode==='grade'?value*dimension.max/10:value;markDirty();const total=totalScore(),badge=panel.querySelector('.writing-report-total');badge.querySelector('strong').textContent=String(total);badge.querySelector('b').textContent=`品第：${gradeName(total)}`;badge.setAttribute('aria-label',`作文總評 ${total} 分，${gradeName(total)}`);input.closest('.writing-report-score-row').querySelector('.writing-report-score-track i').style.width=`${scoreDraft.scores[index]/dimension.max*100}%`;input.closest('.writing-report-score-row').querySelector('[data-report-dimension-grade]').textContent=scoreMode==='grade'?gradeNames[value]:'';}));
 overallEdit.addEventListener('click',()=>{overallEditor.value=scoreDraft.overall;overallParagraph.hidden=true;overallEdit.hidden=true;overallEditor.hidden=false;overallEditor.focus();});
 overallEditor.addEventListener('input',()=>{scoreDraft.overall=overallEditor.value;markDirty();});
 panel.querySelector('[data-report-save]').addEventListener('click',()=>{const invalid=panel.querySelector('[data-report-score-input]:invalid');if(invalid){invalid.focus();return;}if(!scoreDraft.overall.trim()){overallEditor.hidden=false;overallEditor.focus();return;}try{localStorage.setItem(scoreKey,JSON.stringify(scoreDraft));savedScore={scores:[...scoreDraft.scores],overall:scoreDraft.overall};scoreDirty=false;overallParagraph.textContent=scoreDraft.overall;overallParagraph.hidden=false;overallEdit.hidden=false;overallEditor.hidden=true;const status=panel.querySelector('.writing-report-save-status');status.hidden=false;status.textContent='修改已保存';}catch(error){const status=panel.querySelector('.writing-report-save-status');status.hidden=false;status.textContent='保存失敗，請重試';}});
 panel.querySelectorAll('[data-report-nav]').forEach(button=>button.addEventListener('click',()=>{const href=button.dataset.reportNav;if(!href)return;if(scoreDirty&&!window.confirm('修改尚未保存，確定放棄並切換學生？'))return;location.hash=href;}));
 document.querySelector('.admin-title')?.setAttribute('hidden','');
 const breadcrumb=document.getElementById('writingBreadcrumb');
 if(breadcrumb){breadcrumb.hidden=false;breadcrumb.innerHTML=`<span>任務管理</span><span aria-hidden="true">/</span><a href="#/backend/tasks/${encodeURIComponent(result.taskId||'T001')}">學生答題情況</a><span aria-hidden="true">/</span><span aria-current="page">學習作文報告</span>`;}
 panel.querySelector('.writing-report-back')?.addEventListener('click',event=>{if(scoreDirty&&!window.confirm('修改尚未保存，確定放棄並返回任務詳情？'))event.preventDefault();});
 const gradingPane=panel.querySelector('[data-report-section-pane="grading"]');
 if(gradingPane){
  gradingPane.querySelector('.writing-report-legend span')?.replaceChildren(document.createTextNode('点选原文标记可查看批注'));
 }
 const postPane=panel.querySelector('[data-report-section-pane="post"]');
 postPane?.querySelector('.writing-report-post-intro span')?.replaceChildren(document.createTextNode('本功能尚未上线。'));
 panel.querySelector('[data-report-print]')?.addEventListener('click',()=>window.print());
 panel.querySelectorAll('[data-report-section]').forEach(button=>button.addEventListener('click',()=>{
  const section=button.dataset.reportSection;
  panel.querySelectorAll('[data-report-section]').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-selected',String(selected));});
  panel.querySelectorAll('[data-report-section-pane]').forEach(item=>{item.hidden=item.dataset.reportSectionPane!==section;});
 }));
 panel.querySelectorAll('[data-report-view]').forEach(button=>button.addEventListener('click',()=>{
  const image=button.dataset.reportView==='image';
  panel.querySelectorAll('[data-report-view]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-selected',String(selected));});
  panel.querySelector('[data-report-pages]').hidden=!image;
  panel.querySelector('[data-report-text]').hidden=image;
 }));
 panel.querySelectorAll('[data-report-pane]').forEach(button=>button.addEventListener('click',()=>{
  const score=button.dataset.reportPane==='score';
  panel.querySelectorAll('[data-report-pane]').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-selected',String(selected));});
  panel.querySelector('[data-report-score-pane]').hidden=!score;
  panel.querySelector('[data-report-notes-pane]').hidden=score;
  panel.querySelector('.writing-report-score-modes').hidden=!score;
 }));
 panel.querySelectorAll('[data-report-note]').forEach(button=>button.addEventListener('click',()=>{
  const index=button.dataset.reportNote;
  panel.querySelectorAll('[data-note-card]').forEach(card=>card.classList.toggle('is-active',card.dataset.noteCard===index));
  const card=panel.querySelector(`[data-note-card="${index}"]`);if(card)card.scrollIntoView({block:'nearest'});
 }));
 panel.querySelectorAll('[data-report-score]').forEach(button=>button.addEventListener('click',()=>{
  const row=button.closest('.writing-report-score-row'),comment=row.querySelector('p'),expanded=button.getAttribute('aria-expanded')==='true';
  button.setAttribute('aria-expanded',String(!expanded));button.textContent=expanded?'⌄':'⌃';comment.hidden=expanded;
 }));
}

// 学生作文报告：统一承载写作指导、作文批改报告与写后指导占位。
const reportText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reportScoreTotal=()=>scoreSource.dimensions.reduce((sum,item)=>sum+item.score,0);
const reportPercent=(score,max)=>Math.round(score/max*100);
const reportGuidanceSteps=result=>[
 {title:'審題立意',label:result.genre||'命題作文',body:[result.stance,result.keywords,result.thesis].filter(Boolean)},
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
 return reportGuidanceSteps(result).map((step,index)=>`<article class="writing-report-guidance-card"><header><span>0${index+1}</span><div><b>${reportText(step.title)}</b><small>${reportText(step.label)}</small></div></header><ul>${step.body.map(item=>`<li>${reportText(item)}</li>`).join('')}</ul></article>`).join('');
}
function writingReportMarkup(student,result,initialSection='guidance'){
 const activeSection=['guidance','grading','post'].includes(initialSection)?initialSection:'guidance';
 const overall=scoreSource.overall.replace(/\d+\s*$/,'').trim();
 const scoreRows=scoreSource.dimensions.map(item=>`<article class="writing-report-score-row"><div class="writing-report-score-heading"><b>${reportText(item.label)}</b><span><strong>${item.score}</strong> / ${item.max}</span><button type="button" data-report-score="${scoreSource.dimensions.indexOf(item)}" aria-expanded="false" aria-label="${reportText(item.label)}評語">⌄</button></div><div class="writing-report-score-track"><i style="width:${reportPercent(item.score,item.max)}%"></i></div><p hidden>${reportText(item.comment)}</p></article>`).join('');
 const activeClass=name=>activeSection===name?'active':'';
 const hidden=name=>activeSection===name?'':' hidden';
 return `<div class="writing-report-shell"><header class="writing-report-header"><div><a class="writing-report-back" href="#/backend/tasks">← 返回任務管理</a><h2>學習作文報告</h2><p><span>命題作文</span>《${reportText(essayData.essayTitle)}》 · ${reportText(student.name)}</p></div><div class="writing-report-header-actions"><span>提交編號：${reportText(result.id)}</span><button type="button" class="admin-button" hidden data-report-print>打印報告</button></div></header><nav class="writing-report-section-tabs" role="tablist" aria-label="學習作文報告內容"><button type="button" class="${activeClass('guidance')}" data-report-section="guidance" role="tab" aria-selected="${activeSection==='guidance'}">寫作指導</button><button type="button" class="${activeClass('grading')}" data-report-section="grading" role="tab" aria-selected="${activeSection==='grading'}">作文批改報告</button><button type="button" class="${activeClass('post')}" data-report-section="post" role="tab" aria-selected="${activeSection==='post'}">寫後指導（待上線）</button></nav><section class="writing-report-section-pane writing-report-guidance-view" data-report-section-pane="guidance"${hidden('guidance')}><div class="writing-report-guidance-intro"><b>本次寫作指導記錄</b><span>保留學生在提交作文前完成的審題、選材、結構與表達思考，供老師對照作文報告查看。</span></div>${guidanceCardsMarkup(result)}</section><section class="writing-report-section-pane" data-report-section-pane="grading"${hidden('grading')}><div class="writing-report-workspace"><section class="writing-report-original"><div class="writing-report-toolbar"><div class="writing-report-segmented" role="tablist" aria-label="作文版本"><button type="button" role="tab" aria-selected="true" class="selected" data-report-view="image">▧ 圖片</button><button type="button" role="tab" aria-selected="false" data-report-view="text">▤ 文字</button></div><div class="writing-report-counts" data-report-counts>總字數 <b>${essayData.wordCount}</b> 字 <i>｜</i> 疑似錯別字 <strong>${essayData.typoCount}</strong> 字</div></div><div class="writing-report-pages" data-report-pages>${essayData.pages.map(reportPageMarkup).join('')}</div><article class="writing-report-text" hidden data-report-text>${essayData.paragraphs.map(p=>`<p>${reportText(p)}</p>`).join('')}</article><footer class="writing-report-legend"><span>ⓘ 點擊原文標記可查看批註</span><span><i class="legend-praise"></i>佳句賞析 <i class="legend-correction"></i>優化建議</span></footer></section><aside class="writing-report-review"><div class="writing-report-review-tabs" role="tablist" aria-label="作文批改報告內容"><button type="button" class="active" data-report-pane="score" role="tab" aria-selected="true">評分與評語</button><button type="button" data-report-pane="notes" role="tab" aria-selected="false">批改信息</button></div><section class="writing-report-score-pane" data-report-score-pane><div class="writing-report-total"><div><strong>${reportScoreTotal()}</strong><small>/100</small><b>中中（下）</b></div><span>作文總評</span></div><h3>總評</h3><p class="writing-report-overall">${reportText(overall)}</p><div class="writing-report-score-list">${scoreRows}</div><section class="writing-report-insights"><h3>整體優點</h3><ul>${scoreSource.strengths.map(item=>`<li>${reportText(item)}</li>`).join('')}</ul></section><section class="writing-report-insights"><h3>整體改善建議</h3><ol>${scoreSource.suggestions.map(item=>`<li>${reportText(item)}</li>`).join('')}</ol></section></section><section class="writing-report-notes-pane" data-report-notes-pane hidden><p class="writing-report-note-count">共 ${essayData.notes.length} 條批改 · 原文與評語雙向聯動</p>${essayData.notes.map(reportNoteMarkup).join('')}</section></aside></div></section><section class="writing-report-section-pane writing-report-post-view" data-report-section-pane="post"${hidden('post')}><div class="writing-report-post-intro"><b>寫後指導（待上線）</b><span>本功能尚未開放，後續将提供作文完成後的修改建議與範文參考。</span></div><div class="writing-report-post-grid"><article class="writing-report-post-card is-disabled"><b>寫後指導修改版</b><span>待上線</span></article><article class="writing-report-post-card is-disabled"><b>AI 范文</b><span>待上線</span></article></div></section></div>`;
}
function renderWritingReport(student,result,initialSection='guidance'){
 const panel=document.getElementById('studentWritingReport');
 if(!panel||!student||!result)return;
 panel.innerHTML=writingReportMarkup(student,result,initialSection);
 const reportWorkspace=panel.querySelector('[data-report-section-pane="grading"] .writing-report-workspace');
 const original=reportWorkspace?.querySelector('.writing-report-original');
 const review=reportWorkspace?.querySelector('.writing-report-review');
 original?.remove();
 reportWorkspace?.classList.add('writing-report-workspace-report-only');
 review?.classList.add('writing-report-review-full');
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

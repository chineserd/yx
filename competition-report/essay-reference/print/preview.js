// Use the current competition student's identity for the PDF filename.
const printParams=new URLSearchParams(location.search);
let reportDraft={};
try{reportDraft=JSON.parse(sessionStorage.getItem(printParams.get('draftKey'))||'{}')||{}}catch{}
const realEssayReport=String(reportDraft.report?.sourceRecordId)==='1559'?reportDraft.report:null;
if(realEssayReport){
 scoreSource.overall=reportDraft.feedback||realEssayReport.feedback;
 scoreSource.dimensions=(realEssayReport.rubric?.dimensions||[]).map(([label,max],index)=>({label,max,score:realEssayReport.raw?.[index],comment:reportDraft.displayDimensionComments?.[label]||realEssayReport.displayDimensionComments?.[label]||''}));
 scoreSource.strengths=reportDraft.advantages||realEssayReport.advantages||[];
 scoreSource.suggestions=reportDraft.suggestions||realEssayReport.suggestions||[];
}
const exportFilename=printParams.get('filename');
let printStudent=printParams.get('studentName')||essayData.student;
let printEssayTitle=printParams.get('essayTitle')||'未提供作文題目';
if(exportFilename)document.title=exportFilename;
const $=s=>document.querySelector(s);const defaults=essayData.notes.map(n=>[n.category,n.quote,n.comment,n.good]);const notes=structuredClone(defaults);const printTrigger=null;const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
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
 return essayData.pages.map((page,pageIndex)=>{const ids=pageIndex===0?[0,1,2,3,6]:[4,5,7];return `<article class="report-sheet" data-scan="${pageIndex+1}"><header class="sheet-heading"><div class="print-student-meta"><span>姓名：${esc(printStudent)}</span><span>題目：${esc(printEssayTitle)}</span></div><span>第 ${pageIndex+1} / ${essayData.pages.length} 頁</span></header><div class="annotated-layout"><div class="manuscript-column"><div class="sheet-manuscript"><img src="./assets/lin-junxi-${pageIndex+1}.jpg" alt="${esc(printStudent)}作文原稿第 ${pageIndex+1} 頁">${makePrintUnderlines(page)}${ids.map(i=>{const mark=page.marks.find(m=>m.anchor===`annotation-${i}`);if(!mark)return '';const top=mark.style.match(/top: ([\d.]+)%/)[1];return `<span class="sheet-anchor ${notes[i][3]?'praise':'correction'}" style="top:${top}%;left:${i===1?94:1}%">${printNumbers[i]}</span>`}).join('')}</div></div><aside class="marginal-column"><h3>— 旁批 —</h3>${ids.map(i=>`<p class="marginal-note ${notes[i][3]?'praise':'correction'}"><span>${printNumbers[i]}</span>${esc(simplifyPrintComment(notes[i],i))}${essayData.notes[i].unlocated?'<small>（暫無對應位置）</small>':''}</p>`).join('')}</aside></div></article>`}).join('');
}
// 旁批起排位置：起於原稿首行正文（作文標題行下方），避免旁批與作文標題同行。
// 比例依各頁原稿實際高度換算，第 1 頁標題行底部約在原稿高度 21.5% 處，故取 22.5%。
const MARGINAL_START_RATIO=0.225;
function syncMarginalStart(){
 const previews=[...document.querySelectorAll('#preview-pages .report-sheet')];
 const prints=[...document.querySelectorAll('#print-output .report-sheet')];
 previews.forEach((sheet,index)=>{
  const img=sheet.querySelector('.sheet-manuscript img');
  if(sheet.classList.contains('real-report-sheet'))return;
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
let focusedPageIndex=null;
let thumbnailScrollLeft=0;
const previewZoomLevels=[.8,1,1.2,1.4,1.6];
let previewZoomIndex=1;
function previewSheets(){return [...document.querySelectorAll('#preview-pages .report-sheet')]}
function updateFocusedPage(){
 const sheets=previewSheets();
 sheets.forEach((sheet,index)=>sheet.classList.toggle('is-current',index===focusedPageIndex));
 $('#preview-page-position').textContent=`第 ${focusedPageIndex+1} / ${sheets.length} 頁`;
 $('#previous-preview-page').disabled=focusedPageIndex===0;
 $('#next-preview-page').disabled=focusedPageIndex===sheets.length-1;
 updateZoomControls();
}
function updateZoomControls(){
 $('#zoom-preview-out').disabled=previewZoomIndex===0;
 $('#zoom-preview-in').disabled=previewZoomIndex===previewZoomLevels.length-1;
 $('#preview-zoom-percent').textContent=Math.round(previewZoomLevels[previewZoomIndex]*100)+'%';
}
function changePreviewZoom(direction){
 if(focusedPageIndex===null)return;
 const next=Math.max(0,Math.min(previewZoomLevels.length-1,previewZoomIndex+direction));
 if(next===previewZoomIndex)return;
 const box=$('.paper-preview-scroll');
 const oldRange=Math.max(1,box.scrollHeight-box.clientHeight);
 const scrollRatio=box.scrollTop/oldRange;
 previewZoomIndex=next;
 fitPaperPreview();
 box.scrollLeft=Math.max(0,(box.scrollWidth-box.clientWidth)/2);
 box.scrollTop=scrollRatio*Math.max(0,box.scrollHeight-box.clientHeight);
 updateZoomControls();
}
function showFocusedPage(index){
 const sheets=previewSheets();
 if(index<0||index>=sheets.length)return;
 const box=$('.paper-preview-scroll');
 if(focusedPageIndex===null){thumbnailScrollLeft=box.scrollLeft;previewZoomIndex=1}
 focusedPageIndex=index;
 $('#preview-pages').classList.add('is-focused');
 $('#preview-page-nav').hidden=false;
 updateFocusedPage();
 fitPaperPreview();
 box.scrollLeft=0;
 box.scrollTop=0;
 $('#back-to-thumbnails').focus();
}
function returnToThumbnails(){
 const index=focusedPageIndex;
 focusedPageIndex=null;
 $('#preview-pages').classList.remove('is-focused');
 previewSheets().forEach(sheet=>sheet.classList.remove('is-current'));
 $('#preview-page-nav').hidden=true;
 fitPaperPreview();
 $('.paper-preview-scroll').scrollLeft=thumbnailScrollLeft;
 $('.paper-preview-scroll').scrollTop=0;
 if(index!==null)previewSheets()[index]?.focus();
}
function openPaperPreview(){
 const markup=makePrintPage();
 $('#preview-pages').innerHTML=markup;
 $('#print-output').innerHTML=markup;
 const sheets=previewSheets();
 $('#paper-preview-scope').textContent=printTrigger?.id==='print-all'?'A4 · 210 × 297 mm · 全部可打印報告 · 1份':`A4 · 210 × 297 mm · ${printStudent} · 1份作文報告 · 共${sheets.length}頁`;
 sheets.forEach((sheet,index)=>{
  sheet.dataset.previewIndex=index;
  sheet.tabIndex=0;
  sheet.setAttribute('role','button');
  sheet.setAttribute('aria-label',`放大預覽第 ${index+1} / ${sheets.length} 頁`);
 });
 $('#paper-preview').showModal();
 fitPaperPreview();
 syncMarginalStart();
}
$('#preview-pages').addEventListener('click',event=>{
 if(focusedPageIndex!==null)return;
 const sheet=event.target.closest('.report-sheet');
 if(sheet&&$('#preview-pages').contains(sheet))showFocusedPage(Number(sheet.dataset.previewIndex));
});
$('#preview-pages').addEventListener('keydown',event=>{
 if(focusedPageIndex!==null||!['Enter',' '].includes(event.key))return;
 const sheet=event.target.closest('.report-sheet');
 if(sheet){event.preventDefault();showFocusedPage(Number(sheet.dataset.previewIndex))}
});
$('#back-to-thumbnails').onclick=returnToThumbnails;
$('#zoom-preview-out').onclick=()=>changePreviewZoom(-1);
$('#zoom-preview-in').onclick=()=>changePreviewZoom(1);
$('#previous-preview-page').onclick=()=>showFocusedPage(focusedPageIndex-1);
$('#next-preview-page').onclick=()=>showFocusedPage(focusedPageIndex+1);
$('#exit-paper-preview').onclick=()=>$('#paper-preview').close();
$('#print-paper').onclick=()=>window.print();
$('#paper-preview').addEventListener('close',()=>parent.postMessage({type:'close-essay-print'},location.origin));
// Thumbnail pages share one horizontal row; focus enlarges a single page while print-output is untouched.
function fitPaperPreview(){
 const box=$('.paper-preview-scroll');
 const stage=$('#preview-stage');
 const pages=$('#preview-pages');
 if(!box||!stage||!pages||!pages.children.length)return;
 const count=pages.children.length;
 const boxStyle=getComputedStyle(box);
 const availableWidth=box.clientWidth-parseFloat(boxStyle.paddingLeft)-parseFloat(boxStyle.paddingRight);
 const availableHeight=box.clientHeight-parseFloat(boxStyle.paddingTop)-parseFloat(boxStyle.paddingBottom);
 const gap=24;
 let naturalWidth,scale;
 if(focusedPageIndex===null){
  const visibleCount=Math.min(count,box.clientWidth>=1100?3:box.clientWidth>=760?2:1);
  naturalWidth=794*count+gap*(count-1);
  const visibleWidth=794*visibleCount+gap*(visibleCount-1);
  scale=Math.min(.72,availableWidth/visibleWidth,availableHeight/1123);
 }else{
  naturalWidth=794;
  scale=Math.min(.72,availableWidth/794,availableHeight*1.5/1123)*previewZoomLevels[previewZoomIndex];
 }
 scale=Math.max(.1,scale);
 pages.style.width=naturalWidth+'px';
 pages.style.height='1123px';
 pages.style.transform='scale('+scale+')';
 stage.style.width=(naturalWidth*scale)+'px';
 stage.style.height=(1123*scale)+'px';
}
new ResizeObserver(fitPaperPreview).observe($('.paper-preview-scroll'));


function makeScorePrintPage(){
 const pageCount=(realEssayReport?.images?.length||essayData.pages.length)+1;
 return `<article class="report-sheet score-report-sheet" aria-label="作文評語"><header class="score-print-heading"><h1>作文評語</h1><p><span>姓名：${esc(printStudent)}</span><span>題目：${esc(printEssayTitle)}</span></p></header><section class="score-print-overall"><h2>總評</h2><p>${esc(scoreSource.overall)}</p></section><section class="score-print-dimensions"><h2>各維度評語</h2>${scoreSource.dimensions.map(d=>`<section class="score-print-dimension"><h3><span>${esc(d.label)}</span></h3><p>${esc(d.comment)}</p></section>`).join('')}</section><section class="score-print-insights"><h2>整體優點</h2><ul>${scoreSource.strengths.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section><section class="score-print-insights"><h2>整體改善建議</h2><ol>${scoreSource.suggestions.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><footer class="score-print-footer">第 ${pageCount} / ${pageCount} 頁</footer></article>`;
}
const makeManuscriptPrintPages=makePrintPage;
makePrintPage=function(){return makeManuscriptPrintPages().replaceAll('/ 2 頁','/ 3 頁')+makeScorePrintPage()};
if(realEssayReport){
 makePrintPage=function(){
  const pages=realEssayReport.images||[];
  const notes=reportDraft.annotations||realEssayReport.annotations||[];
  const notesById=new Map(notes.map((note,index)=>[note.id,{...note,number:index+1}]));
  return pages.map((page,pageIndex)=>{
   const locatedIds=[...new Set(page.marks.map(mark=>mark.noteId))];
   const pageNotes=locatedIds.map(id=>notesById.get(id)).filter(Boolean);
   if(pageIndex===pages.length-1)pageNotes.push(...notes.filter(note=>!pages.some(image=>image.marks.some(mark=>mark.noteId===note.id))).map(note=>notesById.get(note.id)));
   const anchors=locatedIds.map(id=>{
    const mark=page.marks.find(item=>item.noteId===id),note=notesById.get(id);
    return note?`<span class="sheet-anchor ${note.kind==='佳句賞析'?'praise':'correction'}" style="left:${Math.min(94,mark.left)}%;top:${Math.max(1,mark.top-1)}%">${printNumbers[note.number-1]||note.number}</span>`:'';
   }).join('');
   const lines=page.marks.map(mark=>`<span class="print-quote-line ${notesById.get(mark.noteId)?.kind==='佳句賞析'?'praise':'correction'}" style="left:${mark.left}%;top:${mark.top+mark.height}%;width:${mark.width}%"></span>`).join('');
   return `<article class="report-sheet real-report-sheet" data-scan="${pageIndex+1}"><header class="sheet-heading"><div class="print-student-meta"><span>姓名：${esc(printStudent)}</span><span>題目：${esc(printEssayTitle)}</span></div><span>第 ${pageIndex+1} / ${pages.length+1} 頁</span></header><div class="annotated-layout"><div class="manuscript-column"><div class="sheet-manuscript" style="aspect-ratio:${page.naturalWidth}/${page.naturalHeight}"><img src="../../${esc(page.url)}" alt="${esc(printStudent)}作文原稿第 ${pageIndex+1} 頁">${lines}${anchors}</div></div><aside class="marginal-column"><h3>— 旁批 —</h3>${pageNotes.map(note=>`<p class="marginal-note ${note.kind==='佳句賞析'?'praise':'correction'}"><span>${printNumbers[note.number-1]||note.number}</span>${esc(note.printText||note.text)}${locatedIds.includes(note.id)?'':'<small>（未定位）</small>'}</p>`).join('')}</aside></div></article>`;
  }).join('')+makeScorePrintPage();
 };
}

function makePrintUnderlines(page){
 return page.marks.filter(mark=>mark.anchor).map(mark=>{
  const i=Number(mark.anchor.split('-')[1]);
  const position=Object.fromEntries([...mark.style.matchAll(/(left|top|width|height):\s*([\d.]+)%/g)].map(m=>[m[1],Number(m[2])]));
  if(!Object.values(position).every(Number.isFinite)||Object.keys(position).length!==4)return '';
  const praise=notes[i][3];
  return `<span class="print-quote-line ${praise?'praise':'correction'}" data-print-note="${i+1}" aria-hidden="true" style="left:${position.left}%;top:${position.top+position.height-0.35}%;width:${position.width}%"></span>`;
 }).join('');
}

// Batch preview uses the same referenced prototype content as individual reports.
let batchStudents=[]
try{const value=JSON.parse(printParams.get('students')||'[]');if(Array.isArray(value))batchStudents=value.filter(s=>s&&typeof s.name==='string')}catch{}
if(batchStudents.length){const makeSingleReport=makePrintPage;makePrintPage=function(){return batchStudents.map(student=>{printStudent=student.name;printEssayTitle=student.title||'未提供作文題目';return makeSingleReport()}).join('')}}
openPaperPreview();
if(batchStudents.length)$('#paper-preview-scope').textContent=`A4 · 210 × 297 mm · ${batchStudents.length} 份學生作文報告 · 共 ${batchStudents.length*3} 頁`;


$('#download-pdf').onclick=()=>{const button=$('#download-pdf');if(button.disabled)return;button.disabled=true;$('#pdf-status').textContent='正在準備 PDF…';parent.postMessage({type:'download-essay-pdf'},location.origin)};
window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='essay-pdf-status')return;$('#pdf-status').textContent=event.data.text;$('#download-pdf').disabled=!!event.data.busy;$('#print-paper').disabled=!!event.data.busy;$('#exit-paper-preview').disabled=!!event.data.busy;if(printParams.get('autoDownload')==='1'&&!event.data.busy)parent.postMessage({type:'essay-pdf-complete',success:event.data.text==='PDF 已下載'},location.origin)});

let speechCurrentPage='speech-guided';
const attemptsKey='shortSpeechAttemptsV1',pendingKey='shortSpeechPendingAttemptV1',progressKey='shortSpeechProgressV1';
const resumablePages=new Set(['speech-guided','speech-ready','speech-countdown','speech-recording']);
function cachedPage(){const page=localStorage.getItem(progressKey);return resumablePages.has(page)?page:'speech-guided';}
function savePage(page){if(resumablePages.has(page))localStorage.setItem(progressKey,page);}
const sampleScores=[
  {score:65,metrics:[18,12,8,10]},
  {score:71,metrics:[21,17,16,17],overall:'短講能清楚說明感謝媽媽的原因，事例具體，結構完整；語調還可更有變化。',feedback:[['內容','能結合早餐、照顧與鼓勵的事例說明感謝的原因。'],['結構條理','從感謝對象、具體事例到今後行動，層次清楚。'],['語言運用','句子連貫，普通話表達較清楚，可繼續練習自然停頓。'],['表達情感','感謝之情真誠，重點句可適當加強語氣。']]},
  {score:62,metrics:[18,15,14,15],overall:'短講能表達對媽媽的感謝，內容完整；部分句子略有重複，可讓敘述更精煉。',feedback:[['內容','說明了感謝媽媽的原因，若選一件事深入描述會更生動。'],['結構條理','開頭、事例和結尾基本完整，可加強段落之間的銜接。'],['語言運用','普通話表達基本清楚，可減少重複詞句。'],['表達情感','情感真誠，可在關鍵句增加語調變化。']]}
];
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function readAttempts(){try{
  const rows=JSON.parse(localStorage.getItem(attemptsKey)||'[]');
  if(!Array.isArray(rows))return [];
  return rows.filter(row=>Number.isFinite(row.score)&&Array.isArray(row.metrics)).map(row=>{
    const sample=sampleScores.find(item=>item.score===row.score);
    if(row.score===65&&row.submittedAt===new Date('2026-11-29T23:05:46').getTime())row.submittedAt=new Date('2026-11-23T23:05:46').getTime();
    return {...row,overall:row.overall||sample?.overall||speechData.overall,feedback:row.feedback||sample?.feedback||speechData.feedback};
  });
}catch{return [];}}
function writeAttempts(rows){localStorage.setItem(attemptsKey,JSON.stringify(rows));}
function makeAttempt(index,submittedAt=Date.now()){
  const sample=sampleScores[Math.min(index,sampleScores.length-1)];
  return {id:String(submittedAt),submittedAt,score:sample.score,metrics:sample.metrics,title:speechData.title,draft:speechData.draft,overall:sample.overall||speechData.overall,feedback:sample.feedback||speechData.feedback};
}
function ensureInitialAttempt(){const rows=readAttempts();if(rows.length)return rows;const initial=[makeAttempt(0,new Date('2026-11-23T23:05:46').getTime())];writeAttempts(initial);return initial;}
function finishPendingAttempt(){
  const raw=localStorage.getItem(pendingKey);if(!raw)return;
  let pending;try{pending=JSON.parse(raw);}catch{localStorage.removeItem(pendingKey);return;}
  const rows=readAttempts();if(!rows.some(row=>row.id===pending.id)){rows.push(pending);writeAttempts(rows);}
  localStorage.removeItem(pendingKey);
}
function bestAttempt(rows){return [...rows].sort((a,b)=>b.score-a.score||b.submittedAt-a.submittedAt)[0];}
export const speechData={
  title:'我想感謝的人',
  prompt:'試分享你會怎樣感謝身邊的人，例如家人、老師、校工等？請加以說明。',
  draft:'我想感謝我的媽媽。每天早上，她總會比我早起，為我準備早餐；放學後，她也會問我今天過得怎麼樣。有一次我生病了，媽媽整夜照顧我，還擔心我沒有精神上課。那時我明白，她做的每一件小事，都是對我的愛。平時我遇到難題想放棄，她會陪我一起想辦法，鼓勵我再試一次。我想對媽媽說一聲謝謝，也想從今天開始主動幫她分擔家務，用行動表達我的感謝。',
  score:65,
  metrics:[['內容',18],['結構條理',12],['語言運用',8],['表達情感',10]],
  overall:'短講能表達對母親的感謝，並分享生活中的照顧與鼓勵；內容和表達方式仍有提升空間。',
  feedback:[['內容','能說出感謝媽媽的原因，並提到早餐、生病時的照顧和學習時的鼓勵；可把一件事描述得更具體。'],['結構條理','按照感謝對象、生活事例、個人感受和今後行動展開，順序清楚，過渡可以更自然。'],['語言運用','普通話表達基本清楚，可減少重複用詞，讓句子更精煉。'],['表達情感','感謝之情真誠，談到媽媽照顧自己時可增加語調變化。']]
};
export function speechStatus(){
  let state=localStorage.getItem('shortSpeechStatus');
  if(!state)state=localStorage.getItem('shortSpeechCompleted')==='1'?'done':'pending';
  if(state==='generating'){state='done';localStorage.setItem('shortSpeechStatus','done');localStorage.setItem('shortSpeechCompleted','1');}
  if(state==='done'){finishPendingAttempt();ensureInitialAttempt();}
  return state==='done'?'done':'pending';
}
function speechHeader(back=true,right=''){return '<header class="speech-head">'+(back?'<button data-action="speech-back" aria-label="返回">‹</button>':'')+'<h2>個人短講</h2>'+(right||'')+'</header>';}
function speechFrame(body,footer='',extra=''){return speechHeader()+ '<div class="speech-body '+extra+'">'+body+'</div>'+(footer?'<div class="speech-footer">'+footer+'</div>':'');}
function speechButton(label,action,extra=''){return '<button class="speech-primary '+extra+'" data-action="'+action+'">'+label+'</button>';}
// The four supplied screens are displayed as original raster screenshots. Only invisible
// button hit areas are layered over them to make the prototype navigable.
function speechScreenshotPage(file,nextAction,nextLabel,wide){return '<div class="speech-image-screen"><img src="assets/'+file+'.PNG" alt="個人短講：'+nextLabel+'"><button class="speech-image-back" data-action="speech-back" aria-label="返回"></button><button class="speech-image-next '+(wide?'wide':'compact')+'" data-action="'+nextAction+'" aria-label="'+nextLabel+'"></button></div>';}
function speechGuidedPage(){return speechScreenshotPage('IMG_6868','speech-audio-next','播放完成，下一頁',true);}
function speechReadyPage(){return speechScreenshotPage('IMG_6869','speech-ready-next','開始演講',true);}
function speechCountdownPage(){return speechScreenshotPage('IMG_6870','speech-countdown-start','開始演講',false);}
function speechRecordingPage(){return speechScreenshotPage('IMG_6871','speech-finish','結束錄音',false);}
function speechFinishedPage(){return speechRecordingPage()+'<div class="speech-finish-overlay"><div class="speech-finish-modal"><img src="assets/report-target.png" alt="完成演講插圖"><h3>恭喜你完成本次演講</h3><div class="speech-complete-status">已完成</div><p>可從課表的個人短講入口查看報告。</p>'+speechButton('我知道了','speech-return-lesson')+'</div></div>';}
function speechReportPage(){
  const attempt=bestAttempt(ensureInitialAttempt()),d=speechData;
  const m=d.metrics.map(([name],index)=>[name,attempt.metrics[index]]);
  const radius=value=>Math.max(0,Math.min(25,value))/25*56;
  const polygon=[[90,90-radius(m[0][1])],[90+radius(m[1][1]),90],[90,90+radius(m[2][1])],[90-radius(m[3][1]),90]].map(pair=>pair.join(',')).join(' ');
  return speechHeader(true)+'<div class="speech-body speech-result-body"><div class="speech-result-summary"><strong>'+attempt.score+'</strong><h3>'+escapeHtml(attempt.title)+'</h3><img src="assets/report-target.png" alt="命中目標的圖案"></div><section class="speech-result-card"><h3>評分</h3><div class="speech-radar"><svg viewBox="0 0 180 180" aria-label="四項評分雷達圖"><circle cx="90" cy="90" r="78" fill="#dceeff" stroke="#a5d9ff" stroke-width="2"/><path d="M90 20V160M20 90H160M90 51 129 90 90 129 51 90Z" fill="none" stroke="#b8d3f7"/><polygon points="'+polygon+'" fill="#9cc8ff66" stroke="#079ff5" stroke-width="2"/></svg><span class="top">'+m[0][0]+'<small>評分 <b>'+m[0][1]+'</b></small></span><span class="right">'+m[1][0]+'<small>評分 <b>'+m[1][1]+'</b></small></span><span class="bottom">'+m[2][0]+'<small>評分 <b>'+m[2][1]+'</b></small></span><span class="left">'+m[3][0]+'<small>評分 <b>'+m[3][1]+'</b></small></span></div></section><section class="speech-result-card"><h3>總體評價</h3><p>'+escapeHtml(attempt.overall||d.overall)+'</p></section>'+(attempt.feedback||d.feedback).map(([name,text])=>'<section class="speech-result-card"><h3>'+name+'</h3><p>'+text+'</p></section>').join('')+'<section class="speech-result-card"><h3>建議</h3><p>可補充一件與媽媽相處的具體事例，並用更有感情的語調表達謝意。</p></section><section class="speech-result-card"><h3>錄音原文</h3><p>'+escapeHtml(attempt.draft)+'</p></section></div><div class="speech-footer speech-report-footer">'+speechButton('再次練習','speech-retry')+'</div>';
}
function speechPage(name){return ({'speech-guided':speechGuidedPage,'speech-ready':speechReadyPage,'speech-countdown':speechCountdownPage,'speech-recording':speechRecordingPage,'speech-finished':speechFinishedPage,'speech-report':speechReportPage}[name]||speechGuidedPage)();}
function speechAction(action,button){
  if(action==='speech-open'){speechCurrentPage=speechStatus()==='done'?'speech-report':cachedPage();return true;}
  if(action==='speech-retry'){speechCurrentPage=cachedPage();savePage(speechCurrentPage);return true;}
  if(action==='speech-audio-next'){speechCurrentPage='speech-ready';savePage(speechCurrentPage);return true;}
  if(action==='speech-ready-next'){speechCurrentPage='speech-countdown';savePage(speechCurrentPage);return true;}
  if(action==='speech-countdown-start'){speechCurrentPage='speech-recording';savePage(speechCurrentPage);return true;}
  if(action==='speech-finish'){
    const submittedAt=Date.now(),attempt=makeAttempt(readAttempts().length,submittedAt);
    localStorage.setItem(pendingKey,JSON.stringify(attempt));localStorage.removeItem(progressKey);
    localStorage.setItem('shortSpeechStatus','done');localStorage.setItem('shortSpeechCompleted','1');finishPendingAttempt();speechCurrentPage='speech-finished';return true;
  }
  if(action==='speech-return-lesson'){speechCurrentPage='lesson';return true;}
  if(action==='speech-back'){const previous={'speech-guided':'lesson','speech-ready':'speech-guided','speech-countdown':'speech-ready','speech-recording':'speech-countdown','speech-finished':'lesson','speech-report':'lesson'};speechCurrentPage=previous[speechCurrentPage]||'lesson';return true;}
  return false;
}
export {speechPage,speechAction};
export function currentSpeechPage(){return speechCurrentPage;}
export function setSpeechPreviewPage(name){
  if(!['speech-guided','speech-ready','speech-countdown','speech-recording','speech-finished','speech-report'].includes(name))return false;
  speechCurrentPage=name;
  return true;
}

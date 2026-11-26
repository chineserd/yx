import {speechPage,speechAction,currentSpeechPage,speechStatus,setSpeechPreviewPage} from "./speech-flow.js";
const app = document.querySelector('#app');
const appPanel = document.querySelector('#app-panel');
const phoneStage = appPanel.querySelector('.phone-stage');
const phoneSurface = appPanel.querySelector('.phone-surface');
function fitPhonePreview(){
  if(window.innerWidth<=700 || appPanel.hidden){phoneStage.style.width='';phoneStage.style.height='';phoneSurface.style.transform='';return;}
  const availableHeight=appPanel.clientHeight-36;
  const sideSpace=window.innerWidth<=850?220:0;
  const availableWidth=appPanel.clientWidth-sideSpace-36;
  const scale=Math.min(1,availableHeight/828,availableWidth/391);
  phoneStage.style.width=`${391*scale}px`;
  phoneStage.style.height=`${828*scale}px`;
  phoneSurface.style.transform=`scale(${scale})`;
}
new ResizeObserver(fitPhonePreview).observe(appPanel);
window.addEventListener('resize',fitPhonePreview);
const course = {date:'2026-11-29',title:'第18課 詞語疑難點訓練02',time:'23:00–00:00'};
let page='calendar', year=2026, month=10, selectedDay=23;
function svg(body,extra=''){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" '+extra+'>'+body+'</svg>';}
const icons={
  home:svg('<path class="home-shape" d="M3.5 10.1 10.7 4.6a2.1 2.1 0 0 1 2.6 0l7.2 5.5v9.1a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8z"/><path class="home-door" d="M8.6 17.1h6.8"/>'),
  test:svg('<path d="M5.2 4.5h13.6a2.2 2.2 0 0 1 2.2 2.2v10.8a2.2 2.2 0 0 1-2.2 2.2H9.4l-3.2 1.7v-1.8a2.2 2.2 0 0 1-3.2-2.1V6.7a2.2 2.2 0 0 1 2.2-2.2z"/><path d="M6.6 9h5M6.6 12h3.4M6.6 15h2.1M12.2 16l3.1-7 3.1 7M13.2 13.8h4.2"/>'),
  calendar:svg('<rect x="3.2" y="5.5" width="17.6" height="15" rx="2.2"/><path d="M7 3.3v4.2M17 3.3v4.2M7.5 11.2h9M7.5 14.5h6.5"/>'),
  me:svg('<path d="M5.2 8.3 4 3.8l3.5 2.4M18.8 8.3 20 3.8l-3.5 2.4"/><path d="M5.6 5.7c-1.1-1.3-2.3-1.2-2.3.5 0 1 .8 1.9 2 2.2M18.4 5.7c1.1-1.3 2.3-1.2 2.3.5 0 1-.8 1.9-2 2.2"/><path d="M5 11a7 7 0 0 1 14 0v3.5a7 7 0 0 1-14 0z"/><path d="M9 12.3h.01M15 12.3h.01M10 16.1c1.3 1.2 2.7 1.2 4 0"/>'),
  homework:svg('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8 8h8M8 11h8M8 14h5"/>'),
  report:svg('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8 15l3-3 2 1.5 3-4M8 17.5h8"/>'),
  pencil:svg('<path d="M5 18.5 16.5 7a2 2 0 0 1 3 3L8 21H5z"/><path d="m14.5 9 3 3M5 21h14"/>'),
  class:svg('<rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16M8 13h8M8 16h5"/>'),
  headset:svg('<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h2.5v5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 1-2zM20 13h-2.5v5H19a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-2zM19 18c-.3 2-2 3-5 3h-2"/>'),
  paper:svg('<path d="M6 3.5h9l3 3v14H6z"/><path d="M15 3.5v3h3M9 10h6M9 13h5M9 16h4"/><path d="m15 17 3-3 1.5 1.5-3 3-2 .5z"/>')
};
const deer='<svg class="deer-art" viewBox="0 0 190 175" aria-hidden="true"><path d="M47 56 34 23l17 8 11-22 12 35M143 56l13-33-17 8-11-22-12 35" fill="#b5602a"/><path d="M41 61Q17 40 14 69q-2 23 29 20M149 61q24-21 27 8 2 23-29 20" fill="#eea962"/><rect x="37" y="37" width="116" height="104" rx="49" fill="#ffbd6c"/><ellipse cx="54" cy="100" rx="19" ry="12" fill="#fb8061"/><ellipse cx="137" cy="100" rx="19" ry="12" fill="#fb8061"/><path d="M65 79q8-6 16 0M110 79q8-6 16 0" stroke="#553228" stroke-width="5" fill="none" stroke-linecap="round"/><path d="m73 97 10 4-10 4M117 97l-10 4 10 4" stroke="#553228" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="95" cy="101" rx="8" ry="5" fill="#633327"/><path d="M72 114q23 28 46 0z" fill="#9d3138"/><path d="M82 123q13 7 26 0" stroke="#ff9ca5" stroke-width="5" fill="none"/><path d="M34 138q12-25 45-20l17 16 17-16q34-5 47 20v30H34z" fill="#2698cf"/><path d="M67 131v31M123 131v31" stroke="#e1f8ff" stroke-width="9"/><path d="M47 148 22 136v31l26 8M143 148l25-12v31l-26 8" fill="#e8edff" stroke="#9c9be0" stroke-width="2"/></svg>';
const robot='<svg class="robot-art" viewBox="0 0 160 150" aria-hidden="true"><ellipse cx="83" cy="131" rx="57" ry="13" fill="#3716ad" opacity=".25"/><rect x="40" y="31" width="89" height="89" rx="39" fill="#40a6fb" stroke="#83d9ff" stroke-width="6"/><path d="M39 62Q31 66 30 81v25M130 62q11 4 11 20v25" stroke="#d5e8ff" stroke-width="11" fill="none" stroke-linecap="round"/><rect x="22" y="76" width="18" height="36" rx="8" fill="#eef8ff"/><rect x="130" y="76" width="18" height="36" rx="8" fill="#eef8ff"/><ellipse cx="65" cy="72" rx="7" ry="11" fill="#eaf9ff"/><ellipse cx="105" cy="72" rx="7" ry="11" fill="#eaf9ff"/><path d="M65 96q20 15 40 0" stroke="#eaf9ff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M48 114 24 129l20 8 23-10M120 114l24 15-20 8-23-10" fill="#77ceff"/></svg>';
function bottom(active){return '<nav class="bottom-nav" aria-label="主要導航">'+[['home','首页'],['test','测试'],['calendar','课表'],['me','我的']].map(([id,label])=>'<button '+(id==='home'||id==='calendar'?'data-action="'+id+'"':'disabled')+' class="'+(active===id?'active':'')+'"><span class="nav-icon">'+icons[id]+'</span><span class="nav-label">'+label+'</span></button>').join('')+'</nav>';}
function home(){return '<header class="app-head home-head"><h2>阿豪</h2><span class="service-icon">'+icons.headset+'</span></header><div class="app-body home-body"><div class="hero-banner"><small>让你的作文更加优秀</small><strong>AI 作文批改</strong><span class="hero-cta">立即体验 ›</span>'+deer+'</div><div class="quick-grid">'+[['homework','作业'],['report','学习报告'],['pencil','在线习题'],['class','我的班级']].map(([id,label])=>'<div><span class="quick-icon '+id+'">'+icons[id]+'</span><span>'+label+'</span></div>').join('')+'</div><div class="section-title"><span>AI测试中心</span><small>查看更多 ›</small></div><div class="feature-grid"><div class="feature-card"><strong>A.I口语练习</strong><small>帮你提升口语对话能力</small>'+robot+'<span class="card-go">GO ›</span></div><div class="feature-card"><strong>HSKK</strong><small>HSKK练习与测试<br>（模拟）</small></div><div class="feature-card"><strong>普通话水平测试</strong><small>专业评级，了解发音问题</small></div></div><div class="section-title"><span>推荐课程</span><small>查看更多 ›</small></div><div class="course-banner"><strong>少儿普通话朗诵课程</strong><small>少儿普通话朗诵课程是针对想要普通话朗诵考级的学生</small>'+deer+'</div></div>'+bottom('home');}
function calendar(){
  const start=(new Date(year,month,1).getDay()+6)%7,days=new Date(year,month+1,0).getDate();
  const cells=Array(start).fill('<span></span>');
  for(let d=1;d<=days;d++){
    const today=year===2026&&month===10&&d===23;
    cells.push('<button data-action="day" data-day="'+d+'" class="'+(d===selectedDay?'selected ':'')+(today?'today':'')+'" aria-label="'+year+'年'+(month+1)+'月'+d+'日" aria-pressed="'+(d===selectedDay)+'">'+(today?'今':d)+'</button>');
  }
  return '<header class="app-head center-head"><h2>課表</h2></header><div class="app-body calendar-body"><div class="month-head"><strong>'+year+'/'+String(month+1).padStart(2,'0')+'⌄</strong><span>請假</span></div><div class="calendar-sheet"><div class="weekdays">'+['一','二','三','四','五','六','日'].map(x=>'<span>'+x+'</span>').join('')+'</div><div class="calendar">'+cells.join('')+'</div></div><section class="schedule-list"><button class="schedule-card" data-action="lesson"><span><span class="label">未開始</span><strong>第18講： '+course.title+'</strong><small>◷ '+course.time+'</small></span><span class="schedule-next">›</span></button></section></div>'+bottom('calendar');
}
function lesson(){
  const speechState=speechStatus();
  return '<div class="lesson-hero"><div class="lesson-top"><button data-action="back" aria-label="返回">‹</button><span>第18講</span></div><h1>'+course.title+'</h1></div><div class="app-body lesson-content"><section class="lesson-section"><h2><span class="section-ring"></span>直播課</h2><div class="live-details"><span class="course-status">未開始</span><strong>◷ '+course.time+'</strong><small>'+course.date+'</small></div></section><section class="lesson-section practice-section"><h2><span class="section-ring"></span>個人短講</h2><div class="exercise-list"><button class="exercise-item speech-only" type="button" data-action="speech-open"><span class="exercise-icon">'+icons.paper+'</span><span class="exercise-name">我想感謝的人</span><span class="exercise-status '+speechState+'">'+(speechState==='done'?'已完成':'未完成')+'</span><span class="chevron">›</span></button></div></section></div>'+bottom('calendar');
}
function syncStateNav(){
  const status=speechStatus();
  document.querySelectorAll('[data-speech-state]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.speechState===status)));
  document.querySelectorAll('[data-speech-page]').forEach(button=>{
    if(button.dataset.speechStatus===status&&button.dataset.speechPage===page)button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
}
function render(){app.className='app '+(page==='lesson'?'lesson-page':page.startsWith('speech-')?'speech-page':'');app.innerHTML=({home,calendar,lesson}[page]||(()=>speechPage(page)))();syncStateNav();document.querySelector('#app-panel').scrollTop=0;}
document.addEventListener('app-preview-enter',()=>{page='calendar';render();fitPhonePreview();});
document.querySelector('.app-state-toggle').addEventListener('click',event=>{
  const button=event.currentTarget,nav=document.querySelector('.app-state-nav'),expanded=nav.hidden;
  nav.hidden=!expanded;
  button.setAttribute('aria-expanded',String(expanded));
  button.textContent=expanded?'‹ 收起':'› 展开';
});
document.querySelector('.app-state-nav').addEventListener('click',event=>{
  const button=event.target.closest('[data-speech-page],[data-speech-state]');
  if(!button)return;
  const status=button.dataset.speechStatus||button.dataset.speechState;
  localStorage.setItem('shortSpeechStatus',status);
  localStorage.setItem('shortSpeechCompleted',status==='done'?'1':'0');
  const targetPage=button.dataset.speechPage||'lesson';
  if(targetPage.startsWith('speech-'))setSpeechPreviewPage(targetPage);
  page=targetPage;
  render();
});
app.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;if(speechAction(action,button)){page=currentSpeechPage();render();return;}if(action==='back')page='calendar';else if(action==='home'||action==='calendar'||action==='lesson')page=action;else if(action==='day')selectedDay=Number(button.dataset.day);else if(action==='month'){const d=new Date(year,month+Number(button.dataset.step),1);year=d.getFullYear();month=d.getMonth();selectedDay=1;}render();});
render();


const app = document.querySelector('#app');
const overlay = document.querySelector('#overlayRoot');
const phone = document.querySelector('#phone');
const phoneViewport = document.querySelector('#phoneViewport');
const studentStage = document.querySelector('#studentStage');
const previewBody = document.querySelector('#previewBody');
const prdView = document.querySelector('#prdView');
const flowSidebar = document.querySelector('#flowSidebar');
const mobilePageTabs = document.querySelector('#mobilePageTabs');
const state = {page:'calendar',calendarDay:23,lang:localStorage.getItem('mandarin-lang')||'tc',oral:0,sentence:0,scene:0,recording:false,recordedUrl:'',recordError:'',discardRecording:false,showPinyin:true,showHan:true,showTranslation:false,favorite:false,toastTimer:null,stream:null,recorder:null,chunks:[],seconds:0,timer:null};
const UI = {'首頁':'首页','學生端 App':'学生端 App','AI 口語練習':'AI 口语练习','HSKK 練習與測試':'HSKK 练习与测试','專業評級，了解發音問題':'专业评级，了解发音问题','幫你提升口語對話能力':'帮你提升口语对话能力','句子練習':'句子练习','場景對話':'场景对话','普通話水平測試':'普通话水平测试','推薦課程':'推荐课程','查看更多':'查看更多','少兒普通話朗誦課程':'少儿普通话朗诵课程','正音訓練・朗誦技巧':'正音训练・朗诵技巧','作業':'作业','學習報告':'学习报告','在線習題':'在线习题','我的班級':'我的班级','測試':'测试','課表':'课表','我的':'我的','讓你的作文更加優秀':'让你的作文更加优秀','AI 作文批改':'AI 作文批改','立即體驗':'立即体验','選擇語言':'选择语言','簡體':'简体','繁體':'繁体','你在哪兒工作':'你在哪儿工作','你明天要做什麼':'你明天要做什么','有什麼？':'有什么？','詢問在哪兒工作':'询问在哪儿工作','詢問明天的安排':'询问明天的安排','在家詢問東西在哪兒、哪裡有什麼。':'在家询问东西在哪儿、哪里有什么。','我能坐這兒嗎？':'我能坐这儿吗？','現在幾點？':'现在几点？','請坐，請喝茶。':'请坐，请喝茶。','我能喝這杯茶嗎？':'我能喝这杯茶吗？','你能說漢語嗎？':'你能说汉语吗？','椅子下面沒有小貓。':'椅子下面没有小猫。','我的書包裡有三本漢語書和一本英語詞典。':'我的书包里有三本汉语书和一本英语词典。','王明前面有兩個女生。':'王明前面有两个女生。','現在下午兩點零五分。':'现在下午两点零五分。','現在上午九點半。':'现在上午九点半。','星期五上午十點半我去看電影。':'星期五上午十点半我去看电影。','句子跟讀':'句子跟读','今日剩餘次數：3':'今日剩余次数：3','點擊開始錄音':'点击开始录音','正在錄音':'正在录音','點擊結束錄音':'点击结束录音','錄音完成':'录音完成','播放錄音':'播放录音','重新錄音':'重新录音','下一句':'下一句','下一輪':'下一轮','示範發音':'示范发音','顯示翻譯':'显示翻译','隱藏翻譯':'隐藏翻译','顯示拼音':'显示拼音','隱藏拼音':'隐藏拼音','顯示漢字':'显示汉字','隱藏漢字':'隐藏汉字','收藏':'收藏','取消收藏':'取消收藏','麥克風無法使用。請允許權限後重試。':'麦克风无法使用。请允许权限后重试。','此瀏覽器不支援錄音。':'此浏览器不支持录音。','錄音太短，請重新錄製。':'录音太短，请重新录制。','目前尚無錄音':'目前尚无录音','請選擇練習主題':'请选择练习主题','開始練習':'开始练习','語言':'语言','練習記錄':'练习记录','我的課程':'我的课程','我的訂單':'我的订单','學員管理':'学员管理','可用語言':'可用语言','目前提供簡體及繁體頁面':'目前提供简体及繁体页面','我在學校工作。':'我在学校工作。','我明天去上班。':'我明天去上班。','你在哪兒工作？':'你在哪儿工作？','這裡有什麼？':'这里有什么？','錄音完成後可播放，或完成練習。':'录音完成后可播放，或完成练习。','完成練習':'完成练习','返回':'返回','關閉':'关闭','陳梓軒':'陈梓轩','軒':'轩','需求':'需求'};
const ENTRY_UI = {'課表':'课表','第18講':'第18讲','第18課 詞語疑難點訓練02':'第18课 词语疑难点训练02','《詞語疑難點訓練02》':'《词语疑难点训练02》','《詞語疑難點訓練02》多音節':'《词语疑难点训练02》多音节','字詞訓練':'字词训练','請假':'请假','未開始':'未开始','直播課':'直播课','練習':'练习','朗讀短文一《晉祠》':'朗读短文一《晋祠》','個人短講':'个人短讲','已完成':'已完成','課程入口':'课程入口','你好！請問你在哪兒工作？':'你好！请问你在哪儿工作？','你明天要做什麼？':'你明天要做什么？'};
const T = s => state.lang==='sc' ? (ENTRY_UI[s]||UI[s]||s) : s;
const oralData=[
  {title:'我能坐這兒嗎？',options:['請坐，請喝茶。','我能喝這杯茶嗎？','我能坐這兒嗎？'],scene:0},
  {title:'現在幾點？',options:['現在下午兩點零五分。','現在上午九點半。','星期五上午十點半我去看電影。'],scene:1},
  {title:'你在哪兒工作',options:['我在學校工作。','我明天去上班。','你在哪兒工作？'],scene:0}
];
const sentences=[
  {tc:'請坐，請喝茶。',en:'Please have a seat and enjoy some tea.',pinyin:'qǐng zuò，qǐng hē chá。',stars:3},
  {tc:'我能喝這杯茶嗎？',en:'Can I drink this cup of tea?',pinyin:'wǒ néng hē zhè bēi chá ma？',stars:1},
  {tc:'我能坐這兒嗎？',en:'Can I sit here?',pinyin:'wǒ néng zuò zhèr ma？',stars:0},
  {tc:'你能說漢語嗎？',en:'Can you speak Chinese?',pinyin:'nǐ néng shuō hànyǔ ma？',stars:0},
  {tc:'椅子下面沒有小貓。',en:'There is no kitten under the chair.',pinyin:'yǐzi xiàmiàn méiyǒu xiǎomāo。',stars:null},
  {tc:'我的書包裡有三本漢語書和一本英語詞典。',en:'In my backpack, there are three Chinese books and an English dictionary.',pinyin:'wǒ de shūbāo li yǒu sān běn hànyǔ shū hé yì běn yīngyǔ cídiǎn。',stars:null},
  {tc:'王明前面有兩個女生。',en:'There are two girls in front of Wang Ming.',pinyin:'wáng míng qiánmiàn yǒu liǎng gè nǚshēng。',stars:null}
];
const timeSentences=[
  {tc:'現在下午兩點零五分。',en:'It is 2:05 in the afternoon.',pinyin:'xiànzài xiàwǔ liǎng diǎn líng wǔ fēn。',stars:null},
  {tc:'現在上午九點半。',en:'It is 9:30 in the morning.',pinyin:'xiànzài shàngwǔ jiǔ diǎn bàn。',stars:null},
  {tc:'星期五上午十點半我去看電影。',en:'I will go to the cinema at 10:30 on Friday morning.',pinyin:'xīngqīwǔ shàngwǔ shí diǎn bàn wǒ qù kàn diànyǐng。',stars:null}
];
const workSentences=[
  {tc:'我在學校工作。',en:'I work at a school.',pinyin:'wǒ zài xuéxiào gōngzuò。',stars:null},
  {tc:'我明天去上班。',en:'I will go to work tomorrow.',pinyin:'wǒ míngtiān qù shàngbān。',stars:null},
  {tc:'你在哪兒工作？',en:'Where do you work?',pinyin:'nǐ zài nǎr gōngzuò？',stars:null}
];
const activeSentences=()=>[sentences,timeSentences,workSentences][state.oral]||sentences;
const scenes=[
  {tc:'你在哪兒工作',desc:'詢問在哪兒工作',line:'你好！請問你在哪兒工作？',pinyin:'nǐ hǎo，qǐng wèn nǐ zài nǎ er gōng zuò？',en:'Hello! Where do you work?'},
  {tc:'你明天要做什麼',desc:'詢問明天的安排',line:'你明天要做什麼？',pinyin:'nǐ míng tiān yào zuò shén me？',en:'What are you going to do tomorrow?'},
  {tc:'有什麼？',desc:'在家詢問東西在哪兒、哪裡有什麼。',line:'這裡有什麼？',pinyin:'zhè lǐ yǒu shén me？',en:'What is here?'}
];
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function display(s){return E(T(s));}
function statusBar(){return `<div class="status-bar" aria-hidden="true"><span class="status-time">15:35 <svg viewBox="0 0 20 20" width="17" height="17"><path fill="currentColor" d="M15.8 15.1A7.5 7.5 0 0 1 6.2 4.2 7.5 7.5 0 1 0 15.8 15.1Z"/></svg></span><span class="status-system"><span class="signal"><i></i><i></i><i></i><i></i></span><b>5G</b><span class="battery"><i></i></span></span></div>`}
function currentText(){return state.page==='sentenceDetail'?activeSentences()[state.sentence].tc:scenes[state.scene].line}
function nav(title,back,right=''){return `<header class="nav"><button class="icon-btn back" data-action="back" aria-label="${display('返回')}">${icon('back',26)}</button><h1>${display(title)}</h1>${right}</header>`}
function bottom(active){
  const items=[['首頁','','nav-home-idle'],['測試','','nav-test'],['課表','calendar','nav-calendar'],['我的','profile','nav-profile']];
  return '<div class="home-bottom">'+items.map(([label,page,asset])=>{
    const demand=page==='calendar';
    const image=page==='profile'&&active==='profile'?'nav-profile-active':asset;
    return '<button '+(page?'data-page="'+page+'"':'disabled aria-disabled="true"')+' class="'+(active===page?'active':'')+'" aria-label="'+display(label)+(demand?'，'+display('需求'):'')+'"><img src="assets/'+image+'.png" alt="">'+display(label)+(demand?'<span class="nav-demand">'+display('需求')+'</span>':'')+'</button>';
  }).join('')+'</div>';
}
function calendar(){
  const first=(new Date(2026,10,1).getDay()+6)%7;
  const cells=Array.from({length:first},()=>'<span aria-hidden="true"></span>');
  for(let day=1;day<=30;day++){
    const today=day===23,selected=day===state.calendarDay;
    cells.push('<button data-action="calendar-day" data-day="'+day+'" class="'+(selected?'selected ':'')+(today?'today':'')+'" aria-label="2026年11月'+day+'日" aria-pressed="'+selected+'">'+(today?'今':day)+'</button>');
  }
  return '<div class="screen light calendar-screen"><header class="calendar-head"><h1>'+display('課表')+'</h1></header><div class="scroll calendar-main"><div class="month-row"><strong>2026/11⌄</strong><span>'+display('請假')+'</span></div><div class="calendar-sheet"><div class="weekdays">'+['一','二','三','四','五','六','日'].map(day=>'<span>'+day+'</span>').join('')+'</div><div class="calendar-grid">'+cells.join('')+'</div></div><div class="schedule-area"><button class="course-card" data-page="lesson"><span class="course-copy"><span class="course-status">'+display('未開始')+'</span><strong>'+display('第18講')+'：'+display('第18課 詞語疑難點訓練02')+'</strong><small>◷ 23:00–00:00</small></span><span class="course-arrow" aria-hidden="true">›</span></button></div></div>'+bottom('calendar')+'</div>';
}
function lesson(){
  const row=(title,subtitle='',status='')=>'<div class="lesson-entry" aria-disabled="true"><span class="lesson-entry-icon">'+icon('paper',24)+'</span><strong>'+display(title)+(subtitle?'<small>'+display(subtitle)+'</small>':'')+'</strong>'+(status?'<span class="lesson-complete">'+display(status)+'</span>':'')+'<span class="lesson-chevron" aria-hidden="true">›</span></div>';
  return '<div class="screen light lesson-screen"><div class="lesson-hero"><div class="lesson-top"><button class="icon-btn" data-action="back" aria-label="'+display('返回')+'">'+icon('back',25)+'</button><strong>'+display('第18講')+'</strong></div><h1>'+display('第18課 詞語疑難點訓練02')+'</h1></div><div class="scroll lesson-main"><section class="lesson-section"><h2>'+display('直播課')+'</h2><div class="lesson-live"><span class="course-status">'+display('未開始')+'</span><strong>◷ 23:00–00:00</strong><small>2026-11-29</small></div></section><section class="lesson-section"><h2>'+display('練習')+'</h2><div class="lesson-list">'+row('《詞語疑難點訓練02》多音節','字詞訓練')+row('《詞語疑難點訓練02》','朗讀短文一《晉祠》')+row('個人短講','','已完成')+'<button class="lesson-entry oral-entry" data-page="oral"><span class="lesson-entry-icon">'+icon('paper',24)+'</span><strong>'+display('AI 口語練習')+'<span class="badge">'+display('需求')+'</span></strong><span class="lesson-chevron" aria-hidden="true">›</span></button></div></section></div>'+bottom('calendar')+'</div>';
}
function oral(){return `<div class="screen dark">${nav('AI 口語練習')}<div class="scroll">${oralData.map((o,i)=>`<section class="oral-card"><div class="oral-title"><span>${i+1}</span>${display(o.title)}</div>${o.options.map(x=>`<div class="oral-option">${display(x)}</div>`).join('')}<div class="oral-actions"><button data-action="sentences" data-index="${i}">${display('句子練習')}</button><button data-action="scenes" data-index="${o.scene}">${display('場景對話')}</button></div></section>`).join('')}</div></div>`}
function sentencesPage(){return `<div class="screen dark">${nav('句子練習','',`<button class="icon-btn right" data-action="favorite" aria-label="${display(state.favorite?'取消收藏':'收藏')}">${icon(state.favorite?'heartFill':'heart',27)}</button>`)}<div class="scroll sentence-list">${activeSentences().map((s,i)=>`<div class="sentence-card"><button class="icon-btn play" data-action="speak" data-index="${i}" aria-label="${display('示範發音')}">${icon('speaker',27)}</button><button class="text" data-action="sentenceDetail" data-index="${i}"><strong>${display(s.tc)}</strong><small>${E(s.en)}</small></button><button class="icon-btn" data-action="sentenceDetail" data-index="${i}" aria-label="${display('句子跟讀')}">${s.stars===null?icon('mic',24):`<span class="stars">${Array.from({length:3},(_,n)=>icon(n<s.stars?'starFill':'star',18)).join('')}</span>`}</button></div>`).join('')}</div></div>`}
function scenesPage(){return `<div class="screen dark">${nav('場景對話')}<div class="scene-hero"><div class="robot-photo" role="img" aria-label="AI ${display('場景對話')}"></div><h2>${display('場景對話')}</h2><p>${display('今日剩餘次數：3')}</p></div><div class="scroll scene-list">${scenes.map((s,i)=>`<button class="scene-card" data-action="sceneDetail" data-index="${i}"><strong>${display(s.tc)}</strong><small>${display(s.desc)}</small></button>`).join('')}</div></div>`}
function practice(){let scene=state.page==='sceneDetail',item=scene?scenes[state.scene]:activeSentences()[state.sentence],title=scene?item.tc:'句子跟讀',line=scene?item.line:item.tc,pinyin=item.pinyin,en=item.en;return `<div class="screen dark">${nav(title)}<div class="scroll"><div class="practice-prompt ${scene?'scene-prompt':''}">${state.showPinyin?`<div class="pinyin">${E(pinyin)}</div>`:''}<div class="han" ${state.showHan?'':'hidden'}>${display(line)}</div>${state.showTranslation?`<p class="translation">${E(en)}</p>`:''}<div class="tool-row"><button class="on" data-action="speak" aria-label="${display('示範發音')}">${icon('speaker',27)}</button><button data-action="translation" aria-label="${display(state.showTranslation?'隱藏翻譯':'顯示翻譯')}">${icon('translate',25)}</button><button data-action="han" aria-label="${display(state.showHan?'隱藏漢字':'顯示漢字')}">${icon('eyeOff',25)}</button><button data-action="pinyin" aria-label="${display(state.showPinyin?'隱藏拼音':'顯示拼音')}">${icon('pinyin',24)}</button></div></div>${scene&&state.recordedUrl?`<div class="scene-response">${display('錄音完成')}<small>${display('錄音完成後可播放，或完成練習。')}</small></div>`:''}</div><div class="rec-area"><div class="rec-label">${display(state.recording?'點擊結束錄音':state.recordedUrl?'錄音完成':'點擊開始錄音')}${state.recording?` ${state.seconds}s`:''}</div>${state.recordError?`<div class="record-error" role="alert">${display(state.recordError)}</div>`:''}${state.recordedUrl?`<div class="record-result"><audio controls src="${state.recordedUrl}" aria-label="${display('播放錄音')}"></audio><button data-action="retry">${display('重新錄音')}</button><button data-action="next">${display(scene?'完成練習':'下一句')}</button></div>`:`<button class="mic ${state.recording?'recording':''}" data-action="record" aria-label="${display(state.recording?'點擊結束錄音':'點擊開始錄音')}">${icon('mic',42)}</button>`}</div></div>`}
function profile(){return `<div class="screen light">${nav('我的')}<div class="scroll"><div class="profile-card"><div class="profile-banner"><div class="avatar">${display('軒')}</div><strong>${display('陳梓軒')}</strong></div>${[['orders','我的訂單'],['course','我的課程'],['management','學員管理']].map(([iconName,label])=>`<button class="profile-row" disabled aria-disabled="true"><span>${icon(iconName,22)}　${display(label)}</span><em>›</em></button>`).join('')}<button class="profile-row" data-action="language"><span>${icon('language',22)}　${display('語言')}</span><span><em>${display(state.lang==='tc'?'繁體':'簡體')}</em>　›</span></button></div></div>${bottom('profile')}</div>`}
function updateDirectory(){
  const selected=overlay.innerHTML?'language':state.page;
  document.querySelectorAll('#directoryNav [data-page],#directoryNav [data-preview-action],#mobilePageTabs [data-page],#mobilePageTabs [data-preview-action]').forEach(button=>{
    const active=(button.dataset.page||button.dataset.previewAction)===selected;
    button.classList.toggle('active',active);
    if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
  if(mobilePageTabs.offsetParent!==null)mobilePageTabs.querySelector('[aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'nearest'});
}
function fitPhone(){
  if(!studentStage.clientWidth||!studentStage.clientHeight)return;
  const style=getComputedStyle(studentStage);
  const width=studentStage.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
  const height=studentStage.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
  if(width<=0||height<=0)return;
  const scale=Math.min(1,width/390,height/844);
  phoneViewport.style.width=`${390*scale}px`;
  phoneViewport.style.height=`${844*scale}px`;
  phone.style.transform=`scale(${scale})`;
}
function showShellTab(tab,push=true){
  const prd=tab==='prd';
  previewBody.classList.toggle('prd-mode',prd);
  prdView.hidden=!prd;
  document.querySelectorAll('[data-shell-tab]').forEach(button=>{
    const active=button.dataset.shellTab===tab;
    button.classList.toggle('selected',active);
    if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
  if(push)history.pushState({tab,page:state.page},'',prd?'#/prd':`#/${state.page}`);
  if(!prd){updateDirectory();fitPhone()}
}
function render(){document.documentElement.lang=state.lang==='tc'?'zh-Hant':'zh-Hans';const views={calendar,lesson,oral,sentences:sentencesPage,sentenceDetail:practice,scenes:scenesPage,sceneDetail:practice,profile};app.innerHTML=(views[state.page]||calendar)();app.querySelector('.screen')?.insertAdjacentHTML('afterbegin',statusBar());updateDirectory();}
function go(page,{preview=false}={}){if(state.recording){if(!preview&&!confirm(state.lang==='tc'?'錄音仍在進行，確定離開？':'录音仍在进行，确定离开？'))return;discardRecording();}if(preview&&'speechSynthesis'in window)speechSynthesis.cancel();clearRecording();state.recordError='';overlay.innerHTML='';state.page=page;showShellTab('student',false);history.pushState({page},'',`#/${page}`);render();}
function back(){const map={lesson:'calendar',oral:'lesson',sentences:'oral',sentenceDetail:'sentences',scenes:'oral',sceneDetail:'scenes',profile:'calendar'};go(map[state.page]||'calendar')}
function sheet(){overlay.innerHTML=`<div class="sheet-mask" data-action="closeSheet"><div class="sheet" role="dialog" aria-modal="true" aria-label="${display('選擇語言')}"><div class="sheet-head"><h2>${display('選擇語言')}</h2><button data-action="closeSheet" aria-label="${display('關閉')}">×</button></div>${[['CN','簡體','sc'],['TC','繁體','tc']].map(([code,label,lang])=>`<button class="language-row" data-lang="${lang}"><b>${code}</b>${display(label)}<span class="check">${state.lang===lang?'✔':'◯'}</span></button>`).join('')}<div class="language-row" aria-disabled="true"><b>EN</b>English<small class="muted" style="margin-left:auto">${display('目前提供簡體及繁體頁面')}</small></div><div class="language-row" aria-disabled="true"><b>VI</b>Tiếng Việt</div></div></div>`;overlay.querySelector('.sheet [data-action="closeSheet"]').focus();updateDirectory()}
function toast(message){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=T(message);phone.append(el);clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.remove(),2600)}
function speak(index){const line=Number.isInteger(index)?activeSentences()[index].tc:currentText();if(!('speechSynthesis' in window)){toast('此瀏覽器不支援錄音。');return}speechSynthesis.cancel();const msg=new SpeechSynthesisUtterance(T(line));msg.lang='zh-CN';msg.rate=.83;speechSynthesis.speak(msg)}
function clearRecording(){if(state.recordedUrl)URL.revokeObjectURL(state.recordedUrl);state.recordedUrl='';state.seconds=0;clearInterval(state.timer)}
function discardRecording(){state.discardRecording=true;if(state.recorder?.state==='recording')state.recorder.stop();state.stream?.getTracks().forEach(x=>x.stop());state.recording=false;clearInterval(state.timer)}
async function startRecording(){state.recordError='';if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){state.recordError='此瀏覽器不支援錄音。';render();return}try{state.stream=await navigator.mediaDevices.getUserMedia({audio:true});state.chunks=[];state.recorder=new MediaRecorder(state.stream);state.recorder.ondataavailable=e=>{if(e.data.size)state.chunks.push(e.data)};state.recorder.onstop=()=>{state.stream?.getTracks().forEach(x=>x.stop());state.stream=null;if(state.discardRecording){state.discardRecording=false;return}if(state.seconds<1){state.recordError='錄音太短，請重新錄製。'}else{state.recordedUrl=URL.createObjectURL(new Blob(state.chunks,{type:state.recorder.mimeType||'audio/webm'}))}state.recording=false;clearInterval(state.timer);render()};state.recorder.start();state.recording=true;state.seconds=0;state.timer=setInterval(()=>{state.seconds++;document.querySelector('.rec-label')?.replaceChildren(`${T('正在錄音')} ${state.seconds}s`)},1000);render()}catch(e){state.recordError='麥克風無法使用。請允許權限後重試。';render()}}
function stopRecording(){if(state.recorder?.state==='recording')state.recorder.stop();state.recording=false;clearInterval(state.timer);render()}
app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.page){go(b.dataset.page);return}const action=b.dataset.action;const index=b.dataset.index!==undefined?Number(b.dataset.index):undefined;switch(action){case'back':back();break;case'calendar-day':state.calendarDay=Number(b.dataset.day);render();break;case'language':sheet();break;case'unavailable':toast('請選擇練習主題');break;case'sentences':state.oral=index;state.sentence=0;go('sentences');break;case'scenes':state.scene=index;go('scenes');break;case'sentenceDetail':state.sentence=index;go('sentenceDetail');break;case'sceneDetail':state.scene=index;go('sceneDetail');break;case'speak':speak(index);break;case'favorite':state.favorite=!state.favorite;render();break;case'translation':state.showTranslation=!state.showTranslation;render();break;case'pinyin':state.showPinyin=!state.showPinyin;render();break;case'han':state.showHan=!state.showHan;render();break;case'record':state.recording?stopRecording():startRecording();break;case'retry':clearRecording();render();break;case'next':clearRecording();if(state.page==='sentenceDetail'){state.sentence=(state.sentence+1)%activeSentences().length;render()}else go('scenes');break}});
function handlePreviewNavigation(e){
  const button=e.target.closest('button');if(!button)return;
  if(button.dataset.page){go(button.dataset.page,{preview:true});return}
  if(button.dataset.previewAction==='language'){go('profile',{preview:true});sheet()}
}
flowSidebar.addEventListener('click',handlePreviewNavigation);
mobilePageTabs.addEventListener('click',handlePreviewNavigation);
document.querySelector('#sidebarToggle').addEventListener('click',()=>{
  const collapsed=previewBody.classList.toggle('collapsed');
  const button=document.querySelector('#sidebarToggle');
  button.setAttribute('aria-expanded',String(!collapsed));
  button.textContent=collapsed?'展開目錄':'收起目錄 ‹';
});
document.querySelectorAll('[data-shell-tab]').forEach(button=>button.addEventListener('click',()=>{
  const tab=button.dataset.shellTab;
  const current=previewBody.classList.contains('prd-mode')?'prd':'student';
  if(current===tab)return;
  if(state.recording){if(!confirm(state.lang==='tc'?'錄音仍在進行，確定離開？':'录音仍在进行，确定离开？'))return;discardRecording()}
  if('speechSynthesis'in window)speechSynthesis.cancel();
  clearRecording();overlay.innerHTML='';showShellTab(tab);
}));
overlay.addEventListener('click',e=>{const lang=e.target.closest('[data-lang]');if(lang){state.lang=lang.dataset.lang;localStorage.setItem('mandarin-lang',state.lang);overlay.innerHTML='';render();return}if(e.target.matches('.sheet-mask')||e.target.closest('[data-action="closeSheet"]')){overlay.innerHTML='';updateDirectory()}});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.innerHTML){overlay.innerHTML='';updateDirectory()}});
window.addEventListener('popstate',()=>{
  const page=location.hash.slice(2);
  if(page==='references'||page==='teacher'||page==='home'){history.replaceState({page:'calendar'},'','#/calendar');state.page='calendar';showShellTab('student',false);render();return}
  if(page==='prd'){if(state.recording)discardRecording();clearRecording();overlay.innerHTML='';showShellTab(page,false);return}
  if(['calendar','lesson','oral','sentences','sentenceDetail','scenes','sceneDetail','profile'].includes(page)){
    if(state.recording){if(!confirm(state.lang==='tc'?'錄音仍在進行，確定離開？':'录音仍在进行，确定离开？')){history.pushState({page:state.page},'',`#/${state.page}`);return}discardRecording()}
    state.page=page;clearRecording();state.recordError='';overlay.innerHTML='';showShellTab('student',false);render()
  }
});
const initial=location.hash.slice(2);
if(initial==='references'||initial==='teacher'||initial==='home')history.replaceState({page:'calendar'},'','#/calendar');
if(['calendar','lesson','oral','sentences','sentenceDetail','scenes','sceneDetail','profile'].includes(initial))state.page=initial;
render();showShellTab(initial==='prd'?'prd':'student',false);
new ResizeObserver(fitPhone).observe(studentStage);
window.addEventListener('resize',fitPhone);

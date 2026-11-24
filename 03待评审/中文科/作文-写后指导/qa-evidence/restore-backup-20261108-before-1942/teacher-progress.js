// Display submission timestamps to minutes; preserve stored seconds for sorting.
function formatWritingTime(value) {
 const match = typeof value === 'string' && value.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})(?::\d{2})?$/);
 return match ? `${match[1]} ${match[2]}` : '—';
}
// Local prototype submissions. Replace with authorized student/submission APIs.
const writingStudents = [{id:'S01',name:'陳曉晴'},{id:'S02',name:'王柏謙'},{id:'S03',name:'李芷欣'}];
const previewStudentId = 'S01';
const previewStudent = writingStudents.find(student => student.id === previewStudentId);
if (previewStudent) {
 document.getElementById('learningStudentName').textContent = previewStudent.name;
 document.getElementById('learningStudentId').textContent = `學生編號：${previewStudent.id}`;
 document.getElementById('learningStudentAvatar').textContent = previewStudent.name.slice(0, 1);
}
const writingSubmissions = [
 {"id":"W001","durationSeconds":754,"studentId":"S01","submittedAt":"2026-10-26 09:35","topic":"「有人認為，經歷挫折能使人成長。」試就這個看法，寫作一篇文章，談談你的看法。","genre":"議論文","stance":"視乎情況而論","keywords":"經歷挫折、成長","thesis":"本文將辯證地指出：挫折能否使人成長，視乎人如何回應；挫折本身不是成長的保證，真正的成長來自反思、調整與再次行動；而且人的回應決定挫折的意義，同一困境既可成為絆腳石，也可成為踏腳石。","materials":["校際辯論落敗：正面例證：反思與行動把挫折轉化為成長。","成長型思維：概念論據：人的理解與回應影響結果。","習得性無助：反面例證：駁斥「挫折必然使人成長」。"],"outline":["開首 · 破題定義：由「挫折是否必然等於成長」的疑問切入，界定成長不只是經歷困難，而是認知與行動有所改變。","第一段 · 正面論證：以「校際辯論落敗」為材料，反思與行動把挫折轉化為成長。並回扣「人的回應如何改變挫折的意義」。","第二段 · 補充論證：以「成長型思維」為材料，人的理解與回應影響結果。並回扣「人的回應如何改變挫折的意義」。","第三段 · 反面論證：以「習得性無助」為材料，駁斥「挫折必然使人成長」。並回扣「人的回應如何改變挫折的意義」。","結尾 · 回扣昇華：重申挫折只是契機而非答案；決定人成為甚麼模樣的，是回應挫折時作出的選擇。"],"techniques":["正反對比：並置成長與沉淪兩種回應，突出選擇的重要。","比喻說理：把挫折比作磨刀石或裂縫，化抽象為具體。","設問推進：在段首提出關鍵問題，引領讀者跟隨思路。"]},
 {id:'W002',durationSeconds:928,studentId:'S01',submittedAt:'2026-10-23 16:20',topic:'一次讓我改變的經歷',genre:'記敍文',keywords:'一次經歷、改變',thesis:'從逃避分組責任到主動承擔，體會成長始於願意為自己的選擇負責。',materials:['分組匯報前因準備不足影響同伴','補做資料、練習表達並完成匯報'],outline:['以匯報前的緊張場景開篇','交代拖延及對同伴造成的影響','詳寫主動承擔與補救的經過','以後來的行動呈現改變'],techniques:['動作描寫','前後照應']},
 {id:'W003',durationSeconds:671,studentId:'S01',submittedAt:'2026-10-20 19:10',topic:'我眼中的幸福',genre:'記敍文',keywords:'我的觀察、幸福',thesis:'幸福藏在家人日常的陪伴與互相照顧之中。',materials:['放學回家時桌上的一碗熱湯','週末與家人一起準備晚飯'],outline:['從熱湯的氣味引入回憶','敘述日常陪伴的細節','寫自己開始主動照顧家人','回扣平凡生活中的幸福'],techniques:['感官描寫','以小見大']},
 {id:'W004',durationSeconds:845,studentId:'S02',submittedAt:'2026-10-25 15:45',topic:'堅持是否必然帶來成功？',genre:'議論文',keywords:'堅持、必然、成功',thesis:'堅持需要正確方向與適時調整；重複無效的方法未必帶來成功。',materials:['練習成績停滯後調整訓練方式','團隊根據回饋修正方案'],outline:['界定堅持與成功','說明持續行動的價值','分析方向錯誤時堅持的局限','提出堅持與調整並重'],techniques:['辯證分析','舉例論證']},
 {id:'W005',durationSeconds:1092,studentId:'S02',submittedAt:'2026-10-22 18:30',topic:'一次難忘的合作',genre:'記敍文',keywords:'合作、難忘',thesis:'真正的合作不是各做各的，而是願意溝通並互相補位。',materials:['校園活動籌備中的分工衝突','活動當天臨時調整並互相支援'],outline:['以活動現場的意外開篇','回敘分工衝突','詳寫協商與互相補位','總結對合作的新理解'],techniques:['倒敍','人物對話']},
 {id:'W006',durationSeconds:783,studentId:'S03',submittedAt:'2026-10-24 20:05',topic:'科技讓人更親近嗎？',genre:'議論文',keywords:'科技、親近、使用方式',thesis:'科技降低聯絡的距離，但親近仍依賴真誠交流與投入。',materials:['利用視像通話維繫遠方親友關係','聚餐時各自使用手機造成交流減少'],outline:['提出距離縮短是否等於關係親近','論述科技促進聯絡的作用','分析分心與表面互動的限制','提出有意識地使用科技'],techniques:['正反對比','因果分析']}
];
function formatWritingDuration(seconds){if(!Number.isFinite(seconds)||seconds<0)return '—';const n=Math.floor(seconds),h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=n%60;return h?`${h} 小時 ${m} 分 ${s} 秒`:`${m} 分 ${s} 秒`;}
const writingRowsFor = id => writingSubmissions.filter(r=>r.studentId===id).sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt)||b.id.localeCompare(a.id));
const escapeWritingText = text => String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const studentRoute = id => `#/backend/student/${id}`;
let appliedWritingQuery = '', previousWritingRoute = '', writingSidebarCollapsed = false;
const writingViewMemory = new Map();
function renderWritingStudents(){
 const students=writingStudents.filter(s=>s.name.includes(appliedWritingQuery));
 document.getElementById('writingStudentCount').textContent=`共 ${students.length} 名學生`;
 document.getElementById('writingStudentRows').innerHTML=students.length ? students.map(s=>{
  const records=writingRowsFor(s.id),last=records[0], href=studentRoute(s.id);
  return `<tr><td><a href="${href}" class="admin-text-link">${escapeWritingText(s.name)}</a></td><td class="number-cell">${records.length} 次</td><td class="date-cell">${formatWritingTime(last?.submittedAt)}</td><td class="topic-cell">${escapeWritingText(last?.topic || '—')}</td><td class="action-cell"><a href="${href}" class="admin-text-link" aria-label="查看${s.name}的寫作記錄">查看記錄</a></td></tr>`;
 }).join('') : '<tr><td colspan="5" class="learning-empty"><span class="empty-icon" aria-hidden="true">⌕</span><p>沒有符合條件的學生</p><p class="admin-caption">請調整學生姓名，或清除篩選後再試。</p><button type="button" class="admin-text-link" data-clear-writing-search>清除篩選</button></td></tr>';
}
function renderWritingHistory(student){
 const records=writingRowsFor(student.id),panel=document.getElementById('studentWritingHistory');
 panel.innerHTML=`<section class="admin-card student-profile"><span class="student-avatar" aria-hidden="true">${student.name.slice(0,1)}</span><div><h2>${student.name}</h2><span class="admin-caption">學生編號：${student.id}</span></div><dl><div><dt>寫作次數</dt><dd>${records.length} 次</dd></div><div><dt>最近提交時間</dt><dd>${formatWritingTime(records[0]?.submittedAt)}</dd></div></dl></section><section class="admin-card"><div class="admin-list-heading"><h2>提交記錄</h2><span class="admin-caption">按提交時間由新到舊排列</span></div><div class="table-scroll" role="region" aria-label="每次提交記錄表格" tabindex="0"><table class="learning-table"><thead><tr><th scope="col">序號</th><th scope="col">寫作題目</th><th scope="col">完成用時</th><th scope="col">提交時間</th><th scope="col" class="action-cell">操作</th></tr></thead><tbody>${records.length ? records.map((r,i)=>`<tr><td>${i+1}</td><td class="topic-cell"><a class="admin-text-link" href="${studentRoute(student.id)}/result/${r.id}">${escapeWritingText(r.topic)}</a></td><td class="date-cell">${formatWritingDuration(r.durationSeconds)}</td><td class="date-cell">${formatWritingTime(r.submittedAt)}</td><td class="action-cell"><a class="admin-text-link" href="${studentRoute(student.id)}/result/${r.id}" aria-label="查看序號${i+1}的寫作結果">查看寫作結果</a></td></tr>`).join('') : '<tr><td colspan="5" class="learning-empty">暫無寫作記錄</td></tr>'}</tbody></table></div><div class="admin-table-footer">共 ${records.length} 次提交</div></section>`;
}
function writingResultMarkup(student,result){
 const text=escapeWritingText;
 return `<article class="admin-card writing-result-content"><header class="writing-result-heading"><h2>${text(result.topic)}</h2><div class="writing-result-meta"><span>學生：${student.name}</span><span>提交時間：${formatWritingTime(result.submittedAt)}</span><span>提交編號：${result.id}</span></div></header><section><h3>作文題目</h3><p>${text(result.topic)}</p></section><section><h3>審題結論</h3><p>${text(result.genre)} · ${text(result.keywords)}${result.stance?` · ${text(result.stance)}`:""}</p></section><section><h3>中心立意</h3><p>${text(result.thesis)}</p></section><section><h3>核心材料</h3><ul>${result.materials.map(x=>`<li>${text(x)}</li>`).join('')}</ul></section><section><h3>文章結構</h3><ol>${result.outline.map(x=>`<li>${text(x)}</li>`).join('')}</ol></section><section><h3>表達策略</h3><ul>${result.techniques.map(x=>`<li>${text(x)}</li>`).join('')}</ul></section></article>`;
}
function renderWritingResult(student,result){document.getElementById('studentWritingResult').innerHTML=writingResultMarkup(student,result);}
function renderWritingRoute(){
 const route=location.hash,parts=route.slice(2).split('/');
 if(parts[0]!=='backend')return;
 const content=document.getElementById('writingAdminContent');
 const student=parts[1]==='student'&&writingStudents.find(s=>s.id===parts[2]);
 const result=student&&parts[3]==='result'&&writingSubmissions.find(r=>r.id===parts[4]&&r.studentId===student.id);
 const validList=parts.length===1, validHistory=student&&parts.length===3,validResult=result&&parts.length===5;
 const title=document.getElementById('writingPageTitle'),back=document.getElementById('writingPageBack');
 const list=document.getElementById('studentWritingList'),history=document.getElementById('studentWritingHistory'),report=document.getElementById('studentWritingResult');
 list.hidden=!validList;history.hidden=!validHistory;report.hidden=!validResult;
 content.querySelector('.writing-not-found')?.remove();
 let crumbs='<span>學生管理</span><span aria-hidden="true">/</span>';
 crumbs+=validList?'<span aria-current="page">學生寫作記錄</span>':'<a href="#/backend">學生寫作記錄</a>';
 title.textContent=validList?'學生寫作記錄':validHistory?`${student.name} · 寫作記錄`:validResult?'本次寫作結果':'記錄不存在';
 back.hidden=validList;back.href=validResult?studentRoute(student.id):'#/backend';back.textContent=validResult?'返回寫作記錄':'返回學生列表';
 if(validHistory||validResult){crumbs+='<span aria-hidden="true">/</span>'+(validResult?`<a href="${studentRoute(student.id)}">${student.name}</a><span aria-hidden="true">/</span><span aria-current="page">本次寫作結果</span>`:`<span aria-current="page">${student.name}</span>`);}
 if(validList)renderWritingStudents();
 else if(validHistory)renderWritingHistory(student);
 else if(validResult)renderWritingResult(student,result);
 else content.insertAdjacentHTML('beforeend','<section class="admin-card writing-not-found learning-empty"><h2>記錄不存在或已移除</h2><p>請返回學生列表重新選擇記錄。</p><a class="admin-button" href="#/backend">返回學生列表</a></section>');
 document.getElementById('writingBreadcrumb').innerHTML=crumbs;
 if(previousWritingRoute!==route){
  const memory=writingViewMemory.get(route);
  requestAnimationFrame(()=>{
   const focus=memory?.href&&Array.from(content.querySelectorAll('a')).find(a=>a.getAttribute('href')===memory.href&&a.textContent.trim()===memory.text);
   (focus||title).focus({preventScroll:true});
   window.scrollTo(0,memory?.top||0);
   const table=content.querySelector('section:not([hidden]) .table-scroll');if(table)table.scrollLeft=memory?.left||0;
  });
 }
 previousWritingRoute=route;
}
function rememberWritingView(){
 if(!location.hash.startsWith('#/backend'))return;
 const content=document.getElementById('writingAdminContent'),active=document.activeElement;
 writingViewMemory.set(location.hash,{top:window.scrollY,left:content.querySelector('section:not([hidden]) .table-scroll')?.scrollLeft||0,href:active?.getAttribute('href'),text:active?.textContent.trim()});
}
document.addEventListener('click',event=>{if(event.target.closest('a[href^="#/"]'))rememberWritingView();if(event.target.closest('[data-clear-writing-search]'))resetWritingSearch();});
window.addEventListener('scroll',()=>{if(location.hash.startsWith('#/backend')){const old=writingViewMemory.get(location.hash)||{};writingViewMemory.set(location.hash,{...old,top:window.scrollY});}},{passive:true});
function resetWritingSearch(){document.getElementById('writingStudentSearch').value='';appliedWritingQuery='';renderWritingStudents();document.getElementById('writingStudentSearch').focus();}
document.getElementById('writingSearchForm').addEventListener('submit',event=>{event.preventDefault();appliedWritingQuery=document.getElementById('writingStudentSearch').value.trim();renderWritingStudents();});
document.getElementById('resetWritingSearch').addEventListener('click',resetWritingSearch);
document.getElementById('toggleWritingSidebar').addEventListener('click',event=>{
 writingSidebarCollapsed=!writingSidebarCollapsed;document.getElementById('writingAdmin').classList.toggle('sidebar-collapsed',writingSidebarCollapsed);
 const button=event.currentTarget;button.setAttribute('aria-expanded',String(!writingSidebarCollapsed));button.setAttribute('aria-label',writingSidebarCollapsed?'展開側欄':'收合側欄');
 if(writingSidebarCollapsed){document.getElementById('writingMenuItems').hidden=false;document.getElementById('toggleWritingGroup').setAttribute('aria-expanded','true');}
});
document.getElementById('toggleWritingGroup').addEventListener('click',event=>{
 if(writingSidebarCollapsed){document.getElementById('toggleWritingSidebar').click();return;}
 const expanded=event.currentTarget.getAttribute('aria-expanded')==='true';event.currentTarget.setAttribute('aria-expanded',String(!expanded));document.getElementById('writingMenuItems').hidden=expanded;
});
window.addEventListener('previewview',event=>{if(event.detail==='backend')renderWritingRoute();});
renderWritingStudents();

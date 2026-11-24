(function(){
 const content=document.getElementById('writingAdminContent');
 if(!content)return;
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const seedTasks=[
  {id:'T001',type:'essay',title:'《對當代中國發展有貢獻或影響力的人物》',className:'2A',grade:'S2',total:30,submit:'20 / 30',guidanceEnabled:true,guidance:'18 / 30',average:'51.8',highest:'65',grading:'15 / 20',start:'2026-10-16',end:'2026-10-28',passRate:'25.0%'},
  {id:'T002',type:'essay',title:'《窗》',className:'2B',grade:'S2',total:30,submit:'0 / 30',guidanceEnabled:false,guidance:'未开始',average:'—',highest:'—',grading:'0 / 0',start:'2026-10-21',end:'2026-10-28',passRate:'—'}
 ];
 const taskStorageKey='writingGuideTasksV1';
 let tasks=(()=>{try{const saved=JSON.parse(localStorage.getItem(taskStorageKey));return Array.isArray(saved)&&saved.length?saved.map(item=>({...seedTasks.find(seed=>seed.id===item.id),...item})):seedTasks;}catch(error){return seedTasks;}})();
 const saveTasks=()=>{try{localStorage.setItem(taskStorageKey,JSON.stringify(tasks));}catch(error){/* 原型预览可在禁用存储时继续使用内存数据 */}};
 const students=[
  {name:'陳曉晴',guidance:'已完成',submission:'已提交',grading:'已批改',time:'2026-10-26 09:35'},
  {name:'王柏謙',guidance:'已完成',submission:'已提交',grading:'已批改',time:'2026-10-25 15:45'},
  {name:'李芷欣',guidance:'未开始',submission:'未提交',grading:'未进入批改',time:'—'}
 ];
 let query='',filter='all';
 window.addEventListener('writing-task-created',event=>{
  const task=event.detail;
  if(!task?.id)return;
  tasks=[task,...tasks.filter(item=>item.id!==task.id)];
  saveTasks();
  if(location.hash==='#/backend/tasks')renderList();
 });
 const script=document.createElement('link');script.rel='stylesheet';script.href='task-management.css?v=task-management-20261108';document.head.appendChild(script);
 function addMenu(){
  const nav=document.getElementById('writingTopMenuItems');
  if(nav&&!nav.querySelector('[data-task-management]'))nav.insertAdjacentHTML('beforeend','<a class="admin-menu-top-item" data-task-management href="#/backend/tasks" title="任務管理"><span class="admin-menu-icon" aria-hidden="true">▦</span><span class="admin-menu-label">任務管理</span></a>');
  const taskLink=nav?.querySelector('[data-task-management]'),taskLabel=taskLink?.querySelector('.admin-menu-label');
  if(taskLabel&&!taskLabel.querySelector('.requirement-badge'))taskLabel.insertAdjacentHTML('beforeend',' <span class="requirement-badge">需求</span>');
 }
 function addPublishCapability(){
  const page=document.getElementById('writingPublishPage');
  if(!page||page.querySelector('.writing-publish-capability'))return;
  document.getElementById('writingPublishTitle').textContent='发布任务';
  const publishLink=document.querySelector('#writingTopMenuItems a[href="#/backend/publish-essay"]');
  if(publishLink){const label=publishLink.querySelector('.admin-menu-label');if(label){const badge=label.querySelector('.requirement-badge');label.textContent='发布任务 ';if(badge)label.appendChild(badge);}}
  const section=document.createElement('section');section.className='writing-publish-capability';section.innerHTML='<h4>功能配置</h4><p class="writing-publish-capability-note">写作指导为可选能力；作文批改沿用现有流程并默认开启；写后指导（待上线）暂不可用。</p><div class="writing-publish-capability-grid writing-publish-capability-grid-three"><label class="writing-publish-capability-item" data-capability-card="guidance"><input type="checkbox" name="writingCapabilityGuidance" aria-controls="writingGuidanceOptions"><span><strong>写作指导（可选）</strong><small>审题、立意、选材、结构与表达。</small></span><em>可选</em></label><label class="writing-publish-capability-item is-current" data-capability-card="grading"><input type="checkbox" checked name="writingCapabilityGrading"><span><strong>作文批改</strong><small>查看作文批改后的作文报告</small></span><em>默认开启</em></label><label class="writing-publish-capability-item is-disabled" data-capability-card="post" aria-disabled="true" title="功能暂未上线"><input type="checkbox" disabled name="writingCapabilityPost"><span><strong>写后指导（待上线）</strong></span><em>待上线</em></label></div><div class="writing-guidance-options" id="writingGuidanceOptions" hidden><h5>写前指导内容</h5><span>开启后，学生完成以下四步并保存写作指导记录。</span><div><label><input type="checkbox" checked disabled>审题立意</label><label><input type="checkbox" checked disabled>选材构思</label><label><input type="checkbox" checked disabled>结构表达</label><label><input type="checkbox" checked disabled>完整指导</label></div></div>';
  page.querySelector('.writing-publish-actions')?.before(section);
  const guidanceInput=section.querySelector('input[name="writingCapabilityGuidance"]');
  const guidanceCard=section.querySelector('[data-capability-card="guidance"]');
  const guidanceOptions=section.querySelector('#writingGuidanceOptions');
  guidanceInput?.addEventListener('change',()=>{guidanceOptions.hidden=!guidanceInput.checked;guidanceCard.classList.toggle('is-current',guidanceInput.checked);});
 }
 function addTaskPanels(){
  if(document.getElementById('writingTaskManagementList'))return;
  const overview=document.createElement('section');overview.id='writingBackendOverview';overview.className='admin-card backend-overview-card';overview.hidden=true;overview.innerHTML='<div class="admin-list-heading"><div><h2>后台页面汇总</h2><span class="admin-caption">作文写前指导项目的教师后台统一入口</span></div><span class="task-management-pill blue">后台</span></div><div class="backend-overview-grid"><a class="backend-overview-item" href="#/backend/tasks"><strong>任务管理</strong><span>查看任务进度、学生写作情况和作文报告入口</span></a><a class="backend-overview-item" href="#/backend/publish-essay"><strong>发布任务</strong><span>配置作文批改和可选的写作指导</span></a><a class="backend-overview-item" href="#/backend/report"><strong>作文报告</strong><span>查看写作指导与作文批改报告</span></a></div>';
  const list=document.createElement('section');list.id='writingTaskManagementList';list.className='admin-card task-management-card';list.hidden=true;list.innerHTML='<div class="admin-list-heading"><div><h2>任务管理</h2><span class="admin-caption">查看命题作文任务、写作指导与作文报告进度</span></div><a class="admin-button primary" href="#/backend/publish-essay">＋ 发布新任务</a></div><form class="learning-filters" id="taskManagementSearchForm" role="search"><label for="taskManagementSearch">搜索任务</label><input id="taskManagementSearch" placeholder="请输入任务名称" type="search" autocomplete="off"><button class="admin-button primary" type="submit">查询</button><button class="admin-button" id="taskManagementReset" type="button">重置</button></form><div class="task-management-tabs" role="tablist" aria-label="任务类型"><button type="button" class="task-management-tab is-active" data-task-filter="all">全部任务</button><button type="button" class="task-management-tab" data-task-filter="essay">命题作文</button></div><div class="table-scroll" tabindex="0" role="region" aria-label="命题作文任务列表"><table class="learning-table task-management-table"><thead><tr><th>任务名称</th><th>写作指导 <span class="requirement-badge">需求</span></th><th>作文提交进度</th><th>类型</th><th>班级／小组</th><th>年级</th><th>开始时间</th><th>截止时间</th><th>平均分</th><th>最高分</th><th class="action-cell">操作</th></tr></thead><tbody id="taskManagementRows"></tbody></table></div><div class="admin-table-footer"><span id="taskManagementCount"></span><span>命题作文任务可进入任务详情查看班级状态</span></div></section>';
  const detail=document.createElement('section');detail.id='writingTaskManagementDetail';detail.className='admin-card task-management-card';detail.hidden=true;detail.innerHTML='<div class="task-management-detail-heading"><div><span class="admin-caption">任务管理 / 任务详情</span><h2 id="taskManagementTitle"></h2><p class="admin-caption" data-task-meta>命题作文　·　S2 / 2A　·　30人</p></div><div class="task-management-actions"><button type="button" class="admin-button primary">成绩公布　未公布</button><button type="button" class="admin-button">刷新</button><button type="button" class="admin-button">导出成绩表</button></div></div><nav class="report-tabs task-management-detail-tabs" role="tablist" aria-label="任务详情内容"><button type="button" class="report-tab is-active" data-task-pane-tab="overview">成绩概览</button><button type="button" class="report-tab" data-task-pane-tab="guidance">写作指导</button><button type="button" class="report-tab" data-task-pane-tab="students">学生写作情况</button><button type="button" class="report-tab" data-task-pane-tab="report">作文报告</button><button type="button" class="report-tab is-disabled" disabled>课堂点评<span class="report-status-badge">待上线</span></button></nav><div class="task-management-pane" data-task-pane="overview"><div class="task-management-stat-grid"><article><span>平均分</span><strong data-task-average>51.8</strong></article><article><span>最高分</span><strong class="green" data-task-highest>65</strong></article><article><span>完成率</span><strong data-task-completion>66.7%</strong><small data-task-completion-note>20 / 30 人已提交</small></article><article><span>写作指导完成</span><strong class="purple" data-task-guidance-stat>18 / 30</strong><small data-task-guidance-note>已完成 18 人</small></article></div><div class="task-management-flow"><span class="done" data-task-guidance-flow>写作指导　18 / 30</span><span data-task-submit-flow>作文提交　20 / 30</span><span data-task-grading-flow>作文批改　15 / 20</span><span class="pending">写后指导　待上线</span></div><div class="admin-list-heading"><h3>班级完成情况</h3><span class="admin-caption">详情可进入学生写作情况查看</span></div><div class="task-management-progress"><span>本班任务完成率</span><strong data-task-progress>66.7%</strong><div><i data-task-progress-bar style="width:66.7%"></i></div></div></div><div class="task-management-pane" data-task-pane="guidance" hidden><div class="admin-list-heading"><div><h3>写作指导完成情况</h3><span class="admin-caption">写作指导完成后，学生可继续提交作文</span></div><span class="task-management-pill blue" data-task-guidance-pill>已完成 18 / 30</span></div><div class="table-scroll"><table class="learning-table"><thead><tr><th>学生姓名</th><th>写作指导状态</th><th>最后完成时间</th><th class="action-cell">操作</th></tr></thead><tbody id="taskManagementGuidanceRows"></tbody></table></div></div><div class="task-management-pane" data-task-pane="students" hidden><div class="admin-list-heading"><div><h3>学生写作情况</h3><span class="admin-caption">按照写作指导、作文提交、批改状态查看</span></div><div class="task-management-statuses"><span class="task-management-pill">全班 30 人</span><span class="task-management-pill gray">未提交 10 人</span><span class="task-management-pill green">已批改 15 人</span></div></div><div class="table-scroll"><table class="learning-table"><thead><tr><th>排名</th><th>学生姓名</th><th>写作指导状态</th><th>作文提交</th><th>批改状态</th><th>提交时间</th><th class="action-cell">操作</th></tr></thead><tbody id="taskManagementStudentRows"></tbody></table></div></div><div class="task-management-pane" data-task-pane="report" hidden><div class="task-management-report-grid"><a class="task-management-report-card" href="#/backend/report"><strong>写作指导</strong><span>查看学生本次写前指导内容</span></a><a class="task-management-report-card" href="writing-report/index.html#"><strong>作文批改</strong><span>图片／文字　进入作文报告</span></a><button type="button" class="task-management-report-card is-disabled" disabled><strong>写后指导（待上线）</strong><span>功能準備中</span></button></div></div>';
  const reportCards=detail.querySelectorAll('.task-management-report-card');
  if(reportCards[0]){reportCards[0].dataset.reportCard='guidance';reportCards[0].href='#/backend/report?tab=guidance';}
  if(reportCards[1]){reportCards[1].dataset.reportCard='grading';reportCards[1].href='#/backend/report?tab=grading';reportCards[1].querySelector('strong').textContent='作文批改报告';}
  const postCard=reportCards[2];if(postCard)postCard.querySelector('span').textContent='功能待上线';
  content.append(overview,list,detail);
  enhanceTaskDetail(detail);
  new MutationObserver(decorateTaskListRows).observe(list.querySelector('#taskManagementRows'),{childList:true});
  bindPanels(list,detail);
 }
 function normalizeBackendOverview(){
  const item=document.querySelector('#writingBackendOverview a[href="#/backend"]');
  if(!item)return;
  item.href='#/backend/tasks/T001';
  const title=item.querySelector('strong'),caption=item.querySelector('span');
  if(title)title.textContent='学生写作情况';
  if(caption)caption.textContent='进入任务详情查看写作指导与作文提交状态';
 }
 function renderList(){
  const rows=tasks.filter(item=>(filter==='all'||filter===item.type)&&item.title.includes(query));
  document.getElementById('taskManagementRows').innerHTML=rows.length?rows.map(item=>`<tr><td class="topic-cell"><a class="admin-text-link" href="#/backend/tasks/${item.id}">${esc(item.title)}</a></td><td>${item.guidanceEnabled?`<span class="task-guidance-cell"><b class="task-management-pill green">已开启</b><strong class="task-guidance-progress">${item.guidance}</strong></span>`:'<span class="task-management-pill gray">未开始</span>'}</td><td>${item.submit}</td><td><span class="task-management-type">命题作文</span></td><td>${item.className}</td><td>${item.grade}</td><td>${item.average}</td><td>${item.highest}</td><td class="action-cell"><a class="admin-text-link" href="#/backend/tasks/${item.id}">查看详情</a></td></tr>`).join(''):'<tr><td colspan="11" class="learning-empty">没有符合条件的任务</td></tr>';
  document.getElementById('taskManagementCount').textContent=`共 ${rows.length} 個任務`;
 }
 function renderDetail(task){
  document.getElementById('taskManagementTitle').textContent=task.title;
  document.querySelector('[data-task-meta]').textContent=`命題作文　·　${task.grade} / ${task.className}　·　${task.total||30}人`;
  document.querySelector('[data-task-dates]').textContent=`開始時間：${task.start||'—'}　截止時間：${task.end||'—'}`;
  document.querySelector('[data-task-average]').textContent=task.average||'—';
  document.querySelector('[data-task-highest]').textContent=task.highest||'—';
  const submitCount=Number.parseInt(String(task.submit).split('/')[0],10)||0,total=task.total||30,completion=total?Math.round(submitCount/total*1000)/10:0;
  document.querySelector('[data-task-pass-rate]').textContent=task.passRate||'—';
  document.querySelector('[data-task-completion]').textContent=`${completion}%`;
  document.querySelector('[data-task-completion-note]').textContent=`${submitCount} / ${total} 人已提交`;
  const guidanceText=task.guidanceEnabled?task.guidance:'未开始';
  document.querySelector('[data-task-guidance-stat]').textContent=guidanceText;
  document.querySelector('[data-task-guidance-note]').textContent=task.guidanceEnabled?`已完成 ${task.guidance.split('/')[0].trim()} 人`:'写作指导未开启';
  document.querySelector('[data-task-guidance-flow]').textContent=`寫作指導　${guidanceText}`;
  document.querySelector('[data-task-submit-flow]').textContent=`作文提交　${task.submit}`;
  document.querySelector('[data-task-grading-flow]').textContent=`作文批改　${task.grading||'0 / 0'}`;
  document.querySelector('[data-task-progress]').textContent=`${completion}%`;
  document.querySelector('[data-task-progress-bar]').style.width=`${completion}%`;
  document.querySelector('[data-task-guidance-pill]').textContent=task.guidanceEnabled?`已完成 ${task.guidance}`:'未开始';
  document.querySelector('[data-task-guidance-pill]').className=`task-management-pill ${task.guidanceEnabled?'blue':'gray'}`;
  const guidanceEnabled=task.guidanceEnabled;
  const displayedStudents=task.createdAt?students.map(student=>({...student,guidance:'未开始',submission:'未提交',grading:'未进入批改',time:'—'})):students;
  document.getElementById('taskManagementGuidanceRows').innerHTML=displayedStudents.map((student,index)=>{const status=guidanceEnabled?student.guidance:'未开启';return `<tr><td>${student.name}</td><td><span class="task-management-pill ${status==='已完成'?'green':status==='未开启'?'gray':'blue'}">${status}</span></td><td>${guidanceEnabled?student.time:'—'}</td><td class="action-cell">${guidanceEnabled&&status==='已完成'?`<a class="admin-text-link" href="#/backend/student/S0${index+1}/result/W00${index+1}/report?tab=guidance">进入作文报告</a>`:'—'}</td></tr>`;}).join('');
  document.getElementById('taskManagementStudentRows').innerHTML=displayedStudents.map((student,index)=>{const status=guidanceEnabled?student.guidance:'未开启';const reportHref=`#/backend/student/S0${index+1}/result/W00${index+1}/report?tab=guidance`;const canOpenReport=status==='已完成'&&student.submission==='已提交';return `<tr><td>${index+1}</td><td>${student.name}</td><td><span class="task-management-pill ${status==='已完成'?'green':status==='未开启'?'gray':'blue'}">${status}</span></td><td><span class="task-management-pill ${student.submission==='已提交'?'green':'gray'}">${student.submission}</span></td><td><span class="task-management-pill ${student.grading==='已批改'?'green':student.grading==='未进入批改'?'gray':'blue'}">${student.grading}</span></td><td>${student.time}</td><td class="action-cell">${canOpenReport?`<a class="admin-text-link" href="${reportHref}">进入学习作文报告</a>`:'—'}</td></tr>`;}).join('');
 }
 function decorateTaskListRows(){
  const body=document.getElementById('taskManagementRows');if(!body)return;
  const empty=body.querySelector('.learning-empty');if(empty){empty.setAttribute('colspan','11');return;}
  body.querySelectorAll('tr').forEach(row=>{
   const link=row.querySelector('a[href*="/backend/tasks/"]'),task=link&&tasks.find(item=>link.getAttribute('href').endsWith(`/${item.id}`));
   if(!task||row.querySelector('[data-task-dates-cell]'))return;
   const average=row.children[6],start=document.createElement('td'),end=document.createElement('td');start.dataset.taskDatesCell='start';start.textContent=task.start||'—';end.dataset.taskDatesCell='end';end.textContent=task.end||'—';row.insertBefore(start,average);row.insertBefore(end,average);
   const action=row.querySelector('.action-cell');if(action){const remove=document.createElement('button');remove.type='button';remove.className='admin-text-link task-delete-action';remove.dataset.taskDelete=task.id;remove.textContent='刪除';action.append(' ',remove);}
  });
 }
 function enhanceTaskDetail(detail){
  if(detail.querySelector('.task-original-analysis'))return;
  const meta=detail.querySelector('[data-task-meta]'),dates=document.createElement('p');dates.className='admin-caption';dates.dataset.taskDates='';dates.textContent='開始時間：—　截止時間：—';meta?.after(dates);
  const statGrid=detail.querySelector('.task-management-stat-grid'),pass=document.createElement('article');pass.innerHTML='<span>及格率</span><strong class="purple" data-task-pass-rate>—</strong><small>及格分：60 分</small>';statGrid?.insertBefore(pass,statGrid.children[2]||null);
  const overview=detail.querySelector('[data-task-pane="overview"]'),analysis=document.createElement('div');analysis.className='task-original-analysis';analysis.innerHTML='<article><h3>AI 智能总结</h3><p>当前任务已完成学生的作文数据将汇总为班级分析，帮助教师快速定位共性问题。</p><button type="button" class="admin-button">薄弱点分析</button></article><article><h3>评分维度分析</h3><div class="task-dimension-row"><span>内容</span><b>—</b><i><em style="width:0%"></em></i></div><div class="task-dimension-row"><span>表达</span><b>—</b><i><em style="width:0%"></em></i></div><div class="task-dimension-row"><span>结构</span><b>—</b><i><em style="width:0%"></em></i></div></article>';
  const flow=overview?.querySelector('.task-management-flow');flow?.before(analysis);
 }
 function bindPanels(list,detail){
  list.querySelector('#taskManagementSearchForm').addEventListener('submit',event=>{event.preventDefault();query=list.querySelector('#taskManagementSearch').value.trim();renderList();});
  list.querySelector('#taskManagementReset').addEventListener('click',()=>{query='';filter='all';list.querySelector('#taskManagementSearch').value='';list.querySelectorAll('[data-task-filter]').forEach(button=>button.classList.toggle('is-active',button.dataset.taskFilter==='all'));renderList();});
  list.querySelectorAll('[data-task-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.taskFilter;list.querySelectorAll('[data-task-filter]').forEach(item=>item.classList.toggle('is-active',item===button));renderList();}));
  list.addEventListener('click',event=>{const button=event.target.closest('[data-task-delete]');if(!button)return;const task=tasks.find(item=>item.id===button.dataset.taskDelete);if(task&&window.confirm(`确认删除任务“${task.title}”吗？`)){tasks=tasks.filter(item=>item.id!==task.id);saveTasks();renderList();}});
  detail.querySelectorAll('[data-task-pane-tab]').forEach(button=>button.addEventListener('click',()=>{const pane=button.dataset.taskPaneTab;detail.querySelectorAll('[data-task-pane-tab]').forEach(item=>item.classList.toggle('is-active',item===button));detail.querySelectorAll('[data-task-pane]').forEach(item=>item.hidden=item.dataset.taskPane!==pane);}));
 }
 function renderRoute(){
  addMenu();addPublishCapability();addTaskPanels();normalizeBackendOverview();
  const hash=location.hash,parts=hash.slice(2).split('/'),isList=parts[0]==='backend'&&parts[1]==='tasks'&&parts.length===2,isDetail=parts[0]==='backend'&&parts[1]==='tasks'&&parts.length===3,task=tasks.find(item=>item.id===parts[2]);
  const overview=document.getElementById('writingBackendOverview'),list=document.getElementById('writingTaskManagementList'),detail=document.getElementById('writingTaskManagementDetail');
  if(!list||!detail)return;
  overview.hidden=hash!=='#/backend';
  list.hidden=!isList;detail.hidden=!(isDetail&&task);
  if(!isList&&!isDetail){if(hash==='#/backend/publish-essay')document.getElementById('writingPageTitle').textContent='发布任务';return;}
  document.querySelector('.writing-not-found')?.remove();
  document.getElementById('studentWritingList')?.setAttribute('hidden','');document.getElementById('studentWritingHistory')?.setAttribute('hidden','');document.getElementById('studentWritingResult')?.setAttribute('hidden','');document.getElementById('studentWritingReport')?.setAttribute('hidden','');document.getElementById('writingPublishPage')?.setAttribute('hidden','');
  const markTaskMenu=()=>document.querySelectorAll('#writingMenuItems a, #writingTopMenuItems a').forEach(link=>link.matches('[data-task-management]')?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));markTaskMenu();setTimeout(markTaskMenu,0);
  const title=document.getElementById('writingPageTitle'),back=document.getElementById('writingPageBack');title.textContent=isList?'任務管理':'任務詳情';back.hidden=false;back.href=isDetail?'#/backend/tasks':'#/backend';back.textContent='返回任務列表';document.getElementById('writingBreadcrumb').innerHTML=isList?'<span>任務管理</span><span aria-hidden="true">/</span><span aria-current="page">任務管理</span>':'<span>任務管理</span><span aria-hidden="true">/</span><a href="#/backend/tasks">任務管理</a><span aria-hidden="true">/</span><span aria-current="page">任務詳情</span>';
  if(isList)renderList();else if(task)renderDetail(task);
 }
 window.addEventListener('hashchange',renderRoute);window.addEventListener('previewview',event=>{if(event.detail==='backend')renderRoute();});
 renderRoute();
})();

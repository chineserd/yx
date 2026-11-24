(function(){
 const content=document.getElementById('writingAdminContent');
 if(!content)return;
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const seedTasks=[
  {id:'T001',type:'essay',title:'《對當代中國發展有貢獻或影響力的人物》',className:'2A',grade:'S2',total:30,submit:'20 / 30',completionSubmitted:8,completionTotal:8,guidanceEnabled:true,guidance:'18 / 30',average:'51.8',highest:'65',grading:'15 / 20',start:'2026-10-16',end:'2026-10-28',passRate:'25.0%'},
  {id:'T002',type:'essay',title:'《窗》',className:'2B',grade:'S2',total:30,submit:'20 / 30',completionSubmitted:8,completionTotal:8,guidanceEnabled:true,guidance:'18 / 30',average:'51.8',highest:'65',grading:'15 / 20',start:'2026-10-21',end:'2026-10-28',passRate:'25.0%'}
 ];
 const withDemoData=item=>{
  if(!item?.createdAt || Number.parseInt(String(item.submit).split('/')[0],10)>0)return item;
  const total=item.total||30,submitted=Math.min(20,total),graded=Math.min(15,submitted),guided=Math.min(18,total);
  const guidanceEnabled=Boolean(item.guidanceEnabled);
  return {...item,demoPreview:true,guidanceEnabled,guidanceSubmissionRequired:item.uploadMethod==='teacher'?false:Boolean(item.guidanceSubmissionRequired),submit:`${submitted} / ${total}`,guidance:guidanceEnabled?`${guided} / ${total}`:'未开始',grading:`${graded} / ${submitted}`,average:'51.8',highest:'65',passRate:'25.0%'};
 };
 const taskStorageKey='writingGuideTasksV1';
 let tasks=(()=>{
  try{
   const saved=JSON.parse(localStorage.getItem(taskStorageKey));
   if(!Array.isArray(saved))return [...seedTasks];
   const seedIds=new Set(seedTasks.map(item=>item.id));
   const published=saved.filter(item=>item&&typeof item.id==='string'&&!seedIds.has(item.id)).map(withDemoData);
   return [...published,...seedTasks];
  }catch(error){return [...seedTasks];}
 })();
 const saveTasks=()=>{try{localStorage.setItem(taskStorageKey,JSON.stringify(tasks));}catch(error){/* 原型预览可在禁用存储时继续使用内存数据 */}};
 const seedScores=[65,61,60,58,56,54,52,51,49,48,47,46,45,44,41];
 const students=[
  ...['陳曉晴','林子晴','黃雅婷','李家俊','張芷欣','王柏謙','劉思穎','周嘉欣','何俊傑','吳心怡','鄭梓豪','梁詠恩','許樂彤','蔡宇軒','郭欣妍','馮子謙','羅思敏','曾俊熙','葉可欣','蘇卓然','方詠琳','潘浩然','鍾曉彤','謝家朗','杜可兒','馬俊言','邱梓晴','宋皓軒','唐思琪','高雅文'].map((name,index)=>({
   name,guidance:index<18?'已完成':'未开始',submission:index<20?'已提交':'未提交',grading:index<15?'已批改':index<20?'批改中':'未进入批改',
   score:index<seedScores.length?String(seedScores[index]):'—',time:index<20?`2026-10-${16+Math.floor(index/8)} ${String(9+Math.floor(index%8/4)).padStart(2,'0')}:${String(8+(index%4)*12).padStart(2,'0')}`:'—',
   guidanceTime:index<18?`2026-10-${16+Math.floor(index/8)} ${String(8+Math.floor(index%8/4)).padStart(2,'0')}:${String(12+(index%4)*11).padStart(2,'0')}`:'—',
   duration:index<20?`${38+index%17}分钟`:'—'
  }))
 ];
 const guidanceOriginal=(task,student)=>{
  const ideas=[
   ['放学后和家人一起准备晚饭','从忙碌到互相理解','厨房里的对话'],
   ['和同学共同完成小组展示','从分工误会到主动沟通','展示前的排练'],
   ['一次独自解决难题的经历','从犹豫到敢于尝试','反复尝试的过程']
  ];
  const [event,change,scene]=ideas[Math.max(0,students.findIndex(item=>item.name===student.name))%ideas.length];
  return [
   `我理解《${task.title.replace(/[《》]/g,'')}》的重点是结合自己的经历，写出${change}的感受。`,
   `我会选用${event}，重点写${scene}和自己的想法。`,
   `文章按事情的起因、经过和结果展开，详写${scene}，结尾照应题目。`,
   `先把${event}讲清楚，再写${change}；修改时检查是否切题、事例是否具体、段落是否连贯。`
  ];
 };
  let query='',filter='all',classFilter='',gradeFilter='',statusFilter='',studentQuery='',activeTask=null;
 window.addEventListener('writing-task-created',event=>{
  const task=event.detail;
  if(!task?.id)return;
  tasks=[withDemoData(task),...tasks.filter(item=>item.id!==task.id)];
  saveTasks();
  if(location.hash==='#/backend/tasks')renderList();
 });
 const script=document.createElement('link');script.rel='stylesheet';script.href='task-management.css?v=task-management-20261116-submission-datetime';document.head.appendChild(script);
 function addMenu(){
  const nav=document.getElementById('writingMenuItems');
  if(nav&&!nav.querySelector('[data-task-management]'))nav.insertAdjacentHTML('beforeend','<a class="admin-menu-static" data-task-management href="#/backend/tasks" title="任務管理"><span class="admin-menu-icon" aria-hidden="true">▦</span><span class="admin-menu-label">任務管理</span></a>');
  const taskLink=nav?.querySelector('[data-task-management]'),taskLabel=taskLink?.querySelector('.admin-menu-label');
  if(taskLabel&&!taskLabel.querySelector('.requirement-badge'))taskLabel.insertAdjacentHTML('beforeend',' <span class="requirement-badge">需求</span>');
 }
 function addPublishCapability(){
  const page=document.getElementById('writingPublishPage');
  if(!page||page.querySelector('.writing-publish-capability'))return;
  const publishTitle=document.getElementById('writingPublishTitle');if(publishTitle)publishTitle.textContent='发布任务';
  const publishLink=document.querySelector('#writingMenuItems a[href="#/backend/publish-essay"]');
  if(publishLink){const label=publishLink.querySelector('.admin-menu-label');if(label){const badge=label.querySelector('.requirement-badge');label.textContent='发布任务 ';if(badge)label.appendChild(badge);}}
  const section=document.createElement('section');section.className='writing-publish-capability';section.innerHTML='<h4>功能配置</h4><div class="writing-publish-capability-grid writing-publish-capability-grid-one"><div class="writing-publish-capability-item writing-publish-guidance-card" data-capability-card="guidance"><label class="writing-publish-guidance-main"><input type="checkbox" name="writingCapabilityGuidance"><span><strong>写前指导（可选）</strong><small>审题、立意、选材、结构与表达。</small></span><em>可选</em></label><label class="writing-guidance-submit-setting is-unavailable"><span><strong>学生须提交写前指导</strong><small>开启后须提交；关闭后仍收到作文任务。</small></span><input type="checkbox" role="switch" name="writingGuidanceSubmissionRequired" aria-label="学生须提交写前指导" disabled></label></div></div>';
  const capabilitySlot=page.querySelector('#writingPublishGuidanceSlot');
  if(capabilitySlot)capabilitySlot.append(section);
  else page.querySelector('.writing-publish-actions')?.before(section);
  const guidanceInput=section.querySelector('input[name="writingCapabilityGuidance"]');
  const guidanceCard=section.querySelector('[data-capability-card="guidance"]');
  const submissionInput=section.querySelector('input[name="writingGuidanceSubmissionRequired"]');
  const submissionSetting=section.querySelector('.writing-guidance-submit-setting');
  section.querySelector('.writing-publish-guidance-main em')?.remove();
  const uploadRadios=[...page.querySelectorAll('input[name="writingUploadMethod"]')];
  uploadRadios.forEach((input,index)=>{input.value=index===0?'student':'teacher';});
  const syncGuidanceSubmission=()=>{
   const enabled=Boolean(guidanceInput?.checked);
   const studentUpload=uploadRadios.find(input=>input.checked)?.value!=='teacher';
   guidanceCard.classList.toggle('is-current',enabled);
   submissionSetting.hidden=!studentUpload;
   submissionInput.disabled=!enabled||!studentUpload;
   if(!enabled||!studentUpload)submissionInput.checked=false;
   submissionSetting.classList.toggle('is-unavailable',!enabled);
  };
  guidanceInput?.addEventListener('change',syncGuidanceSubmission);
  uploadRadios.forEach(input=>input.addEventListener('change',syncGuidanceSubmission));
  syncGuidanceSubmission();
 }
 function addTaskPanels(){
  if(document.getElementById('writingTaskManagementList'))return;
  const list=document.createElement('section');list.id='writingTaskManagementList';list.className='admin-card task-management-card';list.hidden=true;list.innerHTML='<div class="admin-list-heading"><div><h2>任务管理</h2><span class="admin-caption">查看命题作文任务、作文提交进度与作文报告</span></div><a class="admin-button primary" href="#/backend/publish-essay">＋ 发布新任务</a></div><form class="learning-filters task-management-filters" id="taskManagementSearchForm" role="search"><label class="sr-only" for="taskManagementSearch">搜索任务</label><input id="taskManagementSearch" placeholder="搜索任务..." type="search" autocomplete="off"><select id="taskManagementClassFilter" aria-label="班级／小组"><option value="">所有班级／小组</option></select><select id="taskManagementGradeFilter" aria-label="年级"><option value="">所有年级</option></select><select id="taskManagementStatusFilter" aria-label="任务状态"><option value="">所有状态</option><option value="进行中">进行中</option><option value="已结束">已结束</option><option value="待上传">待上传</option></select><button class="admin-button primary" type="submit">查询</button><button class="admin-button" id="taskManagementReset" type="button">重置</button></form><div class="task-management-tabs" role="tablist" aria-label="任务类型"><button type="button" class="task-management-tab is-active" data-task-filter="all">全部任务</button><button type="button" class="task-management-tab" data-task-filter="practice">专项练习</button><button type="button" class="task-management-tab" data-task-filter="reading">阅读理解</button><button type="button" class="task-management-tab" data-task-filter="essay">命题作文</button></div><div class="table-scroll task-management-table-scroll" tabindex="0" role="region" aria-label="命题作文任务列表"><table class="learning-table task-management-table"><thead><tr><th class="task-name-column">任务名称</th><th>作文提交进度</th><th>类型</th><th>班级／小组</th><th>年级</th><th>开始时间</th><th>截止时间</th><th>平均分</th><th>最高得分</th><th class="action-cell task-action-column">操作</th></tr></thead><tbody id="taskManagementRows"></tbody></table></div><div class="admin-table-footer"><span id="taskManagementCount"></span><span>进入任务详情查看写前指导进度、學生答題情況和作文报告</span></div></section>';
  ['className','grade'].forEach(key=>{const select=list.querySelector(key==='className'?'#taskManagementClassFilter':'#taskManagementGradeFilter');[...new Set(tasks.map(item=>item[key]).filter(Boolean))].forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=value;select.append(option);});});
  const detail=document.createElement('section');detail.id='writingTaskManagementDetail';detail.className='admin-card task-management-card';detail.hidden=true;detail.innerHTML='<div class="task-management-detail-heading"><div class="task-detail-heading-main"><a class="task-detail-back" href="#/backend/tasks" aria-label="返回任务列表">←</a><div class="task-detail-heading-copy"><h2 id="taskManagementTitle"></h2><p class="admin-caption" data-task-meta>2026-10-16　|　2A (30人)</p></div></div><div class="task-management-actions"><button type="button" class="admin-button primary">成绩公布　未公布</button><button type="button" class="admin-button">刷新</button><button type="button" class="admin-button">导出成绩表</button></div></div><div class="task-management-section-heading"><h3>成绩概览</h3></div><div class="task-management-pane" data-task-pane="overview"><div class="task-management-stat-grid"><article><span>平均分</span><strong data-task-average>51.8</strong></article><article><span>最高分</span><strong class="green" data-task-highest>65</strong></article><article><span>完成率</span><strong data-task-completion>100.0%</strong><small data-task-completion-note>8 / 8 人</small></article><article><span>写前指导完成</span><strong class="purple" data-task-guidance-stat>18 / 30</strong><small data-task-guidance-note>已完成 18 人</small></article></div></div><div class="task-management-pane task-management-students" data-task-pane="students"><div class="task-student-toolbar"><div class="task-student-statuses"><button type="button" class="task-management-pill is-selected">全班 8 人</button><button type="button" class="task-management-pill gray">未导入 0 人</button><button type="button" class="task-management-pill blue">批改中 0 人</button><button type="button" class="task-management-pill green">已批改 8 人</button></div><div class="task-student-actions"><button type="button" class="admin-button">刷新</button><button type="button" class="admin-button primary">查看成绩 <span>8人</span></button></div><form class="task-student-search" id="taskStudentSearchForm" role="search"><label class="sr-only" for="taskStudentSearch">搜索班級編號／姓名</label><input id="taskStudentSearch" placeholder="搜尋班級編號／姓名" type="search" autocomplete="off"><button class="admin-button" id="taskStudentReset" type="button">重置</button></form></div><p class="task-demo-note">以下学生记录为原型模拟数据</p><div class="table-scroll task-student-table-scroll"><table class="learning-table task-student-table"><thead><tr><th>排名</th><th>班級編號</th><th>姓名</th><th>写前指导</th><th>作文内容</th><th>得分</th><th>提交时间</th><th>完成用时</th><th>提交情况</th><th>批改状态</th><th class="action-cell">操作</th></tr></thead><tbody id="taskManagementStudentRows"></tbody></table></div></div><div class="task-management-pane" data-task-pane="report" hidden><div class="task-management-report-grid"><a class="task-management-report-card" href="#/backend/report"><strong>写前指导</strong><span>查看学生本次写前指导内容</span></a><a class="task-management-report-card" href="#/backend/student/S01/result/W001/report?tab=grading"><strong>作文批改</strong><span>图片／文字　进入作文报告</span></a></div></div>';
  const studentPane=detail.querySelector('[data-task-pane="students"]');
  studentPane.querySelector('.task-student-table thead tr').innerHTML='<th>排名</th><th>學生</th><th>得分</th><th>品第</th><th class="task-submission-date-column">提交日期</th><th class="task-guidance-column"><span class="task-student-requirement-tag">需求</span>寫前指導</th><th>作文批改状态</th><th class="action-cell">操作</th>';
  const studentTableHeading=document.createElement('div');
  studentTableHeading.className='task-student-table-heading';
  studentTableHeading.innerHTML='<h3><span aria-hidden="true">▤</span> 學生答題情況 <span class="requirement-badge">需求</span></h3>';
  studentTableHeading.append(studentPane.querySelector('#taskStudentSearchForm'));
  studentPane.querySelector('.task-student-table-scroll').before(studentTableHeading);
  studentPane.querySelector('.task-student-toolbar')?.remove();
  studentPane.querySelector('.task-demo-note')?.remove();
  const listHeading=list.querySelector('.admin-list-heading'),filterForm=list.querySelector('#taskManagementSearchForm'),tabs=list.querySelector('.task-management-tabs');
  if(listHeading&&filterForm&&tabs){const filterCard=document.createElement('div');filterCard.className='task-management-filter-card';const filterRow=document.createElement('div');filterRow.className='task-management-filter-row';filterRow.append(filterForm,listHeading.querySelector('a'));filterCard.append(filterRow,tabs);listHeading.replaceWith(filterCard);}
  detail.querySelector('.task-management-detail-heading>div>.admin-caption')?.remove();
  const reportCards=detail.querySelectorAll('.task-management-report-card');
  if(reportCards[0]){reportCards[0].dataset.reportCard='guidance';reportCards[0].href='#/backend/student/S01/result/W001/report?tab=guidance';reportCards[0].querySelector('strong').textContent='写前指导';}
  if(reportCards[1]){reportCards[1].dataset.reportCard='grading';reportCards[1].href='#/backend/student/S01/result/W001/report?tab=grading';reportCards[1].querySelector('strong').textContent='作文批改报告';}
  detail.querySelector('[data-task-pane="report"]')?.remove();
  const previewDialog=document.createElement('dialog');previewDialog.id='taskStudentPreviewDialog';previewDialog.className='task-student-preview-dialog';previewDialog.innerHTML='<form method="dialog"><button type="submit" class="task-preview-close" aria-label="关闭">×</button></form><h2 data-preview-title></h2><p class="task-demo-note">原型模拟内容</p><div data-preview-body></div>';
  content.append(list,detail,previewDialog);
  enhanceTaskDetail(detail);
  new MutationObserver(decorateTaskListRows).observe(list.querySelector('#taskManagementRows'),{childList:true});
  bindPanels(list,detail);
 }
 function renderList(){
  const rows=tasks.filter(item=>{
   const submitCount=Number.parseInt(String(item.submit).split('/')[0],10)||0,total=item.total||30;
   const state=submitCount>=total?'已结束':submitCount?'进行中':'待上传';
   return (filter==='all'||filter===item.type)&&item.title.includes(query)&&(!classFilter||item.className===classFilter)&&(!gradeFilter||item.grade===gradeFilter)&&(!statusFilter||state===statusFilter);
  });
  document.getElementById('taskManagementRows').innerHTML=rows.length?rows.map(item=>{const submitCount=Number.parseInt(String(item.submit).split('/')[0],10)||0,total=item.total||30;const state=submitCount>=total?'已结束':submitCount?'进行中':'待上传';return `<tr><td class="topic-cell task-name-column"><a class="admin-text-link" href="#/backend/tasks/${item.id}">${esc(item.title)}</a></td><td><span class="task-submit-cell"><b class="task-management-pill ${state==='已结束'?'blue':'green'}">${state}</b><strong>${item.submit}</strong><i><em style="width:${Math.min(100,Math.round(submitCount/total*100))}%"></em></i></span></td><td><span class="task-management-type">命题作文</span></td><td>${esc(item.className)}</td><td>${esc(item.grade)}</td><td>${item.start||'—'}</td><td class="task-deadline">${item.end||'—'}</td><td>${item.average}</td><td>${item.highest}</td><td class="action-cell task-action-column"><a class="admin-text-link" href="#/backend/tasks/${item.id}">查看详情</a><button type="button" class="admin-text-link task-delete-action" data-task-delete="${item.id}">删除</button></td></tr>`;}).join(''):'<tr><td colspan="10" class="learning-empty">没有符合条件的任务</td></tr>';
  document.getElementById('taskManagementCount').textContent=`共 ${rows.length} 個任務`;
 }
 function renderDetail(task){
  activeTask=task;
  document.getElementById('taskManagementTitle').textContent=`作文标题：${task.title}`;
  document.querySelector('[data-task-meta]').textContent=`${task.start||'—'}　|　${task.className} (${task.total||30}人)`;
  document.querySelector('[data-task-average]').textContent=task.average||'—';
  document.querySelector('[data-task-highest]').textContent=task.highest||'—';
  const highestStudent=document.querySelector('.task-highest-student');if(highestStudent)highestStudent.textContent=task.highest&&task.highest!=='—'?students[0].name:'';
  const submitCount=Number.parseInt(String(task.submit).split('/')[0],10)||0,total=task.total||30,completionSubmitted=submitCount,completionTotal=total,completion=completionTotal?Math.round(completionSubmitted/completionTotal*1000)/10:0,completionDisplay=completion.toFixed(1);
  document.querySelector('[data-task-pass-rate]').textContent=task.passRate||'—';
  document.querySelector('[data-task-completion]').textContent=`${completionDisplay}%`;
  document.querySelector('[data-task-completion-note]').textContent=`(${completionSubmitted}/${completionTotal} 人)`;
  const guidanceEnabled=Boolean(task.guidanceEnabled);
  const guidanceCard=document.querySelector('[data-task-guidance-stat]')?.closest('article');
  if(guidanceCard)guidanceCard.hidden=!guidanceEnabled;
  document.querySelector('.task-management-stat-grid')?.classList.toggle('without-guidance',!guidanceEnabled);
  const guidanceColumn=document.querySelector('.task-student-table th.task-guidance-column');
  if(guidanceColumn)guidanceColumn.hidden=!guidanceEnabled;
  document.querySelector('.task-student-table')?.classList.toggle('without-guidance',!guidanceEnabled);
  const guidanceText=guidanceEnabled?task.guidance:'未开始';
  document.querySelector('[data-task-guidance-stat]').textContent=guidanceText;
  document.querySelector('[data-task-guidance-note]').textContent=task.guidanceEnabled?`已完成 ${task.guidance.split('/')[0].trim()} 人`:'写前指导未开启';
  const completionBar=document.querySelector('[data-task-completion-bar]');if(completionBar)completionBar.style.width=`${completion}%`;
  const guidanceCount=task.guidanceEnabled?(Number.parseInt(String(task.guidance).split('/')[0],10)||0):0;
  const gradedCount=Number.parseInt(String(task.grading).split('/')[0],10)||0;
  const submissionDate=index=>{const date=new Date(`${task.start||'2026-10-16'}T00:00:00`);if(Number.isNaN(date.getTime()))return '—';date.setDate(date.getDate()+Math.floor(index/8));const hour=String(9+Math.floor(index%8/4)).padStart(2,'0'),minute=String(8+(index%4)*12).padStart(2,'0');return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${hour}:${minute}`;};
  renderTaskDimensionDetails(gradedCount);
  const displayedStudents=students.slice(0,total).map((student,index)=>({...student,studentId:index+1,
   guidance:index<guidanceCount?'已完成':'未开始',submission:index<submitCount?'已提交':'未提交',
   grading:index<gradedCount?'已批改':index<submitCount?'批改中':'未进入批改',
   score:index<gradedCount?student.score:'—',submissionDate:index<submitCount?submissionDate(index):'—',
   guidanceTime:index<guidanceCount?student.guidanceTime:'—',duration:index<submitCount?student.duration:'—'
  }));
  const visibleStudents=displayedStudents.filter(student=>!studentQuery||student.name.includes(studentQuery));
  document.getElementById('taskManagementStudentRows').innerHTML=visibleStudents.map(student=>{
    const status=guidanceEnabled?student.guidance:'未開啟';
   const reportBase=`#/backend/student/S${String(student.studentId).padStart(2,'0')}/result/W${String(student.studentId).padStart(3,'0')}/report`;
    const reportHref=`${reportBase}?tab=grading&taskId=${encodeURIComponent(task.id)}`;
    const submitted=student.submission==='已提交',graded=student.grading==='已批改';
    const guidanceClass=status==='已完成'?'green':'gray';
    const detail=graded?`<a class="task-student-detail" href="${reportHref}">查看詳情</a>`:'<button class="task-student-detail" type="button" disabled>查看詳情</button>';
    const gradingStatus=graded?'已批改':submitted?'批改中':'未提交';
    const gradingClass=graded?'green':submitted?'blue':'gray';
    return `<tr><td><span class="task-student-rank">${graded?student.studentId:'—'}</span></td><td class="task-student-name"><span class="task-student-avatar" aria-hidden="true">${esc(student.name.slice(0,1))}</span>${esc(student.name)}</td><td class="task-student-score">${graded?esc(student.score):'—'}</td><td>${esc(student.grade||'—')}</td><td class="task-submission-date-column">${esc(student.submissionDate)}</td><td class="task-guidance-column"${guidanceEnabled?'':' hidden'}><span class="task-management-pill ${guidanceClass}">${esc(status)}</span></td><td><span class="task-management-pill ${gradingClass}">${gradingStatus}</span></td><td class="action-cell">${detail}</td></tr>`;
  }).join('');

 }
 function decorateTaskListRows(){
  const body=document.getElementById('taskManagementRows');if(!body)return;
  const empty=body.querySelector('.learning-empty');if(empty){empty.setAttribute('colspan','10');return;}
  body.querySelectorAll('tr').forEach(row=>{
   const deleteButton=row.querySelector('[data-task-delete]'),actionCell=deleteButton?.closest('td');
   if(!deleteButton||!actionCell||actionCell.querySelector('.task-action-buttons'))return;
   const task=tasks.find(item=>item.id===deleteButton.dataset.taskDelete);if(!task)return;
   const submitCount=Number.parseInt(String(task.submit).split('/')[0],10)||0;
   const reportButton='<button type="button" class="task-action-button task-action-report is-disabled" disabled>班级作文报告</button>';
   actionCell.innerHTML=`<div class="task-action-buttons"><button type="button" class="task-action-button task-action-batch" data-task-batch-submit="${task.id}"><span class="task-action-icon" aria-hidden="true">⇧</span>批量提交</button>${reportButton}<a class="task-action-button task-action-detail" href="#/backend/tasks/${task.id}">查看详情</a><button type="button" class="task-action-button task-action-delete" data-task-delete="${task.id}">删除</button></div>`;
  });
 }
 function enhanceTaskDetail(detail){
  if(detail.querySelector('.task-original-analysis'))return;
  const statGrid=detail.querySelector('.task-management-stat-grid');
  const pass=document.createElement('article');
  pass.className='task-pass-card';
  pass.innerHTML='<span>及格率</span><strong data-task-pass-rate>—</strong>';
  statGrid?.insertBefore(pass,statGrid.children[2]||null);
  const highest=detail.querySelector('[data-task-highest]');
  if(highest&&!highest.nextElementSibling)highest.insertAdjacentHTML('afterend',`<small class="task-highest-student">${students[0].name}</small>`);
  const completionCard=detail.querySelector('[data-task-completion]')?.closest('article');
  if(completionCard&&!completionCard.querySelector('.task-completion-bar'))completionCard.insertAdjacentHTML('beforeend','<div class="task-completion-bar"><i data-task-completion-bar></i></div>');
  const overview=detail.querySelector('[data-task-pane="overview"]');
  const analysis=document.createElement('div');
  analysis.className='task-original-analysis';
  analysis.innerHTML=`
   <div class="task-ai-summary"><span aria-hidden="true">ϟ</span> AI 智能總結</div>
   <section class="task-weak-analysis" aria-labelledby="taskWeakHeading">
    <header><h3 id="taskWeakHeading"><span aria-hidden="true">⌁</span> 薄弱點分析</h3></header>
    <div class="task-weak-analysis-grid">
     <section class="task-radar-panel"><h4>評分維度分析</h4>
      <svg class="task-radar" viewBox="0 0 320 300" role="img" aria-label="評分維度分析：內容100、標點字體70、結構60、表達53">
       <g fill="none" stroke="#dbe3ee" stroke-width="1"><path d="M160 45L265 150L160 255L55 150Z M160 71L239 150L160 229L81 150Z M160 97L213 150L160 203L107 150Z M160 124L186 150L160 176L134 150Z M160 45V255 M55 150H265"/></g>
       <path d="M160 45L234 150L160 213L104 150Z" fill="#4b83f233" stroke="#3978ef" stroke-width="3"/>
       <g fill="#3978ef"><circle cx="160" cy="45" r="4"/><circle cx="234" cy="150" r="4"/><circle cx="160" cy="213" r="4"/><circle cx="104" cy="150" r="4"/></g>
       <g class="task-radar-labels"><text x="160" y="19" text-anchor="middle">內容</text><text x="277" y="153">標點字體</text><text x="160" y="286" text-anchor="middle">結構</text><text x="8" y="153">表達</text></g>
       <g class="task-radar-values"><text x="160" y="38" text-anchor="middle">100</text><text x="242" y="143">70</text><text x="160" y="231" text-anchor="middle">60</text><text x="82" y="144" text-anchor="middle">53</text></g>
      </svg>
     </section>
     <section class="task-dimension-panel"><div class="task-dimension-heading"><h4>維度得分詳情</h4><div class="task-weak-legend"><span class="attention">● 需關注 (&lt;50%)</span><span class="normal">● 一般 (50–69%)</span><span class="excellent">● 優異 (≥70%)</span></div></div><div data-task-dimension-details></div></section>
    </div>
   </section>`;
  overview?.append(analysis);
 }
 function renderTaskDimensionDetails(gradedCount){
  const host=document.querySelector('[data-task-dimension-details]');
  if(!host)return;
  const dimensions=[
   {name:'表達',rate:53,level:'normal'},
   {name:'結構',rate:60,level:'normal'},
   {name:'標點字體',rate:70,level:'excellent'},
   {name:'內容',rate:100,level:'excellent'}
  ];
  host.innerHTML=dimensions.map(item=>{
   const attention=item.level==='attention'?gradedCount:0;
   const normal=item.level==='normal'?gradedCount:0;
   const excellent=item.level==='excellent'?gradedCount:0;
   return `<div class="task-dimension-detail"><div class="task-dimension-label"><strong>${item.name}</strong><span class="${item.level}">平均: ${item.rate}%</span></div><div class="task-score-bar"><i class="${item.level}" style="width:${gradedCount?100:0}%"></i></div><div class="task-dimension-counts"><span class="attention">● ${attention}人</span><span class="normal">● ${normal}人</span><span class="excellent">● ${excellent}人</span></div></div>`;
  }).join('');
 }
 const reportStudents=Object.fromEntries(students.map((student,index)=>{const id=`S${String(index+1).padStart(2,'0')}`;return [id,{id,name:student.name}];}));
 const reportResults={
  W001:{id:'W001',genre:'論說文',stance:'視乎情況而論',keywords:'經歷挫折、成長',thesis:'本文將辯證地指出：挫折能否使人成長，視乎人如何回應；挫折本身不是成長的保證，真正的成長來自反思、調整與再次行動。',materials:['校際辯論落敗：反思與行動把挫折轉化為成長。','成長型思維：人的理解與回應影響結果。','習得性無助：駁斥「挫折必然使人成長」。'],outline:['開首 · 破題定義：界定成長不只是經歷困難，而是認知與行動有所改變。','第一段 · 正面論證：以校際辯論落敗為材料，說明反思與行動如何把挫折轉化為成長。','第二段 · 補充論證：以成長型思維說明人的理解與回應影響結果。','結尾 · 回扣昇華：挫折只是契機，真正決定結果的是回應挫折時的選擇。'],techniques:['正反對比：並置成長與沉淪兩種回應，突出選擇的重要。','比喻說理：把挫折化抽象為具體。']},
  W002:{id:'W002',genre:'記敍抒情',keywords:'一次經歷、改變',thesis:'從逃避分組責任到主動承擔，體會成長始於願意為自己的選擇負責。',materials:['分組匯報前準備不足，影響同伴。','補做資料、練習表達並完成匯報。'],outline:['以匯報前的緊張場景開篇。','交代拖延及對同伴造成的影響。','詳寫主動承擔與補救的經過。','以後來的行動呈現改變。'],techniques:['動作描寫','前後照應']},
  W003:{id:'W003',genre:'記敍抒情',keywords:'我的觀察、幸福',thesis:'幸福藏在家人日常的陪伴與互相照顧之中。',materials:['放學回家時桌上的一碗熱湯。','週末與家人一起準備晚飯。'],outline:['從熱湯的氣味引入回憶。','敘述日常陪伴的細節。','寫自己開始主動照顧家人。','回扣平凡生活中的幸福。'],techniques:['感官描寫','以小見大']}
 };
 function renderStudentReport(reportStudentId,reportWritingId,reportTab,reportTaskId){
  const panel=document.getElementById('studentWritingReport'),student=reportStudents[reportStudentId]||reportStudents.S01,result=reportResults[reportWritingId]||reportResults.W001;
  if(!panel||typeof renderWritingReport!=='function')return false;
  document.getElementById('writingTaskManagementList')?.setAttribute('hidden','');
  document.getElementById('writingTaskManagementDetail')?.setAttribute('hidden','');
  document.getElementById('writingPublishPage')?.setAttribute('hidden','');
  const sourceTask=tasks.find(item=>item.id===reportTaskId)||activeTask||tasks[0]||seedTasks[0];
  activeTask=sourceTask;
  const visibleReportTab=!sourceTask.guidanceEnabled&&reportTab==='guidance'?'grading':reportTab;
  const studentIndex=Math.max(0,Number.parseInt(reportStudentId.slice(1),10)-1||0);
  const gradedCount=Math.max(1,Math.min(students.length,Number.parseInt(String(sourceTask.grading).split('/')[0],10)||1));
  const reportHref=index=>`#/backend/student/S${String(index+1).padStart(2,'0')}/result/W${String(index+1).padStart(3,'0')}/report?tab=${encodeURIComponent(visibleReportTab)}&taskId=${encodeURIComponent(sourceTask.id)}`;
  renderWritingReport(student,{...result,id:reportWritingId,taskId:sourceTask.id,guidanceEnabled:Boolean(sourceTask.guidanceEnabled),topicTitle:sourceTask.title.replace(/[《》]/g,''),guidanceOriginal:guidanceOriginal(sourceTask,student),prevHref:studentIndex>0?reportHref(studentIndex-1):'',nextHref:studentIndex<gradedCount-1?reportHref(studentIndex+1):''},visibleReportTab);
  panel.removeAttribute('hidden');
  return true;
 }
 function bindPanels(list,detail){
  detail.addEventListener('click',event=>{
   const essayButton=event.target.closest('[data-view-essay]');
   if(!essayButton||!activeTask)return;
   const studentId=Number(essayButton.dataset.viewEssay);
   const student=students[studentId-1],dialog=document.getElementById('taskStudentPreviewDialog');
   if(!student||!dialog)return;
   dialog.querySelector('[data-preview-title]').textContent=`${student.name} · 作文内容`;
   dialog.querySelector('[data-preview-body]').innerHTML=`<section><h3>${esc(activeTask.title)}</h3><p>${esc(student.name)}在这次写作中，选取身边的一件小事，记录事情的经过和自己的感受。</p><p>事情发生后，我重新思考了自己的做法，也明白了认真观察和主动表达的重要。</p></section>`;
   dialog.showModal();
  });
  list.querySelector('#taskManagementSearchForm').addEventListener('submit',event=>{event.preventDefault();query=list.querySelector('#taskManagementSearch').value.trim();classFilter=list.querySelector('#taskManagementClassFilter').value;gradeFilter=list.querySelector('#taskManagementGradeFilter').value;statusFilter=list.querySelector('#taskManagementStatusFilter').value;renderList();});
  list.querySelector('#taskManagementReset').addEventListener('click',()=>{query='';filter='all';classFilter='';gradeFilter='';statusFilter='';list.querySelector('#taskManagementSearch').value='';list.querySelector('#taskManagementClassFilter').value='';list.querySelector('#taskManagementGradeFilter').value='';list.querySelector('#taskManagementStatusFilter').value='';list.querySelectorAll('[data-task-filter]').forEach(button=>button.classList.toggle('is-active',button.dataset.taskFilter==='all'));renderList();});
  list.querySelectorAll('[data-task-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.taskFilter;list.querySelectorAll('[data-task-filter]').forEach(item=>item.classList.toggle('is-active',item===button));renderList();}));
  list.addEventListener('click',event=>{const button=event.target.closest('[data-task-delete]');if(!button)return;const task=tasks.find(item=>item.id===button.dataset.taskDelete);if(task&&window.confirm(`确认删除任务“${task.title}”吗？`)){tasks=tasks.filter(item=>item.id!==task.id);saveTasks();renderList();}});
  detail.querySelector('#taskStudentSearchForm')?.addEventListener('submit',event=>{event.preventDefault();studentQuery=detail.querySelector('#taskStudentSearch').value.trim();if(activeTask)renderDetail(activeTask);});
  detail.querySelector('#taskStudentReset')?.addEventListener('click',()=>{studentQuery='';const input=detail.querySelector('#taskStudentSearch');if(input)input.value='';if(activeTask)renderDetail(activeTask);});
 }
 function renderRoute(){
  addMenu();addPublishCapability();addTaskPanels();
  const hash=location.hash,[route,queryString='']=hash.slice(2).split('?'),parts=route.split('/'),queryParams=new URLSearchParams(queryString),isList=parts[0]==='backend'&&parts[1]==='tasks'&&parts.length===2,isDetail=parts[0]==='backend'&&parts[1]==='tasks'&&parts.length===3,isReport=parts[0]==='backend'&&parts[1]==='student'&&parts[3]==='result'&&parts[5]==='report',isReportAlias=parts[0]==='backend'&&parts[1]==='report',task=tasks.find(item=>item.id===parts[2]);
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  window.scrollTo(0,0);
  requestAnimationFrame(()=>{window.scrollTo(0,0);document.documentElement.scrollTop=0;});
  const list=document.getElementById('writingTaskManagementList'),detail=document.getElementById('writingTaskManagementDetail'),report=document.getElementById('studentWritingReport'),entry=document.getElementById('writingPublishEntry');
  if(!list||!detail)return;
  if(hash==='#/backend'){
   location.hash='#/backend/tasks';
   return;
  }
  if(isReport||isReportAlias){
   list.hidden=true;detail.hidden=true;entry?.setAttribute('hidden','');
   document.getElementById('writingPublishPage')?.setAttribute('hidden','');
   const reportStudentId=isReport?parts[2]:'S01',reportWritingId=isReport?parts[4]:'W001',reportTab=queryParams.get('tab')||'guidance';
   report.removeAttribute('hidden');
   renderStudentReport(reportStudentId,reportWritingId,reportTab,queryParams.get('taskId'));
   document.querySelectorAll('#writingMenuItems a').forEach(link=>link.matches('[data-task-management]')?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));
   const title=document.getElementById('writingPageTitle'),back=document.getElementById('writingPageBack'),pageHeader=title?.closest('.admin-title');pageHeader.hidden=true;pageHeader.style.display='none';title.textContent='学习作文报告';back.hidden=true;back.href=`#/backend/tasks/${activeTask?.id||'T001'}`;back.textContent='返回任务详情';document.getElementById('writingBreadcrumb').hidden=false;document.getElementById('writingBreadcrumb').innerHTML=`<span>任務管理</span><span aria-hidden="true">/</span><a href="#/backend/tasks/${activeTask?.id||'T001'}">學生答題情況</a><span aria-hidden="true">/</span><span aria-current="page">學習作文報告</span>`;
   return;
  }
  report?.setAttribute('hidden','');
  entry?.setAttribute('hidden','');
  list.hidden=!isList;detail.hidden=!(isDetail&&task);
  if(!isList&&!isDetail){
   document.querySelectorAll('#writingMenuItems a').forEach(link=>link.removeAttribute('aria-current'));
   if(hash==='#/backend/publish-essay'){
    entry?.removeAttribute('hidden');
    document.getElementById('writingPublishPage')?.setAttribute('hidden','');
    document.getElementById('writingPageTitle').textContent='发布任务';
    document.getElementById('writingPageBack').hidden=true;
    document.getElementById('writingBreadcrumb').innerHTML='<span aria-current="page">發布任務</span>';
   }else{
    entry?.setAttribute('hidden','');
    document.getElementById('writingPublishPage')?.setAttribute('hidden','');
   }
   return;
  }
  document.querySelector('.writing-not-found')?.remove();
  document.getElementById('studentWritingList')?.setAttribute('hidden','');document.getElementById('studentWritingHistory')?.setAttribute('hidden','');document.getElementById('studentWritingResult')?.setAttribute('hidden','');document.getElementById('studentWritingReport')?.setAttribute('hidden','');document.getElementById('writingPublishPage')?.setAttribute('hidden','');
  const markTaskMenu=()=>document.querySelectorAll('#writingMenuItems a').forEach(link=>link.matches('[data-task-management]')?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));markTaskMenu();setTimeout(markTaskMenu,0);
  const title=document.getElementById('writingPageTitle'),back=document.getElementById('writingPageBack');title.textContent=isList?'任務管理':'任務詳情';back.hidden=false;back.href=isDetail?'#/backend/tasks':'#/backend';back.textContent='返回任務列表';document.getElementById('writingBreadcrumb').innerHTML=isList?'<span>任務管理</span><span aria-hidden="true">/</span><span aria-current="page">任務管理</span>':'<a href="#/backend/tasks">任務管理</a><span aria-hidden="true">/</span><span aria-current="page">任務詳情</span>';
  const breadcrumb=document.getElementById('writingBreadcrumb'),pageHeader=title?.closest('.admin-title');
  // 列表页按真实后台结构从筛选卡片开始；公共面包屑、页面标题及返回按钮只用于详情/报告页。
  if(breadcrumb){breadcrumb.hidden=isList;breadcrumb.style.display=isList?'none':'';}
  if(pageHeader){pageHeader.hidden=isList||isDetail;pageHeader.style.display=(isList||isDetail)?'none':'';}
  if(!isList&&isDetail&&pageHeader)pageHeader.hidden=true;
  if(isList)renderList();else if(task){renderDetail(task);if(queryParams.get('section')==='students')requestAnimationFrame(()=>detail.querySelector('[data-task-pane="students"]')?.scrollIntoView({block:'start'}));}
 }
 window.addEventListener('hashchange',renderRoute);window.addEventListener('previewview',event=>{if(event.detail==='backend')renderRoute();});
 renderRoute();
})();

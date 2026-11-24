import {speechData} from './speech-flow.js';
import {studentRecords,persistStudentRecords,recordsListPage,recordReportPage,recordTranscript,feedbackForRecord} from './student-records.js';
const adminPanel = document.querySelector('#admin-panel');
const teacherPanel = document.querySelector('#teacher-panel');
const flowPanel = document.querySelector('#flow-panel');
const previewButtons = [...document.querySelectorAll('[data-preview]')];
const storageKey = 'short-speech-courseware-prototype-v1';
const seed = {
  folders: [
    {id:162,name:'認字課',count:10,created:'2026-11-02 09:32:47',creator:'超级管理员',status:'启用'},
    {id:161,name:'普通话',count:4,created:'2026-10-27 10:06:43',creator:'超级管理员',status:'启用'},
    {id:160,name:'校长课1',count:8,created:'2026-05-25 10:42:34',creator:'超级管理员',status:'启用'},
    {id:159,name:'录播课',count:11,created:'2024-05-06 15:08:38',creator:'超级管理员',status:'启用'},
    {id:158,name:'阶段报告',count:2,created:'2023-12-19 17:49:28',creator:'超级管理员',status:'启用'},
    {id:146,name:'公务员普通话【10节】',count:10,created:'2023-04-12 10:22:18',creator:'超级管理员',status:'启用'}
  ],
  files: [
    {id:4787,name:'第18課 詞語疑難點訓練02.pdf',folder:161,homework:'点击绑定',recording:'点击绑定',speechTest:'点击绑定',topic:'点击输入',scene:'点击绑定',sentence:'点击绑定',report:false,certificate:false,created:'2026-11-23 10:12:00',creator:'超级管理员',transcode:'成功',status:'启用'},
    {id:4773,name:'第10課 綱要中的香港.pptx',folder:146,homework:'点击绑定',recording:'点击绑定',speechTest:'多音节',topic:'介紹大嶼山',scene:'介紹大嶼山',sentence:'点击绑定',report:false,certificate:false,created:'2026-06-09 18:00:11',creator:'超级管理员',transcode:'成功',status:'启用'},
    {id:4759,name:'第9課 民生服務、環保.pdf',folder:146,homework:'点击绑定',recording:'01-课程介绍',speechTest:'点击绑定',topic:'点击输入',scene:'点击绑定',sentence:'点击绑定',report:false,certificate:false,created:'2026-05-18 14:17:43',creator:'超级管理员',transcode:'成功',status:'启用'},
    {id:4619,name:'第8課 市場經濟、產業.pptx',folder:146,homework:'点击绑定',recording:'点击绑定',speechTest:'点击绑定',topic:'点击输入',scene:'点击绑定',sentence:'点击绑定',report:false,certificate:false,created:'2026-04-22 15:48:35',creator:'超级管理员',transcode:'成功',status:'启用'}
  ],
  speeches: [
    {id:1,topic:'我想感谢的人海外中级',content:'试分享你会怎样感谢身边的人，例如家人、老师、校工等？请加以说明。',type:'成長與品格',level:'中級',region:'海外',created:'2025-04-22 15:38:31',creator:'超级管理员'},
    {id:3,topic:'我想感谢的人海外高级',content:'试分享你会怎样感谢身边的人，例如家人、老师、校工等？请加以说明。',type:'日常',level:'高級',region:'海外',created:'2025-04-23 11:57:30',creator:'超级管理员'},
    {id:5,topic:'我想感謝的人',content:'我想感謝媽媽，因為她常常幫我準備早餐。',type:'日常',level:'初級',region:'港澳',created:'2025-04-24 16:03:31',creator:'超级管理员'},
    {id:6,topic:'我要改掉的壞習慣',content:'我最想改掉的壞習慣是拖延。我會每天安排時間，先完成功課。',type:'日常',level:'初級',region:'港澳',created:'2025-04-24 16:05:58',creator:'超级管理员'},
    {id:7,topic:'如何幫助新同學',content:'如果有新同學來到我們學校，我會主動和他打招呼，帶他熟悉校園。',type:'社會',level:'初級',region:'港澳',created:'2025-04-24 16:08:33',creator:'超级管理员'},
    {id:8,topic:speechData.title,content:speechData.prompt,type:'日常',level:'初級',region:'港澳',created:'2026-11-23 17:57:24',creator:'超级管理员'}
  ],
  links: {4787:8}
};
function loadData(){
  try{
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if(saved && Array.isArray(saved.files) && Array.isArray(saved.speeches)){
      saved.speeches=saved.speeches.filter(s=>s.id!==8).concat(seed.speeches.find(s=>s.id===8));
      if(saved.links?.[4787]===1)saved.links[4787]=8;
      return saved;
    }
    return structuredClone(seed);
  }catch{return structuredClone(seed);}
}
let data=loadData();
let preview='admin';
let adminPage='courseware';
let adminMenuExpanded={research:true,rating:true};
let teacherPage='calendar',teacherRecordId=1,teacherLesson=10;
let selectedRecordId=1;
let recordsPageNumber=1;
let listTab='files';
let folderId=null;
let filter={};
let modal=null;
let modalQuery='';
let selectedSpeech=null;
let toast='';
let flowZoom=90;
function persist(){localStorage.setItem(storageKey,JSON.stringify(data));}
function esc(value){return String(value ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function now(){return new Date().toLocaleString('zh-CN',{hour12:false}).replace(/\//g,'-');}
function option(values,placeholder){return '<option value="">'+esc(placeholder)+'</option>'+values.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('');}
function field(label,name,type='text',options=null){
  const control=options?'<select name="'+name+'">'+option(options,'请选择')+'</select>':'<input name="'+name+'" type="'+type+'" placeholder="请输入" autocomplete="off">';
  return '<label class="admin-field"><span>'+label+'</span>'+control+'</label>';
}
function adminMenu(){
  const research=['产品线管理','课程分类','自定义组合','教学大纲','作业音频上传','课件管理','录播视频管理','课程管理','课程管理（新）','个人短讲','AI句子练习','AI场景对话'];
  const rating=['作文比赛报名','学生评级管理','评级报告记录','普通话报告记录','个人短讲报告','团体朗诵比赛','句子练习报告','场景对话报告','朗诵比赛名单','学生朗诵记录','朗诵中奖名单','GAPSK测试记录','HSKK/留学测试记录','朗诵记录_初赛','学校参赛情况统计'];
  const items=names=>names.map(name=>{
    const id=name==='课件管理'?'courseware':name==='个人短讲'?'speech':name==='个人短讲报告'?'records':'';
    return id?'<button type="button" data-admin-page="'+id+'" class="'+(adminPage===id||id==='records'&&adminPage==='record-report'?'active':'')+'">'+name+(['courseware','records'].includes(id)?'<span class="requirement-badge">需求</span>':'')+'</button>':'<span>'+name+'</span>';
  }).join('');
  const group=(id,title,names)=>'<button type="button" class="admin-menu-group" data-menu-group="'+id+'" aria-expanded="'+adminMenuExpanded[id]+'"><span class="group-name">'+title+'<span class="requirement-badge">需求</span></span><span class="group-chevron" aria-hidden="true">'+(adminMenuExpanded[id]?'⌃':'⌄')+'</span></button><nav aria-label="'+title+'菜单" '+(adminMenuExpanded[id]?'':'hidden')+'>'+items(names)+'</nav>';
  return '<aside class="admin-sidebar"><div class="admin-brand">中文路后台管理系统</div>'+group('research','教研管理',research)+group('rating','普通话评级管理',rating)+'</aside>';
}
function adminHeader(){
  return '<div class="admin-header"><span>‹　›</span><span>中国香港/CN HK　<span aria-hidden="true">⇥</span></span></div><div class="admin-tabs"><button type="button" data-admin-page="courseware" class="'+(adminPage==='courseware'?'active':'')+'">课件管理</button><button type="button" data-admin-page="speech" class="'+(adminPage==='speech'?'active':'')+'">个人短讲</button><button type="button" data-admin-page="records" class="'+(['records','record-report'].includes(adminPage)?'active':'')+'">个人短讲报告</button></div>';
}
function searchCourseware(){
  return '<form id="courseware-search" class="admin-search"><div class="admin-search-grid">'+
  field('课件名称','name')+field('课件ID','id')+field('文件夹ID','folderId')+
  field('文件夹名称','folderName')+field('层次','level','text',['初級','中級','高級'])+field('年级','grade','text',['一年级','二年级','三年级'])+
  field('科目','subject','text',['中文','普通话'])+field('产品','product','text',['中文路','普通话课程'])+field('状态','status','text',['启用','禁用'])+
  (listTab==='files'?field('转码状态','transcode','text',['成功','处理中','失败'])+field('绑定作业','homework','text',['已绑定','未绑定'])+field('阶段报告','report','text',['是','否'])+field('结业证书','certificate','text',['是','否']):'')+
  '</div><div class="admin-actions"><button class="admin-primary" type="submit">⌕　查询</button><button type="button" data-action="reset-search">↻　重置</button></div></form>';
}
function folderRows(){
  let rows=data.folders.filter(f=>(!filter.folderName||f.name.includes(filter.folderName))&&(!filter.folderId||String(f.id).includes(filter.folderId))&&(!filter.status||f.status===filter.status));
  return '<div class="table-scroll"><table class="admin-table"><thead><tr><th>序号</th><th>文件夹ID</th><th>文件夹名称</th><th>文件数量</th><th>创建时间</th><th>创建人</th><th>状态</th><th>操作</th></tr></thead><tbody>'+
  (rows.length?rows.map((f,i)=>'<tr><td>'+(i+1)+'</td><td>'+f.id+'</td><td><button class="text-link" data-action="open-folder" data-id="'+f.id+'">'+esc(f.name)+'</button></td><td>'+f.count+'</td><td>'+esc(f.created)+'</td><td>'+esc(f.creator)+'</td><td>'+esc(f.status)+'</td><td><button class="mini-action" data-action="edit-folder" data-id="'+f.id+'">编辑</button> <button class="mini-action" data-action="toggle-folder" data-id="'+f.id+'">'+(f.status==='启用'?'禁用':'启用')+'</button></td></tr>').join(''):'<tr><td colspan="8" class="empty-row">暂无数据</td></tr>')+
  '</tbody></table></div><div class="admin-pagination">总记录数：'+rows.length+'　 <button disabled>‹</button> <strong>1</strong> <button disabled>›</button>　10 条/页</div>';
}
function bindCell(file){
  const speech=data.speeches.find(s=>s.id===data.links[file.id]);
  return '<button class="text-link" data-action="bind-speech" data-id="'+file.id+'">'+(speech?esc(speech.topic):'点击绑定')+'</button>';
}
function fileRows(){
  let rows=data.files.filter(f=>(folderId===null||f.folder===folderId)&&(!filter.name||f.name.includes(filter.name))&&(!filter.id||String(f.id).includes(filter.id))&&(!filter.folderId||String(f.folder).includes(filter.folderId))&&(!filter.folderName||(data.folders.find(x=>x.id===f.folder)?.name||'').includes(filter.folderName))&&(!filter.status||f.status===filter.status)&&(!filter.transcode||f.transcode===filter.transcode)&&(!filter.homework||(filter.homework==='已绑定'?f.homework!=='点击绑定':f.homework==='点击绑定'))&&(!filter.report||(filter.report==='是')===f.report)&&(!filter.certificate||(filter.certificate==='是')===f.certificate));
  return '<div class="table-scroll wide-table"><table class="admin-table"><thead><tr><th>序号</th><th>文件ID</th><th>文件名称</th><th>课后作业</th><th>录播课</th><th>语音评测</th><th class="new-column">个人短讲<span class="requirement-badge">需求</span></th><th>主题</th><th>场景</th><th>句子</th><th>阶段报告</th><th>结业证书</th><th>上传时间</th><th>上传人</th><th>转码状态</th><th>状态</th><th>操作</th></tr></thead><tbody>'+
  (rows.length?rows.map((f,i)=>'<tr><td>'+(i+1)+'</td><td>'+f.id+'</td><td><button class="text-link filename" data-action="edit-file" data-id="'+f.id+'">'+esc(f.name)+'</button></td><td>'+esc(f.homework)+'</td><td>'+esc(f.recording)+'</td><td>'+esc(f.speechTest)+'</td><td class="new-column">'+bindCell(f)+'</td><td>'+esc(f.topic)+'</td><td>'+esc(f.scene)+'</td><td>'+esc(f.sentence)+'</td><td>'+(f.report?'开':'关')+'</td><td>'+(f.certificate?'开':'关')+'</td><td>'+esc(f.created)+'</td><td>'+esc(f.creator)+'</td><td>'+esc(f.transcode)+'</td><td>'+esc(f.status)+'</td><td><button class="mini-action" data-action="edit-file" data-id="'+f.id+'">编辑</button> <button class="mini-action" data-action="toggle-file" data-id="'+f.id+'">'+(f.status==='启用'?'禁用':'启用')+'</button></td></tr>').join(''):'<tr><td colspan="17" class="empty-row">暂无数据</td></tr>')+
  '</tbody></table></div><div class="admin-pagination">总记录数：'+rows.length+'　 <button disabled>‹</button> <strong>1</strong> <button disabled>›</button>　10 条/页</div>';
}
function coursewarePage(){
  const folder=data.folders.find(x=>x.id===folderId);
  return searchCourseware()+'<div class="admin-card"><div class="admin-toolbar"><div class="switch-tabs"><button type="button" data-list-tab="folders" class="'+(listTab==='folders'?'active':'')+'">文件夹</button><button type="button" data-list-tab="files" class="'+(listTab==='files'?'active':'')+'">课 件</button></div><div><button type="button" class="admin-primary" data-action="add-folder">添加文件夹</button> <button type="button" class="admin-primary" data-action="add-file">添加课件</button></div></div><div class="breadcrumb">当前目录： <button class="text-link" data-action="root-folder">根目录</button>'+(folder?' / '+esc(folder.name):'')+'</div>'+(listTab==='folders'?folderRows():fileRows())+'</div>';
}
function searchSpeech(){
  return '<form id="speech-search" class="admin-search"><div class="admin-search-grid speech-search">'+field('主题','topic')+field('类型','type','text',['日常','學習','社會','成長與品格'])+field('难度水平','level','text',['初級','中級','高級'])+field('创建人','creator','text',['超级管理员'])+field('地区','region','text',['港澳','海外'])+'</div><div class="admin-actions"><button class="admin-primary" type="submit">查 询</button><button type="button" data-action="reset-search">重 置</button></div></form>';
}
function speechRows(){
  let rows=data.speeches.filter(s=>(!filter.topic||s.topic.includes(filter.topic))&&(!filter.type||s.type===filter.type)&&(!filter.level||s.level===filter.level)&&(!filter.creator||s.creator===filter.creator)&&(!filter.region||s.region===filter.region));
  return '<div class="table-scroll"><table class="admin-table"><thead><tr><th>ID</th><th>主题</th><th>内容</th><th>类型</th><th>难度</th><th>地区</th><th>创建时间</th><th>创建人</th><th>操作</th></tr></thead><tbody>'+
  (rows.length?rows.map(s=>'<tr><td>'+s.id+'</td><td>'+esc(s.topic)+'</td><td class="content-cell" title="'+esc(s.content)+'">'+esc(s.content)+'</td><td>'+esc(s.type)+'</td><td>'+esc(s.level)+'</td><td>'+esc(s.region)+'</td><td>'+esc(s.created)+'</td><td>'+esc(s.creator)+'</td><td><button class="text-link" data-action="edit-speech" data-id="'+s.id+'">编辑</button></td></tr>').join(''):'<tr><td colspan="9" class="empty-row">暂无数据</td></tr>')+
  '</tbody></table></div><div class="admin-pagination">总记录数：'+rows.length+'　 <button disabled>‹</button> <strong>1</strong> <button disabled>›</button>　10 条/页</div>';
}
function speechPage(){return searchSpeech()+'<div class="admin-card"><div class="admin-toolbar"><button type="button" class="admin-primary" data-action="add-speech">＋ 新增</button></div>'+speechRows()+'</div>';}
function adminHtml(){
  if(adminPage==='record-report')return recordReportPage(studentRecords.find(r=>r.id===selectedRecordId))+(modal?modalHtml():'')+(toast?'<div class="admin-toast" role="status">'+esc(toast)+'</div>':'');
  const content=adminPage==='courseware'?coursewarePage():adminPage==='speech'?speechPage():adminPage==='records'?recordsListPage(filter,recordsPageNumber):recordReportPage(studentRecords.find(r=>r.id===selectedRecordId));
  return '<div class="admin-shell">'+adminMenu()+'<div class="admin-main">'+adminHeader()+'<div class="admin-content">'+content+'</div></div></div>'+(modal?modalHtml():'')+(toast?'<div class="admin-toast" role="status">'+esc(toast)+'</div>':'');
}
function inputRow(label,name,value='',required=false){return '<label class="modal-row"><span>'+(required?'<b>*</b>':'')+esc(label)+'：</span><input name="'+name+'" value="'+esc(value)+'" '+(required?'required':'')+' autocomplete="off"></label>';}
function selectRow(label,name,values,value='',required=false){return '<label class="modal-row"><span>'+(required?'<b>*</b>':'')+esc(label)+'：</span><select name="'+name+'" '+(required?'required':'')+'><option value="">请选择</option>'+values.map(v=>'<option value="'+esc(v)+'" '+(v===value?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>';}
function modalFrame(title,body,saveAction,saveLabel='保 存',extra=''){return '<div class="modal-backdrop" data-action="close-modal"><div class="admin-modal" role="dialog" aria-modal="true" aria-label="'+esc(title)+'"><div class="modal-head"><strong>'+esc(title)+'</strong><button type="button" data-action="close-modal" aria-label="关闭">×</button></div><div class="modal-body">'+body+'</div><div class="modal-foot">'+extra+'<button type="button" data-action="close-modal">取 消</button><button type="button" class="admin-primary" data-action="'+saveAction+'">'+saveLabel+'</button></div></div></div>';}
function modalHtml(){
  if(modal.kind==='record-feedback'){
    return modalFrame('錯誤反饋','<form id="modal-form"><label class="modal-row"><span>反馈内容：</span><textarea name="feedback" rows="5" required placeholder="请描述报告中的问题"></textarea></label></form>','save-record-feedback','提 交');
  }
  if(modal.kind==='record-score'){
    const record=studentRecords.find(r=>r.id===selectedRecordId);
    const labels=['內容','結構條理','語言運用','表達情感'];
    const body='<form id="modal-form">'+labels.map((label,index)=>'<label class="modal-row"><span>'+label+'：</span><input type="number" name="metric'+index+'" min="0" max="25" step="1" required value="'+record.metrics[index]+'"></label>').join('')+'</form>';
    return modalFrame('編輯分數',body,'save-record-score');
  }
  if(modal.kind==='bind'){
    const file=data.files.find(f=>f.id===modal.id);
    const rows=data.speeches.filter(s=>!modalQuery||s.topic.includes(modalQuery));
    const body='<p class="modal-context">课件：'+esc(file.name)+'</p><div class="modal-search"><input id="modal-query" placeholder="搜索主题名称" value="'+esc(modalQuery)+'"><button type="button" data-action="modal-search">查 询</button></div><div class="bind-list"><table class="admin-table"><thead><tr><th>选择</th><th>主题</th><th>类型</th><th>难度</th><th>地区</th></tr></thead><tbody>'+(rows.length?rows.map(s=>'<tr><td><input type="radio" name="selectedSpeech" data-speech-id="'+s.id+'" '+(selectedSpeech===s.id?'checked':'')+'></td><td>'+esc(s.topic)+'</td><td>'+esc(s.type)+'</td><td>'+esc(s.level)+'</td><td>'+esc(s.region)+'</td></tr>').join(''):'<tr><td colspan="5" class="empty-row">暂无匹配的个人短讲</td></tr>')+'</tbody></table></div>';
    return modalFrame('关联个人短讲',body,'save-bind','保 存',data.links[modal.id]?'<button type="button" class="danger-link" data-action="unlink-speech">取消关联</button>':'');
  }
  if(modal.kind==='folder'){
    const folder=data.folders.find(f=>f.id===modal.id);
    const body='<form id="modal-form">'+inputRow('文件夹名称','name',folder?.name||'',true)+selectRow('状态','status',['启用','禁用'],folder?.status||'启用',true)+'</form>';
    return modalFrame(folder?'编辑文件夹':'添加文件夹',body,'save-folder');
  }
  if(modal.kind==='file'){
    const file=data.files.find(f=>f.id===modal.id);
    const body='<form id="modal-form">'+selectRow('年级','grade',['一年级','二年级','三年级'],'')+selectRow('科目','subject',['中文','普通话'],'普通话',true)+selectRow('层次','level',['初級','中級','高級'],'中級',true)+selectRow('文件夹','folder',data.folders.map(f=>f.name),data.folders.find(f=>f.id===file?.folder)?.name||'',false)+inputRow('讲义名称','name',file?.name||'',true)+'<label class="modal-row"><span>学习内容：</span><textarea name="learningContent" rows="3" placeholder="输入学习内容"></textarea></label><label class="modal-row"><span>是否公开：</span><select name="public"><option>是</option><option>否</option></select></label></form>';
    return modalFrame(file?'编辑课件':'添加课件',body,'save-file');
  }
  const speech=data.speeches.find(s=>s.id===modal.id);
  const body='<form id="modal-form">'+inputRow('主题','topic',speech?.topic||'',true)+'<label class="modal-row"><span><b>*</b>内容：</span><textarea name="content" rows="5" required>'+esc(speech?.content||'')+'</textarea></label>'+selectRow('类型','type',['日常','學習','社會','成長與品格'],speech?.type||'',true)+selectRow('难度水平','level',['初級','中級','高級'],speech?.level||'',true)+selectRow('地区','region',['港澳','海外'],speech?.region||'',true)+'</form>';
  return modalFrame(speech?'编辑个人短讲':'新增个人短讲',body,'save-speech');
}
function renderAdmin(){adminPanel.innerHTML=adminHtml();}
function renderTeacher(){
  if(teacherPage==='report'){
    teacherPanel.innerHTML=recordReportPage(studentRecords.find(row=>row.id===teacherRecordId),'teacher');
    return;
  }
  if(teacherPage==='calendar'||teacherPage==='completion'){
    const names=['阿豪','王柏謙','林芷晴','張家朗','黃穎詩','陳子軒','李文晴','何梓樂','周美欣','林志豪','張慧敏','王佳怡','陳偉俊','黃嘉欣','劉卓然'];
    const completionRows=names.map((name,index)=>{
      const record=studentRecords[index];
      const speech=record?.status==='已完成'&&record.score!==null?'<button type="button" class="teacher-report-link" data-action="teacher-open-record" data-id="'+record.id+'">查看報告</button>' :'<span class="teacher-incomplete">'+(record?.status==='已完成'?'已完成':'未完成')+'</span>';
      return '<tr><td>'+esc(name)+'</td><td><span class="teacher-progress">'+(index===0?'100%':'0%')+'</span></td><td><span class="teacher-progress">'+(index===0?'100%':'0%')+'</span></td><td>'+(index===0?'2026-11-23 23:04':'--')+'</td><td>'+speech+'</td></tr>';
    }).join('');
    const hotspots=Array.from({length:7},(_,i)=>'<button type="button" class="teacher-calendar-hotspot" style="top:'+(47.3+i*7.35)+'%" data-action="teacher-open-completion" data-lesson="'+[10,23,16,14,13,11,7][i]+'" aria-label="查看第'+[10,23,16,14,13,11,7][i]+'講預習進度">'+(i===0?'<span class="teacher-requirement-badge" aria-hidden="true">需求</span>':'')+'</button>').join('');
    const modal=teacherPage==='completion'?'<div class="teacher-modal-backdrop" data-action="teacher-close-completion"><section class="teacher-completion-modal" role="dialog" aria-modal="true" aria-labelledby="teacher-completion-title"><header><strong id="teacher-completion-title">第 '+teacherLesson+' 講完成詳情</strong><button type="button" data-action="teacher-close-completion" aria-label="關閉">×</button></header><div class="teacher-completion-scroll"><table><thead><tr><th>學生姓名</th><th>錄播課完成率</th><th>作業完成率</th><th>最後查看錄播時間</th><th>個人短講<span class="teacher-requirement-badge">需求</span></th></tr></thead><tbody>'+completionRows+'</tbody></table></div><footer><button type="button" data-action="teacher-close-completion">關 閉</button></footer></section></div>':'';
    teacherPanel.innerHTML='<div class="teacher-calendar"><div class="teacher-calendar-image"><img src="./assets/teacher-calendar-reference.png" alt="教師端課表日曆，顯示課次、上課老師與預習進度"><span class="teacher-calendar-menu-badge" aria-label="課表日曆需求">需求</span>'+hotspots+'</div>'+modal+'</div>';
    return;
  }
}
teacherPanel.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  if(button.dataset.action==='teacher-back'){teacherPage='completion';renderTeacher();return;}
  if(button.dataset.action==='teacher-open-completion'){teacherLesson=Number(button.dataset.lesson)||10;teacherPage='completion';renderTeacher();return;}
  if(button.dataset.action==='teacher-close-completion'){if(event.target.closest('.teacher-completion-modal')&&!button.closest('button'))return;teacherPage='calendar';renderTeacher();return;}
  if(button.dataset.action==='teacher-open-record'){
    const record=studentRecords.find(row=>row.id===Number(button.dataset.id));
    if(record?.status==='已完成'&&record.score!==null){teacherRecordId=record.id;teacherPage='report';renderTeacher();}
    return;
  }
  if(button.dataset.action==='record-play'){
    const audio=teacherPanel.querySelector('#record-audio');
    if(audio.paused){audio.play();button.textContent='Ⅱ';}else{audio.pause();button.textContent='▷';}
  }
});
function renderFlow(){
  const stages=[
    {title:'后台 / 题目管理',tone:'blue',steps:[
      ['新增短讲题目','维护题目名称与提问内容。','new']
    ]},
    {title:'后台 / 课件管理',tone:'green',steps:[
      ['新增“个人短讲”列','一个课件关联一个短讲题目。','new']
    ]},
    {title:'学生 / 课次入口',tone:'purple',steps:[
      ['新增短讲入口','任务发布后显示未完成，提交后显示已完成。','new']
    ]},
    {title:'系统 / 生成报告',tone:'green',steps:[
      ['形成独立记录','提交演讲后形成记录，状态更新为已完成。','new']
    ]}
  ];
  const cards=stages.map((stage,index)=>'<section class="flow-stage '+stage.tone+'"><h2><span class="flow-number">'+(index+1)+'</span>'+stage.title+'</h2><div class="flow-stage-steps">'+stage.steps.map((step,i)=>'<div class="flow-box"><h3 class="'+(step[2]==='new'?'flow-new':'')+'">'+step[0]+'</h3><p class="'+(step[2]==='new'?'flow-new':'flow-old')+'">'+step[1]+'</p></div>'+(i<stage.steps.length-1?'<div class="flow-down" aria-hidden="true">↓</div>':'')).join('')+'</div></section>'+(index<stages.length-1?'<div class="flow-between" aria-hidden="true">→</div>':'')).join('');
  const branches='<div class="flow-branch-label">報告完成後 ↓</div><div class="flow-result-branches"><section class="flow-branch"><h3>學生端</h3><p class="flow-new">查看最高分報告 → 再次練習</p></section><section class="flow-branch"><h3>後台獨立入口</h3><p class="flow-new">個人短講報告列表 → 查看本次記錄</p></section><section class="flow-branch"><h3>教師相關後台</h3><p class="flow-new">課表日曆 → 預習進度 → 查看學生報告</p></section></div>';
  const studentSteps=[
    ['进入个人短讲','课程练习新增短讲入口和状态。','new'],
    ['听题目语音','沿用现有页面','old'],
    ['准备演讲','沿用现有页面','old'],
    ['演讲录音','默认 2 分钟；到时自动停止，不足 10 秒提示。','new'],
    ['完成提示','提交后显示已完成，可返回课次入口。','new'],
    ['查看报告','完成后看最高分报告，可再次练习。','new']
  ];
  const studentFlow=studentSteps.map((step,index)=>'<div class="student-flow-step"><span class="student-flow-number">'+(index+1)+'</span><h3 class="'+(step[2]==='new'?'flow-new':'flow-old')+'">'+step[0]+'</h3><p class="'+(step[2]==='new'?'flow-new':'flow-old')+'">'+step[1]+'</p></div>').join('');
  flowPanel.innerHTML='<div class="flow-wrap"><header class="flow-header"><div><h1>個人短講｜後台與 App 流程圖</h1><p>本次新增：題目配置、課件關聯、短講入口與狀態、報告查看</p><div class="flow-legend"><span class="flow-new">紅色：本次新增需求</span><span class="flow-old">黑色：沿用的流程</span></div></div><div class="flow-controls"><button type="button" data-flow-zoom="-10" aria-label="缩小流程图">−</button><output>'+flowZoom+'%</output><button type="button" data-flow-zoom="10" aria-label="放大流程图">＋</button><button type="button" data-flow-zoom="fit">適合寬度</button><button type="button" data-flow-zoom="100">全圖</button></div></header><div class="flow-canvas"><div class="flow-track" style="zoom:'+flowZoom+'%">'+cards+'</div>'+branches+'</div><section class="student-flow-section"><h2>個人短講｜學生端獨立流程</h2><div class="flow-canvas student-flow-canvas"><div class="student-flow-track" style="zoom:'+flowZoom+'%">'+studentFlow+'</div></div></section></div>';
}
function switchPreview(next){
  if(next==='teacher'&&preview!=='teacher')teacherPage='calendar';
  preview=next;
  for(const name of ['admin','teacher','app','flow','prd']) document.querySelector('#'+name+'-panel').hidden=name!==next;
  previewButtons.forEach(b=>{const active=b.dataset.preview===next;b.classList.toggle('selected',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(next==='app')document.dispatchEvent(new Event('app-preview-enter'));
  if(next==='flow')renderFlow();
  if(next==='teacher')renderTeacher();
}
function notify(message){toast=message;renderAdmin();setTimeout(()=>{toast='';renderAdmin();},2500);}
function valuesOf(form){return Object.fromEntries(new FormData(form).entries());}
function formValid(form){return form.reportValidity();}
function closeModal(){modal=null;modalQuery='';renderAdmin();}
document.addEventListener('click',event=>{
  const p=event.target.closest('[data-preview]');
  if(p){switchPreview(p.dataset.preview);return;}
  const zoom=event.target.closest('[data-flow-zoom]');
  if(zoom){const value=zoom.dataset.flowZoom;flowZoom=value==='fit'?Math.max(25,Math.min(100,Math.floor((flowPanel.querySelector('.flow-canvas').clientWidth-48)/1042*100))):value==='100'?100:Math.max(25,Math.min(130,flowZoom+Number(value)));renderFlow();return;}
  const group=event.target.closest('[data-menu-group]');
  if(group){const key=group.dataset.menuGroup;adminMenuExpanded[key]=!adminMenuExpanded[key];renderAdmin();return;}
  const menu=event.target.closest('[data-admin-page]');
  if(menu){adminPage=menu.dataset.adminPage;adminMenuExpanded[adminPage==='records'?'rating':'research']=true;filter={};recordsPageNumber=1;modal=null;renderAdmin();return;}
  const tab=event.target.closest('[data-list-tab]');
  if(tab){listTab=tab.dataset.listTab;filter={};renderAdmin();return;}
  const item=event.target.closest('[data-action]');
  if(!item||!adminPanel.contains(item))return;
  const action=item.dataset.action,id=Number(item.dataset.id);
  if(action==='open-record'){
    const record=studentRecords.find(r=>r.id===id);
    if(record?.status!=='已完成')return;
    selectedRecordId=id;adminPage='record-report';renderAdmin();return;
  }
  if(action==='back-records'){adminPage='records';renderAdmin();return;}
  if(action==='records-prev'||action==='records-next'){recordsPageNumber=Math.max(1,recordsPageNumber+(action==='records-next'?1:-1));renderAdmin();return;}
  if(action==='record-prev'||action==='record-next'){
    const completed=studentRecords.filter(r=>r.status==='已完成');
    const index=completed.findIndex(r=>r.id===selectedRecordId);
    const next=completed[index+(action==='record-next'?1:-1)];
    if(next){selectedRecordId=next.id;renderAdmin();}
    return;
  }
  if(action==='record-play'){
    const audio=adminPanel.querySelector('#record-audio');
    if(audio.paused){audio.play();item.textContent='Ⅱ';}else{audio.pause();item.textContent='▷';}
    return;
  }
  if(action==='record-print'){window.print();return;}
  if(action==='record-download'){
    const record=studentRecords.find(r=>r.id===selectedRecordId);
    const body=[record.student+'｜'+record.task,record.score+'分',recordTranscript,...feedbackForRecord(record).map(([name,body])=>name+'：'+body)].join('\n\n');
    const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));link.download='個人短講報告-'+record.student+'.txt';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);return;
  }
  if(action==='record-feedback'){modal={kind:'record-feedback'};renderAdmin();return;}
  if(action==='record-edit-score'){modal={kind:'record-score'};renderAdmin();return;}
  if(action==='save-record-feedback'){
    const form=adminPanel.querySelector('#modal-form');
    if(!formValid(form))return;
    const feedback=String(valuesOf(form).feedback||'').trim();
    if(!feedback)return;
    const key='short-speech-report-feedback-v1';
    let notes=[];try{notes=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(notes))notes=[];}catch{}
    notes.push({recordId:selectedRecordId,feedback,createdAt:now()});
    localStorage.setItem(key,JSON.stringify(notes));modal=null;notify('反馈已记录');return;
  }
  if(action==='save-record-score'){
    const form=adminPanel.querySelector('#modal-form');
    if(!formValid(form))return;
    const values=valuesOf(form);
    const metrics=[0,1,2,3].map(index=>Number(values['metric'+index]));
    if(metrics.some(n=>!Number.isInteger(n)||n<0||n>25)){notify('各项分数需为 0 至 25 的整数');return;}
    const record=studentRecords.find(r=>r.id===selectedRecordId);
    record.metrics=metrics;record.score=metrics.reduce((sum,n)=>sum+n,0);
    persistStudentRecords();modal=null;notify('分数已保存');return;
  }
  if(action==='close-modal'){if(event.target===item)closeModal();return;}
  if(action==='reset-search'){filter={};recordsPageNumber=1;renderAdmin();return;}
  if(action==='open-folder'){folderId=id;listTab='files';filter={};renderAdmin();return;}
  if(action==='root-folder'){folderId=null;renderAdmin();return;}
  if(action==='add-folder'||action==='edit-folder'){modal={kind:'folder',id:action==='edit-folder'?id:null};renderAdmin();return;}
  if(action==='add-file'||action==='edit-file'){modal={kind:'file',id:action==='edit-file'?id:null};renderAdmin();return;}
  if(action==='add-speech'||action==='edit-speech'){modal={kind:'speech',id:action==='edit-speech'?id:null};renderAdmin();return;}
  if(action==='bind-speech'){modal={kind:'bind',id};modalQuery='';selectedSpeech=data.links[id]||null;renderAdmin();return;}
  if(action==='modal-search'){modalQuery=adminPanel.querySelector('#modal-query').value.trim();renderAdmin();return;}
  if(action==='save-bind'){
    const checked=adminPanel.querySelector('[name="selectedSpeech"]:checked');
    const chosen=checked?Number(checked.dataset.speechId):selectedSpeech;
    if(!chosen){notify('请选择一条个人短讲');return;}
    data.links[modal.id]=chosen;persist();modal=null;notify('关联已保存');return;
  }
  if(action==='unlink-speech'){delete data.links[modal.id];persist();modal=null;notify('已取消关联');return;}
  if(action==='save-folder'||action==='save-file'||action==='save-speech'){
    const form=adminPanel.querySelector('#modal-form');
    if(!formValid(form))return;
    const v=valuesOf(form);
    if(action==='save-folder'){
      const existing=data.folders.find(f=>f.id===modal.id);
      if(existing){existing.name=v.name.trim();existing.status=v.status;}
      else data.folders.unshift({id:Math.max(...data.folders.map(f=>f.id))+1,name:v.name.trim(),count:0,created:now(),creator:'超级管理员',status:v.status});
    }else if(action==='save-file'){
      const existing=data.files.find(f=>f.id===modal.id);
      if(existing){existing.name=v.name.trim();existing.folder=data.folders.find(f=>f.name===v.folder)?.id||existing.folder;}
      else data.files.unshift({id:Math.max(...data.files.map(f=>f.id))+1,name:v.name.trim(),folder:data.folders.find(f=>f.name===v.folder)?.id||161,homework:'点击绑定',recording:'点击绑定',speechTest:'点击绑定',topic:'点击输入',scene:'点击绑定',sentence:'点击绑定',report:false,certificate:false,created:now(),creator:'超级管理员',transcode:'成功',status:'启用'});
    }else{
      const existing=data.speeches.find(s=>s.id===modal.id);
      if(existing)Object.assign(existing,{topic:v.topic.trim(),content:v.content.trim(),type:v.type,level:v.level,region:v.region});
      else data.speeches.unshift({id:Math.max(...data.speeches.map(s=>s.id))+1,topic:v.topic.trim(),content:v.content.trim(),type:v.type,level:v.level,region:v.region,created:now(),creator:'超级管理员'});
    }
    persist();modal=null;notify('保存成功');return;
  }
  if(action==='toggle-folder'||action==='toggle-file'){
    const itemData=(action==='toggle-folder'?data.folders:data.files).find(x=>x.id===id);
    itemData.status=itemData.status==='启用'?'禁用':'启用';
    persist();renderAdmin();return;
  }
});
document.addEventListener('submit',event=>{
  if(!['courseware-search','speech-search','records-search'].includes(event.target.id))return;
  event.preventDefault();filter=valuesOf(event.target);recordsPageNumber=1;renderAdmin();
});
document.addEventListener('change',event=>{
  if(event.target.name==='selectedSpeech')selectedSpeech=Number(event.target.dataset.speechId);
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal)closeModal();});
renderAdmin();renderFlow();switchPreview('admin');


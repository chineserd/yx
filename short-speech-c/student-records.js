import {speechData} from './speech-flow.js';
// 后台学生短讲记录：演讲内容与学生端同一次练习保持一致。
export const studentRecords=[
  {id:1,student:'阿豪',studentId:'HKC12930',course:'P6 普通話課',task:'我想感謝的人',status:'已完成',submitted:'2026-11-23 23:05:46',duration:'4分鐘',score:65,level:'高級（S1–S3）',metrics:[18,12,8,10]},
  {id:2,student:'王柏謙',studentId:'HKC12931',course:'P6 普通話課',task:'我想感謝的人',status:'未完成',submitted:'',duration:'--',score:null},
  {id:3,student:'林芷晴',studentId:'HKC12932',course:'P6 普通話課',task:'我想感謝的人',status:'已完成',submitted:'2026-11-29 23:08:32',duration:'3分鐘',score:null},
  {id:4,student:'張家朗',studentId:'HKC12933',course:'P6 普通話課',task:'我想感謝的人',status:'已完成',submitted:'2026-11-29 23:10:08',duration:'5分鐘',score:58,level:'高級（S1–S3）',metrics:[14,17,12,15]},
  {id:5,student:'黃穎詩',studentId:'HKC12934',course:'P6 普通話課',task:'我想感謝的人',status:'已完成',submitted:'2026-11-29 23:13:19',duration:'4分鐘',score:0,level:'高級（S1–S3）',metrics:[0,0,0,0]}
];
try{
  const saved=JSON.parse(localStorage.getItem('short-speech-student-records-v1')||'[]');
  if(Array.isArray(saved))for(const item of saved){
    const record=studentRecords.find(row=>row.id===item.id);
    if(!record)continue;
    if(record.status==='已完成'&&Array.isArray(item.metrics)&&item.metrics.length===4&&item.metrics.every(n=>Number.isInteger(n)&&n>=0&&n<=25)){
      if(record.id===1&&item.metrics.join(',')==='14,17,12,15')continue;
      record.metrics=item.metrics;record.score=item.metrics.reduce((sum,n)=>sum+n,0);
    }
  }
}catch{}
export function persistStudentRecords(){
  localStorage.setItem('short-speech-student-records-v1',JSON.stringify(studentRecords.map(({id,metrics})=>({id,metrics}))));
}
export const recordFeedback=[
  ['總體評價','學生的短講內容切題，但表達簡單，結構和語言運用有待加強，整體表現未達標準。'],
  ['內容','內容切題，但過於簡略，缺乏深入的描述和具體例子。'],
  ['結構條理','結構基本完整，但缺乏明確的開場和結語，層次不夠分明。'],
  ['語言運用','語言表達簡單，詞彙和句式單一，缺乏多樣性和修辭技巧。'],
  ['表達情感','情感表達真摯，但層次感不足，語氣平淡，未能充分感染聽眾。'],
  ['建議','建議學生在短講中加入更多具體的例子和細節，並嘗試使用更豐富的語言表達情感，提升感染力。']
];
export function feedbackForRecord(r){
  return r?.id===1?[['總體評價',speechData.overall],...speechData.feedback,['建議','可補充一件與媽媽相處的具體事例，並用更有感情的語調表達謝意。']]:recordFeedback;
}
export const recordTranscript=speechData.draft;
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const reportListStatus=row=>row.status;
export function recordsListPage(filter={},page=1){
  const rows=studentRecords.filter(r=>(!filter.student||r.student.includes(filter.student))&&(!filter.task||r.task.includes(filter.task))&&(!filter.status||reportListStatus(r)===filter.status));
  const pages=Math.max(1,Math.ceil(rows.length/10));
  const visible=rows.slice((page-1)*10,page*10);
  const search='<form id="records-search" class="admin-search"><div class="admin-search-grid"><label class="admin-field"><span>学生姓名</span><input name="student" value="'+escapeHtml(filter.student||'')+'" placeholder="请输入学生姓名"></label><label class="admin-field"><span>主题</span><input name="task" value="'+escapeHtml(filter.task||'')+'" placeholder="请输入主题"></label><label class="admin-field"><span>完成情况</span><select name="status"><option value="">全部</option>'+['未完成','已完成'].map(s=>'<option value="'+s+'" '+(filter.status===s?'selected':'')+'>'+s+'</option>').join('')+'</select></label></div><div class="admin-actions"><button class="admin-primary" type="submit">查 询</button><button type="button" data-action="reset-search">重 置</button></div></form>';
  const body=visible.map(r=>'<tr><td>'+escapeHtml(r.studentId)+'</td><td>'+escapeHtml(r.student)+'</td><td title="'+escapeHtml(r.course)+'">'+escapeHtml(r.course)+'</td><td>'+(r.status==='已完成'&&r.score!==null?'<button type="button" class="text-link" data-action="open-record" data-id="'+r.id+'">'+escapeHtml(r.task)+'</button>':escapeHtml(r.task))+'</td><td><span class="record-tag '+(r.status==='已完成'?'record-tag-green':'record-tag-gray')+'">'+reportListStatus(r)+'</span></td><td>'+(r.submitted||'--')+'</td><td>'+(r.score===null?'--':r.score)+'</td><td>'+(r.status==='已完成'&&r.score!==null?'<button type="button" class="text-link" data-action="open-record" data-id="'+r.id+'">查看报告</button>':'<span class="record-unavailable">查看报告</span>')+'</td></tr>').join('');
  return search+'<div class="admin-card records-card"><div class="table-scroll"><table class="admin-table records-table"><thead><tr><th>学生编号</th><th>学生姓名</th><th>课程</th><th>主题</th><th>完成情况</th><th>提交時間</th><th>得分</th><th>操作</th></tr></thead><tbody>'+(body||'<tr><td colspan="8" class="empty-row">暂无匹配记录</td></tr>')+'</tbody></table></div><div class="admin-pagination">总记录数：'+rows.length+'　<button type="button" data-action="records-prev" '+(page<=1?'disabled':'')+'>‹</button><strong>'+page+'</strong><button type="button" data-action="records-next" '+(page>=pages?'disabled':'')+'>›</button>　10 条/页</div></div>';
}
function radar(metrics){
  const [top,right,bottom,left]=metrics.map(n=>Math.max(0,Math.min(25,n))/25*100);
  const points=[[150,150-top],[150+right,150],[150,150+bottom],[150-left,150]].map(p=>p.join(',')).join(' ');
  return '<div class="record-radar"><span class="radar-label radar-top">內容<br>('+metrics[0]+'/25分)</span><span class="radar-label radar-right">結構條理<br>('+metrics[1]+'/25分)</span><span class="radar-label radar-bottom">語言運用<br>('+metrics[2]+'/25分)</span><span class="radar-label radar-left">表達情感<br>('+metrics[3]+'/25分)</span><svg viewBox="0 0 300 300" role="img" aria-label="四項評分雷達圖"><circle cx="150" cy="150" r="100" fill="none" stroke="#edf0f4"/><circle cx="150" cy="150" r="80" fill="#f6f8fb" stroke="#e7ebf0"/><circle cx="150" cy="150" r="60" fill="none" stroke="#e5e9ef"/><circle cx="150" cy="150" r="40" fill="none" stroke="#e5e9ef"/><circle cx="150" cy="150" r="20" fill="none" stroke="#e5e9ef"/><path d="M150 50V250M50 150H250" stroke="#e5e9ef"/><polygon points="'+points+'" fill="#316aff19" stroke="#316aff" stroke-width="2"/></svg></div>';
}
export function recordReportPage(r,mode='admin'){
  if(!r)return '<div class="admin-card">未找到报告</div>';
  const feedback=feedbackForRecord(r).map(([title,body])=>'<section class="record-feedback"><h3>'+title+'</h3><p>'+body+'</p></section>').join('');
  const complete=studentRecords.filter(row=>row.status==='已完成');
  const current=complete.findIndex(row=>row.id===r.id);
  const html='<div class="record-report"><header class="record-report-toolbar"><div><button type="button" class="record-back" data-action="back-records" aria-label="返回记录列表">‹</button><strong>查看报告</strong><button type="button" class="record-error" data-action="record-feedback">✎錯誤反饋</button></div><div><button type="button" data-action="record-prev" '+(current===0?'disabled':'')+'>上一個</button><button type="button" data-action="record-next" '+(current===complete.length-1?'disabled':'')+'>下一個</button><button type="button" data-action="record-download">下 載</button><button type="button" data-action="record-print">打 印</button><button type="button" class="record-edit" data-action="record-edit-score">編輯分數</button></div></header><main class="record-report-body"><div class="record-report-summary"><div class="record-student"><strong>'+escapeHtml(r.student)+'</strong><span>'+escapeHtml(r.studentId)+'</span><time>'+escapeHtml(r.submitted)+'</time></div><div class="record-meta"><small>主題名稱</small><strong>'+escapeHtml(r.task)+'</strong><small>難度</small><strong>'+escapeHtml(r.level||'高級（S1–S3）')+'</strong></div><div class="record-total"><strong>'+r.score+'</strong><span>分</span></div></div><section class="record-report-card record-content-card"><div class="record-card-head"><h2>演講內容</h2><div><button type="button" data-action="record-play" aria-label="播放录音">▷</button><a href="./assets/short-speech-demo.m4a" download="個人短講-本次錄音.m4a" aria-label="下载录音">⇩</a></div></div><p>'+recordTranscript+'</p><audio id="record-audio" src="./assets/short-speech-demo.m4a" preload="metadata"></audio></section><section class="record-report-card record-detail-card"><h2>報告詳情</h2>'+radar(r.metrics)+'<div class="record-feedback-list">'+feedback+'</div></section></main></div>';
  if(mode!=='teacher')return html;
  return html.replace(/<header class="record-report-toolbar">[\s\S]*?<\/header>/,'<header class="record-report-toolbar"><div><button type="button" class="record-back" data-action="teacher-back" aria-label="返回預習進度">‹</button><strong>學生個人短講報告</strong></div></header>');
}

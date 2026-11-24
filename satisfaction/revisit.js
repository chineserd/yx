(() => {
'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key='chineserd-revisit-v1',surveyKey='chineserd-satisfaction-admin-v1';
const questions=['综合整体体验，您的总体满意度是？','日常服务和问题处理时效，您对班主任的服务是否满意？','结合课程内容和授课效果，您对整体教学质量是否满意？','其他评价或建议'];
const base=[
{id:'rv1',code:'S0031',name:'林芷晴',manager:'香港澳门老师',campus:'香港校区',type:'评价回访',created:'2026-10-30 10:20',status:'待处理',answers:['不满意','一般','不满意','希望增加课后练习的讲解。'],questions,answerId:'A20261030031'},
{id:'rv2',code:'HKC13759',name:'杨子资',manager:'熊二老师',campus:'线上校区',type:'分享赠堂',created:'2026-10-30 09:26',status:'待处理',description:'学员咨询分享赠堂活动的参与方式与赠课到账情况。'},
{id:'rv3',code:'HKC4686',name:'周予安',manager:'徐老师',campus:'香港校区',type:'逾期',created:'2026-10-29 16:30',status:'待处理',description:'课程安排需与家长确认。'},
{id:'rv4',code:'MAC240',name:'许知远',manager:'香港澳门老师',campus:'澳门校区',type:'缺勤',created:'2026-10-29 15:10',status:'待处理',description:'联系家长了解缺勤原因并确认后续上课安排。'},
{id:'rv5',code:'S0032',name:'陈思齐',manager:'徐老师',campus:'线上校区',type:'评价回访',created:'2026-10-28 11:15',status:'处理中',answers:['一般','不满意','满意','上次咨询回复较慢，希望改善。'],questions,answerId:'A20261028032',note:'已联系家长，正在确认具体反馈。'},
{id:'rv6',code:'HKC4883',name:'李沐言',manager:'熊二老师',campus:'香港校区',type:'分享赠堂',created:'2026-10-27 14:20',status:'已完成',completed:'2026-10-28 09:30',description:'已向家长说明分享赠堂规则。',note:'家长已了解活动规则。'}];
let overrides={};try{overrides=JSON.parse(localStorage.getItem(key))||{}}catch{}
let records=[],status='待处理',page=1,filtered=[],applied={},selected=null;const size=10;
function collect(){
 const linked=[];
 try{const source=JSON.parse(localStorage.getItem(surveyKey));for(const a of source?.answers||[]){const snapshot=source.surveys?.find(s=>s.id===a.surveyId)?.versions?.find(v=>v.version===a.version);if(!snapshot)continue;
 // Pending business confirmation: exact negative options on single-choice satisfaction questions.
 if(!snapshot.questions.some((q,i)=>q.type==='single'&&['不满意','非常不满意'].includes(a.values[i])))continue;
 linked.push({id:'answer:'+a.id,code:a.studentId,name:a.name,manager:a.manager||'未分配',campus:a.campus||'未分配',type:'评价回访',created:a.submitted,status:'待处理',answers:a.values,questions:snapshot.questions.map(q=>q.title),answerId:a.id});}}
 catch{}
 records=[...base,...linked].map(r=>({...r,...overrides[r.id]}));
}
function dateMatches(value,start,end){const d=(value||'').slice(0,10);return(!start&&!end)||!!d&&(!start||d>=start)&&(!end||d<=end)}
function render(){collect();const f=applied;const matches=records.filter(r=>(!f.name||r.name.includes(f.name.trim()))&&(!f.code||r.code.toLowerCase().includes(f.code.trim().toLowerCase()))&&(!f.manager||r.manager===f.manager)&&(!f.campus||r.campus===f.campus)&&(!f.type||r.type===f.type)&&dateMatches(r.created,f.createdStart,f.createdEnd)&&dateMatches(r.completed,f.doneStart,f.doneEnd));
 document.querySelectorAll('[data-status]').forEach(b=>{b.setAttribute('aria-selected',b.dataset.status===status);b.textContent=b.dataset.status+'（'+matches.filter(r=>r.status===b.dataset.status).length+'）'});
 filtered=matches.filter(r=>r.status===status).sort((a,b)=>b.created.localeCompare(a.created));const pages=Math.max(1,Math.ceil(filtered.length/size));page=Math.min(page,pages);
 $('visitRows').innerHTML=filtered.slice((page-1)*size,page*size).map(r=>`<tr><td>${esc(r.code)}</td><td>${esc(r.name)}</td><td><span class="status ${r.status==='处理中'?'doing':r.status==='已完成'?'done':''}">${r.status}</span></td><td>${esc(r.created)}</td><td>${esc(r.manager)}</td><td>${r.type}</td><td>—</td><td>${esc(r.completed||'—')}</td><td><button class="table-link" data-open="${esc(r.id)}">${r.type==='评价回访'?'查看评价':'查看 / 跟进'}</button></td></tr>`).join('')||'<tr><td colspan="9" class="empty">暂无符合条件的回访记录</td></tr>';
 $('visitCount').textContent='共 '+filtered.length+' 条';$('pageInfo').textContent=page+' / '+pages;$('prevPage').disabled=page===1;$('nextPage').disabled=page===pages;
}
$('visitFilters').addEventListener('submit',e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));const invalid=[['createdStart','createdEnd'],['doneStart','doneEnd']].some(([a,b])=>f[a]&&f[b]&&f[a]>f[b]);$('visitFilterError').hidden=!invalid;$('visitFilterError').textContent=invalid?'开始日期不能晚于结束日期':'';if(invalid)return;applied=f;page=1;render()});
$('visitFilters').addEventListener('reset',()=>{applied={};status='待处理';page=1;$('visitFilterError').hidden=true;render()});
document.querySelectorAll('[data-status]').forEach(b=>b.addEventListener('click',()=>{status=b.dataset.status;page=1;render()}));
$('prevPage').onclick=()=>{page--;render()};$('nextPage').onclick=()=>{page++;render()};
$('visitRows').addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;selected=records.find(r=>r.id===b.dataset.open);const r=selected;$('visitTitle').textContent=r.type==='评价回访'?'满意度评价 · 回访':'回访详情';
 $('visitInfo').innerHTML='<div class="visit-info">'+[['学生姓名',r.name],['学生编号',r.code],['回访类型',r.type],['创建时间',r.created],...(r.answerId?[['评价编号',r.answerId]]:[])].map(([k,v])=>`<div><small>${k}</small><strong>${esc(v)}</strong></div>`).join('')+'</div>';
 $('visitEvaluation').innerHTML=r.answers?'<h3>满意度信息</h3>'+r.questions.map((q,i)=>`<div class="evaluation-item"><div>${esc(q)}</div><p class="${['不满意','非常不满意'].includes(r.answers[i])?'negative':''}">${esc(r.answers[i]||'未填写')}</p></div>`).join(''):'<h3>回访事项</h3><p>'+esc(r.description||'请联系家长了解具体情况。')+'</p>';
 $('visitStatus').value=r.status;$('visitNote').value=r.note||'';$('visitSaveError').textContent='';$('visitDialog').showModal();});
function requestClose(){if(selected&&($('visitStatus').value!==selected.status||$('visitNote').value!==(selected.note||''))&&!confirm('放弃未保存的回访修改？'))return;$('visitDialog').close();}
$('closeVisit').onclick=$('cancelVisit').onclick=requestClose;
$('visitDialog').addEventListener('cancel',e=>{e.preventDefault();requestClose()});
$('visitDetailForm').addEventListener('submit',e=>{e.preventDefault();const nextStatus=$('visitStatus').value;const completed=nextStatus==='已完成'?(selected.completed||new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())):'';const next={...overrides,[selected.id]:{status:nextStatus,note:$('visitNote').value.trim(),completed}};try{localStorage.setItem(key,JSON.stringify(next));overrides=next;$('visitDialog').close();render()}catch{$('visitSaveError').textContent='保存失败，请重试。'}});
window.addEventListener('storage',e=>{if(e.key===surveyKey||e.key===key){if(e.key===key){try{overrides=JSON.parse(e.newValue)||{}}catch{}}render()}});window.addEventListener('focus',render);render();
})();
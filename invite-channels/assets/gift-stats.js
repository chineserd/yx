(() => {
const fields=['学员姓名','学员编号','所属学管','所属顾问','剩余赠课数','当期已获赠课数','最近分享月份','已过期赠课数','可获赠课总数'];
const rows=[['杨子资','HKC13759','熊二老师','超级管理员',8,1,'2026-10',0,9],['试试就试试','GB666','熊二老师','',10,1,'2026-10',0,11],['小鹿','IDB27','香港澳门老师','超级管理员',16,0,'--',0,16],['12','HKC4686','徐老师','超级管理员',3,1,'2026-10',0,4],['0308-1','HKC4883','徐老师','超级管理员',3,1,'2026-10',0,4],['Perry2','HKB258','熊二老师','刘鹏昌',2,1,'2026-09',0,3],['内购','HKC12109','徐老师','陈锦辉',2,3,'2026-08',1,6],['12340938','MAC240','徐老师','超级管理员',4,8,'2026-09',0,12],['an','MAC241','徐老师','',1,5,'2026-07',0,6],['1','HKC12059','熊二老师','超级管理员',13,1,'2026-07',0,14]];
// Historical quantities in the existing quota snapshot; independent of date filters.
const lifetimeByCode=Object.fromEntries(rows.map(r=>[r[1],r[8]-r[4]-r[7]]));
const listFields=[...fields.slice(0,5),'累计已获赠堂数',...fields.slice(5)];
const listValues=r=>[...r.slice(0,5),lifetimeByCode[r[1]],...r.slice(5)];
// User supplied October 2026 snapshot; keep its month stable for review.
const month='2026-10',form=document.getElementById('statsFilters'),dialog=document.getElementById('statsDetail');
function setStatsPeriod(){
 const custom=form.elements.period.value==='custom';
 const dates=document.getElementById('statsCustomDates');
 dates.hidden=!custom;dates.style.display=custom?'inline-flex':'none';
 if(custom)return;
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const value=t=>parts.find(p=>p.type===t).value;
 const day=new Date(`${value('year')}-${value('month')}-${value('day')}T00:00:00Z`);
 if(form.elements.period.value==='month'){
  day.setUTCDate(1);form.elements.dateStart.value=day.toISOString().slice(0,10);
  day.setUTCMonth(day.getUTCMonth()+1,0);
 }else{
  day.setUTCDate(day.getUTCDate()-((day.getUTCDay()+6)%7));
  form.elements.dateStart.value=day.toISOString().slice(0,10);day.setUTCDate(day.getUTCDate()+6);
 }
 form.elements.dateEnd.value=day.toISOString().slice(0,10);
 document.getElementById('statsDateError').textContent='';
}
setStatsPeriod();form.elements.period.addEventListener('change',()=>{setStatsPeriod();query();});
let filtered=rows,page=1,size=10;
function render(){const pages=Math.max(1,Math.ceil(filtered.length/size));page=Math.min(page,pages);document.getElementById('statsRows').innerHTML=filtered.length?filtered.slice((page-1)*size,page*size).map(r=>`<tr>${listValues(r).map(v=>`<td>${v===''?'--':v}</td>`).join('')}<td><button type="button" class="invite-view" data-stats-code="${r[1]}">查看已赠</button></td></tr>`).join(''):'<tr><td colspan="11" style="text-align:center;padding:48px">暂无符合条件的学员，请调整筛选条件</td></tr>';document.getElementById('statsCount').textContent=`共 ${filtered.length} 条记录`;document.getElementById('statsPage').textContent=`${page} / ${pages}`;document.getElementById('statsPrev').disabled=page===1;document.getElementById('statsNext').disabled=page===pages;document.getElementById('exportStats').disabled=!filtered.length;}
function query(){const f=new FormData(form); const invalid=f.get("dateStart")>f.get("dateEnd");document.getElementById("statsDateError").textContent=invalid?"开始日期不能晚于结束日期":"";if(invalid)return;filtered=rows.filter(r=>r[0].includes(f.get('name').trim())&&r[1].toLowerCase().includes(f.get('code').trim().toLowerCase())&&(!f.get('manager')||r[2]===f.get('manager'))&&(!f.get('advisor')||(f.get('advisor')==='none'?!r[3]:r[3]===f.get('advisor')))&&(!f.get('unshared')||(f.get('unshared')==='yes'?r[6]!==month:r[6]===month))&&(f.get('remaining')===''||r[4]>Number(f.get('remaining'))));page=1;render();}
const shareStatusButtons=document.querySelectorAll('[data-share-status]');
function syncShareStatus(){shareStatusButtons.forEach(b=>b.checked=b.value===form.elements.unshared.value);}
shareStatusButtons.forEach(b=>b.addEventListener('change',()=>{syncShareStatus();query();}));
form.addEventListener('submit',e=>{e.preventDefault();query()});form.addEventListener('reset',()=>setTimeout(()=>{setStatsPeriod();form.elements.unshared.value="yes";syncShareStatus();query()},0));
document.getElementById('statsPrev').addEventListener('click',()=>{page--;render()});document.getElementById('statsNext').addEventListener('click',()=>{page++;render()});document.getElementById('statsPageSize').addEventListener('change',e=>{size=Number(e.target.value);page=1;render()});
document.getElementById('statsRows').addEventListener('click',e=>{const b=e.target.closest('[data-stats-code]');if(!b)return;const r=rows.find(r=>r[1]===b.dataset.statsCode);document.getElementById('statsDetailTitle').textContent=r[0]+' · 已赠课详情';document.getElementById('statsDetailBody').innerHTML=`<section class="invite-detail-card"><dl>${[0,1,2,3,6].map(i=>`<dt>${fields[i]}</dt><dd>${r[i]||'未分配'}</dd>`).join('')}</dl></section><div class="stats-detail-summary"><span>已获赠课数<strong>${r[5]}</strong></span><span>剩余赠课数<strong>${r[4]}</strong></span><span>已过期赠课数<strong>${r[7]}</strong></span></div><p class="stats-detail-note">可获赠课总数 ${r[8]} = 剩余 ${r[4]} + 已获赠 ${r[5]} + 已过期 ${r[7]}${r[5]===0?'<br>该学员暂未获赠课程。':''}</p>`;dialog.showModal()});document.getElementById('closeStatsDetail').addEventListener('click',()=>dialog.close());
document.getElementById('exportStats').addEventListener('click',()=>{const quote=v=>'"'+String(v).replaceAll('"','""')+'"';const csv='\ufeff'+[listFields,...filtered.map(listValues)].map(r=>r.map(quote).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='分享赠课统计-2026-10.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
const header=document.querySelector('#shareGiftPage .page-header > div');function heading(){if(document.querySelector('[data-tab="stats"]').classList.contains('active'))header.innerHTML='<p class="breadcrumb">学员管理 / 分享邀请 / 赠课统计</p><h1>分享赠课统计</h1><p>统一处理学员分享凭证审核，并查看学员维度赠课额度统计。</p>';}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',heading));heading();query();
})();

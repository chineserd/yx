(() => {
const fields=['学员姓名','学员编号','所属学管','所属顾问','最近分享月份','剩余赠课数','累计已获赠堂数','当期已获赠课数','已过期赠课数','可获赠课总数'];
const month='2026-10';
const students=[
  {name:'杨子资',code:'HKC13759',manager:'熊二老师',advisor:'超级管理员',total:9,expired:0,shareMonth:'2026-10',grants:[['2026-10-02',1]]},
  {name:'试试就试试',code:'GB666',manager:'熊二老师',advisor:'',total:11,expired:0,shareMonth:'2026-10',grants:[['2026-10-07',1]]},
  {name:'小鹿',code:'IDB27',manager:'香港澳门老师',advisor:'超级管理员',total:16,expired:0,shareMonth:'--',grants:[]},
  {name:'0308-1',code:'HKC4883',manager:'徐老师',advisor:'超级管理员',total:30,expired:1,shareMonth:'2026-09',grants:[['2026-09-12',2],['2026-11-04',3]]},
  {name:'Perry2',code:'HKB258',manager:'熊二老师',advisor:'刘鹏昌',total:42,expired:0,shareMonth:'2026-09',grants:[['2026-08-12',2],['2026-09-21',2],['2026-10-11',3]]},
  {name:'内购',code:'HKC12109',manager:'徐老师',advisor:'陈锦辉',total:50,expired:0,shareMonth:'2026-08',grants:[['2026-08-18',2],['2026-09-06',2],['2026-10-20',4]]},
  {name:'12340938',code:'MAC240',manager:'徐老师',advisor:'超级管理员',total:55,expired:1,shareMonth:'2026-09',grants:[['2026-07-15',2],['2026-10-28',1],['2026-11-05',3]]},
  {name:'an',code:'MAC241',manager:'徐老师',advisor:'',total:60,expired:0,shareMonth:'--',grants:[['2026-09-02',1],['2026-10-23',3]]},
  {name:'1',code:'HKC12059',manager:'熊二老师',advisor:'超级管理员',total:15,expired:0,shareMonth:'2026-07',grants:[['2026-10-26',2]]},
  {name:'Sophie',code:'HKC13008',manager:'香港澳门老师',advisor:'卢行飞',total:15,expired:0,shareMonth:'2026-10',grants:[['2026-10-30',1],['2026-11-02',1]]}
];
const asDate=value=>new Date(value+'T00:00:00Z');
const sumGrants=student=>student.grants.reduce((sum,[,lessons])=>sum+lessons,0);
const inRange=(date,start,end)=>date>=start&&date<=end;
function makeRow(student,start,end){
 const lifetime=sumGrants(student);
 const current=student.grants.reduce((sum,[date,lessons])=>sum+(inRange(date,start,end)?lessons:0),0);
 const remaining=student.total-lifetime-student.expired;
 return {student,lifetime,current,remaining,expired:student.expired,total:student.total};
}
const listValues=row=>[row.student.name,row.student.code,row.student.manager,row.student.advisor,row.student.shareMonth,row.remaining,row.lifetime,row.current,row.expired,row.total];
const form=document.getElementById('statsFilters');
const dialog=document.getElementById('statsDetail');
const rangeButton=document.getElementById('giftRangeButton');
const picker=document.getElementById('giftRangePicker');
const iso=date=>date.toISOString().slice(0,10);
const todayInShanghai=()=>asDate(new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date()));
let start,end,firstDay,viewMonth,filtered=[];
function preset(period){
 const today=todayInShanghai();
 const last=new Date(today);
 if(period==='month'){
  today.setUTCDate(1); last.setUTCMonth(last.getUTCMonth()+1,0);
 }else{
  today.setUTCDate(today.getUTCDate()-(today.getUTCDay()+6)%7);
  last.setTime(today.getTime()); last.setUTCDate(today.getUTCDate()+6);
 }
 setRange(iso(today),iso(last),period==='week'?'当周':'当月');
}
function setRange(from,to,label=''){
 start=from;end=to;
 rangeButton.textContent=(label?label+' · ':'')+from+' 至 '+to;
 picker.hidePopover();
}
function drawCalendar(){
 const year=viewMonth.getUTCFullYear(),monthIndex=viewMonth.getUTCMonth();
 picker.querySelector('strong').textContent=year+'年'+(monthIndex+1)+'月';
 const offset=(viewMonth.getUTCDay()+6)%7;
 const length=new Date(Date.UTC(year,monthIndex+1,0)).getUTCDate();
 const days=picker.querySelector('.range-days');
 days.replaceChildren();
 for(let day=1;day<=length;day++){
  const value=iso(new Date(Date.UTC(year,monthIndex,day)));
  const button=document.createElement('button');
  button.type='button';button.textContent=day;button.dataset.date=value;button.setAttribute('aria-label',value);
  if(day===1)button.style.gridColumnStart=offset+1;
  if(firstDay?value===firstDay:value===start||value===end)button.className='endpoint';
  else if(!firstDay&&value>start&&value<end)button.className='in-range';
  days.append(button);
 }
 picker.querySelector('small').textContent=firstDay?'已选 '+firstDay+'，请选择结束日期':'请选择开始日期，再选择结束日期';
}
picker.addEventListener('beforetoggle',event=>{
 if(event.newState!=='open')return;
 firstDay=null;viewMonth=asDate(start.slice(0,7)+'-01');drawCalendar();
 const rect=rangeButton.getBoundingClientRect();
 picker.style.left=Math.max(4,Math.min(rect.left,innerWidth-304))+'px';
 picker.style.top=Math.max(4,Math.min(rect.bottom+4,innerHeight-355))+'px';
});
picker.addEventListener('click',event=>{
 const {date,step,period}=event.target.dataset;
 if(step){viewMonth.setUTCMonth(viewMonth.getUTCMonth()+Number(step));drawCalendar();return;}
 if(period){preset(period);query();return;}
 if(!date)return;
 if(!firstDay){firstDay=date;drawCalendar();return;}
 const [from,to]=[firstDay,date].sort();setRange(from,to);query();
});
function renderSummary(){
 const all=students.map(student=>makeRow(student,'0000-01-01','9999-12-31'));
 document.querySelector('#remainingGiftCard strong').textContent=all.reduce((sum,row)=>sum+row.remaining,0);
 document.querySelector('#lifetimeGiftCard strong').textContent=all.reduce((sum,row)=>sum+row.lifetime,0);
 document.querySelector('#expiredGiftCard strong').textContent=all.reduce((sum,row)=>sum+row.expired,0);
 document.querySelector('#totalGiftCard strong').textContent=all.reduce((sum,row)=>sum+row.total,0);
}
function render(){
 const pages=Math.max(1,Math.ceil(filtered.length/size));
 page=Math.min(page,pages);
 document.getElementById('statsRows').innerHTML=filtered.length?filtered.slice((page-1)*size,page*size).map(row=>`<tr>${listValues(row).map(value=>`<td>${value===''?'--':value}</td>`).join('')}<td><button type="button" class="invite-view" data-stats-code="${row.student.code}">查看已赠</button></td></tr>`).join(''):'<tr><td colspan="11" style="text-align:center;padding:48px">暂无符合条件的学员，请调整筛选条件</td></tr>';
 document.getElementById('statsCount').textContent=`共 ${filtered.length} 条记录`;
 document.getElementById('statsPage').textContent=`${page} / ${pages}`;
 document.getElementById('statsPrev').disabled=page===1;document.getElementById('statsNext').disabled=page===pages;
 document.getElementById('exportStats').disabled=!filtered.length;
}
function query(){
 const filter=new FormData(form);
 const shareFilter=filter.get('unshared');
 filtered=students.map(student=>makeRow(student,start,end)).filter(row=>{
  const student=row.student;
  return student.name.includes(filter.get('name').trim())&&student.code.toLowerCase().includes(filter.get('code').trim().toLowerCase())&&(!filter.get('manager')||student.manager===filter.get('manager'))&&(!filter.get('advisor')||(filter.get('advisor')==='none'?!student.advisor:student.advisor===filter.get('advisor')))&&(!shareFilter||(shareFilter==='yes'?student.shareMonth!==month:student.shareMonth===month))&&(filter.get('remaining')===''||row.remaining>Number(filter.get('remaining')));
 });
 document.querySelector('#periodGiftCard strong').textContent=filtered.reduce((sum,row)=>sum+row.current,0);
 page=1;render();
}
let page=1,size=10;
renderSummary();preset('week');
const shareStatusButtons=document.querySelectorAll('[data-share-status]');
function syncShareStatus(){shareStatusButtons.forEach(button=>button.checked=button.value===form.elements.unshared.value);}
shareStatusButtons.forEach(button=>button.addEventListener('change',()=>{syncShareStatus();query();}));
form.addEventListener('submit',event=>{event.preventDefault();query();});
form.addEventListener('reset',()=>setTimeout(()=>{preset('week');form.elements.unshared.value='yes';syncShareStatus();query();},0));
document.getElementById('statsPrev').addEventListener('click',()=>{page--;render();});
document.getElementById('statsNext').addEventListener('click',()=>{page++;render();});
document.getElementById('statsPageSize').addEventListener('change',event=>{size=Number(event.target.value);page=1;render();});
document.getElementById('statsRows').addEventListener('click',event=>{
 const button=event.target.closest('[data-stats-code]');if(!button)return;
 const row=filtered.find(item=>item.student.code===button.dataset.statsCode);if(!row)return;
 const student=row.student;
 document.getElementById('statsDetailTitle').textContent=student.name+' · 已赠课详情';
 document.getElementById('statsDetailBody').innerHTML=`<section class="invite-detail-card"><dl><dt>学员姓名</dt><dd>${student.name}</dd><dt>学员编号</dt><dd>${student.code}</dd><dt>所属学管</dt><dd>${student.manager}</dd><dt>所属顾问</dt><dd>${student.advisor||'未分配'}</dd><dt>最近分享月份</dt><dd>${student.shareMonth}</dd></dl></section><div class="stats-detail-summary"><span>当期已获赠课数<strong>${row.current}</strong></span><span>剩余赠课数<strong>${row.remaining}</strong></span><span>已过期赠课数<strong>${row.expired}</strong></span></div><p class="stats-detail-note">可获赠课总数 ${row.total} = 剩余 ${row.remaining} + 累计已获赠 ${row.lifetime} + 已过期 ${row.expired}</p>`;
 dialog.showModal();
});
document.getElementById('closeStatsDetail').addEventListener('click',()=>dialog.close());
document.getElementById('exportStats').addEventListener('click',()=>{
 const quote=value=>'"'+String(value).replaceAll('"','""')+'"';
 const csv='\ufeff'+[fields,...filtered.map(row=>listValues(row))].map(row=>row.map(quote).join(',')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download='分享赠课统计-2026-10.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const header=document.querySelector('#shareGiftPage .page-header > div');
function heading(){if(document.querySelector('[data-tab="stats"]').classList.contains('active'))header.innerHTML='<p class="breadcrumb">学员管理 / 分享赠课 / 赠课统计</p><h1>分享赠课统计</h1><p>统一处理学员分享凭证审核，并查看学员维度赠课额度统计。</p>';}
document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',heading));
heading();syncShareStatus();query();
})();

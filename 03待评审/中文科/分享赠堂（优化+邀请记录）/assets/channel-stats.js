(() => {
const form=document.getElementById('channelFilters'),channels=['Facebook','Instagram','朋友圈','WhatsApp','保存'];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const field=n=>form.elements.namedItem(n);
PosterContent.read().forEach(p=>{const o=document.createElement('option');o.value=String(p.id);o.textContent=p.title;field('poster').appendChild(o)});
function week(){const d=new Date(new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date())+'T00:00:00Z');d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);field('start').value=d.toISOString().slice(0,10);d.setUTCDate(d.getUTCDate()+6);field('end').value=d.toISOString().slice(0,10)}
// Stable prototype events: each registration owns a matching visit; anonymous visits include repeat visits.
function dataset(){
const leads=ScanLeads.read().map((r,i)=>({...r,channel:r.channel||channels[Array.from(r.id).reduce((sum,c)=>sum+c.charCodeAt(0),0)%channels.length],visitor:'lead:'+r.phone.replace(/\s/g,''),entry:r.entry||'qr'}));
const events=leads.map(r=>({day:r.time.slice(0,10),channel:r.channel,visitor:r.visitor,entry:r.entry,posterId:r.posterId,inviter:r.inviter,inviterName:r.inviterName}));
for(let day=19;day<=29;day++)for(let c=0;c<channels.length;c++)for(let n=0;n<8+c*3;n++){
const e={day:'2026-10-'+day,channel:channels[c],visitor:'visitor:'+day+':'+(n<2?'shared':c)+':'+n,entry:channels[c]==='保存'||n%3===0?'qr':'link',posterId:n%2?5:1,inviter:n%2?'HKC107276':'HKC108625',inviterName:n%2?'黄钰莹':'测试'};
events.push(e);if(n%4===0)events.push({...e});
}
return {leads,events};
}
const unique=rows=>new Set(rows.map(r=>r.visitor)).size;
const rate=(a,b)=>b?(a/b*100).toFixed(1)+'%':'—';
let activeLeads=[];
function render(){
const f=Object.fromEntries(new FormData(form));
document.getElementById('channelError').textContent=f.start>f.end?'开始日期不能晚于结束日期':'';
if(f.start>f.end)return;
const matches=r=>(r.day||r.time.slice(0,10))>=f.start&&(r.day||r.time.slice(0,10))<=f.end&&(!f.channel||r.channel===f.channel)&&(!f.poster||String(r.posterId)===f.poster)&&(r.inviter+r.inviterName).includes(f.inviter.trim());
const data=dataset(),events=data.events.filter(matches);activeLeads=data.leads.filter(matches);
const metrics=ev=>[ev.length,unique(ev),unique(ev.filter(r=>r.entry==='qr')),unique(ev.filter(r=>r.entry==='link'))];
const totals=metrics(events),registrations=unique(activeLeads);
document.getElementById('channelCards').innerHTML=['访问次数','访问人数','扫码进入人数','链接进入人数','登记人数','登记转化率'].map((label,i)=>'<article style="padding:12px"><h3>'+label+'</h3><strong style="font-size:25px">'+[...totals,registrations,rate(registrations,totals[1])][i]+'</strong></article>').join('');
const selected=channels.filter(c=>!f.channel||c===f.channel);
document.getElementById('channelRows').innerHTML=selected.map(c=>{const ev=events.filter(r=>r.channel===c),m=metrics(ev),count=unique(activeLeads.filter(r=>r.channel===c));return '<tr><td>'+esc(c)+'</td>'+[...m,count,rate(count,m[1])].map(v=>'<td>'+v+'</td>').join('')+'<td><button class="invite-view" data-channel="'+esc(c)+'">查看登记明细</button></td></tr>'}).join('');
}
form.addEventListener('submit',e=>{e.preventDefault();render()});form.addEventListener('reset',()=>setTimeout(()=>{week();render()},0));
document.getElementById('channelRows').addEventListener('click',e=>{const b=e.target.closest('[data-channel]');if(!b)return;
const rows=activeLeads.filter(r=>r.channel===b.dataset.channel);document.getElementById('channelDetailsTitle').textContent=b.dataset.channel+' · 登记明细';
document.getElementById('channelDetailsBody').innerHTML=rows.length?'<table style="width:100%"><thead><tr><th>登记人</th><th>联系电话</th><th>邀请人</th><th>海报来源</th><th>登记时间</th><th>线索管理状态</th></tr></thead><tbody>'+rows.map(r=>'<tr>'+[r.parentName,r.phone,r.inviterName,r.poster,r.time,r.status||'待同步'].map(v=>'<td style="padding:12px 6px">'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>':'<p>当前筛选范围内暂无登记记录</p>';
document.getElementById('channelDetails').showModal();
});document.getElementById('closeChannelDetails').addEventListener('click',()=>document.getElementById('channelDetails').close());
function heading(){if(document.querySelector('[data-tab="channels"]').classList.contains('active')){document.querySelector('#shareGiftPage .page-header > div').innerHTML='<p class="breadcrumb">学员管理 / 分享赠课 / 渠道统计</p><h1>渠道统计</h1><p>查看不同分享渠道带来的访问、扫码进入与登记效果。</p>';render()}}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',heading));
window.addEventListener('leads-updated',render);window.addEventListener('storage',render);week();heading();render();
})();
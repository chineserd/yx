(() => {
const form=document.getElementById('leadFilters'),body=document.getElementById('leadRows'),dialog=document.getElementById('leadFollowDialog');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selectedId=null;
function render(){
const f=Object.fromEntries(new FormData(form));
const rows=ScanLeads.read().filter(r=>(r.parentName+r.phone).includes(f.person.trim())&&(r.inviterName+r.inviter).includes(f.inviter.trim())&&(!f.status||r.status===f.status));
document.getElementById('leadListCount').textContent='共 '+rows.length+' 条登记记录';
body.innerHTML=rows.length?rows.map(r=>'<tr>'+[r.parentName,r.phone,r.age,r.needs||'—',r.inviterName+' / '+r.inviter,r.poster,r.time,r.status||'待同步',r.note||'—'].map(v=>'<td>'+esc(v)+'</td>').join('')+'<td><button class="invite-view" data-lead="'+esc(r.id)+'">查看 / 跟进</button></td></tr>').join(''):'<tr><td colspan="10" style="text-align:center;padding:32px">暂无符合条件的登记记录</td></tr>';
}
form.addEventListener('submit',e=>{e.preventDefault();render()});
form.addEventListener('reset',()=>setTimeout(render,0));
body.addEventListener('click',e=>{
const b=e.target.closest('[data-lead]');if(!b)return;
const r=ScanLeads.read().find(r=>r.id===b.dataset.lead);if(!r)return;selectedId=r.id;
document.getElementById('leadFollowInfo').innerHTML='<dl>'+[['登记人',r.parentName],['联系号码',r.phone],['孩子年龄',r.age],['学习需求',r.needs||'—'],['邀请人',r.inviterName+' / '+r.inviter],['海报来源',r.poster],['登记时间',r.time]].map(([k,v])=>'<dt>'+k+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl>';
document.getElementById('leadFollowStatus').value=r.status;
document.getElementById('leadFollowNote').value=r.note||'';
document.getElementById('leadFollowError').textContent='';dialog.showModal();
});
document.getElementById('leadFollowClose').addEventListener('click',()=>dialog.close());
document.getElementById('leadFollowForm').addEventListener('submit',e=>{
e.preventDefault();const rows=ScanLeads.read(),r=rows.find(r=>r.id===selectedId);if(!r)return;
r.status=document.getElementById('leadFollowStatus').value;r.note=document.getElementById('leadFollowNote').value.trim();r.updatedAt=new Date().toISOString();
try{ScanLeads.write(rows);dialog.close();render()}catch{document.getElementById('leadFollowError').textContent='保存失败，请重试。'}
});
function heading(){if(document.querySelector('[data-tab="registrations"]').classList.contains('active'))document.querySelector('#shareGiftPage .page-header > div').innerHTML='<p class="breadcrumb">学员管理 / 分享赠课 / 登记列表</p><h1>登记列表</h1><p>查看扫码登记资料、线索管理状态与沟通备注。</p>';}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',heading));
window.addEventListener('leads-updated',render);window.addEventListener('storage',e=>{if(e.key===ScanLeads.key)render()});window.addEventListener('focus',render);
heading();render();
})();
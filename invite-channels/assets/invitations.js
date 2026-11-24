/* Review fixture only: qualification and reward rules remain undecided. */
(() => {
  const records = [
    {id:'INV20261029001',owner:'测试',ownerId:'HKC108625',name:'陈**',userId:'U203891',phone:'+852 6*** 2186',source:'暑假中文陪学',poster:'P001',channel:'WhatsApp',shared:'2026-10-28 18:30',time:'2026-10-29 09:26'},
    {id:'INV20261027002',owner:'测试',ownerId:'HKC108625',name:'李**',userId:'U203756',phone:'+852 9*** 3062',source:'趣味中文启蒙',poster:'P002',channel:'Facebook',shared:'2026-10-26 12:15',time:'2026-10-27 14:18'},
    {id:'INV20261023003',owner:'测试',ownerId:'HKC108625',name:'王**',userId:'U203602',phone:'+852 5*** 1893',source:'暑假中文陪学',poster:'P001',channel:'朋友圈',shared:'2026-10-22 19:06',time:'2026-10-23 10:42'},
    {id:'INV20261022004',owner:'黄钰莹',ownerId:'HKC107276',name:'林**',userId:'U203521',phone:'+852 6*** 7520',source:'趣味中文启蒙',poster:'P002',channel:'WhatsApp',shared:'2026-10-21 16:25',time:'2026-10-22 11:08'}
  ];
  window.invitationRecords = records;
  const own = records.filter(r=>r.ownerId==='HKC108625');
  function detail(r, app) {
    const labels=app?['邀請關係','邀請人','被邀請人','聯絡電話','內容來源','分享海報','分享渠道','分享時間','邀請時間','記錄編號']:['邀请关系','邀请人','被邀请人','联系电话','内容来源','分享海报','分享渠道','分享时间','邀请时间','记录编号'];
    const pair=(label,value)=>`<dt>${label}</dt><dd>${value}</dd>`;
    return `<section class="invite-detail-card"><h3>${labels[0]}</h3><dl>${pair(labels[1],(app?'我（測試）':r.owner)+' · '+r.ownerId)}${pair(labels[2],r.name+' · '+r.userId)}${pair(labels[3],r.phone)}</dl></section><section class="invite-detail-card"><h3>${labels[4]}</h3><dl>${pair(labels[5],r.source+' · '+r.poster)}${pair(labels[6],r.channel)}${pair(labels[7],r.shared)}${pair(labels[8],r.time)}${pair(labels[9],r.id)}</dl></section>`;
  }
  const appList=document.getElementById('appInviteList');
  if(appList){
    appList.innerHTML=own.map(r=>`<article class="invite-record"><strong>${r.name}</strong><div class="invite-record-time"><span>邀請時間</span><time datetime="${r.time.replace(' ','T')}">${r.time}</time></div></article>`).join('');
  }
  const form=document.getElementById('inviteFilters');
  if(form){
    function render(){
      const data=new FormData(form), start=data.get('start'),end=data.get('end');
      document.getElementById('inviteFilterError').textContent=start&&end&&start>end?'开始日期不能晚于结束日期':'';
      if(start&&end&&start>end)return;
      const rows=records.filter(r=>(r.owner+r.ownerId).includes(data.get('inviter').trim())&&(r.name+r.userId).includes(data.get('invitee').trim())&&(!data.get('source')||r.source===data.get('source'))&&(!data.get('channel')||r.channel===data.get('channel'))&&(!start||r.time.slice(0,10)>=start)&&(!end||r.time.slice(0,10)<=end));
      document.getElementById('adminInviteSummary').innerHTML=`<span>当前结果 · 邀请人数<strong>${new Set(rows.map(r=>r.ownerId)).size}</strong></span><span>被邀请人数<strong>${new Set(rows.map(r=>r.userId)).size}</strong></span>`;
      document.getElementById('adminInviteList').innerHTML=rows.length?rows.map(r=>`<tr><td>${r.owner}<small>${r.ownerId}</small></td><td>${r.name}<small>${r.userId}</small></td><td>${r.source}<small>${r.poster}</small></td><td>${r.channel}</td><td>${r.time}</td><td><button class="invite-view" data-invite-id="${r.id}">查看详情</button></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;padding:48px">暂无符合条件的邀请记录，请调整筛选条件</td></tr>';
      document.getElementById('inviteCount').textContent=`共 ${rows.length} 条邀请记录`;
    }
    form.addEventListener('submit',e=>{e.preventDefault();render()});
    form.addEventListener('reset',()=>setTimeout(render,0));
    const dialog=document.getElementById('inviteDialog');
    document.getElementById('adminInviteList').addEventListener('click',e=>{const button=e.target.closest('[data-invite-id]');if(!button)return;document.getElementById('adminInviteDetail').innerHTML=detail(records.find(r=>r.id===button.dataset.inviteId),false);dialog.showModal()});
    document.getElementById('closeInviteDialog').addEventListener('click',()=>dialog.close());
    const header=document.querySelector('#shareGiftPage .page-header > div');
    const oldHeader=header.innerHTML;
    function heading(){if(document.querySelector('[data-tab="invitations"]').classList.contains('active'))header.innerHTML='<p class="breadcrumb">学员管理 / 分享邀请 / 邀请明细</p><h1>邀请明细</h1><p>查看用户分享带来的邀请成果及内容来源。</p>';else header.innerHTML=oldHeader;}
    document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',heading));heading();render();
  }
})();

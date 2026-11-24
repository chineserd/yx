(() => {
 const params=new URLSearchParams(location.search);let sourceId=Number(params.get('p'))||1;
 const inviter=/^[A-Za-z0-9_-]{1,40}$/.test(params.get('i')||'')?params.get('i'):'HKC108625';
 function source(){return PosterContent.read().find(p=>p.id===sourceId)||PosterContent.read()[0]}
 function update(name){document.querySelectorAll('.app-preview-nav [data-goto]').forEach(b=>{if((name==='landing'||name==='lead-whatsapp'||name==='lead-success'? 'landing':'share')===b.dataset.goto)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});document.getElementById('leadSource').textContent='來自好友分享 · '+source().title;}
 let countdownTimer=null;
 function stopCountdown(){clearInterval(countdownTimer);countdownTimer=null;}
 function startCountdown(){
 stopCountdown();let seconds=3;
 const label=document.getElementById('leadCountdown');
 label.textContent=seconds+' 秒後自動進入 WhatsApp 諮詢頁面';
 countdownTimer=setInterval(()=>{
 seconds-=1;
 if(seconds<=0){stopCountdown();showScreen('lead-whatsapp');return;}
 label.textContent=seconds+' 秒後自動進入 WhatsApp 諮詢頁面';
 },1000);
 }
 window.addEventListener('app-screen',e=>{update(e.detail);if(e.detail==='lead-success')startCountdown();else stopCountdown()});
 window.addEventListener('pagehide',stopCountdown);window.addEventListener('poster-selection',()=>{sourceId=Array.from(document.querySelectorAll('.poster-thumb-btn')).findIndex(c=>c.classList.contains('selected'))+1});
 document.getElementById('leadForm').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);if(!d.get('parentName').trim()){document.getElementById('leadError').textContent='請填寫家長姓名';return;}document.getElementById('leadError').textContent='';document.getElementById('leadChatMessages').textContent='';document.getElementById('leadChatDraft').value=`您好，我想了解中文路課程。
家長姓名：${d.get('parentName').trim()}
聯絡電話：${d.get('dial')} ${d.get('phone')}
孩子年齡：${d.get('age')}
學習需求：${d.get('needs').trim()||'希望了解合適課程'}
海報：${source().title}
邀請來源：${inviter} / P${String(sourceId).padStart(3,'0')}`;const now=new Date();const time=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
 ScanLeads.add({id:'REG'+now.getTime(),parentName:d.get('parentName').trim(),phone:d.get('dial')+' '+d.get('phone'),age:d.get('age'),needs:d.get('needs').trim(),inviter,inviterName:inviter==='HKC108625'?'测试':inviter==='HKC107276'?'黄钰莹':inviter,poster:source().title,posterId:sourceId,time,status:'新线索',note:''});showScreen('lead-success');});
 document.getElementById('goLeadConsult').addEventListener('click',()=>showScreen('lead-whatsapp'));
 document.getElementById('leadChatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('leadChatDraft');if(!input.value.trim())return;const bubble=document.createElement('div');bubble.className='user-bubble';bubble.textContent=input.value.trim();document.getElementById('leadChatMessages').appendChild(bubble);input.value='';});
 update(params.get('screen')||'share');
 if(params.get('screen')==='landing'&&location.hostname!=='127.0.0.1'&&window.innerWidth<650){document.querySelector('.app-preview-nav').style.display='none';document.querySelector('.review-nav').style.display='none';document.body.style.setProperty('padding','0','important');const phone=document.querySelector('.phone');phone.style.cssText='width:100%;height:100vh;max-height:none;min-height:100vh;border:0;border-radius:0;zoom:1';document.querySelector('.lead-page').style.height='100vh';}
})();
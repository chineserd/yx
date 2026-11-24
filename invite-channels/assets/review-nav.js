(() => {
const current=decodeURIComponent(location.pathname.split('/').pop()||'index.html');
const links=[['admin.html','後台']];
const nav=document.createElement('nav');nav.className='review-nav';nav.setAttribute('aria-label','原型評審導航');nav.innerHTML='<div class="review-title"><small>需求名稱</small><strong>分享邀請與渠道統計</strong></div>'+links.map(([url,label])=>`<a href="${url}" ${url.split('?')[0]===current?'aria-current="page"':''}>${label}</a>`).join('')+'<a class="review-history" href="/">歷史需求彙總頁</a>';
document.body.prepend(nav);document.body.classList.add('has-review-nav');if(current==='admin.html')document.body.classList.add('review-admin');if(current==='index.html')document.body.classList.add('review-app');
nav.addEventListener('click',e=>{const link=e.target.closest('a');if(!link)return;const modal=document.getElementById('posterModal');if(modal?.classList.contains('open')){const form=document.getElementById('posterForm');const dirty=Array.from(form.elements).some(el=>el.type==='file'?el.files.length:el.value!==el.defaultValue);if(dirty&&!confirm('海报有未保存的内容，确定离开？'))e.preventDefault();}});
})();
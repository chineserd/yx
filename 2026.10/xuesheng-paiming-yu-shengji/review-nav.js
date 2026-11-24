(() => {
const nav=document.querySelector('.review-pages');
function sync(){
 const app=document.querySelector('#mode-app.active .app-screen.active');
 const web=document.querySelector('#mode-web.active .web-page.active');
 for(const button of nav.querySelectorAll('button')){
  let selected=false;
  if(button.dataset.devAppPage)selected=app?.id==='app-'+button.dataset.devAppPage;
  if(button.dataset.devWebPage){
   selected=web?.id==='web-'+button.dataset.devWebPage;
   if(selected&&button.dataset.devUpgradeStep)selected=Number(button.dataset.devUpgradeStep)===upgradeImportState.step;
   if(selected&&button.dataset.rankingTarget)selected=button.dataset.rankingTarget===webRankingState.tab;
  }
  if(selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 }
}
new MutationObserver(sync).observe(document.querySelector('.prototype-shell'),{subtree:true,attributes:true,attributeFilter:['class']});
document.addEventListener('click',()=>queueMicrotask(sync));sync();
})();

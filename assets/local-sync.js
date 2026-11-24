(() => {
  const button=document.getElementById('sync-local'), label=button.querySelector('.sync-label'), status=document.getElementById('local-sync-status');
  let busy=false;
  button.addEventListener('click',async()=>{
    if(busy)return;busy=true;button.disabled=true;button.classList.add('is-syncing');label.textContent='同步中…';status.hidden=false;
    status.textContent='正在扫描本地目录并更新原型，请稍候…';
    try{
      const capability=await fetch('/__local/sync',{cache:'no-store'});
      if(!capability.ok || !(capability.headers.get('content-type')||'').includes('application/json')){location.reload();return;}
      let response=await fetch('/__local/sync',{method:'POST',headers:{'X-Local-Sync':'1'}});
      if(!response.ok)throw new Error('同步服务返回 '+response.status);
      let job=await response.json();
      while(job.running){await new Promise(resolve=>setTimeout(resolve,1200));response=await fetch('/__local/sync',{cache:'no-store'});if(!response.ok)throw new Error('同步状态读取失败');job=await response.json();}
      if(!job.result?.ok)throw new Error(job.result?.error||'同步未完成');
      await load();document.getElementById('refresh-requirements').click();
      status.textContent='';status.hidden=true;
    }catch(error){status.hidden=false;status.textContent='更新失败，上一版预览仍保留。'+error.message;}
    finally{busy=false;button.disabled=false;button.classList.remove('is-syncing');label.textContent='刷新';}
  });
})();

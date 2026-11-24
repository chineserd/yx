(() => {
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button = (label, cls='text-btn') => '<button type="button" class="'+cls+'" data-action="'+label+'">'+label+'</button>';
  const cell = value => '<td>'+escape(value || '—')+'</td>';
  let page='leads', status='新线索', action='', ids=[];
  const title = () => page==='leads'?'线索管理':'线索跟进';
  function visibleRows(){
    return ScanLeads.readAll().filter(row=>page==='follow' ? row.assignee || row.status==='跟进中' : status==='全部'||row.status===status);
  }
  function render(){
    const manage=page==='leads', rows=visibleRows();
    $('crmTitle').textContent=title(); $('crmPath').textContent='课程顾问 / '+title();
    $('crmToolbar').innerHTML=manage?'<nav aria-label="线索管理状态">'+[...ScanLeads.statuses,'全部'].map(s=>'<button data-status="'+s+'" aria-pressed="'+(s===status)+'">'+s+'</button>').join('')+'</nav><aside>'+['批量分配','新增线索','导出'].map(s=>button(s,'secondary')).join('')+'</aside>':'';
    const cols=manage?['昵称','学生姓名','客户来源','地区','在读状态','操作']:['昵称','操作','最近沟通记录','聊天记录','客户意向度','跟进人'];
    $('crmHead').innerHTML='<tr>'+(manage?'<th><input type="checkbox" id="crmAll" aria-label="全选当前线索"></th>':'')+cols.map(c=>'<th>'+c+'</th>').join('')+'</tr>';
    $('crmRows').innerHTML=rows.map(r=>{
      const actions=manage?['分配','无效']:['跟进','释放','无效','无意向','重新分配'];
      const links='<td>'+actions.map(s=>button(s)).join('')+'</td>';
      const cells=manage?'<td><input type="checkbox" aria-label="选择线索"></td>'+[r.parentName,r.studentName,r.origin==='manual'?'手动新增':'网站落地页',r.region,'未知'].map(cell).join('')+links:cell(r.parentName)+links+cell(r.note)+'<td>'+button('查看记录')+'</td>'+cell(r.intent)+cell(r.assignee);
      return '<tr data-id="'+escape(r.id)+'">'+cells+'</tr>';
    }).join('')||'<tr><td colspan="'+(cols.length+Number(manage))+'">暂无符合条件的线索</td></tr>';
    $('crmCount').textContent='共 '+rows.length+' 条线索';
  }
  function edit(kind,selected){
    action=kind;ids=selected;
    if(kind==='批量分配'&&!ids.length){showToast('请先选择线索');return}
    const row=ScanLeads.readAll().find(r=>r.id===ids[0])||{};
    const fields=$('crmFields');
    $('crmDialogTitle').textContent=kind;
    $('crmSave').hidden=kind==='查看记录';
    if(kind==='新增线索')fields.innerHTML='<label>昵称<input name="person" required maxlength="60"></label><label>学生姓名<input name="student" maxlength="60"></label>';
    else if(kind.includes('分配'))fields.innerHTML='<label>跟进人<input name="owner" required maxlength="60" value="'+escape(row.assignee||'')+'"></label>';
    else if(kind==='跟进')fields.innerHTML='<label>沟通记录<textarea name="note" required maxlength="500"></textarea></label>';
    else if(kind==='查看记录'){
      const notes=(row.history||[]).map(h=>h.time+' · '+h.text);
      if(row.note && !(row.history||[]).some(h=>h.text===row.note))notes.push(row.note);
      fields.innerHTML=notes.map(n=>'<p>'+escape(n)+'</p>').join('')||'<p>暂无沟通记录</p>';
    }else fields.textContent='确认对「'+row.parentName+'」执行「'+kind+'」？';
    $('crmDialog').showModal();
  }
  function exportRows(){
    const values=[['昵称','学生姓名','线索状态','跟进人'],...visibleRows().map(r=>[r.parentName,r.studentName,r.status,r.assignee])];
    const csv=values.map(cols=>cols.map(v=>'"'+String(v||'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"').join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='线索管理.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('crmPage').addEventListener('click',e=>{
    if(e.target.id==='crmAll')$('crmRows').querySelectorAll('input').forEach(i=>i.checked=e.target.checked);
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.status){status=b.dataset.status;render();return}
    if(b.dataset.action==='导出'){exportRows();return}
    const row=b.closest('tr');edit(b.dataset.action,row?[row.dataset.id]:Array.from($('crmRows').querySelectorAll('input:checked'),i=>i.closest('tr').dataset.id));
  });
  $('crmClose').onclick=()=>$('crmDialog').close();
  $('crmForm').onsubmit=e=>{
    e.preventDefault();
    const data=new FormData(e.target), rows=ScanLeads.readAll(), time=new Date().toLocaleString('zh-CN');
    const value=k=>String(data.get(k)||'').trim();
    if(['person','owner','note'].some(k=>data.has(k)&&!value(k))){showToast('请填写有效内容');return}
    if(action==='新增线索')rows.unshift({id:'CRM-'+Array.from(crypto.getRandomValues(new Uint32Array(2))).join('-'),origin:'manual',parentName:value('person'),studentName:value('student'),status:'新线索'});
    for(const row of rows.filter(r=>ids.includes(r.id))){
      if(action.includes('分配')){row.assignee=value('owner');row.status='跟进中'}
      else if(action==='跟进'){row.note=value('note');row.history=[...(row.history||[]),{time,text:row.note}];row.status='跟进中'}
      else if(action==='无意向')row.intent='无意向';
      else if(action==='释放'){row.status='释放线索';row.assignee=''}
      else if(action==='无效')row.status='无效';
    }
    try{ScanLeads.writeAll(rows);$('crmDialog').close();showToast('已保存')}catch{showToast('保存失败，请重试')}
  };
  function navigate(name){
    const url=new URL(location.href);url.searchParams.set('page',name);location.href=url.href;
  }
  document.querySelectorAll('[data-crm]').forEach(b=>b.onclick=()=>navigate(b.dataset.crm));
  for(const id of ['navShareGift','tabShareGift','navOrderList','tabOrderList']){
    $(id).addEventListener('click',()=>{
      const url=new URL(location.href);
      if(id.includes('Order'))url.searchParams.set('page','orders');else url.searchParams.delete('page');
      history.replaceState(null,'',url);
    });
  }
  document.addEventListener('crm-page',e=>{page=e.detail;render()});
  window.addEventListener('leads-updated',render);window.addEventListener('storage',render);
  const initial=new URLSearchParams(location.search).get('page');
  if(['leads','follow'].includes(initial))showAdminPage(initial);
})();

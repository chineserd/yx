const papers = [
 ['香港學校普通話拼音練習（一）','P1、P2','拼音',10,'偏旁、筆劃和部首','教研組','公共庫'],
 ['香港學校普通話拼音練習（二）','P2','拼音',12,'聲母與韻母','教研組','公共庫'],
 ['香港學校普通話拼音練習（三）','P3','拼音',12,'聲母與韻母','教研組','公共庫'],
 ['香港學校普通話拼音練習（四）','P4','拼音',9,'偏旁、筆劃和部首','教研組','公共庫'],
 ['香港學校普通話拼音練習（五）','P5','拼音',10,'聲母與韻母','教研組','公共庫'],
 ['香港學校普通話拼音練習（六）','P6','拼音',12,'聲母與韻母','教研組','公共庫'],
 ['香港學校普通話拼音練習（七）','S1','拼音',10,'聲母與韻母','教研組','公共庫'],
 ['小二拼音單元練習','P2','拼音',12,'聲母與韻母','陳老師','校本庫'],
 ['小四聆聽理解練習','P4','聆聽',10,'聆聽理解','李老師','校本庫'],
 ['小六普通話綜合練習','P6','聆聽',10,'聆聽理解','陳老師','校本庫']
];
let library='全部', criteria={};
const $=s=>document.querySelector(s), escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){const filtered=papers.map((p,i)=>({p,i})).filter(({p})=>(library==='全部'||p[6]===library)&&(!criteria.title||p[0].includes(criteria.title))&&(!criteria.level||p[1].includes(criteria.level))&&(!criteria.type||p[2]===criteria.type)&&(!criteria.tag||p[4]===criteria.tag)&&(!criteria.creator||p[5]===criteria.creator));$('#rows').innerHTML=filtered.length?filtered.map(({p,i})=>`<tr data-library="${p[6]}"><td><span class="title-text" title="${escape(p[0])}">${escape(p[0])}</span></td><td><span class="pencil">♢</span>${p[1]}</td><td>${p[2]}</td><td>100</td><td>${p[3]}</td><td><span class="tag-text" title="${p[4]}">${p[4]}</span></td><td>${p[5]}</td><td class="operations"><button disabled>編輯</button><button data-preview="${i}">預覽</button><button data-publish="${i}">發布</button></td></tr>`).join(''):'<tr><td colspan="8" class="empty">暫無符合條件的試卷</td></tr>';$('#count').textContent=`共 ${filtered.length} 條`;}
function selectTab(button){library=button.dataset.library;document.querySelectorAll('[data-library]').forEach(b=>{const selected=b===button;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});render();}
document.querySelectorAll('[data-library]').forEach((b,i)=>{b.onclick=()=>selectTab(b);b.onkeydown=e=>{const tabs=[...document.querySelectorAll('[data-library]')];let n;if(e.key==='ArrowRight')n=(i+1)%3;if(e.key==='ArrowLeft')n=(i+2)%3;if(e.key==='Home')n=0;if(e.key==='End')n=2;if(n!==undefined){e.preventDefault();tabs[n].focus();selectTab(tabs[n]);}};});
$('#filters').onsubmit=e=>{e.preventDefault();criteria=Object.fromEntries(new FormData(e.target));criteria.title=criteria.title.trim();render();};$('#filters').onreset=()=>{criteria={};render();};
function modal(title,content){$('#dialogTitle').textContent=title;$('#dialogContent').innerHTML=content;$('#dialog').showModal();}
$('#rows').onclick=e=>{let i=e.target.dataset.preview;if(i!==undefined){const p=papers[i];modal('試卷預覽',`<h3>${escape(p[0])}</h3><p>所屬試卷庫：${p[6]}</p><p>難度：${p[1]}　類型：${p[2]}</p><p>總分：100　題目數量：${p[3]}</p><p>標籤：${p[4]}</p><p>創建人：${p[5]}</p>`);}i=e.target.dataset.publish;if(i!==undefined)modal('發布試卷',`<p>${escape(papers[i][0])}</p><p>請在正式系統中選擇班級和完成時間後發布。</p>`);};
$('#add').onclick=()=>modal('新增試卷','<p>新增試卷沿用現有試卷建立流程。</p><p>本原型可查看不同試卷庫及篩選試卷；完整建立流程未接入。</p>');document.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>modal(b.dataset.info,'<p>請透過系統幫助中心提交意見。</p>'));
function route(){const view=location.hash==='#prd'?'prd':location.hash==='#app'?'app':'admin';['admin','app','prd'].forEach(id=>{$('#'+id).hidden=id!==view;$('#'+id+'Link').classList.toggle('selected',id===view);});}
fetch('prd.html').then(r=>{if(!r.ok)throw Error('PRD');return r.text()}).then(html=>{$('#prd').innerHTML=new DOMParser().parseFromString(html,'text/html').body.innerHTML;}).catch(()=>{$('#prd').textContent='需求文件載入失敗，請重新整理。'});window.addEventListener('hashchange',route);route();render();

let phoneCategory='公共', phoneDetail=null;
function phoneItems(){const level=$('#phoneLevel').value;return phoneCategory==='公共'?[`香港學校普通話聆聽練習-${level}`,'香港學校聆聽試卷']:phoneCategory==='校本'?[`${level} 校本聆聽單元練習`,`${level} 校本聆聽評估`]:[`${level} 聆聽練習合集`];}
function renderPhone(){const level=$('#phoneLevel').value;$('#phoneTitle').textContent=phoneDetail?'聆聽合集':'聆聽練習';const items=phoneDetail?[`${level} 聆聽練習（一）`,`${level} 聆聽練習（二）`]:phoneItems();$('#phoneCards').innerHTML=items.map((title,i)=>`<button class="phone-card" data-phone-card="${i}"><span>${escape(title)}${phoneCategory==='合集'&&!phoneDetail?'<small>2 份練習</small>':''}</span><span class="phone-chevron">›</span></button>`).join('');}
const phoneTabs=[...document.querySelectorAll('[data-phone-tab]')];
function selectPhone(b){phoneCategory=b.dataset.phoneTab;phoneDetail=null;phoneTabs.forEach(t=>{const active=t===b;t.setAttribute('aria-selected',active);t.tabIndex=active?0:-1;});renderPhone();}
phoneTabs.forEach((b,i)=>{b.onclick=()=>selectPhone(b);b.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%3;if(e.key==='ArrowLeft')n=(i+2)%3;if(e.key==='Home')n=0;if(e.key==='End')n=2;if(n!==undefined){e.preventDefault();phoneTabs[n].focus();selectPhone(phoneTabs[n]);}};});
$('#phoneLevel').onchange=()=>{phoneDetail=null;renderPhone();};
$('#phoneCards').onclick=e=>{const card=e.target.closest('[data-phone-card]');if(!card)return;if(phoneCategory==='合集'&&!phoneDetail){phoneDetail=card.innerText;renderPhone();}else{modal('聆聽練習',`<h3>${escape(card.querySelector('span').textContent)}</h3><p>年級：${$('#phoneLevel').value}</p><p>完整聆聽答題內容待接入。</p>`);}};
$('#phoneBack').onclick=()=>{if(phoneDetail){phoneDetail=null;renderPhone();}else{modal('返回','<p>此入口返回 App 上一級功能頁；上一級頁面未納入本原型。</p>');}};
$('#phoneHistory').onclick=()=>modal('歷史記錄','<p>暫無練習記錄</p>');renderPhone();

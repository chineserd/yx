(() => {
  const stages = {
    '01': {title:'寫作要求轉化', files:{input:'framework-genre-input-contract.json',prompt:'framework-genre-prompt.json',output:'framework-genre-output-contract.json'}},
    '02': {title:'逐篇分析', files:{input:'single-review-input-contract.json',prompt:'single-review-prompt.json',output:'single-output-contract.json'}},
    '03': {title:'作文比賽綜合報告', files:{input:'competition-report-prompt-input.json',prompt:'competition-report-prompt-text.json',output:'competition-report-prompt-output.json'}}
  };
  const phases = {input:'输入',prompt:'提示词',output:'输出'};
  const content = document.getElementById('prompt-content');
  const title = document.getElementById('panel-title');
  let currentJson = '';
  let currentFilename = '';
  let requestId = 0;

  function route() {
    const [stage,phase] = location.hash.replace(/^#\/?/,'').split('/');
    return {stage:stage==='guide'?'guide':stages[stage]?stage:'01',phase:phases[phase]?phase:'input'};
  }
  function add(tag,value,depth=0,className='') {
    const node=document.createElement(tag);
    node.textContent=String(value);
    if(depth)node.classList.add(`depth-${Math.min(depth,2)}`);
    if(className)node.classList.add(className);
    content.append(node);
    return node;
  }
  function emphasizeFirst(paragraph,phrase,className='difference-inline') {
    const walker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const position=node.textContent.indexOf(phrase);
      if(position<0)continue;
      const emphasis=document.createElement('span');
      emphasis.className=className;
      emphasis.textContent=phrase;
      node.replaceWith(document.createTextNode(node.textContent.slice(0,position)),emphasis,document.createTextNode(node.textContent.slice(position+phrase.length)));
      return;
    }
  }
  function emphasizeRenamed(paragraph) {
    const pattern=/(優秀示例|學生作品|本校表現|學校概覽|表現不足示例)/g;
    const walker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let node;
    while((node=walker.nextNode())){
      if(!node.parentElement?.closest('.difference-inline, .dedup-inline'))nodes.push(node);
    }
    for(const textNode of nodes){
      const value=textNode.textContent;
      pattern.lastIndex=0;
      if(!pattern.test(value))continue;
      pattern.lastIndex=0;
      const fragment=document.createDocumentFragment();
      let start=0, match;
      while((match=pattern.exec(value))){
        fragment.append(document.createTextNode(value.slice(start,match.index)));
        const emphasis=document.createElement('span');
        emphasis.className='difference-inline';
        emphasis.textContent=match[0];
        fragment.append(emphasis);
        start=match.index+match[0].length;
      }
      fragment.append(document.createTextNode(value.slice(start)));
      textNode.replaceWith(fragment);
    }
  }
  function outline(nodes,depth=0,marker=false,highlight=false) {
    for(const node of nodes||[]) {
      const prefix=marker?(depth===0?'':depth===1?'●':'○'):'';
      const different=highlight&&(/^(1\.2\.[12]|4\.\d+\.2)$/.test(node.number));
      const line=`${prefix}${node.number} ${node.title}${node.content?'：'+node.content:''}`;
      const paragraph=add('p',line,depth,different?'difference':'');
      if(highlight&&['3.1.1','3.1.2','3.2'].includes(node.number))emphasizeFirst(paragraph,'寫作要求');
      const scoreNote=node.number==='1.1'?'不寫分數或得分相关总结。':/^4\.\d+\.3$/.test(node.number)?'隱藏得分。':'';
      if(highlight&&scoreNote&&line.includes(scoreNote)) {
        const position=line.indexOf(scoreNote);
        const emphasis=document.createElement('span');
        emphasis.className='difference-inline';
        emphasis.textContent=scoreNote;
        paragraph.replaceChildren(document.createTextNode(line.slice(0,position)),emphasis,document.createTextNode(line.slice(position+scoreNote.length)));
      }
      if(node.item_rule&&node.item_rule_placement!=='after_children'){
        const rule=add('p',node.item_rule,depth,'section-gap');
        if(highlight&&node.number==='3')emphasizeFirst(rule,'寫作要求');
        if(node.item_rule.includes('教學建議只針對本項'))emphasizeFirst(rule,'教學建議只針對本項「本校表現」中的問題提出 1—3 條，全部建議合計通常約 30—180 字。');
      }
      outline(node.children,depth+1,marker,highlight);
      if(node.item_rule&&node.item_rule_placement==='after_children'){
        const rule=add('p',node.item_rule,depth,'section-gap');
        if(node.item_rule.includes('教學建議只針對本項'))emphasizeFirst(rule,'教學建議只針對本項「本校表現」中的問題提出 1—3 條，全部建議合計通常約 30—180 字。');
      }
      if(node.evidence_deduplication)add('p',node.evidence_deduplication,depth,'dedup-rule');
    }
  }
  function render(data,stage,phase) {
    content.replaceChildren();
    if(stage==='01'&&phase==='input') {
      add('h2','輸入');const summary=add('p',data.input_summary);
      emphasizeFirst(summary,'後台已有的作文文體');
      add('h2','固定目錄');outline(data.fixed_outline);
      add('h2','附件：三類作文固定骨架');
      for(const [code,genre] of Object.entries(data.genre_templates||{})) {
        add('p',`${code} ${genre.name}`,0,'section-gap');
        (genre.sections||[]).forEach((section,index)=>{
          add('p',`${index+1}. ${section.display_title}`,1);
          (section.items||[]).forEach(item=>add('p',`・${item.label}：〔${item.placeholder}〕`,2));
        });
      }
    } else if(stage==='01'&&phase==='prompt') {
      add('h2','提示詞');(data.prompt||'').trim().split('\n').forEach(line=>{
        const paragraph=add('p',line);
        if(line.includes('依後台已確定的作文文體，從本題完整寫作要求中'))emphasizeFirst(paragraph,'依後台已確定的作文文體，從本題完整寫作要求中分別提取相關原文：表達方式歸入 3.1.1，語言表達歸入 3.1.2，結構歸入 3.2；各節點內按原文順序排列，匯總為一組「寫作要求」，不另設分析子項。');
      });
    } else if(stage==='01') {
      add('h2','輸出要求');(data.display_rules||[]).forEach((line,index)=>{
        const paragraph=add('p',`${index+1}. ${line}`);
        if(index===2)emphasizeFirst(paragraph,'第3章 3.1.1 表達方式、3.1.2 語言表達、3.2 結構：各節點只展示一次「寫作要求」欄名；相關原文可在欄內分行列出，不拆成多組欄目。');
      });
      add('h2','完整內容');(data.display_outline||[]).forEach(line=>add('p',line,0,/^3\.(?:1\.1|1\.2|2) /.test(line)?'difference':''));
    } else if(stage==='02'&&phase==='input') {
      add('h2','輸入');(data.input||[]).forEach(item=>add('p',`${item.name}：${item.content}`));
    } else if(stage==='02'&&phase==='prompt') {
      add('h2','提示詞');(data.prompt||'').trim().split('\n').forEach(line=>{
        const paragraph=add('p',line);
        const evidencePhrases=[
          '選用正面或問題配對時，先對照當前細項的「題目指引」或「寫作要求」，核對原文片段與對應批注／評語是否共同支持該項的有效寫法或具體問題。',
          '僅涉及病句、語法錯誤、用詞不當或句式不通順的配對，屬語言表達問題，不得選作 2.3、3.1.1、3.2 各細項的問題例證；無合格配對則留空。'
        ];
        evidencePhrases.forEach(phrase=>{if(line.includes(phrase))emphasizeFirst(paragraph,phrase,'evidence-focus-inline');});
      });
    } else if(stage==='02') {
      add('h2','輸出');(data['輸出']||[]).forEach(line=>add('p',line));
      add('h2','每個細項');(data['每個細項']||[]).forEach(line=>add('p',line,1));
    } else if(stage==='03'&&phase==='input') {
      add('h2','輸入');(data.input||[]).forEach((line,index)=>add('p',`${index+1}. ${line}`));
      add('h2','資料準備');add('p',data.preparation||'');
      const statistics=data.statistics_contract;
      if(statistics){
        add('h2','1.2 程序統計契約');
        for(const [label,key] of [['範圍','scope'],['有效資料','validity'],['1.2.1 等級分布','grade_distribution'],['1.2.2 本校與全體對比','comparison'],['圖上相對位置','position'],['空態','empty_state']]){
          add('p',`${label}：${statistics[key]||''}`);
        }
      }
      if(data.evidence_deduplication){
        add('h2','例證分析去重');
        add('p',data.evidence_deduplication,0,'dedup-rule');
      }
      const contract=data.case_selection_contract;
      if(contract){
        add('h2','程序準備與選例契約');
        add('p',`範圍：${contract.scope}`);
        add('p',`篇數：${contract.n_definition}`);
        add('p',`排序：${contract.ranking}`);
        (contract.quantity_rules||[]).forEach(rule=>add('p',`${rule.condition}：${rule.selection}`,0,'contract-rule'));
        add('p',`順序：${contract.order}`);
        add('p',`交接：${contract.handoff}`);
      }
      if(data.selection_explanation){
        add('h2','選例說明');
        add('p',data.selection_explanation);
      }
    } else if(stage==='03'&&phase==='prompt') {
      add('h2','提示詞');add('p',data.prompt?.role||'');add('p',data.prompt?.instruction||'');
      (data.prompt?.rules||[]).forEach((line,index)=>{
        const rule=add('p',`${index+1}. ${line}`);
        const plainPrefix='分項分析：對 2.3、3.1.1、3.2 下每個承載要求的細項，綜合同項逐篇記錄，寫「本校表現」；教學建議依下條統一規則生成。';
        if(line.startsWith(plainPrefix))emphasizeFirst(rule,line.slice(plainPrefix.length),'evidence-focus-inline');
      });
    } else {
      add('h2','輸出目錄');
      outline(data.output,0,true,false);
    }
    if(stage==='03'&&phase==='input')content.querySelectorAll('p').forEach(emphasizeRenamed);
  }
  function renderGuide(data) {
    content.replaceChildren();
    const contract=data.case_selection_contract||{};
    add('h2','使用順序');
    add('p','01 寫作要求轉化（每題一次）→ 02 逐篇分析（每篇一次）→ 程序準備 → 03 作文比賽綜合報告（每份報告一次）。每步只提交該步所需材料，依次使用左側「输入／提示词／输出」。');
    add('h2','各步材料與結果');
    const firstStep=add('p','01：輸入作文題幹、寫作要求、後台已有的作文文體及 A／B／C 固定骨架；直接沿用後台文體對應的模板，輸出同題框架，保留 2.1、2.2 對應原文。');
    emphasizeFirst(firstStep,'後台已有的作文文體及 A／B／C 固定骨架；直接沿用後台文體對應的模板，','difference-inline');
    add('p','02：輸入已選框架、單篇作文及同篇原報告；每篇輸出 2.3 和第 3 章細項的本項總結、已核對的原文片段與原評語配對。');
    add('p','程序準備：核對比賽、題目、學校、作文 ID 和版本；計算同題統計與對比，按教學設定取得等級分界，核准例證與示例清單。');
    add('p','03：輸入同題逐篇結果及程序準備資料；按選定骨架和示例清單生成作文比賽綜合報告。');
    add('p','3.1.2 詞語選讀與佳句賞析優先使用程序交付的最多 10 篇本校本題候選原文；沒有獨立名單但輸入含作文 ID、全文、有效原總分及輸入順序時，允許模型依相同規則排序選材。此規則不改變第 4 章示例名單。');
    add('h2','學生作品示例選取');
    add('p',contract.n_definition||'');
    add('p',contract.ranking||'');
    (contract.quantity_rules||[]).forEach(rule=>add('p',`${rule.condition}：${rule.selection}`,0,'contract-rule'));
    add('p',contract.order||'');
    add('h2','03 交接與展示');
    add('p',contract.handoff||'');
    add('p','原分只供程序統計、排序及選例；報告分析正文不寫分數或得分相關總結，示例隱藏原得分。等級分布由程序按教學設定的分界提供，不在提示詞中固定檔數。');
  }
  async function update() {
    const {stage,phase}=route(),id=++requestId;
    content.classList.toggle('plain-content',stage!=='guide'&&(phase==='prompt'||phase==='output'));
    title.textContent=stage==='guide'?'提示詞使用說明':`${stage} ${stages[stage].title} · ${phases[phase]}`;
    document.querySelectorAll('[data-stage]').forEach(button=>button.setAttribute('aria-current',button.dataset.stage===stage?'step':'false'));
    document.querySelector('[data-guide]').setAttribute('aria-current',stage==='guide'?'step':'false');
    document.querySelectorAll('[data-phase]').forEach(button=>button.setAttribute('aria-selected',button.dataset.phase===phase?'true':'false'));
    document.querySelector('.phase-tabs').hidden=stage==='guide';
    document.getElementById('export-json').hidden=stage==='guide';
    currentFilename=stage==='guide'?'':stages[stage].files[phase];
    content.replaceChildren();add('p','正在讀取…');
    try {
      const response=await fetch(`./prompt-data/${stage==='guide'?'competition-report-prompt-input.json':currentFilename}`,{cache:'no-store'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const body=await response.text();if(id!==requestId)return;
      currentJson=stage==='guide'?'':body;
      if(stage==='guide')renderGuide(JSON.parse(body));else render(JSON.parse(body),stage,phase);
    } catch(error) {if(id!==requestId)return;currentJson='';content.replaceChildren();add('p',`讀取失敗：${error.message}`,0,'error');}
  }
  function go(stage,phase) {location.hash=stage==='guide'?'#/guide':`#/${stage}/${phase}`;}
  document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>go(button.dataset.stage,route().stage==='guide'?'input':route().phase)));
  document.querySelector('[data-guide]').addEventListener('click',()=>go('guide'));
  document.querySelectorAll('[data-phase]').forEach(button=>button.addEventListener('click',()=>go(route().stage,button.dataset.phase)));
  document.getElementById('export-json').addEventListener('click',()=>{
    if(!currentJson)return;
    const link=document.createElement('a'),url=URL.createObjectURL(new Blob([currentJson],{type:'application/json;charset=utf-8'}));
    link.href=url;link.download=currentFilename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('copy-text').addEventListener('click',async()=>{
    const button=document.getElementById('copy-text'),value=content.innerText;
    try {if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);else throw new Error('fallback');}
    catch {const input=document.createElement('textarea');input.value=value;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();document.execCommand('copy');input.remove();}
    button.textContent='已複製';setTimeout(()=>button.textContent='複製當前文字',1600);
  });
  addEventListener('hashchange',update);
  if(!location.hash)go('01','input');else update();
})();

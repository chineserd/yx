(function(){
  const root=document.getElementById('root')||document.getElementById('backendRoot');
  if(!root)return;
  const embedded=Boolean(document.getElementById('backendRoot'));
  let mounted=false, scriptsLoaded=false;
  const isBackendRoute=()=>location.hash===''||location.hash.startsWith('#/backend');
  const ensureBackendEntry=()=>{
    const navigation=window.performance?.getEntriesByType?.('navigation')?.[0];
    if(!embedded&&!location.hash){
      history.replaceState(null,'',`${location.pathname}${location.search}#/backend/publish-essay`);
    }
  };
  const shell=`
    <nav class="preview-nav legacy-preview-nav" aria-label="需求预览导航">
      <span class="requirement-identity"><span class="requirement-label">需求名称</span><span class="requirement-name">作文写前指导</span></span>
      <a class="current" href="#/backend" data-view-link="backend">後台</a>
      <a href="student-preview.html#/student-flow" data-view-link="student-flow">学生端流程</a>
      <a href="student-preview.html#/prd" data-view-link="prd">PRD</a>
      <a href="simple-prd.html" data-view-link="development">功能清单</a>
      <a href="student-preview.html#/prompt-guide" data-view-link="prompt-guide">提示詞</a>
      <a href="updates.html" data-view-link="updates">更新記錄</a>
      <a href="student-preview.html#/student-empty-tablet" data-view-link="student-tablet">學生-啟達平板端</a>
      <a class="history-link" href="/">歷史需求彙總頁</a>
    </nav>
    <div class="admin-guide" id="writingAdmin">
      <header class="admin-topbar">
        <button type="button" id="toggleWritingSidebar" class="admin-menu-toggle" aria-label="收合侧栏" aria-expanded="true" aria-controls="writingSidebar">☰</button>
        <span class="admin-brand-mark" aria-hidden="true">中</span><strong>中文路</strong>
        <div class="admin-topbar-context"><span>中文科</span><span>繁体中文</span><span class="admin-account"><span aria-hidden="true">师</span>教师</span></div>
      </header>
      <aside class="admin-sidebar" id="writingSidebar" aria-label="中文科菜单">
        <button type="button" class="admin-menu-group" id="toggleWritingGroup" aria-expanded="true" aria-controls="writingMenuItems"><span class="admin-menu-icon" aria-hidden="true">♙</span><span class="admin-menu-label">学生管理</span><span class="admin-menu-chevron" aria-hidden="true">⌃</span></button>
        <nav id="writingMenuItems" aria-label="中文科菜单">
          <a href="#/backend/learning-analysis" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⌁</span><span class="admin-menu-label">学情分析</span></a>
          <a href="#/backend/publish-essay" class="admin-menu-static" title="发布任务"><span class="admin-menu-icon" aria-hidden="true">♧</span><span class="admin-menu-label">发布任务 <span class="requirement-badge">需求</span></span></a>
          <a href="#/backend/tasks" class="admin-menu-static" data-task-management title="任务管理"><span class="admin-menu-icon" aria-hidden="true">▣</span><span class="admin-menu-label">任务管理 <span class="requirement-badge">需求</span></span></a>
          <a href="#/backend/reading" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">▤</span><span class="admin-menu-label">阅读</span></a>
          <a href="#/backend/composition-bank" class="admin-menu-static" title="作文题库仅保留入口"><span class="admin-menu-icon" aria-hidden="true">✎</span><span class="admin-menu-label">作文题库</span></a>
          <a href="#/backend/settings" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⚙</span><span class="admin-menu-label">设置</span></a>
          <a href="#/backend/notifications" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">♧</span><span class="admin-menu-label">通知</span></a>
          <a href="#/backend/help" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⊙</span><span class="admin-menu-label">帮助中心</span></a>
        </nav>
      </aside>
      <main class="admin-guide-main" id="writingAdminContent">
        <div class="legacy-student-context" aria-hidden="true"><span id="learningStudentAvatar"></span><span id="learningStudentName"></span><span id="learningStudentId"></span></div>
        <nav class="admin-breadcrumb" id="writingBreadcrumb" aria-label="面包屑" hidden></nav>
        <header class="admin-title" hidden><h1 id="writingPageTitle" tabindex="-1">发布任务</h1><a class="admin-button" id="writingPageBack" href="#/backend" hidden>返回</a></header>
        <section hidden id="studentWritingReport"></section>
        <section class="writing-task-type-entry" id="writingPublishEntry">
          <header class="writing-task-type-header"><button type="button" class="writing-task-type-back" id="writingPublishEntryBack" aria-label="返回">‹</button><h1>发布新任务</h1><div class="writing-task-type-dots" aria-hidden="true"><i class="is-current"></i><i></i><i></i></div></header>
          <div class="writing-task-type-body"><h2>选择任务类型</h2><div class="writing-task-type-grid">
            <button type="button" class="writing-task-type-option" data-task-type="special"><strong>专项练习</strong><small>针对特定知识点（如修辞、文言虚词）进行强化训练，支持智能推题。</small></button>
            <button type="button" class="writing-task-type-option" data-task-type="reading"><strong>阅读综合练习</strong><small>布置白话文或文言文篇章阅读，支持从阅读库选取文章。</small></button>
            <button type="button" class="writing-task-type-option" data-task-type="essay"><strong>命题作文</strong><small>传统命题写作，重点训练立意选材與表達能力。</small></button>
            <button type="button" class="writing-task-type-option" data-task-type="essay-upload"><strong>命题作文</strong><small>支援學生自行上載，或由老師批量上載作文，AI 將自動批改並提供評分及改善建議。</small></button>
          </div></div>
          <footer class="writing-task-type-actions"><p class="writing-task-type-status" id="writingPublishEntryStatus" role="status"></p><button type="button" class="admin-button primary" id="writingPublishEntryNext">下一步</button></footer>
        </section>
        <section class="writing-publish-page" id="writingPublishPage" hidden>
          <header class="writing-publish-shell-header"><button type="button" class="writing-publish-shell-back" id="writingPublishShellBack" aria-label="返回任務類型">‹</button><h1>發佈新任務</h1></header>
          <main class="writing-publish-main">
            <h2 class="writing-publish-step-title" data-publish-step-title="1">設定寫作題目和要求</h2>
            <section class="writing-publish-card writing-requirement-card" data-publish-step="1">
              <div class="writing-requirement-topic-head"><label class="writing-publish-field"><span>寫作題目</span></label><button class="writing-topic-picker primary" type="button" id="writingPublishTopicPicker">選擇作文題目</button></div>
              <textarea class="writing-requirement-topic-textarea" id="writingPublishTopic" rows="4" placeholder="請輸入寫作題目">我的一天</textarea>
              <p class="writing-requirement-note">自主輸入並發佈後，題目將保存至校本庫，後續可在校本庫中選擇。</p>
              <div class="writing-publish-grid writing-requirement-meta"><label class="writing-publish-field"><span>字數要求</span><select id="writingPublishWords"><option>600字</option><option>800字以上</option><option>1000字以上</option></select></label><label class="writing-publish-field"><span>適用年級</span><select id="writingPublishGrade"><option>S1</option><option>S2</option><option>S3</option></select></label></div>
              <textarea id="writingPublishRequirement" hidden>请围绕作文题目完成文章，表达清晰，结构完整。</textarea>
            </section>
          <section class="writing-publish-card" data-publish-step="2" hidden><div class="writing-publish-card-title"><span class="writing-publish-icon purple">◎</span><div><h3>任务设置</h3><p>选择发送班级、发布时间及作文导入方式。</p></div></div><fieldset class="writing-publish-fieldset"><legend>发送班级（可多选）</legend><div class="writing-class-list"><button type="button" class="is-selected" data-class="2A"><span>✓</span>2A</button><button type="button" data-class="2B"><span></span>2B</button><button type="button" data-class="3A"><span></span>3A</button></div></fieldset><div class="writing-publish-grid writing-date-grid"><label class="writing-publish-field"><span>发布时间</span><input id="writingPublishStart" type="date" value="2026-11-09"></label><span class="writing-date-separator">至</span><label class="writing-publish-field"><span>截止时间</span><input id="writingPublishEnd" type="date" value="2026-11-16"></label></div><fieldset class="writing-publish-fieldset"><legend>作文导入方式</legend><div class="writing-upload-options"><div class="writing-upload-option writing-upload-option-student is-selected"><label class="writing-upload-choice"><input type="radio" name="writingUploadMethod" checked><span class="writing-radio"></span><b>学生自助上传</b></label><div class="writing-upload-results"><span>显示成绩和报告</span><button type="button" id="writingPublishResultsSwitch" class="writing-upload-result-switch is-on" role="switch" aria-checked="true" aria-label="显示成绩和报告"><span data-results-state>显示</span><i aria-hidden="true"></i></button></div><small>任务线上派发，学生自行通过 App 拍照上传，开放后可在学生端查看成绩及报告。</small></div><label class="writing-upload-option"><input type="radio" name="writingUploadMethod"><span class="writing-radio"></span><span><b>教师统一上传</b><small>批量导入任务默认由教师集中收集作文文件或 PDF 后统一导入。</small></span></label></div></fieldset><div id="writingPublishGuidanceSlot"></div></section>
          </main>
          <section class="writing-publish-card writing-publish-actions"><button type="button" class="admin-button" id="writingPublishBack">上一步</button><button type="button" class="admin-button primary" id="writingPublishNext">下一步</button><button type="button" class="admin-button writing-publish-confirm-button" id="writingPublishConfirm" hidden>確認發佈</button><p class="writing-publish-status" id="writingPublishStatus" role="status"></p></section>
          <dialog class="writing-topic-dialog" id="writingTopicDialog"><div class="writing-topic-dialog-mask" data-topic-dialog-close></div><div class="writing-topic-dialog-panel"><header class="writing-topic-dialog-header"><div><h3>选择作文题目</h3><p>从公共库或校本库选择题目。</p></div><button type="button" class="writing-topic-dialog-close" data-topic-dialog-close>×</button></header><div class="writing-topic-dialog-toolbar"><div class="writing-topic-tabs"><button type="button" class="is-active" data-topic-library="all">全部</button><button type="button" data-topic-library="公共库">公共库</button><button type="button" data-topic-library="校本库">校本库</button></div><input id="writingTopicSearch" placeholder="搜索题目、要求或分类" type="search"><select id="writingTopicFormFilter"><option value="">题目形式</option></select><select id="writingTopicGenreFilter"><option value="">写作体裁</option></select><select id="writingTopicCategoryFilter"><option value="">作文类别</option></select></div><div class="writing-topic-list" id="writingTopicList"></div><footer class="writing-topic-dialog-footer"><span id="writingTopicSelectionStatus">尚未选择题目</span><div><button type="button" class="admin-button" data-topic-dialog-close>取消</button><button type="button" class="admin-button primary" id="writingTopicConfirm">使用此题目</button></div></footer></div></dialog>
        </section>
      </main>
    </div>`;
  const style=`<style id="legacy-backend-bridge-style">
    :root{--font-sans:-apple-system,BlinkMacSystemFont,"PingFang TC","Microsoft JhengHei",sans-serif}
    .legacy-student-context{display:none}.legacy-preview-nav{height:48px;display:flex;align-items:center;gap:22px;padding:0 18px;background:#fff;border-bottom:1px solid #dce5ef;color:#334155;position:sticky;top:0;z-index:120;font:14px/20px var(--font-sans)}
    .legacy-preview-nav a{color:#52627a;text-decoration:none;padding:5px 2px}.legacy-preview-nav a.current,.legacy-preview-nav a:hover{color:#2365f6}.requirement-identity{position:relative;display:inline-flex;flex-direction:column;justify-content:center;gap:0;margin-right:12px;padding-left:11px;color:#334155;white-space:nowrap}.requirement-identity:before{content:"";position:absolute;left:0;top:50%;width:3px;height:28px;border-radius:2px;background:#5478e8;transform:translateY(-50%)}.requirement-label{font-size:10px;line-height:14px;letter-spacing:1px;color:#8793a5}.requirement-name{font-weight:700;font-size:12px;line-height:18px}.legacy-top-menu{display:flex;align-items:center;gap:4px;margin-left:18px}.legacy-top-menu a{color:#fff;text-decoration:none}.legacy-top-menu .admin-menu-top-item{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;border-radius:5px;background:rgba(255,255,255,.08);font-size:12px}.legacy-top-menu .admin-menu-top-item:hover{background:rgba(255,255,255,.16)}.admin-topbar{top:48px}.admin-sidebar{top:104px}.admin-guide-main{padding-top:26px}.admin-sidebar nav{padding-bottom:8px}.admin-sidebar nav a.admin-menu-static{background:transparent;border-left-color:transparent;font-weight:500}.admin-sidebar nav a.admin-menu-static:hover{background:rgba(255,255,255,.08)}.admin-sidebar nav a.admin-menu-top-item{border-left-color:transparent}.admin-sidebar nav a[aria-current="page"]{border-left-color:#73ccff}.writing-publish-page[hidden]{display:none}.writing-publish-actions{display:flex;align-items:center;justify-content:flex-end;gap:16px}.writing-publish-actions .writing-publish-status{margin:0;margin-right:auto}.writing-publish-card-title h3{margin:0}.writing-publish-card-title p{margin:3px 0 0}.writing-publish-card textarea{box-sizing:border-box}.writing-topic-dialog{padding:0;border:0}.writing-topic-dialog::backdrop{background:rgba(15,31,55,.38)}.embedded-backend-root>.legacy-preview-nav{display:none}.embedded-backend-root .admin-topbar{top:0}.embedded-backend-root .admin-sidebar{top:56px}.embedded-backend-root .admin-guide-main{padding-top:24px}
    .legacy-preview-nav{gap:0;overflow-x:auto;white-space:nowrap;padding:0 16px;font:500 12px/18px var(--font-sans)}
    .legacy-preview-nav .requirement-identity{margin-right:12px}
    .legacy-preview-nav a[data-view-link="student-tablet"]{margin-left:16px}
    .legacy-preview-nav .history-link{margin-left:auto;color:#65758b;text-decoration:underline;text-underline-offset:3px}
    .legacy-preview-nav a{height:48px;flex-shrink:0;padding:0 12px;border-bottom:2px solid transparent}
    .legacy-preview-nav a.current{border-bottom-color:#3563ff;background:#f5f8ff;color:#3563ff;font-weight:600}
    .legacy-preview-nav a:focus-visible{outline:2px solid #3563ff;outline-offset:-3px}
  </style>`;
  const load=(src)=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.body.appendChild(script);});
  const mount=async()=>{
    if(!isBackendRoute())return;
    ensureBackendEntry();
    if(!mounted){
      mounted=true;
      if(embedded)root.classList.add('embedded-backend-root');
      document.body.insertAdjacentHTML('afterbegin',style);
      root.innerHTML=shell;
      document.getElementById('writingPublishEntry')?.removeAttribute('hidden');
      ['backend.css','writing-report.css','task-management.css','writing-publish.css'].forEach(name=>{const link=document.createElement('link');link.rel='stylesheet';link.href=`./${name}?legacy=20261112-guidance-image-size`;document.head.appendChild(link);});
    }
    if(!scriptsLoaded){
      scriptsLoaded=true;
      try{
        const backendScripts=embedded
          ? ['./composition-bank-data.js?legacy=20261108','./writing-report-essay-data.js?legacy=20261108','./writing-report-score-data.js?legacy=20261108','./writing-report.js?legacy=20261117-genre','./writing-publish.js?legacy=20261109-two-step-publish','./task-management.js?legacy=20261112-task-demo']
          : ['./composition-bank-data.js?legacy=20261108','./writing-report-essay-data.js?legacy=20261108','./writing-report-score-data.js?legacy=20261108','./writing-report.js?legacy=20261117-genre','./writing-publish.js?legacy=20261109-two-step-publish','./task-management.js?legacy=20261112-task-demo'];
        for(const src of backendScripts.map(src=>`${src}&v=20261109-report-summary-remove`))await load(src);
      }catch(error){console.error('作文写前指导后台脚本加载失败',error);}
      window.dispatchEvent(new CustomEvent('previewview',{detail:'backend'}));
    }else{
      window.dispatchEvent(new CustomEvent('previewview',{detail:'backend'}));
    }
  };
  window.addEventListener('hashchange',()=>{if(isBackendRoute())mount();else if(mounted&&!embedded)window.location.reload();});
  window.addEventListener('DOMContentLoaded',()=>setTimeout(mount,600),{once:true});
  setTimeout(mount,0);
})();

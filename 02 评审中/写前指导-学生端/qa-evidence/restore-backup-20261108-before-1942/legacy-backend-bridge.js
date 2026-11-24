(function(){
  const root=document.getElementById('root')||document.getElementById('backendRoot');
  if(!root)return;
  const embedded=Boolean(document.getElementById('backendRoot'));
  let mounted=false, scriptsLoaded=false;
  const isBackendRoute=()=>location.hash===''||location.hash.startsWith('#/backend');
  const ensureBackendEntry=()=>{
    const navigation=window.performance?.getEntriesByType?.('navigation')?.[0];
    if(!embedded&&(!location.hash||navigation?.type==='reload')){
      history.replaceState(null,'',`${location.pathname}${location.search}#/backend/publish-essay`);
    }
  };
  const shell=`
    <nav class="preview-nav legacy-preview-nav" aria-label="需求预览导航">
      <span class="requirement-identity"><span class="requirement-label">需求名称</span><span class="requirement-name">作文写前指导</span></span>
      <a class="current" href="#/backend" data-view-link="backend">後台</a>
      <a href="student-preview.html#/student-learning" data-view-link="student-tablet">學生-啟達平板端</a>
      <a href="student-preview.html#/student?surface=web" data-view-link="student-web">學生-啟達網頁端</a>
      <a href="#/prd" data-view-link="prd">需求說明</a>
      <a href="#/development" data-view-link="development">PRD</a>
    </nav>
    <div class="admin-guide" id="writingAdmin">
      <header class="admin-topbar">
        <button type="button" id="toggleWritingSidebar" class="admin-menu-toggle" aria-label="收合侧栏" aria-expanded="true" aria-controls="writingSidebar">☰</button>
        <span class="admin-brand-mark" aria-hidden="true">中</span><strong>中文路</strong>
        <nav class="legacy-top-menu" id="writingTopMenuItems" aria-label="后台快捷入口">
          <a href="#/backend/publish-essay" class="admin-menu-top-item"><span class="admin-menu-icon" aria-hidden="true">♧</span><span class="admin-menu-label">发布任务 <span class="requirement-badge">新增需求</span></span></a>
          <a href="#/backend/tasks" class="admin-menu-top-item" data-task-management><span class="admin-menu-icon" aria-hidden="true">▣</span><span class="admin-menu-label">任务管理 <span class="requirement-badge">需求</span></span></a>
        </nav>
        <div class="admin-topbar-context"><span>中文科</span><span>繁体中文</span><span class="admin-account"><span aria-hidden="true">师</span>教师</span></div>
      </header>
      <aside class="admin-sidebar" id="writingSidebar" aria-label="中文科菜单">
        <button type="button" class="admin-menu-group" id="toggleWritingGroup" aria-expanded="true" aria-controls="writingMenuItems"><span class="admin-menu-icon" aria-hidden="true">♙</span><span class="admin-menu-label">学生管理</span><span class="admin-menu-chevron" aria-hidden="true">⌃</span></button>
        <nav id="writingMenuItems" aria-label="中文科菜单">
          <a href="#/backend/learning-analysis" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⌁</span><span class="admin-menu-label">学情分析</span></a>
          <a href="#/backend/publish-essay" class="admin-menu-top-item" title="发布任务"><span class="admin-menu-icon" aria-hidden="true">♧</span><span class="admin-menu-label">发布任务 <span class="requirement-badge">新增需求</span></span></a>
          <a href="#/backend/tasks" class="admin-menu-top-item" data-task-management title="任务管理"><span class="admin-menu-icon" aria-hidden="true">▣</span><span class="admin-menu-label">任务管理 <span class="requirement-badge">需求</span></span></a>
          <a href="#/backend/reading" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">▤</span><span class="admin-menu-label">阅读</span></a>
          <a href="#/backend/composition-bank" class="admin-menu-static" title="作文题库仅保留入口"><span class="admin-menu-icon" aria-hidden="true">✎</span><span class="admin-menu-label">作文题库</span></a>
          <a href="#/backend/settings" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⚙</span><span class="admin-menu-label">设置</span></a>
          <a href="#/backend/notifications" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">♧</span><span class="admin-menu-label">通知</span></a>
          <a href="#/backend/help" class="admin-menu-static" title="此功能暂未开放"><span class="admin-menu-icon" aria-hidden="true">⊙</span><span class="admin-menu-label">帮助中心</span></a>
        </nav>
      </aside>
      <main class="admin-guide-main" id="writingAdminContent">
        <div class="legacy-student-context" aria-hidden="true"><span id="learningStudentAvatar"></span><span id="learningStudentName"></span><span id="learningStudentId"></span></div>
        <nav class="admin-breadcrumb" id="writingBreadcrumb" aria-label="面包屑"></nav>
        <header class="admin-title"><h1 id="writingPageTitle" tabindex="-1">发布任务</h1><a class="admin-button" id="writingPageBack" href="#/backend" hidden>返回</a></header>
        <section hidden id="studentWritingReport"></section>
        <section hidden class="writing-publish-page" id="writingPublishPage">
          <div class="writing-publish-heading"><div><span class="writing-publish-kicker">作文写前指导 · 教师后台</span><h2 id="writingPublishTitle">发布任务</h2><p>发布作文任务，并配置学生写前指导与作文批改能力。</p></div><div class="writing-publish-steps"><span class="is-current"><b>1</b>任务设置</span><i>→</i><span><b>2</b>发布确认</span></div></div>
          <section class="writing-publish-card writing-requirement-card"><div class="writing-publish-card-title"><span class="writing-publish-icon">✦</span><div><h3>作文任务</h3><p>选择题目、班级及本次任务的指导能力。</p></div></div>
            <label class="writing-publish-field writing-topic-input"><span>作文题目</span><div class="writing-topic-field-head"><span>题目内容</span><button class="writing-topic-picker" type="button" id="writingPublishTopicPicker">从题库选择</button></div><textarea id="writingPublishTopic" rows="2">有人认为，经历挫折能使人成长。试就这个看法，写作一篇文章，谈谈你的看法。</textarea></label>
            <label class="writing-publish-field"><span>作文要求</span><textarea id="writingPublishRequirement" rows="3">① 清楚回应题目观点，表达自己的立场。\n② 结合合适材料组织文章结构。\n③ 字数要求：800字以上。</textarea></label>
            <div class="writing-publish-grid"><label class="writing-publish-field"><span>年级</span><select id="writingPublishGrade"><option>S2</option><option>S1</option><option>S3</option></select></label><label class="writing-publish-field"><span>字数要求</span><input id="writingPublishWords" value="800字以上"></label></div>
            <fieldset class="writing-publish-fieldset"><legend>发送班级</legend><div class="writing-class-list"><button type="button" data-class="2A"><span>✓</span>2A</button><button type="button" data-class="2B"><span></span>2B</button><button type="button" data-class="3A"><span></span>3A</button></div></fieldset>
          </section>
          <section class="writing-publish-card"><div class="writing-publish-card-title"><span class="writing-publish-icon purple">◎</span><div><h3>任务能力</h3><p>作文批改默认开启，写作指导可按任务选择。</p></div></div><div class="writing-upload-options"><label class="writing-upload-option is-selected"><input type="radio" name="writingUploadMethod" checked><span class="writing-radio"></span><span><b>学生自主提交</b><small>学生完成写前指导后提交作文。</small></span></label><label class="writing-upload-option"><input type="radio" name="writingUploadMethod"><span class="writing-radio"></span><span><b>教师上传</b><small>教师代学生上传作文原稿。</small></span></label></div><div class="writing-publish-switch-row"><div><b>发布作文反馈</b><p>学生提交后可查看作文批改与指导结果。</p></div><button type="button" class="writing-switch is-on" id="writingPublishResultsSwitch" aria-checked="true"><i></i></button></div></section>
          <section class="writing-publish-card writing-publish-actions"><a href="#/backend">取消</a><button type="button" class="admin-button primary" id="writingPublishConfirm">发布任务</button><p class="writing-publish-status" id="writingPublishStatus" role="status"></p></section>
          <dialog class="writing-topic-dialog" id="writingTopicDialog"><div class="writing-topic-dialog-mask" data-topic-dialog-close></div><div class="writing-topic-dialog-panel"><header class="writing-topic-dialog-header"><div><h3>选择作文题目</h3><p>从公共库或校本库选择题目。</p></div><button type="button" class="writing-topic-dialog-close" data-topic-dialog-close>×</button></header><div class="writing-topic-dialog-toolbar"><div class="writing-topic-tabs"><button type="button" class="is-active" data-topic-library="all">全部</button><button type="button" data-topic-library="公共库">公共库</button><button type="button" data-topic-library="校本库">校本库</button></div><input id="writingTopicSearch" placeholder="搜索题目、要求或分类" type="search"><select id="writingTopicFormFilter"><option value="">题目形式</option></select><select id="writingTopicGenreFilter"><option value="">写作体裁</option></select><select id="writingTopicCategoryFilter"><option value="">作文类别</option></select></div><div class="writing-topic-list" id="writingTopicList"></div><footer class="writing-topic-dialog-footer"><span id="writingTopicSelectionStatus">尚未选择题目</span><div><button type="button" class="admin-button" data-topic-dialog-close>取消</button><button type="button" class="admin-button primary" id="writingTopicConfirm">使用此题目</button></div></footer></div></dialog>
        </section>
      </main>
    </div>`;
  const style=`<style id="legacy-backend-bridge-style">
    :root{--font-sans:-apple-system,BlinkMacSystemFont,"PingFang TC","Microsoft JhengHei",sans-serif}
    .legacy-student-context{display:none}.legacy-preview-nav{height:48px;display:flex;align-items:center;gap:22px;padding:0 18px;background:#fff;border-bottom:1px solid #dce5ef;color:#334155;position:sticky;top:0;z-index:120;font:14px/20px var(--font-sans)}
    .legacy-preview-nav a{color:#52627a;text-decoration:none;padding:5px 2px}.legacy-preview-nav a.current,.legacy-preview-nav a:hover{color:#2365f6}.requirement-identity{position:relative;display:inline-flex;flex-direction:column;justify-content:center;gap:0;margin-right:12px;padding-left:11px;color:#334155;white-space:nowrap}.requirement-identity:before{content:"";position:absolute;left:0;top:50%;width:3px;height:28px;border-radius:2px;background:#5478e8;transform:translateY(-50%)}.requirement-label{font-size:10px;line-height:14px;letter-spacing:1px;color:#8793a5}.requirement-name{font-weight:700;font-size:12px;line-height:18px}.legacy-top-menu{display:flex;align-items:center;gap:4px;margin-left:18px}.legacy-top-menu a{color:#fff;text-decoration:none}.legacy-top-menu .admin-menu-top-item{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;border-radius:5px;background:rgba(255,255,255,.08);font-size:12px}.legacy-top-menu .admin-menu-top-item:hover{background:rgba(255,255,255,.16)}.admin-topbar{top:48px}.admin-sidebar{top:104px}.admin-guide-main{padding-top:26px}.admin-sidebar nav{padding-bottom:8px}.admin-sidebar nav a.admin-menu-static{background:transparent;border-left-color:transparent;font-weight:500}.admin-sidebar nav a.admin-menu-static:hover{background:rgba(255,255,255,.08)}.admin-sidebar nav a.admin-menu-top-item{border-left-color:transparent}.admin-sidebar nav a[aria-current="page"]{border-left-color:#73ccff}.writing-publish-page[hidden]{display:none}.writing-publish-actions{display:flex;align-items:center;justify-content:flex-end;gap:16px}.writing-publish-actions .writing-publish-status{margin:0;margin-right:auto}.writing-publish-card-title h3{margin:0}.writing-publish-card-title p{margin:3px 0 0}.writing-publish-card textarea{box-sizing:border-box}.writing-topic-dialog{padding:0;border:0}.writing-topic-dialog::backdrop{background:rgba(15,31,55,.38)}.embedded-backend-root>.legacy-preview-nav{display:none}.embedded-backend-root .admin-topbar{top:0}.embedded-backend-root .admin-sidebar{top:56px}.embedded-backend-root .admin-guide-main{padding-top:24px}
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
      document.getElementById('writingPublishPage')?.removeAttribute('hidden');
      ['backend.css','writing-report.css','task-management.css','writing-publish.css'].forEach(name=>{const link=document.createElement('link');link.rel='stylesheet';link.href=`./${name}?legacy=20261108`;document.head.appendChild(link);});
    }
    if(!scriptsLoaded){
      scriptsLoaded=true;
      try{
        const backendScripts=embedded
          ? ['./composition-bank-data.js?legacy=20261108','./writing-report.js?legacy=20261108','./writing-publish.js?legacy=20261108','./task-management.js?legacy=20261108']
          : ['./composition-bank-data.js?legacy=20261108','./writing-report-essay-data.js?legacy=20261108','./writing-report-score-data.js?legacy=20261108','./writing-report.js?legacy=20261108','./teacher-progress.js?legacy=20261108-2','./writing-publish.js?legacy=20261108','./task-management.js?legacy=20261108'];
        for(const src of backendScripts)await load(src);
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

(() => {
  const root = document.querySelector('#theme-demo');
  const switchButton = document.querySelector('#theme-switch');
  const options = document.querySelector('#theme-options');
  const names = {harbour: '海港藍', academy: '書院綠', ink: '雅墨金', mist: '霧靛紫'};
  const views = {competition: ['徵文比賽', '查看徵文活動與參與情況'], students: ['學生管理', '查看班級與學生資料'], analytics: ['學情分析', '了解學生學習與寫作表現'], publish: ['發佈任務', '建立新的教學任務'], tasks: ['任務管理', '集中查看發佈進度與學生提交情況'], reading: ['閱讀', '管理閱讀材料與練習'], topics: ['作文題庫', '查找與管理作文題目'], settings: ['設定', '管理個人與班級偏好'], notifications: ['通知', '查看最近的系統通知'], help: ['幫助中心', '查找使用指南與支援']};

  function setTheme(key) {
    if (!names[key]) return;
    root.dataset.theme = key;
    document.querySelector('#theme-current-name').textContent = names[key];
    document.querySelectorAll('[data-theme-option]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === key));
    });
  }
  setTheme('academy');

  function closeOptions(restoreFocus = false) {
    options.hidden = true;
    switchButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) switchButton.focus();
  }
  switchButton.addEventListener('click', () => {
    options.hidden = !options.hidden;
    switchButton.setAttribute('aria-expanded', String(!options.hidden));
  });
  options.addEventListener('click', event => {
    const button = event.target.closest('[data-theme-option]');
    if (!button) return;
    setTheme(button.dataset.themeOption);
    closeOptions(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.theme-switcher') && !options.hidden) closeOptions();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !options.hidden) closeOptions(true);
  });
  window.addEventListener('prototype-point-change', event => {
    if (event.detail.id !== 'menu-themes' && !options.hidden) closeOptions();
  });

  const sidebarToggle = document.querySelector('#theme-sidebar-toggle');
  root.querySelectorAll('[data-demo-view]').forEach(button => button.setAttribute('aria-label', button.textContent.trim()));
  sidebarToggle.addEventListener('click', () => {
    const collapsed = root.classList.toggle('is-collapsed');
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.setAttribute('aria-label', collapsed ? '展開左側選單' : '收起左側選單');
  });

  function setView(key) {
    if (!views[key]) return;
    document.querySelectorAll('[data-demo-view]').forEach(button => {
      const active = button.dataset.demoView === key;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    document.querySelector('#theme-crumb-current').textContent = views[key][0];
    document.querySelector('#theme-view-title').textContent = views[key][0];
    document.querySelector('#theme-view-desc').textContent = views[key][1];
    const onTasks = key === 'tasks';
    document.querySelector('#theme-tasks-view').hidden = !onTasks;
    document.querySelector('#theme-other-view').hidden = onTasks;
    document.querySelector('#theme-create-task').hidden = !onTasks;
    if (!onTasks) document.querySelector('#theme-other-title').textContent = views[key][0];
  }
  root.querySelector('.theme-sidebar').addEventListener('click', event => {
    const button = event.target.closest('[data-demo-view]');
    if (button) setView(button.dataset.demoView);
  });
  document.querySelector('#theme-back-tasks').addEventListener('click', () => setView('tasks'));

  const rows = [...root.querySelectorAll('.theme-table tbody tr')];
  let activeTab = 'all';
  function filterRows() {
    const search = document.querySelector('#theme-task-search').value.trim().toLocaleLowerCase('zh-HK');
    const classValue = document.querySelector('#theme-class-filter').value;
    const status = document.querySelector('#theme-status-filter').value;
    let visible = 0;
    rows.forEach(row => {
      const matches = (activeTab === 'all' || row.dataset.type === activeTab)
        && (classValue === 'all' || row.dataset.class === classValue)
        && (status === 'all' || row.dataset.status === status)
        && (!search || row.cells[0].textContent.toLocaleLowerCase('zh-HK').includes(search));
      row.hidden = !matches;
      if (matches) visible++;
    });
    document.querySelector('#theme-result-count').textContent = `共 ${visible} 項`;
    document.querySelector('#theme-empty').hidden = visible !== 0;
  }
  document.querySelector('.theme-tabs').addEventListener('click', event => {
    const button = event.target.closest('[data-task-tab]');
    if (!button) return;
    activeTab = button.dataset.taskTab;
    document.querySelectorAll('[data-task-tab]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    filterRows();
  });
  ['#theme-task-search', '#theme-class-filter', '#theme-status-filter'].forEach(selector => {
    document.querySelector(selector).addEventListener('input', filterRows);
  });
  document.querySelector('#theme-reset').addEventListener('click', () => {
    document.querySelector('#theme-task-search').value = '';
    document.querySelector('#theme-class-filter').value = 'all';
    document.querySelector('#theme-status-filter').value = 'all';
    document.querySelector('[data-task-tab="all"]').click();
  });
})();

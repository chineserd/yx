// Keep the teacher back-office chrome in one place across optimization points.
// The export page provides the existing school header and business menu.
(() => {
  const source = document.querySelector('#bulk-export .export-app');
  if (!source) return;
  const sourceHeader = source.querySelector('.export-app-top');
  const sourceMenu = source.querySelector('.export-app-side');
  const sections = {
    'report-prompt': '任務管理',
    'topic-year': '作文題庫',
    'exam-library': '作文題庫',
    'topic-entry': '發佈任務',
    'landscape-import': '任務管理',
  };

  Object.entries(sections).forEach(([id, activeMenu]) => {
    const page = document.getElementById(id);
    if (!page) return;
    const shell = document.createElement('section');
    shell.className = 'export-app shared-backend';
    shell.setAttribute('aria-label', `${activeMenu}後台頁面`);
    const header = sourceHeader.cloneNode(true);
    const body = document.createElement('div');
    body.className = 'export-app-body';
    const menu = sourceMenu.cloneNode(true);
    menu.setAttribute('aria-label', '業務選單');
    menu.querySelectorAll(':scope > div').forEach(item => {
      item.classList.toggle('is-active', item.textContent.includes(activeMenu));
    });
    const workspace = document.createElement('div');
    workspace.className = 'export-app-main shared-backend-main';
    while (page.firstChild) workspace.appendChild(page.firstChild);
    body.append(menu, workspace);
    shell.append(header, body);
    page.appendChild(shell);
  });
})();

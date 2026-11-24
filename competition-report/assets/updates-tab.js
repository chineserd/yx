(() => {
  function addReviewTabs() {
    const tabs = document.querySelector('.prototype-navigation .prototype-view-tabs');
    if (!tabs) return;

    if (!tabs.querySelector('[data-prompts-tab]')) {
      const prompts = document.createElement('button');
      prompts.type = 'button';
      prompts.className = 'prototype-nav-button';
      prompts.style.color = '#c62828';
      prompts.dataset.promptsTab = '';
      prompts.setAttribute('role', 'tab');
      prompts.setAttribute('aria-selected', 'false');
      prompts.textContent = '報告生成資料（提示詞+JSON）';
      prompts.addEventListener('click', () => {
        window.location.assign(new URL('./prompts.html', window.location.href));
      });
      const existingUpdates = tabs.querySelector('[data-updates-tab]');
      if (existingUpdates) tabs.insertBefore(prompts, existingUpdates);
      else tabs.append(prompts);
    }

    if (!tabs.querySelector('[data-updates-tab]')) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'prototype-nav-button';
      tab.dataset.updatesTab = '';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.textContent = '更新記錄';
      tab.addEventListener('click', () => {
        window.location.assign(new URL('./updates.html', window.location.href));
      });
      tabs.append(tab);
    }

    if (!tabs.querySelector('[data-flow-tab]')) {
      const flow = document.createElement('button');
      flow.type = 'button';
      flow.className = 'prototype-nav-button';
      flow.dataset.flowTab = '';
      flow.setAttribute('role', 'tab');
      flow.setAttribute('aria-selected', 'false');
      flow.textContent = '報告生成流程圖';
      flow.addEventListener('click', () => {
        window.location.assign(new URL('./flow.html', window.location.href));
      });
      const updates = tabs.querySelector('[data-updates-tab]');
      if (updates) tabs.insertBefore(flow, updates);
      else tabs.append(flow);
    }
  }

  const app = document.getElementById('app');
  if (!app) return;
  new MutationObserver(addReviewTabs).observe(app, { childList: true, subtree: true });
  addReviewTabs();
})();

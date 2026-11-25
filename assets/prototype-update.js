(() => {
  const script = document.currentScript;
  const group = script?.dataset.prototype;
  const loadedVersion = script?.dataset.version;
  if (!group || !loadedVersion) return;

  const style = document.createElement('style');
  style.textContent = `
    html.shared-update-active .preview-update-notice { display: none !important; }
    #prototype-update-notice {
      position: fixed; top: 12px; right: 12px; z-index: 2147483647;
      display: flex; align-items: center; gap: 12px; max-width: min(420px, calc(100vw - 24px));
      padding: 9px 10px 9px 13px; border: 1px solid #f1b3b8; border-radius: 10px;
      background: #fff4f4; color: #b42332; box-shadow: 0 8px 24px rgba(76, 19, 27, .13);
      font: 600 13px/1.45 -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    }
    #prototype-update-notice span { flex: 1; min-width: 0; }
    #prototype-update-notice button {
      flex: none; padding: 6px 10px; border: 0; border-radius: 7px;
      background: #c91f30; color: #fff; font: inherit; cursor: pointer;
    }
    #prototype-update-notice button:hover { background: #a91625; }
    #prototype-update-notice button:focus-visible { outline: 2px solid #8d1320; outline-offset: 2px; }
    @media (max-width: 600px) {
      #prototype-update-notice { top: 8px; right: 8px; left: 8px; max-width: none; }
    }
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('shared-update-active');
  if (window.top === window) document.documentElement.dataset.prototypeUpdateCoordinator = '1';

  const restoreKey = `prototype-update-restore:${group}`;
  const label = (element) => element?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const selectedButton = (root) => root?.querySelector('button[aria-current="page"], button.selected');
  const saveCurrentPage = () => {
    const top = selectedButton(document.querySelector('.preview-nav, [aria-label="原型導航"], [aria-label="原型导航"]'));
    const directory = selectedButton(document.querySelector('.page-directory, [aria-label="頁面目錄"], [aria-label="页面目录"]'));
    const section = directory?.closest('nav[aria-label]');
    try {
      sessionStorage.setItem(restoreKey, JSON.stringify({
        url: location.pathname + location.search + location.hash,
        time: Date.now(),
        top: label(top),
        directory: directory ? { section: section?.getAttribute('aria-label') || '', button: label(directory) } : null,
      }));
    } catch (_) { /* The URL still survives a reload when storage is unavailable. */ }
  };
  const restoreCurrentPage = () => {
    let saved;
    try {
      saved = JSON.parse(sessionStorage.getItem(restoreKey) || 'null');
      sessionStorage.removeItem(restoreKey);
    } catch (_) { return; }
    if (!saved || saved.url !== location.pathname + location.search + location.hash ||
        Date.now() - saved.time > 120_000) return;
    let topClicked = false;
    let observer;
    const finish = () => observer?.disconnect();
    const attempt = () => {
      if (saved.top && !topClicked) {
        const top = [...document.querySelectorAll('.preview-nav button, [aria-label="原型導航"] button, [aria-label="原型导航"] button')]
          .find((button) => label(button) === saved.top);
        if (!top) return;
        topClicked = true;
        if (!top.classList.contains('selected')) {
          top.click();
          if (saved.directory) return;
        }
      }
      if (saved.directory) {
        const sections = [...document.querySelectorAll('.page-directory nav[aria-label], [aria-label="頁面目錄"] nav[aria-label], [aria-label="页面目录"] nav[aria-label]')];
        const section = sections.find((item) => item.getAttribute('aria-label') === saved.directory.section);
        const buttons = section ? [...section.querySelectorAll('button')]
          : [...document.querySelectorAll('.page-directory button, [aria-label="頁面目錄"] button, [aria-label="页面目录"] button')];
        const matches = buttons.filter((button) => label(button) === saved.directory.button);
        const target = section ? matches[0] : matches.length === 1 ? matches[0] : null;
        if (!target) return;
        if (target.getAttribute('aria-current') !== 'page') target.click();
      }
      finish();
    };
    observer = new MutationObserver(attempt);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    attempt();
    setTimeout(finish, 5_000);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restoreCurrentPage, { once: true });
  else restoreCurrentPage();

  let checking = false;
  let selfOutdated = false;
  const frameStates = new Map();
  const topCoordinates = () => {
    if (window.top === window) return false;
    try { return window.top.document.documentElement.dataset.prototypeUpdateCoordinator === '1'; }
    catch (_) { return false; }
  };
  const showNotice = () => {
    if (document.getElementById('prototype-update-notice')) return;
    const notice = document.createElement('div');
    notice.id = 'prototype-update-notice';
    notice.setAttribute('role', 'alert');
    const message = document.createElement('span');
    message.textContent = '原型已有更新，请先刷新后继续查看';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '立即刷新';
    button.addEventListener('click', () => { saveCurrentPage(); location.reload(); });
    notice.append(message, button);
    document.body.appendChild(notice);
  };
  const updateNotice = () => {
    if (topCoordinates()) {
      window.top.postMessage({ type: 'chineserd-prototype-update', outdated: selfOutdated }, location.origin);
      document.getElementById('prototype-update-notice')?.remove();
      return;
    }
    const currentFrames = new Set([...document.querySelectorAll('iframe')].map(frame => frame.contentWindow));
    for (const source of frameStates.keys()) if (!currentFrames.has(source)) frameStates.delete(source);
    const framesOutdated = [...frameStates.values()].some(Boolean);
    if (selfOutdated || framesOutdated) showNotice();
    else document.getElementById('prototype-update-notice')?.remove();
  };
  if (window.top === window) addEventListener('message', (event) => {
    if (event.origin !== location.origin || event.data?.type !== 'chineserd-prototype-update' ||
        ![...document.querySelectorAll('iframe')].some(frame => frame.contentWindow === event.source)) return;
    frameStates.set(event.source, event.data.outdated === true);
    updateNotice();
  });
  const check = async () => {
    if (checking || document.visibilityState === 'hidden') return;
    checking = true;
    try {
      const response = await fetch(`/yx/prototype-versions.json?_=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`版本查询失败：${response.status}`);
      const versions = await response.json();
      if (typeof versions[group] !== 'string') throw new Error('原型版本缺失');
      document.documentElement.classList.add('shared-update-active');
      selfOutdated = versions[group] !== loadedVersion;
      updateNotice();
    } catch (_) {
      document.documentElement.classList.remove('shared-update-active');
    } finally {
      checking = false;
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', check, { once: true });
  else check();
  setInterval(check, 30_000);
  addEventListener('focus', check);
  document.addEventListener('visibilitychange', check);
})();

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

  let checking = false;
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
    button.addEventListener('click', () => location.reload());
    notice.append(message, button);
    document.body.appendChild(notice);
  };
  const check = async () => {
    if (checking || document.visibilityState === 'hidden') return;
    checking = true;
    try {
      const response = await fetch(`/yx/prototype-versions.json?_=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`版本查询失败：${response.status}`);
      const versions = await response.json();
      if (typeof versions[group] !== 'string') throw new Error('原型版本缺失');
      document.documentElement.classList.add('shared-update-active');
      if (versions[group] !== loadedVersion) showNotice();
      else document.getElementById('prototype-update-notice')?.remove();
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

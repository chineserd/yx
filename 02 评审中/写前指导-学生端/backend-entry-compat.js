(function () {
  const isLegacyStudentEntry = /\/student-preview\.html$/i.test(location.pathname);

  function useUnifiedBackend() {
    if (isLegacyStudentEntry && !/^#\/backend(?:\/|$)/.test(location.hash)) return;
    const target = new URL(isLegacyStudentEntry ? '中文作文.html' : location.pathname.split('/').pop(), location.href);
    target.search = location.search;
    target.hash = location.hash || '#/backend';
    if (['localhost', '127.0.0.1'].includes(location.hostname) && location.port === '8770') {
      target.hostname = 'macbook-pro-3.local';
    }
    if (target.href !== location.href) location.replace(target.href);
  }

  useUnifiedBackend();
  if (isLegacyStudentEntry) window.addEventListener('hashchange', useUnifiedBackend);
})();

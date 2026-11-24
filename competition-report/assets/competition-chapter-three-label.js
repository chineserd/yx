(() => {
  const app = document.getElementById('app');
  if (!app) return;

  let scheduled = false;

  function syncChapterThreeLabels() {
    scheduled = false;
    const report = app.querySelector('.formal-report.topic-report');
    const start = report?.querySelector('#part-2');
    const end = report?.querySelector('#part-3');
    if (!start || !end) return;

    for (const label of report.querySelectorAll('[data-template-field="requirement"] .reading-requirement > strong')) {
      if (label.textContent.trim() !== '評分要求') continue;
      if (!(start.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      if (!(label.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      label.textContent = '寫作要求　';
    }
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(syncChapterThreeLabels);
  }

  new MutationObserver(scheduleSync).observe(app, { childList: true, subtree: true });
  window.addEventListener('hashchange', scheduleSync);
  scheduleSync();
})();

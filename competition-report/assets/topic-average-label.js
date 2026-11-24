(() => {
  const app = document.getElementById('app');
  if (!app) return;

  let scheduled = false;
  function syncLabels() {
    scheduled = false;
    for (const chart of document.querySelectorAll('.chart-plot[data-v-ea4a85ec]')) {
      const marker = chart.querySelector('.local-marker');
      if (!marker) continue;

      let label = chart.querySelector('.local-average-label');
      if (!label) {
        label = document.createElement('span');
        label.className = 'range-label local-average-label';
        label.setAttribute('data-v-ea4a85ec', '');
        label.textContent = '本校平均';
        chart.append(label);
      }
      if (label.style.left !== marker.style.left) label.style.left = marker.style.left;
    }
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(syncLabels);
  }

  new MutationObserver(scheduleSync).observe(app, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });
  window.addEventListener('hashchange', scheduleSync);
  scheduleSync();
})();

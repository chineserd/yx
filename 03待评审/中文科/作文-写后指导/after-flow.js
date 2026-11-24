(() => {
  const page = document.querySelector('[data-view="flow-diagram"]');
  const scroll = document.getElementById('afterFlowScroll');
  const image = document.getElementById('afterFlowImage');
  const output = document.getElementById('afterFlowZoom');
  const fullscreenButton = page?.querySelector('[data-flow-fullscreen]');
  if (!page || !scroll || !image || !output || !fullscreenButton) return;

  let zoom = 90;
  const applyZoom = () => {
    image.style.width = `${1560 * zoom / 100}px`;
    output.value = `${zoom}%`;
  };

  page.querySelector('[data-flow-zoom="out"]').addEventListener('click', () => {
    zoom = Math.max(20, zoom - 10);
    applyZoom();
  });
  page.querySelector('[data-flow-zoom="in"]').addEventListener('click', () => {
    zoom = Math.min(160, zoom + 10);
    applyZoom();
  });
  page.querySelector('[data-flow-zoom="fit"]').addEventListener('click', () => {
    zoom = Math.max(20, Math.min(160, Math.floor((scroll.clientWidth - 2) / 1560 * 100)));
    applyZoom();
    scroll.scrollLeft = 0;
  });
  fullscreenButton.addEventListener('click', async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await page.requestFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    const active = document.fullscreenElement === page;
    fullscreenButton.textContent = active ? '退出全屏' : '全屏';
    fullscreenButton.setAttribute('aria-label', active ? '退出全屏流程圖' : '全屏檢視流程圖');
  });
  applyZoom();
})();

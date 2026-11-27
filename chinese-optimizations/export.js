const exportClass = document.querySelector('#export-class');
const exportTrigger = document.querySelector('#export-trigger');
const exportMenu = document.querySelector('#export-menu');
const exportAll = document.querySelector('#export-all');
const exportScores = document.querySelector('#export-scores');
const exportProgress = document.querySelector('#export-progress');
const cancelExport = document.querySelector('#cancel-export');
const exportScoresNote = document.querySelector('#export-scores-note');
let exportTimer = null;

function closeExportMenu() {
  exportMenu.hidden = true;
  exportTrigger.setAttribute('aria-expanded', 'false');
}

function updateExportClass() {
  const count = Number(exportClass.value);
  document.querySelector('#export-count').textContent = count;
  const className = exportClass.selectedOptions[0].textContent.slice(0, 2);
  document.querySelectorAll('#export-row-class, #export-row-class-2, #export-row-class-3').forEach(node => { node.textContent = className; });
  exportProgress.hidden = true;
  exportScoresNote.hidden = true;
  closeExportMenu();
}

function setProgress(done, total) {
  const percent = done === total ? 100 : Math.min(95, Math.round(done / total * 95));
  document.querySelector('#progress-label').textContent = done === total ? `作文報告已導出：${total} / ${total}（100%）` : `正在導出作文報告：${done} / ${total}（${percent}%）`;
  document.querySelector('#progress-fill').style.width = `${percent}%`;
  document.querySelector('#progress-note').textContent = done === total ? `已完成 ${total} / ${total} 份，報告處理完成。` : `已完成 ${done} / ${total} 份，請保持頁面開啟。`;
  document.querySelector('#progress-percent').textContent = `${percent}%`;
  document.querySelector('#long-export-note').hidden = !(total > 10 && done < total);
}

function finishExport() {
  clearInterval(exportTimer);
  exportTimer = null;
  exportClass.disabled = false;
  exportTrigger.disabled = false;
  exportTrigger.textContent = '導出文件';
  cancelExport.hidden = true;
}

exportTrigger.addEventListener('click', () => {
  exportMenu.hidden = !exportMenu.hidden;
  exportTrigger.setAttribute('aria-expanded', exportMenu.hidden ? 'false' : 'true');
});
document.addEventListener('click', event => {
  if (!event.target.closest('.export-control')) closeExportMenu();
});
exportClass.addEventListener('change', updateExportClass);
exportAll.addEventListener('click', () => {
  closeExportMenu();
  exportScoresNote.hidden = true;
  const total = Number(exportClass.value);
  let done = 0;
  exportProgress.hidden = false;
  exportClass.disabled = true;
  exportTrigger.disabled = true;
  exportTrigger.textContent = '導出中…';
  cancelExport.hidden = false;
  setProgress(done, total);
  exportTimer = setInterval(() => {
    done += 1;
    setProgress(done, total);
    if (done === total) finishExport();
  }, 420);
});
exportScores.addEventListener('click', () => {
  closeExportMenu();
  const className = exportClass.selectedOptions[0].textContent.slice(0, 2);
  const csv = '\uFEFF姓名,班級,作文報告\n陳嘉瑩,' + className + ',已完成\n林雋羲,' + className + ',已完成\n馮晉熙,' + className + ',已完成\n';
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `成績表-${className}-示例.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  exportScoresNote.textContent = '示例成績表已下載，僅包含畫面展示的三名學生。';
  exportScoresNote.dataset.kind = 'scores';
  exportScoresNote.hidden = false;
});
document.querySelector('#export-requirements').addEventListener('click', () => {
  const wasShown = !exportScoresNote.hidden && exportScoresNote.dataset.kind === 'requirements';
  exportScoresNote.textContent = '寫作題目：以《我的老師》為題，寫作文章一篇。';
  exportScoresNote.dataset.kind = 'requirements';
  exportScoresNote.hidden = wasShown;
});
document.querySelector('#export-refresh').addEventListener('click', () => {
  exportScoresNote.textContent = '成績概覽已刷新。';
  exportScoresNote.dataset.kind = 'refresh';
  exportScoresNote.hidden = false;
});
document.querySelector('.export-back').addEventListener('click', () => { location.hash = 'menu-themes'; });
cancelExport.addEventListener('click', () => {
  finishExport();
  exportProgress.hidden = true;
});
window.addEventListener('prototype-point-change', event => {
  if (event.detail.id !== 'bulk-export' && exportTimer) {
    finishExport();
    exportProgress.hidden = true;
  }
});
updateExportClass();

const dropzone = document.querySelector('#import-dropzone');
const fileInput = document.querySelector('#import-files');
const fileGrid = document.querySelector('#import-grid');
const warning = document.querySelector('#import-warning');
const warningText = document.querySelector('#import-warning-text');
const submit = document.querySelector('#import-submit');
const review = document.querySelector('#import-review');
const actionNote = document.querySelector('#import-action-note');
let nextFileId = 1;
let importing = false;
let essayFiles = [{ id: 0, name: '橫向作文原稿.png', size: 1933237, width: 1800, height: 1272, rotation: 0, sample: true, url: './assets/landscape-essay.png' }];

const isLandscape = item => (item.rotation % 180 === 0 ? item.width > item.height : item.height > item.width);
const safe = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
const sizeLabel = bytes => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

function drawImport() {
  const landscapeCount = essayFiles.filter(isLandscape).length;
  document.querySelector('#import-count').textContent = `共 ${essayFiles.length} 個文件`;
  document.querySelector('#import-size').textContent = `合計 ${sizeLabel(essayFiles.reduce((sum, item) => sum + item.size, 0))}`;
  warning.hidden = landscapeCount === 0 || importing;
  warningText.textContent = landscapeCount ? `有 ${landscapeCount} 張橫向圖片，請使用「向左旋轉」或「向右旋轉」調整為直向後再導入。` : '';
  actionNote.textContent = essayFiles.length ? (landscapeCount ? `仍有 ${landscapeCount} 張橫向圖片待調整` : `已選擇 ${essayFiles.length} 個文件，可繼續導入`) : '請先選擇作文圖片';
  submit.disabled = !essayFiles.length || landscapeCount > 0;
  submit.textContent = importing ? '返回調整' : '導入並識別';
  fileGrid.hidden = importing;
  dropzone.hidden = importing;
  review.hidden = !importing;
  fileGrid.innerHTML = essayFiles.map(item => {
    const landscape = isLandscape(item);
    const thumbnail = `<img src="${item.url}" alt="${safe(item.name)}預覽">`;
    return `<article class="import-card${landscape ? ' landscape' : ''}" data-file-id="${item.id}"><button class="import-remove" type="button" data-remove="${item.id}" aria-label="移除${safe(item.name)}">×</button><div class="import-thumb" style="--rotation:${item.rotation}deg">${thumbnail}</div><strong title="${safe(item.name)}">${safe(item.name)}</strong><small>${sizeLabel(item.size)}</small><div class="orientation">${landscape ? '橫向圖片・請調整' : '直向圖片・方向正確'}</div><div class="rotate-controls"><button type="button" data-rotate-left="${item.id}">↶ 向左旋轉</button><button type="button" data-rotate-right="${item.id}">↷ 向右旋轉</button></div></article>`;
  }).join('');
  review.innerHTML = importing ? `<h3>核查並提交</h3><p>${essayFiles.length} 個文件已調整為直向，可繼續核對學生與作文頁面。</p>` : '';
  document.querySelectorAll('.import-steps span').forEach((span, index) => span.classList.toggle('active', index === (importing ? 2 : 0)));
}

function imageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ url, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('圖片無法讀取')); };
    image.src = url;
  });
}

async function addFiles(files) {
  const images = [...files].filter(file => /^image\/(jpeg|png)$/.test(file.type));
  if (!images.length) return;
  if (essayFiles.some(item => item.sample)) essayFiles = [];
  for (const file of images) {
    try {
      const dimensions = await imageDimensions(file);
      essayFiles.push({ id: nextFileId++, name: file.name, size: file.size, file, rotation: 0, ...dimensions });
    } catch { warning.hidden = false; warningText.textContent = `${file.name} 無法讀取，請選擇其他圖片。`; }
  }
  drawImport();
}

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fileInput.click(); } });
fileInput.addEventListener('change', event => { addFiles(event.target.files); fileInput.value = ''; });
dropzone.addEventListener('dragover', event => { event.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', event => { event.preventDefault(); dropzone.classList.remove('drag-over'); addFiles(event.dataTransfer.files); });
fileGrid.addEventListener('click', event => {
  const rotate = event.target.closest('[data-rotate-left],[data-rotate-right]');
  const remove = event.target.closest('[data-remove]');
  if (rotate) {
    const id = Number(rotate.dataset.rotateLeft || rotate.dataset.rotateRight);
    const item = essayFiles.find(file => file.id === id);
    item.rotation = (item.rotation + (rotate.hasAttribute('data-rotate-left') ? 270 : 90)) % 360;
    drawImport();
  }
  if (remove) {
    const id = Number(remove.dataset.remove);
    const item = essayFiles.find(file => file.id === id);
    if (item.url && !item.sample) URL.revokeObjectURL(item.url);
    essayFiles = essayFiles.filter(file => file.id !== id);
    drawImport();
  }
});
submit.addEventListener('click', () => { importing = !importing; drawImport(); });
drawImport();

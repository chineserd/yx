function refreshDocumentation() {
  document.querySelectorAll('[data-current-topic]').forEach(el => { el.textContent = state.topic; });

}
window.addEventListener('previewview', refreshDocumentation);
document.addEventListener('click', event => {
  const target = event.target.closest('[data-preview-step]');
  if (!target) return;
  event.preventDefault();
  const step = Number(target.dataset.previewStep);
  location.hash = '/student';
  goToStep(step, true);
});
const documentPayloads = {};
const documentBlobUrls = new Map();
function refreshJsonDocuments() {
  documentPayloads.state = JSON.stringify(state, null, 2);
  documentPayloads.catalog = JSON.stringify({ materials, techniques, ideaText, labels }, null, 2);
  documentPayloads.guide = JSON.stringify({
    topic: state.topic,
    analysis: { keywords: state.keywords, genre: labels.genres[state.genre], stance: labels.stances[state.stance] },
    thesis: getThesis(),
    materials: materials.filter(item => state.selectedMaterials.includes(item.id)).map(({id,title,usage}) => ({id,title,usage})),
    outline: buildOutline(),
    techniques: techniques.filter(item => state.techniques.includes(item.id)).map(({id,title,description}) => ({id,title,description})),
  }, null, 2);
  document.querySelectorAll('[data-json-document]').forEach(el => { el.textContent = documentPayloads[el.dataset.jsonDocument]; });
  document.querySelectorAll('[data-download-document]').forEach(el => {
    const key = el.dataset.downloadDocument;
    if (documentBlobUrls.has(key)) URL.revokeObjectURL(documentBlobUrls.get(key));
    const url = URL.createObjectURL(new Blob([documentPayloads[key]], {type:'application/json;charset=utf-8'}));
    documentBlobUrls.set(key, url);
    el.href = url;
  });
}
window.addEventListener('previewview', event => { if (event.detail === 'development') refreshJsonDocuments(); });
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-document]');
  if (!button) return;
  const status = document.querySelector('[data-document-status]');
  try {
    await navigator.clipboard.writeText(documentPayloads[button.dataset.copyDocument]);
    status.textContent = '已複製當前JSON。';
  } catch { status.textContent = '瀏覽器未允許複製，請下載JSON或選取文字複製。'; }
});
function renderExistingPrompts() {
  const container = document.querySelector('[data-existing-prompts]');
  if (!container) return;
  container.replaceChildren();
  stepMeta.forEach((step, index) => {
    const source = document.querySelector(`[data-step-panel="${index+1}"]`);
    const section = document.createElement('section'); section.className = 'flow-section';
    const title = document.createElement('h2'); title.textContent = `0${index+1} ${step.name}`; section.append(title);
    const tip = document.createElement('p'); tip.textContent = step.tip; section.append(tip);
    const list = document.createElement('ul');
    const selectors = index === 0 ? '.question-heading h3, .question-heading p, .examiner-note span, .principle-list span' : index === 1 ? '.panel-intro p, #selectionAdvice' : index === 2 ? '.panel-intro p, .section-heading-row h3, .expression-heading p, .language-note p' : '.panel-intro p, .final-checks span';
    source.querySelectorAll(selectors).forEach(node => {
      const item = document.createElement('li'); item.textContent = node.textContent.trim(); list.append(item);
    });
    section.append(list); container.append(section);
  });
}
window.addEventListener('previewview', event => { if (event.detail === 'prd') renderExistingPrompts(); });

let guideTextUrl;
document.addEventListener('click', event => {
  const link = event.target.closest('[data-guide-download]');
  if (!link) return;
  if (guideTextUrl) URL.revokeObjectURL(guideTextUrl);
  guideTextUrl = URL.createObjectURL(new Blob([buildGuideText()], { type: 'text/plain;charset=utf-8' }));
  link.href = guideTextUrl;
});

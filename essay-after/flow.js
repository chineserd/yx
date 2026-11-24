const viewPositions = {};
let activeRoute;
const previewAliases = {
  'generation-flow': 'prd/steps', outline: 'prd/blueprint',
  'dev-integration': 'development/integration', api: 'development/api',
  'json-files': 'development/json-files', prompts: 'prd/prompts',
  'iteration-plan': 'prd/scope', 'review-checklist': 'prd/review',
  example: 'student', flow: 'prd/flow'
};
function normalizePrewritingCopy(){
  const tile=document.querySelector('a.learning-tile[href="#/student-pending/guidance"]');
  const label=tile?.querySelector('.requirement-feature-badge')?.parentElement;
  if(label?.firstChild?.nodeType===Node.TEXT_NODE)label.firstChild.nodeValue='寫前指導 ';
}
function showPreviewView() {
  const raw = location.hash.slice(2);
  const [rawPath, rawQuery = ''] = raw.split('?');
  const [requested] = rawPath.split('/');
  const webSurface = rawQuery.split('&').includes('surface=web');
  const resolved = previewAliases[requested] || rawPath;
  const [route, section] = resolved.split('/');
  const normalizedRoute = route === 'student' ? 'student-web' : route;
  const available = ['student-flow', 'student-empty-tablet', 'student-empty-web', 'student-records', 'student-pending', 'student-learning', 'student-score-report', 'student-web', 'student-improved', 'student-improved-empty', 'student-module', 'essay-flow', 'backend', 'prd', 'flow-diagram'];
  const view = available.includes(normalizedRoute) ? normalizedRoute : 'prd';
  const panelView = ['student-empty-tablet','student-empty-web'].includes(view) ? 'student-empty' : view === 'student-improved-empty' ? 'student-improved' : view;
  const previewNavView = view === 'student-empty-tablet' ? 'student-tablet' : view === 'student-empty-web' ? 'student-web' : webSurface || ['student','student-web'].includes(requested) ? 'student-web' : view === 'student-learning' ? 'student-tablet' : view === 'essay-flow' ? 'requirements' : view;
  if (activeRoute) viewPositions[activeRoute] = window.scrollY;
  if (resolved !== rawPath) history.replaceState(null, '', `#/${resolved}${rawQuery ? `?${rawQuery}` : ''}`);
  document.querySelectorAll('[data-view]').forEach(panel => { panel.hidden = panel.dataset.view !== panelView; });
  document.querySelectorAll('[data-view-link]').forEach(link => {
    if (link.dataset.viewLink === (webSurface || ['student','student-web'].includes(requested) ? 'student-web' : ['student-records','student-pending','student-score-report','student-improved','student-improved-empty','student-module'].includes(view) ? 'student-tablet' : previewNavView)) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('.student-version-nav').hidden = true;
  document.body.classList.remove('student-version-visible');
  const studentView = !webSurface && ['student-records','student-pending','student-learning','student-score-report','student-improved','student-improved-empty','student-module'].includes(view);
  const webStudentView = view === 'student-web' || webSurface;
  document.body.classList.toggle('student-pages-visible', studentView);
  document.body.classList.toggle('student-web-visible', webStudentView);
  window.studentSurface = webStudentView ? 'web' : 'tablet';
  normalizePrewritingCopy();
  const pageMenu = document.querySelector('.student-page-menu');
  pageMenu.hidden = !(studentView || webStudentView);
  document.getElementById('studentTabletMenuContent').hidden = !studentView;
  document.getElementById('studentWebMenuContent').hidden = !webStudentView;
  const detailRoute = view === 'student-records' && location.hash.includes('/result/');
  document.querySelectorAll('[data-student-page]').forEach(link => {
    const key = link.dataset.studentPage;
    const active = key === 'home' && view === 'student-learning'
      || key === 'guide-list' && view === 'student-pending'
      || key === 'guide-tablet' && ['student-improved','student-improved-empty'].includes(view)
      || key === 'records' && view === 'student-records' && !detailRoute
      || key === 'record-detail' && detailRoute;
    const scoreReportActive = key === 'score-report' && view === 'student-score-report';
    if (active || scoreReportActive) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-web-page]').forEach(link => {
    const key = link.dataset.webPage;
    const active = key === 'home' && view === 'student-web'
      || key === 'guide-list' && view === 'student-pending'
      || key === 'guide-start' && view === 'student-improved' && location.hash.includes('/task/')
      || key === 'guide-complete' && view === 'student-improved' && location.hash.includes('/preview/complete')
      || key === 'records' && view === 'student-records' && !detailRoute
      || key === 'record-detail' && detailRoute
      || key === 'score-report' && view === 'student-score-report';
    if (webStudentView && active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  const moduleName = location.hash.startsWith('#/student-module/') ? location.hash.split('/')[2] : '';
  document.querySelectorAll('[data-module-link]').forEach(link => {
    if (view === 'student-module' && link.dataset.moduleLink === moduleName) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const detailLink = document.querySelector('[data-student-page="record-detail"]');
  if (detailLink) {
    detailLink.hidden = false;
    detailLink.href = '#/student-records/essay/guidance/result/W001';
  }
  document.querySelectorAll('[data-student-version]').forEach(link => {
    if (link.dataset.studentVersion === panelView) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-tablet-step]').forEach(link => link.removeAttribute('aria-current'));
  document.querySelector('[data-tablet-topic]')?.removeAttribute('aria-current');
  document.querySelector('[data-tablet-empty]')?.removeAttribute('aria-current');
  document.querySelector('[data-tablet-idea]')?.removeAttribute('aria-current');
  document.querySelectorAll('[data-preview-stage]').forEach(link=>link.removeAttribute('aria-current'));
  activeRoute = resolved || view;
  const titles = { prd: 'PRD', 'flow-diagram': '流程圖' };
  document.title = `作文寫後指導｜${titles[view] || '歷史參考'}`;
  window.dispatchEvent(new CustomEvent('previewview', { detail: view }));
  if (view === 'student-web' && /^[1-4]$/.test(section || '')) history.replaceState(null, '', '#/student');
  const target = section && document.getElementById(section);
  if (target && target.closest('[data-view]')?.dataset.view === view) {
    for (const detail of target.querySelectorAll('details')) detail.open = true;
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
  } else window.scrollTo({ top: viewPositions[activeRoute] || 0, behavior: 'instant' });
}
window.addEventListener('hashchange', showPreviewView);
window.addEventListener('padstepchange', event => {
 const d=event.detail;
 const stage=d.topic?'start':d.step===1?(d.phase==='idea'?'idea':'reading'):d.step===3?'material':d.step===2?(d.structurePhase==='expression'?'expression':'outline'):'complete';
 document.querySelectorAll('.student-page-menu [aria-current]').forEach(el=>el.removeAttribute('aria-current'));
 document.querySelector(`[data-preview-stage="${stage}"]`)?.setAttribute('aria-current','page');
});
showPreviewView();

// Keep the chosen directory presentation across routes, reset to expanded on reload.
document.querySelector('.student-menu-toggle')?.addEventListener('click',event=>{
 const collapsed=document.body.classList.toggle('student-menu-collapsed');
 document.getElementById('studentMenuContent').hidden=collapsed;
 event.currentTarget.setAttribute('aria-expanded',String(!collapsed));
 event.currentTarget.textContent=collapsed?'展開 ›':'收起 ‹';
 window.dispatchEvent(new Event('resize'));
});

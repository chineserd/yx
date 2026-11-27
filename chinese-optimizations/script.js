const source = document.querySelector('#full-prompt');
const reportPrompt = document.querySelector('#report-prompt-text');
reportPrompt.textContent = source.textContent.replace(/\s+/g, ' ').trim();
document.querySelector('#print-report').addEventListener('click', () => window.print());

function selectPoint(id) {
  const link = document.querySelector(`[data-point="${id}"]`);
  if (!link) return;
  const previous = document.querySelector('.point-link.active')?.dataset.point;
  document.querySelectorAll('[data-point-page]').forEach(page => {
    page.hidden = page.id !== id;
  });
  document.querySelectorAll('.point-link').forEach(item => {
    const current = item === link;
    item.classList.toggle('active', current);
    if (current) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
  const studentPage = id === 'idea-selection';
  document.querySelectorAll('#backend-port, #student-port').forEach(tab => {
    const active = (tab.id === 'student-port') === studentPage;
    tab.classList.toggle('current', active);
    if (active) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  if (previous !== id) window.dispatchEvent(new CustomEvent('prototype-point-change', { detail: { id } }));
}
document.querySelector('#point-menu').addEventListener('click', event => {
  const link = event.target.closest('[data-point]');
  if (link) selectPoint(link.dataset.point);
});
window.addEventListener('hashchange', () => selectPoint(location.hash.slice(1)));
selectPoint(location.hash.slice(1) || 'report-prompt');

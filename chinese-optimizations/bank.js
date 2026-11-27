const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

class BankView {
  constructor(root, topics, options = {}) {
    this.root = root;
    this.topics = topics;
    this.mode = options.mode || 'browse';
    this.onSelect = options.onSelect;
    this.state = { library: options.library || 'all', query: '', year: '', questionForm: '', writingGenre: '', category: '', selectedId: '' };
    this.render();
  }

  options(key) {
    const values = [...new Set(this.topics.map(item => item[key]).filter(Boolean))];
    return key === 'year' ? values.sort((a, b) => b.localeCompare(a)) : values.sort((a, b) => a.localeCompare(b, 'zh-HK'));
  }

  selectMarkup(key, label) {
    return `<label class="bank-filter"><span class="sr-only">${label}</span><select data-filter="${key}" aria-label="${label}"><option value="">${label}</option>${this.options(key).map(value => `<option value="${html(value)}">${html(value)}</option>`).join('')}</select></label>`;
  }

  render() {
    this.root.innerHTML = `<section class="bank-panel" aria-label="作文題庫">
      <div class="bank-tabs" role="tablist" aria-label="題庫類型">
        <button type="button" role="tab" data-library="all">全部</button>
        <button type="button" role="tab" data-library="公共庫">公開考試題庫${this.root.dataset.bankMode === 'library' ? '<span class="demand-badge">需求</span>' : ''}</button>
        <button type="button" role="tab" data-library="校本庫">校本庫</button>
      </div>
      <div class="bank-filters"><input type="search" data-filter="query" aria-label="搜尋作文題目" placeholder="輸入作文題目、關鍵詞">${this.selectMarkup('year', '所有年份')}${this.selectMarkup('questionForm', '所有題目形式')}${this.selectMarkup('writingGenre', '所有寫作體裁')}${this.selectMarkup('category', '所有作文類別')}<button type="button" data-reset>重置</button></div>
      <div class="bank-count" role="status"></div>
      <div class="bank-table-wrap"><table class="bank-table"><thead><tr><th scope="col">作文題目</th><th scope="col">年份${this.root.dataset.bankMode === 'year' ? '<button type="button" class="demand-badge year-demand-trigger" aria-label="查看題目年份需求說明">需求</button>' : ''}</th><th scope="col">題目形式</th><th scope="col">寫作體裁</th><th scope="col">作文類別</th><th scope="col">操作</th></tr></thead><tbody></tbody></table></div>
    </section><div class="bank-detail" hidden><div class="bank-detail-card" role="dialog" aria-modal="true" aria-label="作文題目詳情"><div class="bank-detail-top"><strong>作文題目詳情</strong><button type="button" data-detail-close aria-label="關閉題目詳情">×</button></div><div class="bank-detail-body"></div></div></div>`;
    this.root.addEventListener('click', event => {
      const tab = event.target.closest('[data-library]');
      if (tab) { this.state.library = tab.dataset.library; this.update(); return; }
      if (event.target.closest('[data-reset]')) { this.reset(); return; }
      const title = event.target.closest('[data-topic-id]');
      if (title) {
        const topic = this.topics.find(item => item.id === title.dataset.topicId);
        if (this.mode === 'pick') { this.state.selectedId = topic.id; this.update(); this.onSelect?.(topic); }
        else this.openDetail(topic);
        return;
      }
      if (event.target.closest('[data-detail-close]') || event.target.classList.contains('bank-detail')) this.closeDetail();
    });
    this.root.addEventListener('input', event => { if (event.target.dataset.filter === 'query') { this.state.query = event.target.value; this.update(); } });
    this.root.addEventListener('change', event => { if (event.target.matches('select[data-filter]')) { this.state[event.target.dataset.filter] = event.target.value; this.update(); } });
    this.update();
    if (this.root.dataset.bankMode === 'year') this.demandCard = window.setupDemandCard('topic-year', this.root.querySelector('.year-demand-trigger'));
    if (this.root.dataset.bankMode === 'library') this.demandCard = window.setupDemandCard('exam-library', this.root.querySelector('[data-library="公共庫"]'));
  }

  filtered() {
    const s = this.state;
    const query = s.query.trim().toLocaleLowerCase('zh-HK');
    return this.topics.filter(topic =>
      (s.library === 'all' || topic.library === s.library) &&
      (!s.year || topic.year === s.year) &&
      (!s.questionForm || topic.questionForm === s.questionForm) &&
      (!s.writingGenre || topic.writingGenre === s.writingGenre) &&
      (!s.category || topic.category === s.category) &&
      (!query || topic.displayTitle.toLocaleLowerCase('zh-HK').includes(query))
    );
  }

  update() {
    this.root.querySelectorAll('[data-library]').forEach(tab => {
      const active = tab.dataset.library === this.state.library;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const items = this.filtered();
    this.root.querySelector('.bank-count').innerHTML = `篩選結果 <strong>${items.length}</strong> 道題目`;
    const tbody = this.root.querySelector('tbody');
    tbody.innerHTML = items.length ? items.map(topic => `<tr class="bank-row${this.state.selectedId === topic.id ? ' selected' : ''}">
      <td class="bank-topic-cell"><span class="file-icon" aria-hidden="true">▤</span><div class="bank-topic-wrap"><button type="button" class="bank-topic" data-topic-id="${html(topic.id)}">${html(topic.displayTitle)}</button><div class="bank-tooltip" role="tooltip"><strong>年份：${html(topic.year)}</strong><p>${html(topic.displayTitle)}</p></div></div></td>
      <td class="bank-year">${html(topic.year)}</td><td><span class="bank-pill">${html(topic.questionForm)}</span></td><td><span class="bank-pill muted">${html(topic.writingGenre)}</span></td><td>${html(topic.category)}</td><td>${this.mode === 'pick' ? `<button type="button" class="row-action" data-topic-id="${html(topic.id)}">${this.state.selectedId === topic.id ? '已選擇' : '選擇'}</button>` : `<button type="button" class="row-action" data-topic-id="${html(topic.id)}">查看題目 →</button>`}</td>
    </tr>`).join('') : '<tr><td class="bank-empty" colspan="6">沒有符合條件的題目</td></tr>';
  }

  reset() {
    this.state = { ...this.state, library: 'all', query: '', year: '', questionForm: '', writingGenre: '', category: '' };
    this.root.querySelectorAll('[data-filter]').forEach(control => { control.value = ''; });
    this.update();
  }

  openDetail(topic) {
    this.demandCard?.close();
    this.root.querySelector('.bank-detail-body').innerHTML = `<p><b>年份：</b>${html(topic.year)}</p><p><b>題目形式：</b>${html(topic.questionForm)}</p><p><b>寫作體裁：</b>${html(topic.writingGenre)}</p><p><b>作文類別：</b>${html(topic.category)}</p><h3>完整題目</h3><div class="detail-question">${html(topic.displayTitle)}</div>`;
    this.root.querySelector('.bank-detail').hidden = false;
    this.root.querySelector('[data-detail-close]').focus();
  }

  closeDetail() { this.root.querySelector('.bank-detail').hidden = true; }
}

let bankTopics = [];
window.addEventListener('prototype-point-change', () => {
  document.querySelectorAll('.bank-detail').forEach(detail => { detail.hidden = true; });
});
fetch('./topics.json').then(response => {
  if (!response.ok) throw new Error('題目資料未能載入');
  return response.json();
}).then(rows => {
  bankTopics = rows.map(topic => ({ ...topic, writingGenre: topic.writingGenre === '記敍抒情' ? '記敘抒情' : topic.writingGenre }));
  document.querySelectorAll('.bank-root').forEach(root => new BankView(root, bankTopics, { library: root.dataset.bankMode === 'library' ? '公共庫' : 'all' }));
  initTopicEntry();
}).catch(() => {
  document.querySelectorAll('.bank-root, .picker-bank').forEach(root => { root.innerHTML = '<p class="bank-error">題目資料未能載入，請重新整理頁面。</p>'; });
});

function initTopicEntry() {
  const input = document.querySelector('#topic-input');
  const picker = document.querySelector('#topic-picker');
  const confirm = document.querySelector('#confirm-topic-picker');
  const next = document.querySelector('#topic-next');
  const wordCount = document.querySelector('#word-count');
  const refreshNext = () => { next.disabled = !input.value.trim() || !window.wordCountValue?.(); };
  let chosen = null;
  new BankView(document.querySelector('.picker-bank'), bankTopics, { mode: 'pick', onSelect: topic => { chosen = topic; confirm.disabled = false; } });
  input.addEventListener('input', () => { input.dataset.source = 'custom'; refreshNext(); });
  wordCount.addEventListener('word-count-validity', refreshNext);
  wordCount.addEventListener('change', refreshNext);
  const closePicker = (restoreFocus = true) => { picker.hidden = true; if (restoreFocus) document.querySelector('#open-topic-picker').focus(); };
  window.addEventListener('prototype-point-change', event => { if (event.detail.id !== 'topic-entry' && !picker.hidden) closePicker(false); });
  document.querySelector('#open-topic-picker').addEventListener('click', () => { chosen = null; confirm.disabled = true; picker.hidden = false; document.querySelector('#close-topic-picker').focus(); });
  document.querySelector('#close-topic-picker').addEventListener('click', () => closePicker());
  document.querySelector('#cancel-topic-picker').addEventListener('click', () => closePicker());
  picker.addEventListener('click', event => { if (event.target === picker) closePicker(); });
  picker.addEventListener('keydown', event => { if (event.key === 'Escape') closePicker(); });
  confirm.addEventListener('click', () => {
    if (!chosen) return;
    input.value = chosen.displayTitle;
    input.dataset.source = 'bank';
    refreshNext();
    closePicker();
    input.focus();
  });
  next.addEventListener('click', () => {
    const status = document.querySelector('#topic-entry-status');
    status.textContent = `已設定寫作題目：${input.value.trim()}；字數要求：${window.wordCountValue()}`;
    status.hidden = false;
  });
}

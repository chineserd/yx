(function () {
  const index = document.getElementById('promptGuideIndex');
  const content = document.getElementById('promptGuideContent');
  if (!index || !content) return;

  const ids = ['model-calls', 'common-rules', 'call-1', 'call-2', 'call-3', 'materials', 'call-4', 'blueprint', 'image-writing'];
  const sections = [];
  const status = document.createElement('p');
  status.className = 'prompt-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  function addSection(title) {
    const id = ids[sections.length];
    const section = document.createElement('section');
    section.id = id;
    section.className = 'flow-section prompt-card';
    if (title.startsWith('【先不做】')) section.classList.add('prompt-deferred');

    const link = document.createElement('a');
    link.href = `#/prompt-guide/${id}`;
    link.textContent = title;
    index.append(link);

    const heading = document.createElement('div');
    heading.className = 'prompt-card-heading';
    const h2 = document.createElement('h2');
    h2.textContent = title;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'prompt-copy';
    button.dataset.promptId = id;
    button.textContent = '複製本節';
    heading.append(h2, button);
    section.append(heading);
    content.append(section);
    const item = { id, title, section, lines: [title] };
    sections.push(item);
    return item;
  }

  function appendBlock(block, current) {
    if (block.type === 'table') {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll prompt-table-scroll';
      const table = document.createElement('table');
      const [header, ...body] = block.rows;
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      header.forEach(value => {
        const cell = document.createElement('th');
        cell.textContent = value;
        headerRow.append(cell);
      });
      thead.append(headerRow);
      const tbody = document.createElement('tbody');
      body.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(value => {
          const cell = document.createElement('td');
          cell.textContent = value;
          tr.append(cell);
        });
        tbody.append(tr);
      });
      table.append(thead, tbody);
      wrapper.append(table);
      current.section.append(wrapper);
      current.lines.push(...block.rows.map(row => row.join(' | ')));
      return;
    }
    const isLabel = ['输入', '输出', '提示词', '输入：', '输出：', '提示词：'].includes(block.text);
    const node = document.createElement(isLabel ? 'h3' : 'p');
    if (block.red) node.classList.add('prompt-red');
    node.textContent = block.text;
    current.section.append(node);
    current.lines.push(block.text);
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(value); return true; } catch {}
    }
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  }

  content.addEventListener('click', async event => {
    const button = event.target.closest('[data-prompt-id]');
    if (!button) return;
    const item = sections.find(section => section.id === button.dataset.promptId);
    if (!item) return;
    try {
      if (!await copyText(item.lines.join('\n'))) throw new Error('copy failed');
      button.textContent = '已複製';
      status.textContent = `已複製「${item.title}」。`;
    } catch {
      button.textContent = '複製失敗';
      status.textContent = '複製失敗，請選取本節文字後複製。';
    }
    window.setTimeout(() => { button.textContent = '複製本節'; }, 2200);
  });

  fetch('prompt-guide-content.json?v=20261118-output-stance-red').then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }).then(documentData => {
    let current;
    documentData.blocks.forEach(block => {
      if (block.type === 'heading' && block.level === 1) return;
      if (block.type === 'heading' || block.text === '通用输入输出规则') {
        current = addSection(block.text);
      } else if (current) {
        appendBlock(block, current);
      }
    });
    content.append(status);
    if (location.hash.startsWith('#/prompt-guide/')) {
      requestAnimationFrame(() => document.getElementById(location.hash.split('/')[2])?.scrollIntoView());
    }
  }).catch(() => {
    status.textContent = '提示詞載入失敗，請刷新頁面重試。';
    content.append(status);
  });
})();

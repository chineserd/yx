(() => {
  const page = document.querySelector('#idea-selection');
  if (!page) return;
  const checks = [...page.querySelectorAll('.idea-option input')];
  const next = page.querySelector('#idea-next');
  const count = page.querySelector('#idea-count');
  const feedback = page.querySelector('#idea-feedback');
  const sideIdeas = page.querySelector('#idea-side-ideas');
  const selected = () => checks.filter(input => input.checked);
  const showFeedback = message => { feedback.textContent = message; feedback.hidden = false; };
  const update = () => {
    const values = selected().map(input => input.value);
    count.textContent = `已選 ${values.length} / 2 項`;
    next.dataset.empty = values.length === 0 ? 'true' : 'false';
    sideIdeas.replaceChildren();
    if (!values.length) {
      const empty = document.createElement('p');
      empty.textContent = '尚未選擇中心思想';
      sideIdeas.append(empty);
    } else values.forEach(value => {
      const item = document.createElement('p');
      item.textContent = value;
      sideIdeas.append(item);
    });
  };
  checks.forEach(input => input.addEventListener('change', () => {
    if (selected().length > 2) {
      input.checked = false;
      showFeedback('最多可勾選 2 項中心思想，請先取消一項。');
    } else feedback.hidden = true;
    update();
  }));
  page.querySelector('#idea-help').addEventListener('click', () => showFeedback('請勾選 1–2 項最能表達你看法的中心思想，才可進入下一步。'));
  next.addEventListener('click', () => {
    const values = selected().map(input => input.value);
    if (values.length < 1 || values.length > 2) { showFeedback('請勾選 1–2 項最能表達你看法的中心思想，才可進入下一步。'); return; }
    const summary = page.querySelector('#idea-selected-summary');
    summary.replaceChildren();
    values.forEach(value => {
      const chip = document.createElement('span');
      chip.textContent = value;
      summary.append(chip);
    });
    page.querySelector('#idea-step-one').hidden = true;
    page.querySelector('#idea-step-two').hidden = false;
    page.querySelector('[data-idea-step="1"]').classList.remove('active');
    page.querySelector('[data-idea-step="2"]').classList.add('active');
    feedback.hidden = true;
    page.querySelector('#idea-step-two h2').focus?.();
  });
  page.querySelector('#idea-back').addEventListener('click', () => {
    page.querySelector('#idea-step-two').hidden = true;
    page.querySelector('#idea-step-one').hidden = false;
    page.querySelector('[data-idea-step="2"]').classList.remove('active');
    page.querySelector('[data-idea-step="1"]').classList.add('active');
    next.focus();
  });
  update();
})();

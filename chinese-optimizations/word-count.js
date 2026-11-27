(() => {
  const input = document.querySelector('#word-count');
  const toggle = document.querySelector('#word-count-toggle');
  const list = document.querySelector('#word-count-options');
  const error = document.querySelector('#word-count-error');
  if (!input || !toggle || !list || !error) return;
  const buttons = [...list.querySelectorAll('[data-word-count]')];
  const normalize = raw => {
    const value = raw.trim();
    const number = Number(value);
    return /^\d+$/.test(value) && Number.isSafeInteger(number) && number > 0 ? String(number) : null;
  };
  const valid = () => !!normalize(input.value);
  const setOpen = open => {
    list.hidden = !open;
    input.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      const selected = buttons.find(button => button.dataset.wordCount === normalize(input.value));
      buttons.forEach(button => button.setAttribute('aria-selected', String(button === selected)));
    }
  };
  const validate = format => {
    const value = normalize(input.value);
    error.hidden = !!value;
    input.setAttribute('aria-invalid', String(!value));
    input.closest('.word-count-combo').classList.toggle('invalid', !value);
    if (format && value) input.value = value;
    input.dispatchEvent(new Event('word-count-validity', { bubbles: true }));
    return !!value;
  };
  const choose = button => {
    input.value = button.dataset.wordCount;
    setOpen(false);
    validate(false);
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
  };
  toggle.addEventListener('click', () => { setOpen(list.hidden); if (!list.hidden) buttons.find(button => button.getAttribute('aria-selected') === 'true')?.focus(); });
  list.addEventListener('click', event => { const button = event.target.closest('[data-word-count]'); if (button) choose(button); });
  list.addEventListener('keydown', event => {
    const index = buttons.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus();
    } else if (event.key === 'Escape') { setOpen(false); input.focus(); }
  });
  input.addEventListener('input', () => { error.hidden = true; input.removeAttribute('aria-invalid'); input.closest('.word-count-combo').classList.remove('invalid'); input.dispatchEvent(new Event('word-count-validity', { bubbles: true })); });
  input.addEventListener('blur', () => { if (!list.contains(document.activeElement) && document.activeElement !== toggle) validate(true); });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); buttons[0]?.focus(); }
    else if (event.key === 'Enter') { event.preventDefault(); setOpen(false); validate(true); }
    else if (event.key === 'Escape') setOpen(false);
  });
  document.addEventListener('pointerdown', event => { if (!event.target.closest('.word-count-combo')) setOpen(false); });
  window.wordCountValue = () => valid() ? `${normalize(input.value)}字以上` : null;
})();

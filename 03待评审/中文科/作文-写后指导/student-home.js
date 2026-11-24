(() => {
  const setTaskState = state => {
    document.querySelectorAll('[data-home-task-state]').forEach(button => {
      const active = button.dataset.homeTaskState === state;
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-home-task-panel]').forEach(panel => {
      panel.hidden = panel.dataset.homeTaskPanel !== state;
    });
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-home-task-state]');
    if (!button) return;
    setTaskState(button.dataset.homeTaskState);
  });
  window.addEventListener('previewview', event => {
    if (event.detail === 'student-learning') setTaskState('pending');
  });
})();

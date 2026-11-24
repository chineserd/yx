(() => {
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const percent = (score, max) => Math.round(score / max * 100);
  const getData = () => {
    try { return { essay: essayData, score: scoreSource }; } catch { return null; }
  };
  const render = () => {
    const root = document.getElementById('studentScoreReportApp');
    const data = getData();
    if (!root || !data) return;
    const {essay, score} = data;
    const overall = score.overall.replace(/\d+\s*$/, '').trim();
    const backHref=window.studentSurface==='web'?'#/student-records/essay/guidance?surface=web':'#/student-records/essay/guidance';
    root.innerHTML = `<div class="student-score-report-shell"><header class="student-score-report-header"><a class="student-score-back" href="${backHref}">‹ 返回</a><h1>作文評分報告</h1><div class="student-score-count">總字數 <b>${escapeText(essay.wordCount)}</b> 字</div></header><div class="student-score-layout"><section class="student-score-original"><div class="student-score-toolbar"><div class="student-score-switch" role="tablist" aria-label="作文內容"><button class="is-active" type="button" data-student-score-view="image">▧ 圖片</button><button type="button" data-student-score-view="text">文 A 文字</button></div></div><div class="student-score-pages" data-student-score-pages>${essay.pages.map((page,index) => `<article class="student-score-page"><div class="student-score-page-meta"><span>第 ${index + 1} 頁</span><span>${escapeText(essay.student)}</span></div><img class="student-score-image" src="report-assets/lin-junxi-${index + 1}.jpg" alt="${escapeText(essay.student)}作文原稿第${index + 1}頁"></article>`).join('')}</div><article class="student-score-text" data-student-score-text hidden>${essay.paragraphs.map(paragraph => `<p>${escapeText(paragraph)}</p>`).join('')}</article><footer class="student-score-legend"><span><i></i>佳句賞析</span><span><i></i>優化建議</span><span>▣ 疑似錯別字</span></footer></section><aside class="student-score-review"><div class="student-score-tabs" role="tablist" aria-label="作文報告內容"><button class="is-active" type="button" data-student-score-pane="score">評分與評語</button><button type="button" data-student-score-pane="notes">批改信息</button></div><section class="student-score-review-panel" data-student-score-panel="score"><div class="student-score-total"><div><strong>${score.dimensions.reduce((sum,item) => sum + item.score, 0)}</strong><small>/100</small><b>等級 3</b></div><span>作文總評</span></div><h2>總評</h2><p class="student-score-overall">${escapeText(overall)}</p>${score.dimensions.map(item => `<article class="student-score-dimension"><header><b>${escapeText(item.label)}</b><span><strong>${item.score}</strong> / ${item.max}</span></header><div class="student-score-track"><i style="width:${percent(item.score,item.max)}%"></i></div><p>${escapeText(item.comment)}</p></article>`).join('')}</section><section class="student-score-notes" data-student-score-panel="notes" hidden>${essay.notes.map(note => `<article class="student-score-note"><b>${escapeText(note.category)}</b><p>${escapeText(note.comment)}</p></article>`).join('')}</section></aside></div></div>`;
    root.querySelectorAll('[data-student-score-view]').forEach(button => button.addEventListener('click', () => {
      const image = button.dataset.studentScoreView === 'image';
      root.querySelectorAll('[data-student-score-view]').forEach(item => item.classList.toggle('is-active', item === button));
      root.querySelector('[data-student-score-pages]').hidden = !image;
      root.querySelector('[data-student-score-text]').hidden = image;
    }));
    root.querySelectorAll('[data-student-score-pane]').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.studentScorePane;
      root.querySelectorAll('[data-student-score-pane]').forEach(item => item.classList.toggle('is-active', item === button));
      root.querySelectorAll('[data-student-score-panel]').forEach(panel => { panel.hidden = panel.dataset.studentScorePanel !== target; });
    }));
  };
  window.addEventListener('previewview', event => { if (event.detail === 'student-score-report') render(); });
})();

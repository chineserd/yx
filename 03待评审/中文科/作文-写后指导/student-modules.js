const studentModuleData = {
  daily: { title: '每日一練', eyebrow: 'TODAY · DAILY PRACTICE', desc: '按今日安排完成练习，提交后查看即时解析。', accent: 'violet' },
  designated: { title: '指定篇章', eyebrow: 'READING · SELECTED', desc: '从老师指定篇章开始阅读，支持原文、译文与段落解析。', accent: 'teal' },
  outside: { title: '課外篇章', eyebrow: 'READING · EXTRA', desc: '选择课外篇章阅读并完成后续练习。', accent: 'teal' },
  classical: { title: '文言文專項練習', eyebrow: 'PRACTICE · CLASSICAL', desc: '按题型和能力点练习文言文专项题目。', accent: 'orange' },
  reading: { title: '閱讀理解', eyebrow: 'READING · COMPREHENSION', desc: '阅读白话文篇章，完成选择题与简答题。', accent: 'blue' },
  'essay-correction': { title: 'AI作文批改', eyebrow: 'WRITING · CORRECTION', desc: '拍照或从相簿导入作文，跟进识别与批改状态。', accent: 'purple' },
  tasks: { title: '老師任務', eyebrow: 'TASKS · ASSIGNED', desc: '查看待完成、已完成和已过期的老师任务。', accent: 'blue' },
  mistakes: { title: '錯題本', eyebrow: 'REVIEW · MISTAKES', desc: '按篇章和能力点回看错题，继续巩固薄弱点。', accent: 'orange' }
};

const studentModuleEscape = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const studentModuleCard = (title, meta, desc, href, tone = '') => `<a class="module-card ${tone}" href="${href}"><span class="module-card-icon" aria-hidden="true">${tone === 'orange' ? '文' : tone === 'teal' ? '閱' : '練'}</span><span class="module-card-copy"><strong>${studentModuleEscape(title)}</strong><small>${studentModuleEscape(meta)}</small><em>${studentModuleEscape(desc)}</em></span><span class="module-card-arrow" aria-hidden="true">›</span></a>`;

function moduleShell(module, content, state) {
  const info = studentModuleData[module] || studentModuleData.daily;
  const back = state && state !== 'list' ? `#/student-module/${module}` : '#/student-learning';
  return `<div class="module-page" data-module="${module}">
    <header class="module-header"><a class="module-back" href="${back}" aria-label="返回${info.title}">‹ <span>${state && state !== 'list' ? '返回' : '自主學習'}</span></a><div><span class="module-eyebrow">${info.eyebrow}</span><h1>${info.title}</h1></div><span class="module-student">陳曉晴 · S01</span></header>
    <section class="module-intro ${info.accent}"><span class="module-kicker">中文科 · 啟答平板端</span><h2>${info.title}</h2><p>${info.desc}</p></section>
    ${content}
    <nav class="module-bottom" aria-label="學生主導航"><a href="#/student-module/daily" ${module === 'daily' ? 'aria-current="page"' : ''}>▣<span>每日一練</span></a><a href="#/student-learning">▰<span>自主學習</span></a><a href="#/student-module/tasks" ${module === 'tasks' ? 'aria-current="page"' : ''}>☷<span>老師任務</span></a></nav>
  </div>`;
}

function moduleList(module) {
  const common = `<div class="module-toolbar"><div class="module-segmented"><button class="is-active" type="button">全部</button><button type="button">未完成</button><button type="button">已完成</button></div><button class="module-filter" type="button">篩選 <span>⌄</span></button></div>`;
  if (module === 'daily') return moduleShell(module, `${common}<section class="module-section"><div class="module-section-title"><div><span class="module-kicker">2026年11月6日</span><h3>今日安排</h3></div><span class="module-count">3項練習</span></div><div class="module-card-list">${studentModuleCard('文言文基礎練習', '文言文 · 10題 · 約8分鐘', '字詞辨析與句意理解，完成后即时查看解析。', '#/student-module/daily/practice', 'orange')}${studentModuleCard('指定篇章：魚我所欲也', '指定篇章 · 6題 · 約12分鐘', '原文、译文和题目关联展示。', '#/student-module/designated/reader', 'teal')}${studentModuleCard('閱讀理解：一個小故事', '白話文 · 8題 · 約10分鐘', '按题目导航完成整篇阅读理解。', '#/student-module/reading/reader', 'blue')}</div></section><section class="module-info-card"><strong>本周完成</strong><span>4 / 5 天</span><p>连续完成 3 天，继续保持。</p></section>`, 'list');
  if (module === 'designated' || module === 'outside') {
    const outside = module === 'outside';
    return moduleShell(module, `${common}<section class="module-section"><div class="module-section-title"><div><span class="module-kicker">${outside ? '課外閱讀' : '老師指定'}</span><h3>${outside ? '選擇課外篇章' : '指定篇章目錄'}</h3></div><span class="module-count">共 4 篇</span></div><div class="module-card-list">${studentModuleCard(outside ? '窗邊的小豆豆' : '魚我所欲也', '文言文 · 七年級 · 862字', '原文／译文／段落解析', `#/student-module/${module}/reader`, 'teal')}${studentModuleCard(outside ? '一盞燈的溫度' : '岳陽樓記', '白話文 · 八年級 · 1040字', '閱讀文章并开始练习', `#/student-module/${module}/reader`, 'blue')}${studentModuleCard(outside ? '城市裡的樹' : '出師表', '文言文 · 九年級 · 936字', '文章分析與練習入口', `#/student-module/${module}/reader`, 'orange')}</div></section><section class="module-empty-note"><strong>阅读模式</strong><p>进入篇章后可在原文、译文与段落解析之间切换；没有题集时显示提示，不跳转到其他篇章。</p></section>`, 'list');
  }
  if (module === 'classical') return moduleShell(module, `${common}<section class="module-section"><div class="module-section-title"><div><span class="module-kicker">专项题集</span><h3>选择一套练习</h3></div><span class="module-count">共 3 套</span></div><div class="module-card-list">${studentModuleCard('文言字詞辨析一', '单选／填空 · 12题 · 难度 2', '覆盖实词、虚词与词类活用。', '#/student-module/classical/practice', 'orange')}${studentModuleCard('句意推斷與翻譯', '单选／简答 · 8题 · 难度 3', '练习句意理解与翻译表达。', '#/student-module/classical/practice', 'orange')}${studentModuleCard('篇章理解綜合練習', '混合题型 · 10题 · 难度 3', '提交整卷后查看得分与参考答案。', '#/student-module/classical/practice', 'orange')}</div></section><section class="module-info-card"><strong>提示</strong><p>专项练习按整卷提交，提交前可通过题号导航检查漏答。</p></section>`, 'list');
  if (module === 'reading') return moduleShell(module, `${common}<section class="module-section"><div class="module-section-title"><div><span class="module-kicker">白話文閱讀</span><h3>選擇閱讀理解</h3></div><span class="module-count">共 3 篇</span></div><div class="module-card-list">${studentModuleCard('一個小故事', '白話文 · 八年級 · 8題', '长选项阅读理解，约10分钟。', '#/student-module/reading/reader', 'blue')}${studentModuleCard('與自己和解', '白話文 · 九年級 · 6題', '文章主旨、结构与表达。', '#/student-module/reading/reader', 'teal')}${studentModuleCard('給未來的信', '白話文 · 七年級 · 7題', '完成后进入批改报告。', '#/student-module/reading/reader', 'blue')}</div></section>`, 'list');
  if (module === 'essay-correction') return moduleShell(module, `<section class="upload-panel"><div class="upload-icon">＋</div><h3>導入作文</h3><p>可拍照或从相簿选择作文图片，最多 4 张。</p><div class="upload-actions"><button type="button" data-module-toast="请允许相机权限后再拍摄">拍照</button><button type="button" data-module-toast="已打开相簿选择">從相簿選擇</button></div></section><section class="module-section"><div class="module-section-title"><div><span class="module-kicker">批改记录</span><h3>最近作文</h3></div><span class="module-count">0 篇</span></div><div class="module-empty"><strong>暫無作文批改記錄</strong><p>导入作文后，会在这里查看识别、批改中和报告状态。</p></div></section><section class="module-status-legend"><span><i class="dot waiting"></i>待上传</span><span><i class="dot processing"></i>批改中</span><span><i class="dot done"></i>已完成</span></section>`, 'list');
  if (module === 'tasks') return moduleShell(module, `<div class="module-toolbar task-tabs"><div class="module-segmented"><button class="is-active" type="button">待完成 2</button><button type="button">已完成 3</button><button type="button">已過期 1</button></div></div><section class="module-section"><div class="task-list">${studentModuleCard('命題作文：這一道風景', '截止 2026-11-08 · 命題作文', '完成写前指导后提交作文。', '#/student-pending/guidance', 'purple')}${studentModuleCard('閱讀練習：人物描寫', '截止 2026-11-10 · 閱讀理解', '完成文章阅读与题目作答。', '#/student-module/reading/reader', 'blue')}</div></section><section class="module-info-card"><strong>任务状态</strong><p>已完成优先于已过期；批改中的任务保留在原任务详情中。</p></section>`, 'list');
  if (module === 'mistakes') return moduleShell(module, `${common}<section class="module-section"><div class="module-section-title"><div><span class="module-kicker">回看与巩固</span><h3>錯題列表</h3></div><span class="module-count">6 道</span></div><div class="mistake-list"><button type="button" data-module-toast="已打开：鱼我所欲也第3题"><span>文言文</span><strong>魚我所欲也 · 第3題</strong><small>句意推断 · 待加强</small></button><button type="button" data-module-toast="已打开：一個小故事第5题"><span>閱讀理解</span><strong>一個小故事 · 第5題</strong><small>主旨概括 · 待加强</small></button></div></section>`, 'list');
  return moduleShell(module, '<div class="module-empty"><strong>頁面尚未配置</strong><p>请返回自主学习选择其他模块。</p></div>', 'list');
}

function moduleReader(module) {
  const info = studentModuleData[module];
  const title = module === 'reading' ? '一個小故事' : module === 'outside' ? '窗邊的小豆豆' : '魚我所欲也';
  const type = module === 'reading' ? '白話文 · 閱讀理解' : '文言文 · 篇章閱讀';
  const isReading = module === 'reading';
  return moduleShell(module, `<div class="reader-tabs"><button class="is-active" type="button">原文</button><button type="button">${isReading ? '題目' : '譯文'}</button><button type="button">段落解析</button></div><section class="reader-layout"><article class="reader-article"><span class="module-kicker">${type}</span><h3>${title}</h3><p>從前有一個孩子，在陌生的城市裡學會觀察身邊的人。他把每天遇到的小事記下來，慢慢發現，真正重要的不是答案有多快，而是能否把自己的想法說清楚。</p><p>文章以日常片段串起人物的變化，請留意第二段與結尾的照應，以及作者如何透過細節表達情感。</p><div class="reader-note"><strong>閱讀提示</strong><span>可点击带下划线词语查看释义；本原型仅展示提示入口。</span></div></article><aside class="reader-side"><div class="question-progress"><span>第 1 / 6 題</span><b>16%</b></div><h4>作者在第二段主要想表达什么？</h4><div class="option-list"><button type="button" data-module-option>人物的观察很细致</button><button type="button" data-module-option>城市生活一定很轻松</button><button type="button" data-module-option>答案速度比思考重要</button><button type="button" data-module-option>故事发生在学校</button></div><button class="module-primary" data-module-action="${isReading ? 'report' : 'practice'}" type="button">${isReading ? '查看下一題' : '開始練習'}</button></aside></section>`, 'reader');
}

function modulePractice(module) {
  const classical = module === 'classical';
  return moduleShell(module, `<section class="practice-head"><div><span class="module-kicker">${classical ? '文言文專項練習' : '每日一練'}</span><h3>${classical ? '文言字詞辨析一' : '第 1 題 · 單選題'}</h3></div><span class="practice-timer">已用時 02:16</span></section><section class="practice-layout"><aside class="question-nav"><strong>題目導航</strong><div>${[1,2,3,4,5,6,7,8].map(i=>`<button class="${i===1?'is-active':''}" type="button">${i}</button>`).join('')}</div><small>已答 2 / 8</small></aside><article class="question-card"><span class="module-kicker">${classical ? '字詞辨析' : '今日語文練習'}</span><h3>下列句子中，加點詞語的意思相同的是？</h3><p class="question-text">A. 魚，我所欲也／所欲有甚於生者<br/>B. 一簞食／一豆羹<br/>C. 呼爾而與之／蹴爾而與之</p><div class="answer-grid"><button type="button" data-module-option>A</button><button type="button" data-module-option>B</button><button type="button" data-module-option>C</button><button type="button" data-module-option>D</button></div><div class="question-actions"><a class="module-secondary" href="#/student-module/${module}">暫停練習</a><button class="module-primary" data-module-action="report" type="button">提交并查看报告</button></div></article></section>`, 'practice');
}

function moduleReport(module) {
  const info = studentModuleData[module];
  return moduleShell(module, `<section class="report-score"><div><span class="module-kicker">本次练习已完成</span><strong>78<span>分</span></strong><p>答对 6 / 8 题 · 正确率 75%</p></div><div class="report-ring">75<small>%</small></div></section><section class="report-grid"><article><span>掌握較好</span><strong>字词辨析</strong><p>能识别常见实词在句中的含义。</p></article><article><span>待加强</span><strong>主旨概括</strong><p>建议回看错题并完成一次巩固练习。</p></article></section><section class="module-section"><div class="module-section-title"><div><span class="module-kicker">下一步</span><h3>继续学习</h3></div></div><div class="report-actions"><a class="module-primary" href="#/student-module/${module}">返回${info.title}</a><a class="module-secondary" href="#/student-module/mistakes">查看錯題本</a></div></section>`, 'report');
}

function renderStudentModule() {
  if (!location.hash.startsWith('#/student-module')) return;
  const parts = location.hash.slice(2).split('/');
  const module = studentModuleData[parts[1]] ? parts[1] : 'daily';
  const state = parts[2] || 'list';
  const root = document.getElementById('studentModuleApp');
  if (!root) return;
  root.innerHTML = state === 'reader' ? moduleReader(module) : state === 'practice' ? modulePractice(module) : state === 'report' ? moduleReport(module) : moduleList(module);
  root.querySelectorAll('[data-module-option]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-module-option]').forEach(item => item.classList.remove('is-selected'));
    button.classList.add('is-selected');
  }));
  root.querySelectorAll('[data-module-action="report"]').forEach(button => button.addEventListener('click', () => { location.hash = `#/student-module/${module}/report`; }));
  root.querySelectorAll('[data-module-action="practice"]').forEach(button => button.addEventListener('click', () => { location.hash = `#/student-module/${module}/practice`; }));
  root.querySelectorAll('[data-module-toast]').forEach(button => button.addEventListener('click', () => window.showToast?.(button.dataset.moduleToast)));
}

function connectStudentHomeModuleLinks() {
  const mapping = { '指定篇章': 'designated', '課外篇章': 'outside', '閱讀理解': 'reading', 'AI作文批改': 'essay-correction' };
  document.querySelectorAll('.learning-tile[disabled]').forEach(button => {
    const name = button.querySelector('span:nth-of-type(2)')?.textContent?.trim() || button.textContent.trim();
    const module = mapping[name];
    if (!module) return;
    button.disabled = false;
    button.removeAttribute('title');
    button.addEventListener('click', () => { location.hash = `#/student-module/${module}`; });
  });
  document.querySelectorAll('.learning-bottom button[disabled]').forEach(button => {
    if (button.textContent.includes('每日一練')) { button.disabled = false; button.removeAttribute('title'); button.addEventListener('click', () => { location.hash = '#/student-module/daily'; }); }
    if (button.textContent.includes('老師任務')) { button.disabled = false; button.removeAttribute('title'); button.addEventListener('click', () => { location.hash = '#/student-module/tasks'; }); }
  });
}

window.addEventListener('previewview', event => { if (event.detail === 'student-module') renderStudentModule(); });
window.addEventListener('hashchange', renderStudentModule);
window.addEventListener('DOMContentLoaded', connectStudentHomeModuleLinks);

(() => {
  const content = {
    'report-prompt': {
      title: '導出報告題幹',
      feature: '作文報告中的題幹最多顯示 3 行，完整題目仍保留在題庫。',
      verify: '對照題庫題目與報告預覽，核對報告題幹不超過 3 行。'
    },
    'topic-year': {
      title: '題目年份',
      feature: '題目列表、年份篩選及題目懸浮詳情均顯示年份。',
      verify: '選擇年份後核對列表，再將滑鼠移至題目，核對詳情與列表的年份一致。'
    },
    'exam-library': {
      title: '公開考試題庫',
      feature: '將原「公共庫」名稱改為「公開考試題庫」，用於瀏覽歷年公開考試題目。',
      verify: '切換題庫分頁，核對名稱與所展示的題目分類。'
    },
    'topic-entry': {
      title: '字數要求',
      feature: '可自行輸入字數，或從預設數字選擇；「字以上」固定顯示。',
      verify: '試輸入 650、選擇 800，再輸入 0，核對回填與錯誤提示。'
    },
    'landscape-import': {
      title: '橫圖提醒與旋轉',
      feature: '批量導入時提示橫向圖片，並提供向左、向右旋轉操作。',
      verify: '加入橫向圖片，核對提醒及旋轉後的圖片方向。'
    },
    'bulk-export': {
      title: '大量報告導出',
      feature: '導出超過 10 篇作文報告時，顯示等候文案及處理進度。',
      verify: '比較 10 篇與 11 篇的導出狀態，核對提示與進度。'
    },
    'menu-themes': {
      title: '後台選單主題',
      feature: '右上角可切換四款後台主題，預設為「書院綠」。',
      verify: '重新進入頁面核對預設主題，再切換其他主題檢查頂欄與選單。'
    },
    'idea-selection': {
      title: '中心思想勾選',
      feature: '未勾選時按鈕為灰色，點擊顯示提醒；勾選 1–2 項後可進入下一步。',
      verify: '分別嘗試未勾選、勾選 1–2 項及第 3 項，核對提示和步驟。'
    }
  };

  window.setupDemandCard = (pageId, trigger) => {
    const page = document.getElementById(pageId);
    const copy = content[pageId];
    if (!page || !trigger || !copy || page.querySelector('.demand-info-card')) return null;

    const card = document.createElement('aside');
    card.className = 'demand-info-card';
    card.id = `demand-info-${pageId}`;
    card.setAttribute('aria-label', `${copy.title}需求說明`);
    card.hidden = true;
    card.innerHTML = '<div class="demand-info-head"><strong></strong><button type="button" aria-label="收起需求說明">×</button></div><p><b>功能點</b><span></span></p><p><b>驗證方式</b><span></span></p>';
    card.querySelector('strong').textContent = `${copy.title} · 需求說明`;
    card.querySelectorAll('p span')[0].textContent = copy.feature;
    card.querySelectorAll('p span')[1].textContent = copy.verify;
    page.append(card);

    trigger.setAttribute('aria-controls', card.id);
    trigger.setAttribute('aria-expanded', 'false');
    if (trigger.tagName !== 'BUTTON') {
      trigger.setAttribute('role', 'button');
      trigger.tabIndex = 0;
    }
    const position = () => {
      if (card.hidden || page.hidden) return;
      const anchor = trigger.matches('.theme-switch-badge, .export-badge')
        ? trigger.parentElement : trigger.querySelector('.demand-badge') || trigger;
      const rect = anchor.getBoundingClientRect();
      const left = Math.max(12, Math.min(rect.left - 92, window.innerWidth - card.offsetWidth - 12));
      const below = rect.bottom + 10;
      const top = below + card.offsetHeight <= window.innerHeight - 12
        ? below : Math.max(60, rect.top - card.offsetHeight - 10);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
    };
    const setOpen = open => {
      const show = open && !page.hidden && trigger.getClientRects().length > 0;
      card.hidden = !show;
      trigger.setAttribute('aria-expanded', String(show));
      if (show) position();
    };
    trigger.addEventListener('click', () => setOpen(card.hidden));
    if (trigger.tagName !== 'BUTTON') trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(card.hidden);
      }
    });
    card.querySelector('button').addEventListener('click', () => { setOpen(false); trigger.focus(); });
    page.addEventListener('click', event => {
      if (event.target.closest('#open-topic-picker, #export-trigger, #theme-switch, #idea-next')) setOpen(false);
    });
    window.addEventListener('prototype-point-change', event => setOpen(event.detail.id === pageId));
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    if (!page.hidden) setOpen(true);
    return { close: () => setOpen(false) };
  };

  document.querySelectorAll('[data-point-page]').forEach(page => {
    if (page.id === 'topic-year' || page.id === 'exam-library') return;
    const trigger = page.querySelector('.demand-card-trigger');
    window.setupDemandCard(page.id, trigger);
  });
})();

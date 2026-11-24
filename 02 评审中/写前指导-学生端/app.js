const materials = [
  {
    id: "personal-debate",
    type: "personal",
    typeLabel: "個人成長",
    title: "校際辯論落敗",
    summary: "悉心準備卻首輪出局，從只怪賽制，到重看錄影、修正論證方式，半年後帶隊晉級。",
    usage: "正面例證：反思與行動把挫折轉化為成長。",
    match: 98,
  },
  {
    id: "personal-piano",
    type: "personal",
    typeLabel: "個人成長",
    title: "演奏失誤之後",
    summary: "公開演奏時忘譜，從逃避舞台，到拆解緊張來源並練習臨場應變，重新建立自信。",
    usage: "細節描寫：呈現挫敗、反思、改變的完整過程。",
    match: 94,
  },
  {
    id: "edison",
    type: "people",
    typeLabel: "人物事例",
    title: "愛迪生改良電燈",
    summary: "多次試驗失敗並非自動帶來成功；記錄結果、調整材料，才令每次失敗產生價值。",
    usage: "因果分析：失敗＋復盤，才構成進步。",
    match: 96,
  },
  {
    id: "su-shi",
    type: "people",
    typeLabel: "人物事例",
    title: "蘇軾被貶黃州",
    summary: "仕途失意帶來生活困頓，卻也在自省與創作中拓闊生命境界，留下《赤壁賦》等作品。",
    usage: "深化立意：逆境可促成精神上的成熟。",
    match: 92,
  },
  {
    id: "growth-mindset",
    type: "society",
    typeLabel: "社會觀察",
    title: "成長型思維",
    summary: "面對低分時，把能力視為可改善的人會尋找策略；把能力視為固定的人則較易放棄。",
    usage: "概念論據：人的理解與回應影響結果。",
    match: 97,
  },
  {
    id: "support-system",
    type: "society",
    typeLabel: "社會觀察",
    title: "支援系統的重要",
    summary: "同樣面對挫敗，有老師、家人或同伴支援的人，更有條件整理情緒並重新嘗試。",
    usage: "補充條件：成長也依賴支持，不應美化苦難。",
    match: 91,
  },
  {
    id: "learned-helplessness",
    type: "society",
    typeLabel: "社會觀察",
    title: "習得性無助",
    summary: "長期、不可控的失敗可能令人相信努力無用，說明過量挫折有時會削弱行動力。",
    usage: "反面例證：駁斥「挫折必然使人成長」。",
    match: 95,
  },
  {
    id: "mencius",
    type: "classic",
    typeLabel: "文化典故",
    title: "孟子論困心衡慮",
    summary: "「困於心，衡於慮，而後作」強調困境令人警醒、奮發，但重點仍在其後的「作」。",
    usage: "引用論證：古典語句與個人分析結合。",
    match: 93,
  },
  {
    id: "saiweng",
    type: "classic",
    typeLabel: "文化典故",
    title: "塞翁失馬",
    summary: "禍福可以互相轉化，提醒人不要在一刻的得失中下定論，重點是如何理解遭遇。",
    usage: "辯證分析：挫折的意義並非固定不變。",
    match: 88,
  },
  {
    id: "sports-injury",
    type: "people",
    typeLabel: "人物事例",
    title: "運動員傷患復健",
    summary: "傷患令運動員暫離賽場；循序復健、重建技術與心理，才可能以更成熟的姿態回歸。",
    usage: "類比論證：復原過程比受傷本身更值得寫。",
    match: 90,
  },
];

const techniques = [
  { id: "contrast", icon: "比", title: "正反對比", description: "並置成長與沉淪兩種回應，突出選擇的重要。" },
  { id: "scene", icon: "景", title: "場景描寫", description: "以失敗一刻的動作、聲音與心理，增強感染力。" },
  { id: "quote", icon: "引", title: "引用論證", description: "引用精準，並以自己的話解釋它如何支持觀點。" },
  { id: "metaphor", icon: "喻", title: "比喻說理", description: "把挫折比作磨刀石或裂縫，化抽象為具體。" },
  { id: "question", icon: "問", title: "設問推進", description: "在段首提出關鍵問題，引領讀者跟隨思路。" },
  { id: "parallel", icon: "排", title: "排比收束", description: "於結尾凝聚多層意義，形成有力而克制的節奏。" },
];

const ideaText = {
  a: "挫折本身不是成長的保證，真正的成長來自反思、調整與再次行動",
  b: "人的回應決定挫折的意義，同一困境既可成為絆腳石，也可成為踏腳石",
  c: "適度挫折有助建立韌性，讓人認識限制並突破自己",
  d: "成長也需要支持與選擇，社會不應把一切苦難浪漫化",
  e: "順境與逆境都能成為養分，持續自省才是成長的核心",
};

const labels = {
  genres: { narrative: "記敍抒情", argumentative: "論說文" },
  stances: { agree: "同意", disagree: "反對", conditional: "視乎情況而論" },
};

function displayGenreLabel(value) {
  if (['記敍文', '記敘文', '記敘抒情', '记叙文'].includes(value)) return labels.genres.narrative;
  if (['議論文', '议论文'].includes(value)) return labels.genres.argumentative;
  return value;
}

const stepMeta = [
  { name: "審題立意", next: "下一步：選取材料", tip: "先圈出限制範圍的詞，再判斷題目真正要求。" },
  { name: "選取材料", next: "下一步：結構與表達", tip: "好材料必須服務立意；例子之後的分析，比故事長短更重要。" },
  { name: "結構與表達", next: "生成完整寫前指導", tip: "一段集中處理一個任務，段與段之間要看得見推進。" },
  { name: "完整指導", next: "回到第一步", tip: "藍圖不是框死文章，而是讓你落筆時更有方向。" },
];

const defaults = {
  currentStep: 1,
  topic: "「有人認為，經歷挫折能使人成長。」試就這個看法，寫作一篇文章，談談你的看法。",
  keywords: ["經歷挫折", "成長"],
  genre: "argumentative",
  stance: "conditional",
  ideas: ["a", "b"],
  selectedMaterials: ["personal-debate", "growth-mindset", "learned-helplessness"],
  techniques: ["contrast", "metaphor", "question"],
  filter: "all",
};

function normalizeWritingDraft(draft) {
  const next = { ...draft };
  const requested = [1, 2, 3, 4].includes(Number(next.currentStep)) ? Number(next.currentStep) : 1;
  const analyzed = next.topic?.trim() === defaults.topic && next.keywords?.length && next.ideas?.length;
  const maxStep = analyzed ? (next.selectedMaterials?.length >= 2 ? 4 : 2) : 1;
  next.currentStep = Math.min(requested, maxStep);
  next.furthest = Math.max(1, Math.min(Number(next.furthest) || next.currentStep, maxStep));
  return next;
}

let state = loadState();
let toastTimer;

const els = {
  panels: [...document.querySelectorAll("[data-step-panel]")],
  navItems: [...document.querySelectorAll("[data-go-step]")],
  dots: [...document.querySelectorAll("#stepDots span")],
  topic: document.querySelector("#topicInput"),
  thesis: document.querySelector("#thesisText"),
  thesisTags: document.querySelector("#thesisTags"),
  materialGrid: document.querySelector("#materialGrid"),
  techniqueGrid: document.querySelector("#techniqueGrid"),
  outlineList: document.querySelector("#outlineList"),
  back: document.querySelector("#backButton"),
  next: document.querySelector("#nextButton"),
  toast: document.querySelector("#toast"),
  saveState: document.querySelector("#saveState"),
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("dseWritingGuideState"));
    return normalizeWritingDraft({ ...defaults, ...stored });
  } catch {
    return { ...defaults };
  }
}

function reloadStateFromStorage() {
  state = loadState();
  syncInputsFromState();
  updateThesis();
  goToStep(state.currentStep || 1, true);
}

function persist() {
  els.saveState.classList.add("is-saving");
  els.saveState.lastChild.textContent = " 儲存中…";
  localStorage.setItem("dseWritingGuideState", JSON.stringify(state));
  window.setTimeout(() => {
    els.saveState.classList.remove("is-saving");
    els.saveState.lastChild.textContent = " 已自動儲存";
  }, 350);
}

function syncInputsFromState() {
  els.topic.value = state.topic;
  document.querySelectorAll('input[name="keywords"]').forEach((input) => {
    input.checked = state.keywords.includes(input.value);
  });
  document.querySelectorAll('input[name="genre"]').forEach((input) => {
    input.checked = input.value === state.genre;
  });
  document.querySelectorAll('input[name="stance"]').forEach((input) => {
    input.checked = input.value === state.stance;
  });
  document.querySelectorAll('input[name="ideas"]').forEach((input) => {
    input.checked = state.ideas.includes(input.value);
  });
}

function getThesis(draft = state) {
  const selectedIdeas = draft.ideas.map((id) => ideaText[id]).filter(Boolean);
  if (!selectedIdeas.length) return "請先選擇一項中心思想，建立清晰的文章立意。";

  const stanceLead = {
    agree: "本文認同挫折能促人成長，並主張",
    disagree: "本文不認同挫折必然帶來成長，並指出",
    conditional: "本文將辯證地指出：挫折能否使人成長，視乎人如何回應；",
  }[draft.stance];

  if (!stanceLead) return "請先選擇立場，再整理文章立意。";

  return `${stanceLead}${selectedIdeas.slice(0, 2).join("；而且")}。`;
}

function updateThesis() {
  const thesis = getThesis();
  els.thesis.textContent = thesis;
  document.querySelector("#materialThesis").textContent = thesis;
  els.thesisTags.innerHTML = [labels.genres[state.genre], labels.stances[state.stance], ...state.keywords.slice(0, 3)]
    .map((tag) => `<span>${tag}</span>`)
    .join("");
}

function renderMaterials() {
  const visible = materials.filter((item) => state.filter === "all" || item.type === state.filter);
  els.materialGrid.innerHTML = visible
    .map((item) => {
      const selected = state.selectedMaterials.includes(item.id);
      return `
        <article class="material-card${selected ? " is-selected" : ""}" tabindex="0" role="checkbox" aria-checked="${selected}" data-material-id="${item.id}">
          <div class="material-card-head">
            <span class="material-type">${item.typeLabel}</span>
            <span class="material-match">立意匹配 ${item.match}%</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <span class="material-usage">用法｜${item.usage}</span>
          <span class="material-select" aria-hidden="true">✓</span>
        </article>`;
    })
    .join("");

  document.querySelector("#materialCount").textContent = state.selectedMaterials.length;
  const selected = materials.filter((item) => state.selectedMaterials.includes(item.id));
  document.querySelector("#selectedMiniList").innerHTML = selected.length
    ? selected.map((item) => `<span>${item.title}</span>`).join("")
    : "<span>尚未選擇</span>";

  const advice = document.querySelector("#selectionAdvice");
  if (selected.length < 2) advice.textContent = "至少選 2 項材料，才能形成較完整的論證。";
  else if (selected.length <= 4) advice.textContent = "數量合適。留意材料角度是否互補，並深入分析。";
  else advice.textContent = "材料較多；建議保留最有代表性的 3–4 項，以免文章失焦。";
}

function buildOutline(draft = state, selectedItems) {
  const chosen = selectedItems ?? materials.filter((item) => draft.selectedMaterials.includes(item.id));
  const examples = chosen.length ? chosen : materials.slice(0, 3);
  if (draft.genre === "narrative") {
    const main = examples.find((item) => item.type === "personal") || examples[0];
    const support = examples.find((item) => item.id !== main?.id) || main;
    return [
      { label: "開端", role: "設定情境", text: `以「${main?.title || "一次挫折"}」的一個具體瞬間開場，交代目標、人物與當時的期待。` },
      { label: "發展", role: "呈現受挫", text: `集中描寫失敗發生時的動作、聲音與心理變化，不急於說理，讓讀者先感受衝擊。` },
      { label: "轉折", role: "反思契機", text: `由「${support?.title || "身邊的提醒"}」帶出新的理解：挫折不會自動令人改變，必須看見問題並作出選擇。` },
      { label: "高潮", role: "再次行動", text: `寫出重新嘗試時採取的具體調整，並以結果或細節呈現人物真正的成長。` },
      { label: "結尾", role: "回望昇華", text: "回扣題目，以今日的眼光重看那次經歷：成長不在跌倒本身，而在跌倒之後如何站起來。" },
    ];
  }
  const body = examples.slice(0, 3).map((item, index) => {
    const conditional = /條件|辯證|並非/.test(item.usage);
    const negative = !conditional && /反面|駁斥|削弱|不應/.test(item.usage);
    return {
      label: `第${["一", "二", "三"][index]}段`,
      role: negative ? "反面論證" : conditional ? "條件分析" : index === 0 ? "正面論證" : "補充論證",
      text: `以「${item.title}」為材料，${item.usage.replace(/^[^：]+：/, "")}並回扣「人的回應如何改變挫折的意義」。`,
    };
  });
  return [
    {
      label: "開首",
      role: "破題定義",
      text: `由「挫折是否必然等於成長」的疑問切入，界定成長不只是經歷困難，而是認知與行動有所改變。`,
    },
    ...body,
    {
      label: "結尾",
      role: "回扣昇華",
      text: "重申挫折只是契機而非答案；決定人成為甚麼模樣的，是回應挫折時作出的選擇。",
    },
  ];
}

function renderOutline() {
  const outline = buildOutline();
  els.outlineList.innerHTML = outline
    .map(
      (item, index) => `
        <article class="outline-item">
          <span class="outline-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="outline-copy"><strong>${item.label}</strong><p>${item.text}</p></div>
          <span class="outline-role">${item.role}</span>
        </article>`,
    )
    .join("");
}

function renderTechniques() {
  els.techniqueGrid.innerHTML = techniques
    .map((item) => {
      const selected = state.techniques.includes(item.id);
      return `
        <label class="technique-card${selected ? " is-selected" : ""}">
          <input type="checkbox" value="${item.id}" ${selected ? "checked" : ""} />
          <span class="technique-icon">${item.icon}</span>
          <strong>${item.title}</strong>
          <small>${item.description}</small>
          <span class="technique-check">✓</span>
        </label>`;
    })
    .join("");
}

function renderFinal() {
  const recordStatus=document.getElementById("pcRecordStatus");
  if(recordStatus)recordStatus.textContent="";
  const thesis = getThesis();
  const selected = materials.filter((item) => state.selectedMaterials.includes(item.id));
  const selectedTechniques = techniques.filter((item) => state.techniques.includes(item.id));
  const outline = buildOutline();

  document.querySelector("#sheetDate").textContent = new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  document.querySelector("#finalTopic").textContent = state.topic;
  document.querySelector("#finalKeywords").textContent = state.keywords.join("、") || "尚未選擇";
  document.querySelector("#finalGenre").textContent = labels.genres[state.genre];
  document.querySelector("#finalStance").textContent = labels.stances[state.stance];
  document.querySelector("#finalThesis").textContent = thesis;
  document.querySelector("#finalMaterialCount").textContent = `共 ${selected.length} 項`;
  document.querySelector("#finalMaterials").innerHTML = selected.length
    ? selected.map((item) => `<div class="final-material-item"><strong>${item.title}</strong><span>${item.usage}</span></div>`).join("")
    : '<div class="final-material-item"><strong>尚未選材</strong><span>返回第二步選擇合適材料。</span></div>';
  document.querySelector("#finalOutline").innerHTML = outline
    .map((item, index) => `<div class="final-outline-item"><b>${String(index + 1).padStart(2, "0")}</b><strong>${item.label}</strong><p>${item.text}</p></div>`)
    .join("");
  document.querySelector("#finalTechniques").innerHTML = selectedTechniques.length
    ? selectedTechniques.map((item) => `<span>${item.title}｜${item.description}</span>`).join("")
    : "<span>以準確、自然的語言完成文章</span>";
}

function validateStep(step) {
  if (step === 1) {
    if (!state.topic.trim()) return showToast("請先輸入作文題目。"), false;
    if (state.topic.trim() !== defaults.topic) return showToast("暫時未能取得這個題目的審題結果。題目已保留。"), false;
    if (!state.keywords.length) return showToast("請至少選擇一個題目關鍵詞。"), false;
    if (!state.ideas.length) return showToast("請至少選擇一項中心思想。"), false;
  }
  if (step === 2 && state.selectedMaterials.length < 2) {
    showToast("請至少選擇兩項材料，讓論證更完整。"), false;
    return false;
  }
  return true;
}

function goToStep(step, bypassValidation = false) {
  if (!bypassValidation && step > state.currentStep && !validateStep(state.currentStep)) return;
  const nextStep = Math.max(1, Math.min(4, step));
  state.currentStep = nextStep;

  els.panels.forEach((panel) => {
    const active = Number(panel.dataset.stepPanel) === nextStep;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
  els.navItems.forEach((item) => {
    const itemStep = Number(item.dataset.goStep);
    item.classList.toggle("is-active", itemStep === nextStep);
    item.classList.toggle("is-complete", itemStep < nextStep);
    if (itemStep === nextStep) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  els.dots.forEach((dot, index) => dot.classList.toggle("is-active", index === nextStep - 1));

  els.back.disabled = nextStep === 1;
  els.next.querySelector("span").textContent = stepMeta[nextStep - 1].next;
  document.querySelector("#mobileStepLabel").textContent = `步驟 ${nextStep}／4`;
  document.querySelector("#mobileStepName").textContent = stepMeta[nextStep - 1].name;
  document.querySelector("#progressBar").style.width = `${nextStep * 25}%`;
  document.querySelector("#coachTip").textContent = stepMeta[nextStep - 1].tip;

  if (nextStep === 2) renderMaterials();
  if (nextStep === 3) {
    renderOutline();
    renderTechniques();
  }
  if (nextStep === 4) renderFinal();

  persist();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2300);
}

function handleChoiceChange(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.name?.startsWith("pad-")) return;

  if (input.name === "keywords") {
    state.keywords = [...document.querySelectorAll('input[name="keywords"]:checked')].map((item) => item.value);
  }
  if (input.name === "genre") state.genre = input.value;
  if (input.name === "stance") state.stance = input.value;
  if (input.name === "ideas") {
    state.ideas = [...document.querySelectorAll('input[name="ideas"]:checked')].map((item) => item.value);
  }
  updateThesis();
  persist();
}

function toggleMaterial(id) {
  if (state.selectedMaterials.includes(id)) {
    state.selectedMaterials = state.selectedMaterials.filter((item) => item !== id);
  } else {
    state.selectedMaterials = [...state.selectedMaterials, id];
  }
  renderMaterials();
  persist();
}

function buildGuideText(draft = state) {
  const selected = materials.filter((item) => draft.selectedMaterials.includes(item.id));
  const selectedTechniques = techniques.filter((item) => draft.techniques.includes(item.id));
  const outline = buildOutline(draft);
  return [
    "DSE 中文作文｜寫前指導",
    "",
    `題目：${draft.topic}`,
    `關鍵詞：${draft.keywords.join("、")}`,
    `文體：${labels.genres[draft.genre]}`,
    `立場：${labels.stances[draft.stance]}`,
    `中心立意：${getThesis(draft)}`,
    "",
    "核心材料：",
    ...selected.map((item, index) => `${index + 1}. ${item.title}——${item.usage}`),
    "",
    "寫作大綱：",
    ...outline.map((item, index) => `${index + 1}. ${item.label}｜${item.text}`),
    "",
    `表達策略：${selectedTechniques.map((item) => item.title).join("、") || "準確自然"}`,
  ].join("\n");
}

document.addEventListener("change", handleChoiceChange);

els.topic.addEventListener("input", () => {
  state.topic = els.topic.value;
  persist();
});

els.navItems.forEach((item) => {
  item.addEventListener("click", () => goToStep(Number(item.dataset.goStep)));
});

els.back.addEventListener("click", () => goToStep(state.currentStep - 1, true));
els.next.addEventListener("click", () => {
  if (state.currentStep === 4) goToStep(1, true);
  else goToStep(state.currentStep + 1);
});

document.querySelector("#materialFilters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderMaterials();
  persist();
});

els.materialGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-material-id]");
  if (card) toggleMaterial(card.dataset.materialId);
});

els.materialGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-material-id]");
  if (!card) return;
  event.preventDefault();
  toggleMaterial(card.dataset.materialId);
});

els.techniqueGrid.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  state.techniques = [...els.techniqueGrid.querySelectorAll("input:checked")].map((item) => item.value);
  renderTechniques();
  persist();
});

document.querySelector("#refreshOutline").addEventListener("click", () => {
  renderOutline();
  showToast("大綱已根據目前材料更新。");
});

document.querySelector("#resetButton").addEventListener("click", () => {
  const shouldReset = window.confirm("確定要清除目前選擇並重新開始嗎？");
  if (!shouldReset) return;
  state = { ...defaults };
  syncInputsFromState();
  updateThesis();
  renderMaterials();
  renderOutline();
  renderTechniques();
  goToStep(1, true);
  showToast("已恢復示例內容。");
});

document.querySelector("#copyGuideButton").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildGuideText());
    showToast("完整寫前指導已複製。");
  } catch {
    showToast("瀏覽器未允許複製，請使用列印功能。");
  }
});

document.querySelector("#printGuideButton").addEventListener("click", () => window.print());
window.addEventListener("previewview", event => { if (event.detail === "student") reloadStateFromStorage(); });

syncInputsFromState();
updateThesis();
renderMaterials();
renderOutline();
renderTechniques();
goToStep(state.currentStep, true);

const modeTabs = document.querySelectorAll(".mode-tab");
const modeViews = document.querySelectorAll(".mode-view");
const sideSubs = document.querySelectorAll("[data-web-page]");
const sideSections = document.querySelectorAll("[data-menu-section]");
const webPages = document.querySelectorAll(".web-page");
const rankTabs = document.querySelectorAll(".rank-tab");
const rankTitle = document.querySelector("[data-rank-title]");
const rankMetric = document.querySelector("[data-rank-metric]");
const rankBody = document.querySelector("[data-rank-body]");
const appLinks = document.querySelectorAll("[data-app-page]");
const appScreens = document.querySelectorAll(".app-screen");
const appRankTabs = document.querySelectorAll(".app-rank-tab");
const viewToggles = document.querySelectorAll("[data-rank-view]");
const rankViewPanels = document.querySelectorAll("[data-rank-view-panel]");
const permissionName = document.querySelector("[data-permission-name]");
const leaderboardList = document.querySelector("[data-leaderboard-list]");
const chartBars = document.querySelector("[data-chart-bars]");
const chartTitle = document.querySelector("[data-chart-title]");
const rankFocusMetric = document.querySelector("[data-rank-focus-metric]");
const rankFocusValue = document.querySelector("[data-rank-focus-value]");
const taskWebRankTabs = document.querySelectorAll("[data-task-web-rank-tab]");
const taskWebRankTitle = document.querySelector("[data-task-web-rank-title]");
const taskWebRankMetric = document.querySelector("[data-task-web-rank-metric]");
const taskWebRankBody = document.querySelector("[data-task-web-rank-body]");
const taskWebPermissionName = document.querySelector("[data-task-web-permission-name]");
const taskWebYearFilter = document.querySelector("[data-task-web-year-filter]");
const taskWebTimeFilter = document.querySelector("[data-task-web-time-filter]");
const taskWebGradeFilter = document.querySelector("[data-task-web-grade-filter]");
const taskWebClassFilter = document.querySelector("[data-task-web-class-filter]");
const taskWebQuery = document.querySelector("[data-task-web-query]");
const taskWebReset = document.querySelector("[data-task-web-reset]");
const taskWebSort = document.querySelector("[data-task-web-sort]");
const taskWebSortIcon = document.querySelector("[data-task-web-sort-icon]");
const taskWebViewButtons = document.querySelectorAll("[data-task-web-view]");
const taskWebViewPanels = document.querySelectorAll("[data-task-web-view-panel]");
const taskWebGradeBoard = document.querySelector("[data-task-web-grade-board]");
const taskWebClassBoard = document.querySelector("[data-task-web-class-board]");
const taskWebClassWarning = document.querySelector("[data-task-web-class-warning]");
const taskWebExport = document.querySelector("[data-task-web-export]");
const taskStudentVisibleInput = document.querySelector("[data-task-student-visible]");
const rankingTabs = document.querySelectorAll("[data-ranking-tab]");
const rankingPanels = document.querySelectorAll("[data-ranking-panel]");
const practiceWebRankTabs = document.querySelectorAll("[data-practice-web-rank-tab]");
const practiceWebRankTitle = document.querySelector("[data-practice-web-rank-title]");
const practiceWebRankMetric = document.querySelector("[data-practice-web-rank-metric]");
const practiceWebRankBody = document.querySelector("[data-practice-web-rank-body]");
const practiceWebYearFilter = document.querySelector("[data-practice-web-year-filter]");
const practiceWebTimeFilter = document.querySelector("[data-practice-web-time-filter]");
const practiceWebGradeFilter = document.querySelector("[data-practice-web-grade-filter]");
const practiceWebClassFilter = document.querySelector("[data-practice-web-class-filter]");
const practiceWebQuery = document.querySelector("[data-practice-web-query]");
const practiceWebReset = document.querySelector("[data-practice-web-reset]");
const practiceWebSort = document.querySelector("[data-practice-web-sort]");
const practiceWebSortIcon = document.querySelector("[data-practice-web-sort-icon]");
const practiceWebViewButtons = document.querySelectorAll("[data-practice-web-view]");
const practiceWebViewPanels = document.querySelectorAll("[data-practice-web-view-panel]");
const practiceWebGradeBoard = document.querySelector("[data-practice-web-grade-board]");
const practiceWebClassBoard = document.querySelector("[data-practice-web-class-board]");
const practiceWebClassWarning = document.querySelector("[data-practice-web-class-warning]");
const practiceWebExport = document.querySelector("[data-practice-web-export]");
const practiceStudentVisibleInput = document.querySelector("[data-practice-student-visible]");
const appRankTitle = document.querySelector("[data-app-rank-title]");
const appRankPosition = document.querySelector("[data-app-rank-position]");
const appRankCopy = document.querySelector("[data-app-rank-copy]");
const appPodium = document.querySelector("[data-app-podium]");
const appRankList = document.querySelector("[data-app-rank-list]");
const modalLayer = document.querySelector(".modal-layer");
const modalTitle = document.querySelector("[data-modal-title]");
const modalBody = document.querySelector("[data-modal-body]");
const modalFooter = document.querySelector(".modal-card footer");
const modalCancelButton = document.querySelector(".modal-card footer .ghost-btn");
const modalConfirmButton = document.querySelector(".modal-card footer .primary-btn");
let datePickerLayer;
let datePickerState = {
  input: null,
  viewDate: null,
  selectedDate: null
};
const bottomNavButtons = document.querySelectorAll(".app-bottom-nav [data-app-page]");
const taskScopeTabs = document.querySelectorAll("[data-task-scope]");
const taskMetricTabs = document.querySelectorAll("[data-task-metric]");
const taskPeriodTabs = document.querySelectorAll("[data-task-period]");
const taskRankHeading = document.querySelector("[data-task-rank-heading]");
const taskRankPage = document.querySelector("#app-ranking .task-rank-page");
const taskPodium = document.querySelector("[data-task-podium]");
const taskMyCard = document.querySelector("#app-ranking .task-my-rank");
const taskMyRank = document.querySelector("[data-task-my-rank]");
const taskMyName = document.querySelector("[data-task-my-name]");
const taskMyLabel = document.querySelector("[data-task-my-label]");
const taskMyValue = document.querySelector("[data-task-my-value]");
const taskMyAvatar = document.querySelector(".task-my-rank .rank-avatar");
const taskMyTrend = document.querySelector("[data-task-my-trend]");
const taskRankList = document.querySelector("[data-task-rank-list]");
const practiceScopeTabs = document.querySelectorAll("[data-practice-scope]");
const practiceScopeDropdown = document.querySelector("[data-practice-scope-dropdown]");
const practiceScopeToggle = document.querySelector("[data-practice-scope-toggle]");
const practiceScopeLabel = document.querySelector("[data-practice-scope-label]");
const practiceScopeOptions = document.querySelectorAll("[data-practice-scope-option]");
const practiceMetricTabs = document.querySelectorAll("[data-practice-metric]");
const practicePeriodTabs = document.querySelectorAll("[data-practice-period]");
const practicePeriodMore = document.querySelector("[data-practice-period-more]");
const practiceRankPage = document.querySelector(".practice-rank-page");
const practicePodium = document.querySelector("[data-practice-podium]");
const practiceMyRank = document.querySelector("[data-practice-my-rank]");
const practiceMyValue = document.querySelector("[data-practice-my-value]");
const practiceMyAvatar = document.querySelector("#app-practice-ranking .task-my-rank .rank-avatar");
const practiceMyTrend = document.querySelector("[data-practice-my-trend]");
const practiceRankList = document.querySelector("[data-practice-rank-list]");
const devWebButtons = document.querySelectorAll("[data-dev-web-page]");
const devAppButtons = document.querySelectorAll("[data-dev-app-page]");
const devModalButtons = document.querySelectorAll("[data-dev-modal]");
const practiceRankEntryButtons = document.querySelectorAll(".stat-rank[data-app-page='practice-ranking']");
const yearListFilter = document.querySelector("[data-year-list-filter]");
const yearListQuery = document.querySelector("[data-year-list-query]");
const yearListReset = document.querySelector("[data-year-list-reset]");
const yearListBody = document.querySelector("[data-year-list-body]");
const termListYearFilter = document.querySelector("[data-term-list-year-filter]");
const termListTermFilter = document.querySelector("[data-term-list-term-filter]");
const termListQuery = document.querySelector("[data-term-list-query]");
const termListReset = document.querySelector("[data-term-list-reset]");
const termListBody = document.querySelector("[data-term-list-body]");
const upgradeStepButtons = document.querySelectorAll("[data-upgrade-step-nav]");
const upgradePanels = document.querySelectorAll("[data-upgrade-panel]");
const upgradeUploadBox = document.querySelector("[data-upgrade-upload-box]");
const upgradeFile = document.querySelector("[data-upgrade-file]");
const upgradeFileTrigger = document.querySelector("[data-upgrade-file-trigger]");
const upgradeFileName = document.querySelector("[data-upgrade-file-name]");
const upgradeFileStatus = document.querySelector("[data-upgrade-file-status]");
const upgradeNext = document.querySelector("[data-upgrade-next]");
const upgradePrevButtons = document.querySelectorAll("[data-upgrade-prev]");
const upgradeConfirmButtons = document.querySelectorAll("[data-upgrade-confirm]");

const taskRankState = {
  scope: "class",
  metric: "finish",
  period: "week"
};

const practiceRankState = {
  scope: "class",
  metric: "task-score",
  period: "week"
};

const taskWebRankState = {
  metric: "score",
  sort: "asc",
  view: "table",
  rows: [],
  year: "2025-2026學年",
  time: "本週",
  title: "任務總分排行榜",
  metricLabel: "任務總分",
  studentVisible: false
};

const webRankingState = {
  tab: "task"
};

const webRankManagedClasses = ["S1 A班", "S1 B班", "S2 B班"];

const upgradeImportState = {
  step: 1,
  maxStep: 1,
  fileReady: false
};

const upgradePrimaryGrades = ["P1", "P2", "P3", "P4", "P5", "P6", "S1", "S2", "S3", "S4", "S5", "S6"];
const upgradeStudentDefaultPageSize = 10;
const upgradeStudentPageSizeOptions = [10, 20, 30, 40, 50];

const upgradeSelectOptions = {
  "學年": ["2024-2025學年", "2025-2026學年", "2026-2027學年", "2027-2028學年"],
  "年級": upgradePrimaryGrades,
  "權限安排": ["管理員(科主任)", "老師"],
  "國家/地區區號": ["+852", "+86"],
  "開啟管理員（科主任）-管理學生權限": ["開啟", "關閉"],
  "老師角色": ["管理員(科主任)", "教學老師"],
  "性別": ["男", "女"]
};

const upgradeErrorPanelByType = {
  teacher: "2",
  class: "3",
  classTeacher: "4",
  student: "5"
};

const upgradeTeacherErrorRows = [
  ["4", "王老師", "老師", "chendawen@test.com", "wang123456", "wang@test.com", "+852", "91230000", "未通過", "第 4 行錯誤：登入用戶名已存在"],
  ["5", "", "老師", "teacher5@test.com", "teacher5123", "teacher5@test.com", "+852", "92345678", "未通過", "第 5 行錯誤：必填項「老師姓名」為空"]
];

const upgradeClassErrorRows = [
  ["2026-2027學年", "P1", "1A", "開啟", "未通過", "第 4 行錯誤：同一學年同一年級下班別已存在"],
  ["2026-2027學年", "P2", "", "關閉", "未通過", "第 5 行錯誤：必填項「班別」為空"]
];

const upgradeClassTeacherErrorRows = [
  ["2026-2027學年", "P2", "1A", "教學老師", "T004", "李六", "未通過", "第 5 行錯誤：未在系統或前序導入數據中找到班級「P2 1A」"]
];

const upgradeStudentErrorRows = [
  ["4", "P2", "2A", "1", "黃同學", "Wong", "wong01", "S7654321", "女", "未通過", "第 5 行錯誤：未找到班級「P2 2A」"]
];

const practiceWebRankState = {
  metric: "score",
  sort: "asc",
  view: "table",
  rows: [],
  year: "2025-2026學年",
  time: "本週",
  title: "練習總分排行榜",
  metricLabel: "練習總分",
  studentVisible: false
};

const webMenuActiveMap = {
  "task-rank": "rankings",
  "practice-rank": "rankings"
};

const rankData = {
  finish: { title: "任務完成總數", metric: "完成數", values: [138, 126, 119, 104, 98, 88] },
  score: { title: "任務總分", metric: "總分", values: [3860, 3580, 3420, 3310, 3108, 2980] },
  voice: { title: "語音評測完成數", metric: "完成數", values: [38, 35, 31, 28, 26, 22] },
  dialog: { title: "場景對話完成數", metric: "完成數", values: [26, 24, 21, 19, 17, 15] },
  listen: { title: "聆聽與拼音完成數", metric: "完成數", values: [44, 39, 32, 26, 22, 20] },
  speech: { title: "個人短講完成數", metric: "完成數", values: [17, 15, 14, 12, 10, 8] },
  picture: { title: "看圖說話完成數", metric: "完成數", values: [19, 16, 15, 14, 12, 9] },
  writing: { title: "作文完成數", metric: "完成數", values: [12, 11, 9, 8, 7, 6] },
  dse: { title: "DSE-作文排行榜", metric: "得分", values: [94, 91, 88, 86, 82, 79] },
  exam: { title: "綜合評測排行榜", metric: "得分", values: [96, 94, 92, 89, 86, 84] }
};

const taskWebFinishRows = [
  { gradeRank: 1, classRank: 1, name: "李同學", no: "S1001", grade: "S1", className: "S1 A班", value: 138 },
  { gradeRank: 2, classRank: 2, name: "張曉剛", no: "S1002", grade: "S1", className: "S1 A班", value: 126 },
  { gradeRank: 3, classRank: 1, name: "林同學", no: "S1004", grade: "S1", className: "S1 B班", value: 119 },
  { gradeRank: 4, classRank: 3, name: "陳同學", no: "S1003", grade: "S1", className: "S1 A班", value: 104 },
  { gradeRank: 5, classRank: 2, name: "黃同學", no: "S1005", grade: "S1", className: "S1 B班", value: 98 },
  { gradeRank: 6, classRank: 3, name: "張同學", no: "S1006", grade: "S1", className: "S1 B班", value: 87 },
  { gradeRank: 7, classRank: 4, name: "王同學", no: "S1007", grade: "S1", className: "S1 B班", value: 72 },
  { gradeRank: 8, classRank: 4, name: "何同學", no: "S1008", grade: "S1", className: "S1 A班", value: 61 },
  { gradeRank: 9, classRank: 5, name: "周同學", no: "S1009", grade: "S1", className: "S1 B班", value: 54 },
  { gradeRank: 10, classRank: 5, name: "吳同學", no: "S1010", grade: "S1", className: "S1 A班", value: 48 },
  { gradeRank: 11, classRank: 6, name: "鄭同學", no: "S1011", grade: "S1", className: "S1 A班", value: 46 },
  { gradeRank: 12, classRank: 6, name: "梁同學", no: "S1012", grade: "S1", className: "S1 B班", value: 45 },
  { gradeRank: 13, classRank: 7, name: "劉同學", no: "S1013", grade: "S1", className: "S1 A班", value: 43 },
  { gradeRank: 14, classRank: 7, name: "許同學", no: "S1014", grade: "S1", className: "S1 B班", value: 42 },
  { gradeRank: 15, classRank: 8, name: "馬同學", no: "S1015", grade: "S1", className: "S1 A班", value: 40 },
  { gradeRank: 16, classRank: 8, name: "羅同學", no: "S1016", grade: "S1", className: "S1 B班", value: 39 },
  { gradeRank: 17, classRank: 9, name: "謝同學", no: "S1017", grade: "S1", className: "S1 A班", value: 37 },
  { gradeRank: 18, classRank: 9, name: "曾同學", no: "S1018", grade: "S1", className: "S1 B班", value: 36 },
  { gradeRank: 19, classRank: 10, name: "葉同學", no: "S1019", grade: "S1", className: "S1 A班", value: 35 },
  { gradeRank: 20, classRank: 10, name: "郭同學", no: "S1020", grade: "S1", className: "S1 B班", value: 34 },
  { gradeRank: 21, classRank: 11, name: "蔡同學", no: "S1021", grade: "S1", className: "S1 A班", value: 33 },
  { gradeRank: 22, classRank: 11, name: "潘同學", no: "S1022", grade: "S1", className: "S1 B班", value: 32 },
  { gradeRank: 23, classRank: 12, name: "方同學", no: "S1023", grade: "S1", className: "S1 A班", value: 31 },
  { gradeRank: 24, classRank: 12, name: "杜同學", no: "S1024", grade: "S1", className: "S1 B班", value: 30 },
  { gradeRank: 25, classRank: 13, name: "蕭同學", no: "S1025", grade: "S1", className: "S1 A班", value: 29 },
  { gradeRank: 26, classRank: 13, name: "唐同學", no: "S1026", grade: "S1", className: "S1 B班", value: 28 },
  { gradeRank: 27, classRank: 14, name: "沈同學", no: "S1027", grade: "S1", className: "S1 A班", value: 27 },
  { gradeRank: 28, classRank: 14, name: "姚同學", no: "S1028", grade: "S1", className: "S1 B班", value: 26 },
  { gradeRank: 29, classRank: 15, name: "余同學", no: "S1029", grade: "S1", className: "S1 A班", value: 25 },
  { gradeRank: 30, classRank: 15, name: "袁同學", no: "S1030", grade: "S1", className: "S1 B班", value: 24 },
  { gradeRank: 5, classRank: 2, name: "王同學", no: "S2001", grade: "S2", className: "S2 B班", value: 98 },
  { gradeRank: 6, classRank: 1, name: "趙同學", no: "P1001", grade: "P1", className: "P1 A班", value: 88 }
];

const webGradeRankChanges = [
  1, -1, null, -1, 1, 0, 2, -2, null, 1,
  -1, 0, 2, -1, 1, null, -2, 1, 0, -1,
  1, null, -1, 2, 0, -2, 1, -1, null, 1
];

const webClassRankChanges = [
  -1, 1, null, 2, -2, 0, 1, -1, null, 2,
  0, -1, 1, null, -2, 2, 0, 1, -1, null
];

function applyWebRankChanges(rows, gradeOffset = 0, classOffset = 0) {
  rows.forEach((item, index) => {
    item.gradeRankChange = webGradeRankChanges[(index + gradeOffset) % webGradeRankChanges.length];
    item.classRankChange = webClassRankChanges[(index + classOffset) % webClassRankChanges.length];
    item.rankChange = item.gradeRankChange;
  });
}

applyWebRankChanges(taskWebFinishRows);

const scoreStudentNames = [
  "李同學", "張曉剛", "林同學", "陳同學", "黃同學", "張同學", "王同學", "何同學", "周同學", "吳同學",
  "鄭同學", "梁同學", "劉同學", "許同學", "馬同學", "羅同學", "謝同學", "曾同學", "葉同學", "郭同學",
  "蔡同學", "潘同學", "方同學", "杜同學", "蕭同學", "唐同學", "沈同學", "姚同學", "余同學", "袁同學",
  "馮同學", "龔同學", "邱同學", "蔣同學", "傅同學", "盧同學", "鍾同學", "黎同學", "賴同學", "康同學"
];

const taskWebScoreRows = Array.from({ length: 168 }, (_, index) => {
  const gradeRank = index + 1;
  const className = index % 2 === 0 ? "S1 A班" : "S1 B班";
  const classRank = Math.floor(index / 2) + 1;
  const baseScores = [3860, 3580, 3420, 3310, 3108, 2980, 2860, 2740, 2685, 2610];
  const value = baseScores[index] || Math.max(880, 2600 - (index - 9) * 11);
  return {
    gradeRank,
    classRank,
    name: scoreStudentNames[index % scoreStudentNames.length],
    no: `S${String(1001 + index).padStart(4, "0")}`,
    grade: "S1",
    className,
    value
  };
});
taskWebScoreRows.push(
  { gradeRank: 1, classRank: 1, name: "王同學", no: "S2001", grade: "S2", className: "S2 B班", value: 3720 },
  { gradeRank: 2, classRank: 2, name: "何同學", no: "S2002", grade: "S2", className: "S2 B班", value: 3510 },
  { gradeRank: 3, classRank: 3, name: "周同學", no: "S2003", grade: "S2", className: "S2 B班", value: 3360 }
);

const taskWebRankData = {
  finish: {
    title: "完成總數排行榜",
    permission: "完成總數",
    metric: "完成總數",
    averageLabel: "平均完成數",
    rows: taskWebFinishRows,
    gradeStats: {
      "2025-2026學年": {
        S1: { inSchoolCount: 168, total: 15456 },
        S2: { inSchoolCount: 36, total: 98 }
      }
    }
  },
  score: {
    title: "任務總分排行榜",
    permission: "任務總分",
    metric: "任務總分",
    averageLabel: "平均任務總分",
    rows: taskWebScoreRows,
    gradeStats: {
      "2025-2026學年": {
        S1: { inSchoolCount: 168, total: taskWebScoreRows.filter((item) => item.grade === "S1").reduce((sum, item) => sum + item.value, 0) },
        S2: { inSchoolCount: 36, total: taskWebScoreRows.filter((item) => item.grade === "S2").reduce((sum, item) => sum + item.value, 0) }
      }
    }
  }
};

const practiceWebFinishRows = Array.from({ length: 168 }, (_, index) => {
  const gradeRank = index + 1;
  const className = index % 2 === 0 ? "S1 A班" : "S1 B班";
  const classRank = Math.floor(index / 2) + 1;
  const baseValues = [156, 148, 141, 136, 128, 122, 116, 110, 103, 96];
  const value = baseValues[index] || Math.max(18, 94 - (index - 9));
  return {
    gradeRank,
    classRank,
    name: scoreStudentNames[index % scoreStudentNames.length],
    no: `S${String(1001 + index).padStart(4, "0")}`,
    grade: "S1",
    className,
    value
  };
});
practiceWebFinishRows.push(
  { gradeRank: 1, classRank: 1, name: "王同學", no: "S2001", grade: "S2", className: "S2 B班", value: 142 },
  { gradeRank: 2, classRank: 2, name: "何同學", no: "S2002", grade: "S2", className: "S2 B班", value: 136 },
  { gradeRank: 3, classRank: 3, name: "周同學", no: "S2003", grade: "S2", className: "S2 B班", value: 128 }
);

const practiceWebScoreRows = Array.from({ length: 168 }, (_, index) => {
  const gradeRank = index + 1;
  const className = index % 2 === 0 ? "S1 A班" : "S1 B班";
  const classRank = Math.floor(index / 2) + 1;
  const baseScores = [4280, 4110, 3980, 3860, 3720, 3610, 3480, 3360, 3290, 3180];
  const value = baseScores[index] || Math.max(960, 3150 - (index - 9) * 13);
  return {
    gradeRank,
    classRank,
    name: scoreStudentNames[index % scoreStudentNames.length],
    no: `S${String(1001 + index).padStart(4, "0")}`,
    grade: "S1",
    className,
    value
  };
});
practiceWebScoreRows.push(
  { gradeRank: 1, classRank: 1, name: "王同學", no: "S2001", grade: "S2", className: "S2 B班", value: 4020 },
  { gradeRank: 2, classRank: 2, name: "何同學", no: "S2002", grade: "S2", className: "S2 B班", value: 3860 },
  { gradeRank: 3, classRank: 3, name: "周同學", no: "S2003", grade: "S2", className: "S2 B班", value: 3710 }
);

applyWebRankChanges(taskWebScoreRows, 3, 2);
applyWebRankChanges(practiceWebFinishRows, 5, 4);
applyWebRankChanges(practiceWebScoreRows, 7, 6);

const practiceWebRankData = {
  finish: {
    title: "完成總數排行榜",
    permission: "完成總數",
    metric: "完成總數",
    averageLabel: "平均完成數",
    rows: practiceWebFinishRows,
    gradeStats: {
      "2025-2026學年": {
        S1: { inSchoolCount: 168, total: practiceWebFinishRows.filter((item) => item.grade === "S1").reduce((sum, item) => sum + item.value, 0) },
        S2: { inSchoolCount: 36, total: practiceWebFinishRows.filter((item) => item.grade === "S2").reduce((sum, item) => sum + item.value, 0) }
      }
    }
  },
  score: {
    title: "練習總分排行榜",
    permission: "練習總分",
    metric: "練習總分",
    averageLabel: "平均練習總分",
    rows: practiceWebScoreRows,
    gradeStats: {
      "2025-2026學年": {
        S1: { inSchoolCount: 168, total: practiceWebScoreRows.filter((item) => item.grade === "S1").reduce((sum, item) => sum + item.value, 0) },
        S2: { inSchoolCount: 36, total: practiceWebScoreRows.filter((item) => item.grade === "S2").reduce((sum, item) => sum + item.value, 0) }
      }
    }
  }
};

const students = ["李同學", "張曉剛", "王同學", "陳同學", "趙同學", "黃同學"];
const currentAppStudentName = "張曉剛";
const schoolYears = ["2024-2025學年", "2025-2026學年", "2026-2027學年", "2027-2028學年"];
const schoolYearDateRanges = {
  "2024-2025學年": { start: "2024-09-01", end: "2025-08-31" },
  "2025-2026學年": { start: "2025-09-01", end: "2026-08-31" },
  "2026-2027學年": { start: "2026-09-01", end: "2027-08-31" },
  "2027-2028學年": { start: "2027-09-01", end: "2028-08-31" }
};
const currentSchoolYear = schoolYears.find((year) => {
  const range = schoolYearDateRanges[year];
  return getDateRangeStatus(range.start, range.end).label === "進行中";
}) || "2025-2026學年";
const schoolYearOptions = schoolYears.map((year) => `<option${year === currentSchoolYear ? " selected" : ""}>${year}</option>`).join("");
const schoolYearRecords = schoolYears.map((year) => ({
  year,
  start: schoolYearDateRanges[year].start,
  end: schoolYearDateRanges[year].end
}));
const termRecords = [
  { year: "2025-2026學年", term: "下學期", start: "2026-02-16", end: "2026-07-31" },
  { year: "2025-2026學年", term: "中學期", start: "2026-01-21", end: "2026-02-15" },
  { year: "2025-2026學年", term: "上學期", start: "2025-09-01", end: "2026-01-20" },
  { year: "2024-2025學年", term: "下學期", start: "2025-02-16", end: "2025-07-31" },
  { year: "2024-2025學年", term: "上學期", start: "2024-09-01", end: "2025-01-20" }
];
const taskPeriodConfig = {
  week: { label: "本週", multiplier: 1 },
  month: { label: "本月", multiplier: 1.42 },
  term: { label: "本學期", multiplier: 2.34 }
};
const taskRankData = {
  class: {
    heading: "班級排行榜",
    finish: {
      title: "任務完成總數",
      label: "完成數",
      unit: "",
      podium: [
        { rank: 1, name: "子朗", value: 1234, color: "orange" },
        { rank: 2, name: "曉晴", value: 1156, color: "blue" },
        { rank: 3, name: "嘉欣", value: 987, color: "coral" }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", mine: true },
        { rank: 5, name: "梓軒", value: 765, color: "orange" },
        { rank: 6, name: "思穎", value: 654, color: "green" },
        { rank: 7, name: "浩然", value: 543, color: "purple" },
        { rank: 8, name: "芷晴", value: 432, color: "coral" },
        { rank: 9, name: "家朗", value: 321, color: "blue" },
        { rank: 10, name: "穎彤", value: 210, color: "green" }
      ]
    },
    score: {
      title: "任務總分",
      label: "任務總得分",
      unit: "",
      podium: [
        { rank: 1, name: "梓軒", value: 1234, color: "orange" },
        { rank: 2, name: "嘉欣", value: 1156, color: "blue" },
        { rank: 3, name: "子朗", value: 987, color: "coral" }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", mine: true },
        { rank: 5, name: "曉晴", value: 765, color: "orange" },
        { rank: 6, name: "浩然", value: 654, color: "green" },
        { rank: 7, name: "穎彤", value: 543, color: "purple" },
        { rank: 8, name: "芷晴", value: 432, color: "coral" },
        { rank: 9, name: "卓賢", value: 321, color: "blue" },
        { rank: 10, name: "思穎", value: 210, color: "green" }
      ]
    }
  },
  grade: {
    heading: "年級排行榜",
    finish: {
      title: "任務完成總數",
      label: "完成數",
      unit: "",
      podium: [
        { rank: 1, name: "嘉欣", value: 1234, color: "orange" },
        { rank: 2, name: "子朗", value: 1156, color: "blue" },
        { rank: 3, name: "芷晴", value: 987, color: "coral" }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", mine: true },
        { rank: 5, name: "梓軒", value: 765, color: "orange" },
        { rank: 6, name: "思穎", value: 654, color: "green" },
        { rank: 7, name: "浩然", value: 543, color: "purple" },
        { rank: 8, name: "家朗", value: 432, color: "coral" },
        { rank: 9, name: "穎彤", value: 321, color: "blue" },
        { rank: 10, name: "卓賢", value: 210, color: "green" }
      ]
    },
    score: {
      title: "任務總分",
      label: "任務總得分",
      unit: "",
      podium: [
        { rank: 1, name: "曉晴", value: 1234, color: "orange" },
        { rank: 2, name: "梓軒", value: 1156, color: "blue" },
        { rank: 3, name: "嘉欣", value: 987, color: "coral" }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", mine: true },
        { rank: 5, name: "子朗", value: 765, color: "orange" },
        { rank: 6, name: "穎彤", value: 654, color: "green" },
        { rank: 7, name: "家朗", value: 543, color: "purple" },
        { rank: 8, name: "芷晴", value: 432, color: "coral" },
        { rank: 9, name: "浩然", value: 321, color: "blue" },
        { rank: 10, name: "卓賢", value: 210, color: "green" }
      ]
    }
  }
};

const taskExtraNames = ["凱晴", "樂軒", "彥希", "詠恩", "卓熙", "芷琳", "承翰", "可晴", "俊朗", "心怡", "柏熙", "嘉穎", "浩宇", "采妍", "文謙", "曉彤", "昊然", "穎琳", "子謙", "梓晴", "朗熙", "芯妍"];
const taskExtraColors = ["purple", "coral", "blue", "green", "orange"];

function extendTaskRows(rows, limit) {
  const existingRanks = new Set(rows.map((item) => item.rank));
  for (let rank = 4; rank <= limit; rank += 1) {
    if (existingRanks.has(rank)) continue;
    rows.push({
      rank,
      name: taskExtraNames[(rank - 11) % taskExtraNames.length],
      value: Math.max(24, 210 - (rank - 10) * 8),
      color: taskExtraColors[(rank - 4) % taskExtraColors.length],
      avatar: ((rank - 1) % 10) + 1,
      change: rank % 3 === 0 ? 1 : rank % 3 === 1 ? -1 : 0
    });
  }
}

extendTaskRows(taskRankData.grade.finish.rows, 30);
extendTaskRows(taskRankData.grade.score.rows, 30);

const practiceRankData = {
  class: {
    heading: "班級排行榜",
    finish: {
      title: "練習完成總數",
      label: "完成數",
      podium: [
        { rank: 1, name: "子朗", value: 1234, color: "orange", avatar: 2 },
        { rank: 2, name: "曉晴", value: 1156, color: "blue", avatar: 1 },
        { rank: 3, name: "嘉欣", value: 987, color: "coral", avatar: 3 }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", avatar: 5, mine: true },
        { rank: 5, name: "梓軒", value: 765, color: "orange", avatar: 6 },
        { rank: 6, name: "思穎", value: 654, color: "green", avatar: 4 },
        { rank: 7, name: "浩然", value: 543, color: "purple", avatar: 9 },
        { rank: 8, name: "芷晴", value: 432, color: "coral", avatar: 7 },
        { rank: 9, name: "家朗", value: 321, color: "blue", avatar: 8 },
        { rank: 10, name: "穎彤", value: 210, color: "green", avatar: 10 }
      ]
    },
    score: {
      title: "練習總分",
      label: "練習總得分",
      podium: [
        { rank: 1, name: "張三", value: 934, color: "orange", avatar: 2 },
        { rank: 2, name: "李四", value: 856, color: "blue", avatar: 1 },
        { rank: 3, name: "王小明", value: 782, color: "coral", avatar: 3 }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 698, color: "me", avatar: 5, mine: true },
        { rank: 5, name: "陳佳怡", value: 623, color: "orange", avatar: 6 },
        { rank: 6, name: "劉子軒", value: 557, color: "green", avatar: 4 },
        { rank: 7, name: "黃梓涵", value: 486, color: "purple", avatar: 9 },
        { rank: 8, name: "周可欣", value: 398, color: "coral", avatar: 7 },
        { rank: 9, name: "吳宇晨", value: 276, color: "blue", avatar: 8 },
        { rank: 10, name: "鄭嘉樂", value: 165, color: "green", avatar: 10 }
      ]
    }
  },
  grade: {
    heading: "年級排行榜",
    finish: {
      title: "練習完成總數",
      label: "完成數",
      podium: [
        { rank: 1, name: "嘉欣", value: 1234, color: "orange", avatar: 2 },
        { rank: 2, name: "子朗", value: 1156, color: "blue", avatar: 1 },
        { rank: 3, name: "芷晴", value: 987, color: "coral", avatar: 3 }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", avatar: 5, mine: true },
        { rank: 5, name: "梓軒", value: 765, color: "orange", avatar: 6 },
        { rank: 6, name: "思穎", value: 654, color: "green", avatar: 4 },
        { rank: 7, name: "浩然", value: 543, color: "purple", avatar: 9 },
        { rank: 8, name: "家朗", value: 432, color: "coral", avatar: 7 },
        { rank: 9, name: "穎彤", value: 321, color: "blue", avatar: 8 },
        { rank: 10, name: "卓賢", value: 210, color: "green", avatar: 10 }
      ]
    },
    score: {
      title: "練習總分",
      label: "練習總得分",
      podium: [
        { rank: 1, name: "曉晴", value: 1234, color: "orange", avatar: 2 },
        { rank: 2, name: "梓軒", value: 1156, color: "blue", avatar: 1 },
        { rank: 3, name: "嘉欣", value: 987, color: "coral", avatar: 3 }
      ],
      rows: [
        { rank: 4, name: currentAppStudentName, value: 856, color: "me", avatar: 5, mine: true },
        { rank: 5, name: "子朗", value: 765, color: "orange", avatar: 6 },
        { rank: 6, name: "穎彤", value: 654, color: "green", avatar: 4 },
        { rank: 7, name: "家朗", value: 543, color: "purple", avatar: 9 },
        { rank: 8, name: "芷晴", value: 432, color: "coral", avatar: 7 },
        { rank: 9, name: "浩然", value: 321, color: "blue", avatar: 8 },
        { rank: 10, name: "卓賢", value: 210, color: "green", avatar: 10 }
      ]
    }
  }
};

extendTaskRows(practiceRankData.grade.finish.rows, 30);
extendTaskRows(practiceRankData.grade.score.rows, 30);

function formatMetricValue(metric, value) {
  if (metric === "完成數") return `${value} 次`;
  if (metric === "總分" || metric === "得分") return `${value} 分`;
  return String(value);
}

function formatTaskValue(value) {
  return String(Math.round(value));
}

function scaledTaskValue(item) {
  const period = taskPeriodConfig[taskRankState.period] || taskPeriodConfig.week;
  return Math.round(item.value * period.multiplier);
}

function scaledPracticeValue(item) {
  const period = taskPeriodConfig[practiceRankState.period] || taskPeriodConfig.week;
  return Math.round(item.value * period.multiplier);
}

function getPracticeBoardData() {
  const source = practiceRankState.metric === "task-score" ? taskRankData : practiceRankData;
  const scopeData = source[practiceRankState.scope] || source.class;
  return {
    scopeData,
    metricData: scopeData.score,
    sourceType: practiceRankState.metric === "task-score" ? "task" : "practice"
  };
}

function parseDateOnly(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function getDateRangeStatus(start, end, now = new Date()) {
  const startDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!startDate || !endDate) return { label: "-", className: "disabled" };
  if (today < startDate) return { label: "未開始", className: "pending" };
  if (today > endDate) return { label: "已結束", className: "disabled" };
  return { label: "進行中", className: "enabled" };
}

function renderSchoolYearList(filterYear = "2025-2026學年") {
  if (!yearListBody) return;
  const rows = schoolYearRecords.filter((item) => item.year === filterYear);
  yearListBody.innerHTML = rows.map((item, index) => {
    const status = getDateRangeStatus(item.start, item.end);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.year}</td>
        <td>${item.start}</td>
        <td>${item.end}</td>
        <td><span class="status ${status.className}">${status.label}</span></td>
        <td><button class="link-btn" data-modal="yearEdit" data-year-value="${item.year}">編輯</button></td>
      </tr>
    `;
  }).join("");
  yearListBody.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal, button.dataset.yearValue));
  });
}

function renderTermList() {
  if (!termListBody) return;
  const selectedYear = termListYearFilter?.value || "2025-2026學年";
  const selectedTerm = termListTermFilter?.value || "全部";
  const rows = termRecords.filter((item) => {
    const yearMatched = item.year === selectedYear;
    const termMatched = selectedTerm === "全部" || item.term === selectedTerm;
    return yearMatched && termMatched;
  });
  termListBody.innerHTML = rows.map((item, index) => {
    const status = getDateRangeStatus(item.start, item.end);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.year}</td>
        <td>${item.term}</td>
        <td>${item.start}</td>
        <td>${item.end}</td>
        <td><span class="status ${status.className}">${status.label}</span></td>
        <td><button class="link-btn" data-modal="termEdit">編輯</button></td>
      </tr>
    `;
  }).join("");
  termListBody.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
  });
}

function requiredLabel(text) {
  return `<span class="field-label"><span class="required-mark">*</span>${text}</span>`;
}

const modalContent = {
  year: {
    title: "新增學年",
    html: `
      <label>${requiredLabel("選擇學年")}<select data-year-modal-select>${schoolYearOptions}</select></label>
      <label>${requiredLabel("學年開始日期")}<input type="text" value="2025-09-01" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-year-start readonly /></label>
      <label>${requiredLabel("學年結束日期")}<input type="text" value="2026-08-31" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-year-end readonly /></label>
      <p class="field-note">選擇學年後會帶出建議起止日期，例如 2025-2026學年：2025-09-01 ~ 2026-08-31；日期格式為 yyyy-mm-dd，且結束日期需晚於開始日期。學年狀態由當前日期與學年起止日期自動判斷。</p>
    `
  },
  yearEdit: {
    title: "編輯學年",
    html: `
      <label>${requiredLabel("選擇學年")}<select data-year-modal-select>${schoolYearOptions}</select></label>
      <label>${requiredLabel("學年開始日期")}<input type="text" value="2025-09-01" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-year-start readonly /></label>
      <label>${requiredLabel("學年結束日期")}<input type="text" value="2026-08-31" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-year-end readonly /></label>
      <p class="field-note">學年更新後，該學年下所有學期的開始日期與結束日期必須仍落在學年範圍內；日期格式為 yyyy-mm-dd。學年狀態由當前日期與學年起止日期自動判斷。</p>
    `
  },
  term: {
    title: "新增學期",
    html: `
      <label>${requiredLabel("學年")}<select data-year-select>${schoolYearOptions}</select></label>
      <p class="field-note" data-year-range-note>所選學年起止日期：2025-09-01 ~ 2026-08-31</p>
      <label>${requiredLabel("學期")}<select><option>上學期</option><option>中學期</option><option selected>下學期</option></select></label>
      <label>${requiredLabel("開始日期")}<input type="text" value="2026-02-16" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-term-start readonly /></label>
      <label>${requiredLabel("結束日期")}<input type="text" value="2026-07-31" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-term-end readonly /></label>
      <p class="field-note">學期開始日期與結束日期必須在所選學年起止日期內；日期格式為 yyyy-mm-dd。學期狀態由當前日期與學期起止日期自動判斷。</p>
    `
  },
  termEdit: {
    title: "編輯學期",
    html: `
      <label>${requiredLabel("學年")}<select data-year-select>${schoolYearOptions}</select></label>
      <p class="field-note" data-year-range-note>所選學年起止日期：2025-09-01 ~ 2026-08-31</p>
      <label>${requiredLabel("學期")}<select><option>上學期</option><option>中學期</option><option selected>下學期</option></select></label>
      <label>${requiredLabel("開始日期")}<input type="text" value="2026-02-16" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-term-start readonly /></label>
      <label>${requiredLabel("結束日期")}<input type="text" value="2026-07-31" placeholder="yyyy-mm-dd" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" data-date-picker data-term-end readonly /></label>
      <p class="field-note">學期開始日期與結束日期必須在所選學年起止日期內；日期格式為 yyyy-mm-dd。學期狀態由當前日期與學期起止日期自動判斷。</p>
    `
  },
  class: {
    title: "新增班級",
    html: `
      <div class="modal-grid two">
        <label>${requiredLabel("班級名稱")}<input value="S1 A班" /></label>
        <label>${requiredLabel("學年")}<select>${schoolYearOptions}</select></label>
        <label>${requiredLabel("年級")}<select><option>S1</option><option>S2</option><option>S3</option><option>P1</option></select></label>
        <label>班級人數上限<input type="number" value="32" /></label>
      </div>
      <label>${requiredLabel("管理員(科主任)")}
        <div class="multi-select" role="group" aria-label="管理員(科主任)多選">
          <span><input type="checkbox" checked />陳老師</span>
          <span><input type="checkbox" />王老師</span>
          <span><input type="checkbox" />李老師</span>
        </div>
      </label>
      <label class="check-line"><input type="checkbox" checked /> 是否開啟管理學生權限</label>
      <label>教學老師
        <div class="multi-select" role="group" aria-label="教學老師多選">
          <span><input type="checkbox" checked />李老師</span>
          <span><input type="checkbox" checked />周老師</span>
          <span><input type="checkbox" />陳老師</span>
          <span><input type="checkbox" />王老師</span>
        </div>
      </label>
    `
  },
  student: {
    title: "新增 / 編輯學生",
    html: `
      <div class="modal-grid two">
        <label>${requiredLabel("學生姓名")}<input value="張曉剛" /></label>
        <label>英文名<input placeholder="請輸入英文名" /></label>
        <label>${requiredLabel("學生登入帳號")}<input value="1111" disabled /></label>
        <label>班級學號<input value="1" /></label>
        <label>${requiredLabel("性別")}<select><option>女</option><option>男</option></select></label>
        <label>${requiredLabel("年級")}<select><option>S1</option><option>S2</option><option>P1</option></select></label>
        <label>${requiredLabel("所屬班級")}<select><option>S1 A班</option><option>S2 B班</option></select></label>
        <label>${requiredLabel("在學狀態")}<select data-student-school-status><option selected>在學</option><option>轉移</option><option>離校</option><option>畢業</option></select></label>
      </div>
      <div class="form-field leave-reason-group" data-status-reason-group hidden>
        <strong><span class="required-mark">*</span> <span data-status-reason-title>離校原因</span></strong>
        <div class="reason-options">
          <label class="check-line" data-transfer-reason><input type="radio" name="student-status-reason" value="轉校" checked />轉校</label>
          <label class="check-line" data-leave-reason><input type="radio" name="student-status-reason" value="自願退學" />自願退學</label>
          <label class="check-line" data-leave-reason><input type="radio" name="student-status-reason" value="長期缺課" />長期缺課</label>
          <label class="check-line" data-leave-reason><input type="radio" name="student-status-reason" value="輟學" />輟學</label>
          <label class="check-line" data-leave-reason><input type="radio" name="student-status-reason" value="移居海外/內地" />移居海外/內地</label>
        </div>
        <p class="field-note" data-transfer-login-note hidden>轉移狀態默認關閉學生 App 登錄。</p>
      </div>
      <p class="field-note">新增學生後默認為「在學」。教師發布任務時，取「進行中」學年所在班級的在學學生；「轉移」「離校」「畢業」狀態學生不能參與該任務。</p>
    `
  }
};

function setMode(mode) {
  modeTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  modeViews.forEach((view) => view.classList.toggle("active", view.id === `mode-${mode}`));
}

function setWebRankingTab(tab = "task") {
  const activeTab = tab === "practice" ? "practice" : "task";
  webRankingState.tab = activeTab;
  rankingTabs.forEach((button) => {
    const isActive = button.dataset.rankingTab === activeTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  rankingPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.rankingPanel === activeTab);
  });
  if (activeTab === "task") {
    taskWebRankState.view = "table";
    renderTaskWebRank(taskWebRankState.metric);
  } else {
    practiceWebRankState.view = "table";
    renderPracticeWebRank(practiceWebRankState.metric);
  }
}

function setUpgradeStep(step) {
  const targetStep = Math.max(1, Math.min(5, Number(step) || 1));
  upgradeImportState.step = targetStep;
  upgradeImportState.maxStep = Math.max(upgradeImportState.maxStep, targetStep);
  upgradePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.upgradePanel === String(targetStep));
  });
  upgradeStepButtons.forEach((button) => {
    const buttonStep = Number(button.dataset.upgradeStepNav);
    button.classList.toggle("active", buttonStep === targetStep);
    button.classList.toggle("completed", buttonStep < upgradeImportState.maxStep);
  });
}

function setUpgradeFileStatus(file) {
  const fileName = file?.name || "";
  const isExcel = /\.(xlsx|xls)$/i.test(fileName);
  upgradeImportState.fileReady = Boolean(file && isExcel);
  if (upgradeFileName) upgradeFileName.textContent = fileName || "尚未選擇文件";
  if (upgradeFileStatus) {
    upgradeFileStatus.textContent = isExcel
      ? "文件格式校驗通過，已識別到老師、班級、班級老師、學生 Sheet，可進入下一步。"
      : "文件格式不符合要求，請上傳 .xlsx / .xls 電子表格文件。";
  }
  upgradeUploadBox?.classList.toggle("ready", Boolean(file && isExcel));
  if (upgradeNext) upgradeNext.disabled = !isExcel;
  if (isExcel) upgradeImportState.maxStep = Math.max(upgradeImportState.maxStep, 2);
}

function getUpgradePanelConfig(panel) {
  const step = panel?.dataset.upgradePanel || "";
  const configs = {
    "2": {
      label: "老師",
      dataText: "條老師數據",
      required: ["老師姓名", "權限安排", "登入用戶名"],
      emailFields: ["登入用戶名", "電郵"],
      phoneFields: ["手機號碼"],
      logic: "teacher"
    },
    "3": {
      label: "班級",
      dataText: "條班級數據",
      required: ["學年", "年級", "班別"],
      logic: "class"
    },
    "4": {
      label: "班級老師",
      dataText: "條班級老師數據",
      required: ["學年", "年級", "班别", "老師角色", "老師用户名"],
      logic: "classTeacher"
    },
    "5": {
      label: "學生",
      dataText: "名學生數據",
      required: ["年級", "班別", "學生姓名", "登入帳號", "性別"],
      logic: "student"
    }
  };
  return configs[step] || null;
}

function normalizeUpgradeHeader(header) {
  return header.replace(/^\*\s*/, "").trim();
}

function isUpgradeSystemHeader(header) {
  return ["校驗結果", "校驗狀態", "校驗状态", "提示", "操作"].includes(header);
}

function getUpgradeSelectOptions(header, panel) {
  const step = panel?.dataset.upgradePanel || "";
  if (header === "年級" && ["3", "4", "5"].includes(step)) return upgradePrimaryGrades;
  return upgradeSelectOptions[header];
}

function getUpgradeTableMeta(table) {
  const headers = [...table.querySelectorAll("thead th")].map((header) => normalizeUpgradeHeader(header.textContent));
  return {
    headers,
    statusIndex: headers.findIndex((header) => header === "校驗狀態" || header === "校驗状态"),
    validationIndex: headers.indexOf("校驗結果"),
    promptIndex: headers.indexOf("提示"),
    actionIndex: headers.indexOf("操作")
  };
}

function getUpgradeRowValues(row, headers) {
  return headers.reduce((values, header, index) => {
    if (!isUpgradeSystemHeader(header)) {
      values[header] = getUpgradePreviewCellValue(row.children[index]);
    }
    return values;
  }, {});
}

function markUpgradeRequiredHeaders(table) {
  const panel = table.closest("[data-upgrade-panel]");
  const config = getUpgradePanelConfig(panel);
  const required = new Set(config?.required || []);
  table.querySelectorAll("thead th").forEach((header) => {
    const label = normalizeUpgradeHeader(header.textContent);
    if (!required.has(label) || header.querySelector(".required-mark")) return;
    header.innerHTML = `<span class="required-mark">*</span>${label}`;
  });
}

function getUpgradeExcelRowNumber(row) {
  if (row.dataset.excelRow) return Number(row.dataset.excelRow);
  const rows = row.parentElement ? [...row.parentElement.children] : [];
  return rows.indexOf(row) + 2;
}

function setUpgradeRowStatus(row, status, message = "-") {
  clearUpgradeCellErrors(row);
  row.dataset.validationStatus = status;
  row.dataset.validationMessage = message;
  row.classList.toggle("validation-failed-row", status === "未通過");
  row.classList.toggle("validation-pending-row", status === "待校驗");
  const statusCell = row.querySelector("[data-upgrade-validation-status]");
  if (statusCell) {
    const label = status === "通過" ? "已通過" : status;
    const className = status === "通過" ? "passed" : status === "未通過" ? "failed" : "pending";
    statusCell.innerHTML = `<span class="upgrade-status-badge ${className}">${label}</span>`;
  }
  if (status === "未通過") markUpgradeErrorCell(row, message);
}

function clearUpgradeCellErrors(row) {
  row.querySelectorAll(".upgrade-cell-error").forEach((cell) => cell.classList.remove("upgrade-cell-error"));
  row.querySelectorAll(".upgrade-inline-error").forEach((item) => item.remove());
}

function getUpgradeErrorHeader(message) {
  const requiredMatch = message.match(/必填項「(.+?)」為空/);
  if (requiredMatch) return requiredMatch[1];
  if (message.includes("登入用戶名")) return "登入用戶名";
  if (message.includes("班別已存在")) return "班別";
  if (message.includes("未找到班級") || message.includes("找到班級")) return "班別";
  const quotedMatch = message.match(/「(.+?)」/);
  if (quotedMatch) return quotedMatch[1];
  return "";
}

function markUpgradeErrorCell(row, message) {
  const table = row.closest("table");
  const { headers } = getUpgradeTableMeta(table);
  const header = getUpgradeErrorHeader(message);
  const headerAliases = header === "班別" ? ["班別", "班别"] : [header];
  const cellIndex = headerAliases.reduce((foundIndex, item) => (
    foundIndex >= 0 ? foundIndex : headers.indexOf(item)
  ), -1);
  if (cellIndex < 0) return;
  const cell = row.children[cellIndex];
  cell.classList.add("upgrade-cell-error");
  const inline = document.createElement("span");
  inline.className = "upgrade-inline-error";
  inline.textContent = ` ${message.replace(/^第 \d+ 行錯誤：/, "")}`;
  cell.appendChild(inline);
}

function validateUpgradeRow(row, mode = "light") {
  const panel = row.closest("[data-upgrade-panel]");
  const config = getUpgradePanelConfig(panel);
  const table = row.closest("table");
  if (!config || !table) return { status: "通過", message: "-" };

  const { headers } = getUpgradeTableMeta(table);
  const values = getUpgradeRowValues(row, headers);
  const excelRow = getUpgradeExcelRowNumber(row);
  const errors = [];

  (config.required || []).forEach((header) => {
    if (!values[header]) errors.push(`第 ${excelRow} 行錯誤：必填項「${header}」為空`);
  });

  (config.emailFields || []).forEach((header) => {
    const value = values[header];
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push(`第 ${excelRow} 行錯誤：「${header}」格式不正確`);
    }
  });

  (config.phoneFields || []).forEach((header) => {
    const value = values[header];
    if (value && !/^\d{6,15}$/.test(value)) {
      errors.push(`第 ${excelRow} 行錯誤：「${header}」需為 6-15 位數字`);
    }
  });

  if (values["國家/地區區號"] && !/^\+\d{1,4}$/.test(values["國家/地區區號"])) {
    errors.push(`第 ${excelRow} 行錯誤：「國家/地區區號」需為 +852 或 +86`);
  }

  Object.entries(upgradeSelectOptions).forEach(([header, options]) => {
    if (headers.includes(header) && values[header] && !options.includes(values[header])) {
      errors.push(`第 ${excelRow} 行錯誤：「${header}」不在可選範圍內`);
    }
  });

  if (mode === "full" && errors.length === 0) {
    errors.push(...validateUpgradeRowLogic(row, config.logic, values, headers));
  }

  const status = errors.length ? "未通過" : "通過";
  const message = errors.length ? errors[0] : "-";
  setUpgradeRowStatus(row, status, message);
  updateUpgradePanelSummary(panel);
  return { status, message };
}

function validateUpgradeRowLogic(row, logic, values, headers) {
  const excelRow = getUpgradeExcelRowNumber(row);
  const rows = [...row.parentElement.children];
  if (logic === "teacher") {
    const username = values["登入用戶名"];
    const currentIndex = rows.indexOf(row);
    const hasPreviousDuplicate = rows.slice(0, currentIndex).some((item) => {
      const itemValues = getUpgradeRowValues(item, headers);
      return itemValues["登入用戶名"] && itemValues["登入用戶名"] === username;
    });
    return hasPreviousDuplicate ? [`第 ${excelRow} 行錯誤：登入用戶名已存在`] : [];
  }
  if (logic === "class") {
    const currentIndex = rows.indexOf(row);
    const classKey = `${values["學年"]}|${values["年級"]}|${values["班別"]}`;
    const hasPreviousDuplicate = values["班別"] && rows.slice(0, currentIndex).some((item) => {
      const itemValues = getUpgradeRowValues(item, headers);
      return `${itemValues["學年"]}|${itemValues["年級"]}|${itemValues["班別"]}` === classKey;
    });
    return hasPreviousDuplicate ? [`第 ${excelRow} 行錯誤：同一學年同一年級下班別已存在`] : [];
  }
  if (logic === "classTeacher") {
    const className = `${values["年級"]} ${values["班别"]}`;
    return ["P1 1A", "P1 1B"].includes(className)
      ? []
      : [`第 ${excelRow} 行錯誤：未在系統或前序導入數據中找到班級「${className}」`];
  }
  if (logic === "student") {
    const className = `${values["年級"]} ${values["班別"]}`;
    return ["P1 1A", "P1 1B"].includes(className)
      ? []
      : [`第 ${excelRow} 行錯誤：未找到班級「${className}」`];
  }
  return [];
}

function validateUpgradePanel(panel, mode = "full") {
  const rows = [...(panel?.querySelectorAll(".upgrade-preview-table tbody tr") || [])];
  rows.forEach((row) => validateUpgradeRow(row, mode));
  updateUpgradePanelSummary(panel);
  return !rows.some((row) => row.dataset.validationStatus !== "通過");
}

function updateUpgradePanelSummary(panel) {
  const config = getUpgradePanelConfig(panel);
  const rows = [...(panel?.querySelectorAll(".upgrade-preview-table tbody tr") || [])];
  if (!config || !rows.length) return;
  const passed = rows.filter((row) => row.dataset.validationStatus === "通過").length;
  const failed = rows.filter((row) => row.dataset.validationStatus === "未通過").length;
  const pending = rows.filter((row) => row.dataset.validationStatus === "待校驗").length;
  const summary = panel.querySelector(".upgrade-summary");
  const pendingText = pending ? `，${pending} 條待校驗` : "";
  if (summary) {
    summary.textContent = `共讀取到 ${rows.length} ${config.dataText}，其中 ${passed} 條校驗通過，${failed} 條存在異常${pendingText}。`;
  }
  const primaryActions = panel.querySelectorAll("[data-upgrade-confirm].primary-btn, [data-upgrade-complete].primary-btn");
  primaryActions.forEach((button) => {
    button.disabled = failed > 0 || pending > 0;
  });
}

function ensureUpgradeStatusAndActions(table) {
  const headerRow = table.querySelector("thead tr");
  if (!headerRow) return;

  let meta = getUpgradeTableMeta(table);
  if (meta.statusIndex < 0) {
    const statusHeader = document.createElement("th");
    statusHeader.textContent = "校驗狀態";
    if (meta.actionIndex >= 0) {
      headerRow.insertBefore(statusHeader, headerRow.children[meta.actionIndex]);
    } else {
      headerRow.appendChild(statusHeader);
    }
  }

  meta = getUpgradeTableMeta(table);
  if (meta.actionIndex < 0) {
    const actionHeader = document.createElement("th");
    actionHeader.textContent = "操作";
    headerRow.appendChild(actionHeader);
  }

  table.querySelectorAll("tbody tr").forEach((row) => {
    meta = getUpgradeTableMeta(table);
    const statusCell = row.children[meta.statusIndex];
    if (!statusCell || !statusCell.dataset.upgradeValidationStatus) {
      const cell = document.createElement("td");
      cell.dataset.upgradeValidationStatus = "";
      if (meta.actionIndex >= 0) {
        row.insertBefore(cell, row.children[meta.actionIndex]);
      } else {
        row.appendChild(cell);
      }
    }

    if (!row.querySelector("[data-upgrade-row-actions]")) {
      const actionCell = document.createElement("td");
      actionCell.dataset.upgradeRowActions = "";
      actionCell.innerHTML = `
        <button class="link-btn" type="button" data-upgrade-row-edit>編輯</button>
        <button class="link-btn danger-link" type="button" data-upgrade-row-delete>刪除</button>
      `;
      row.appendChild(actionCell);
    }
  });
}

function setupUpgradePreviewTables() {
  document.querySelectorAll(".upgrade-preview-table table").forEach((table) => {
    const meta = getUpgradeTableMeta(table);
    [meta.promptIndex, meta.validationIndex]
      .filter((index) => index >= 0)
      .sort((a, b) => b - a)
      .forEach((index) => {
        table.querySelector(`thead th:nth-child(${index + 1})`)?.remove();
        table.querySelectorAll("tbody tr").forEach((row) => row.children[index]?.remove());
      });
    markUpgradeRequiredHeaders(table);
    ensureUpgradeStatusAndActions(table);
    table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
      row.dataset.excelRow = String(rowIndex + 2);
      validateUpgradeRow(row, "full");
    });
  });
  setupUpgradeFilters();
}

function getUpgradePanelMatchedRows(panel) {
  const table = panel?.querySelector(".upgrade-preview-table table");
  if (!table) return [];
  const { headers } = getUpgradeTableMeta(table);
  const filters = [...panel.querySelectorAll("[data-upgrade-filter]")];
  const statusFilter = panel.querySelector("[data-upgrade-status-filter]");
  return [...table.querySelectorAll("tbody tr")].filter((row) => {
    const values = getUpgradeRowValues(row, headers);
    const matchFields = filters.every((field) => {
      const expected = (field.value || "").trim().toLowerCase();
      if (!expected) return true;
      const actual = (values[field.dataset.upgradeFilter] || "").trim().toLowerCase();
      return field.tagName === "SELECT" ? actual === expected : actual.includes(expected);
    });
    const expectedStatus = statusFilter?.value || "";
    const matchStatus = !expectedStatus || row.dataset.validationStatus === expectedStatus;
    return matchFields && matchStatus;
  });
}

function renderUpgradePagination(panel, rows) {
  const pagination = panel?.querySelector("[data-upgrade-pagination]");
  if (!pagination) return rows;
  const pageSize = Math.min(
    50,
    Math.max(10, Number(panel.dataset.upgradePageSize || upgradeStudentDefaultPageSize))
  );
  panel.dataset.upgradePageSize = String(pageSize);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(Number(panel.dataset.upgradePage || "1"), totalPages);
  panel.dataset.upgradePage = String(currentPage);
  const start = (currentPage - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="ghost-btn small ${page === currentPage ? "active" : ""}" type="button" data-upgrade-page="${page}">${page}</button>`;
  }).join("");
  pagination.innerHTML = `
    <span>總記錄數:${rows.length}</span>
    <button class="ghost-btn small icon-page-btn" type="button" data-upgrade-page-prev ${currentPage <= 1 ? "disabled" : ""}>‹</button>
    <div class="upgrade-page-numbers">${pageButtons}</div>
    <button class="ghost-btn small icon-page-btn" type="button" data-upgrade-page-next ${currentPage >= totalPages ? "disabled" : ""}>›</button>
    <select data-upgrade-page-size aria-label="每頁條數">
      ${upgradeStudentPageSizeOptions.map((option) => `<option value="${option}" ${option === pageSize ? "selected" : ""}>${option} 條/頁</option>`).join("")}
    </select>
  `;
  pagination.querySelectorAll("[data-upgrade-page]").forEach((button) => {
    button.addEventListener("click", () => {
      panel.dataset.upgradePage = button.dataset.upgradePage || "1";
      applyUpgradeFilters(panel);
    });
  });
  pagination.querySelector("[data-upgrade-page-prev]")?.addEventListener("click", () => {
    panel.dataset.upgradePage = String(Math.max(1, currentPage - 1));
    applyUpgradeFilters(panel);
  });
  pagination.querySelector("[data-upgrade-page-next]")?.addEventListener("click", () => {
    panel.dataset.upgradePage = String(Math.min(totalPages, currentPage + 1));
    applyUpgradeFilters(panel);
  });
  pagination.querySelector("[data-upgrade-page-size]")?.addEventListener("change", (event) => {
    panel.dataset.upgradePageSize = event.target.value;
    panel.dataset.upgradePage = "1";
    applyUpgradeFilters(panel);
  });
  return pageRows;
}

function applyUpgradeFilters(panel) {
  const table = panel?.querySelector(".upgrade-preview-table table");
  if (!table) return;
  const rows = [...table.querySelectorAll("tbody tr")];
  const matchedRows = getUpgradePanelMatchedRows(panel);
  const pagedRows = renderUpgradePagination(panel, matchedRows);
  const visibleRows = new Set(pagedRows);
  rows.forEach((row) => {
    row.hidden = !visibleRows.has(row);
  });
}

function setupUpgradeFilters() {
  document.querySelectorAll("[data-upgrade-filters]").forEach((filterBar) => {
    if (filterBar.dataset.upgradeFiltersReady) return;
    filterBar.dataset.upgradeFiltersReady = "true";
    const panel = filterBar.closest("[data-upgrade-panel]");
    filterBar.querySelectorAll("input, select").forEach((field) => {
      field.addEventListener("input", () => {
        if (panel) panel.dataset.upgradePage = "1";
        applyUpgradeFilters(panel);
      });
      field.addEventListener("change", () => {
        if (panel) panel.dataset.upgradePage = "1";
        applyUpgradeFilters(panel);
      });
    });
    filterBar.querySelector("[data-upgrade-filter-query]")?.addEventListener("click", () => applyUpgradeFilters(panel));
    filterBar.querySelector("[data-upgrade-filter-reset]")?.addEventListener("click", () => {
      filterBar.querySelectorAll("input, select").forEach((field) => {
        field.value = "";
      });
      if (panel) panel.dataset.upgradePage = "1";
      applyUpgradeFilters(panel);
    });
    applyUpgradeFilters(panel);
  });
}

function getUpgradePreviewCellValue(cell) {
  const clone = cell.cloneNode(true);
  clone.querySelectorAll(".upgrade-inline-error").forEach((item) => item.remove());
  clone.querySelectorAll(".upgrade-status-badge").forEach((item) => {
    item.replaceWith(document.createTextNode(item.textContent));
  });
  return clone.textContent.trim();
}

function openUpgradeRowEditModal(row) {
  const table = row.closest("table");
  const panel = row.closest("[data-upgrade-panel]");
  const config = getUpgradePanelConfig(panel);
  const required = new Set(config?.required || []);
  const { headers } = getUpgradeTableMeta(table);
  const editableHeaders = headers.filter((header) => !isUpgradeSystemHeader(header));
  const values = getUpgradeRowValues(row, headers);
  modalTitle.textContent = "編輯";
  modalLayer.classList.remove("drawer-modal");
  modalFooter?.classList.remove("single-action");
  if (modalCancelButton) modalCancelButton.hidden = false;
  if (modalConfirmButton) modalConfirmButton.textContent = "確定";
  modalBody.className = "modal-body modal-grid two";
  modalBody.innerHTML = editableHeaders.map((header) => {
    const options = getUpgradeSelectOptions(header, panel);
    const value = values[header] || "";
    const label = required.has(header) ? requiredLabel(header) : `<span class="field-label">${header}</span>`;
    if (options) {
      return `<label>${label}<select data-upgrade-edit-field="${header}">${options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
    }
    return `<label>${label}<input data-upgrade-edit-field="${header}" value="${value}" placeholder="請輸入" /></label>`;
  }).join("");
  modalLayer.hidden = false;
  modalConfirmButton.onclick = () => {
    editableHeaders.forEach((header) => {
      const index = headers.indexOf(header);
      const field = modalBody.querySelector(`[data-upgrade-edit-field="${header}"]`);
      if (row.children[index] && field) row.children[index].textContent = field.value.trim();
    });
    validateUpgradeRow(row, "full");
    applyUpgradeFilters(panel);
    modalLayer.hidden = true;
  };
}

function openUpgradeRowDeleteConfirm(row) {
  modalTitle.textContent = "確認刪除";
  modalLayer.classList.remove("drawer-modal");
  modalFooter?.classList.remove("single-action");
  if (modalCancelButton) modalCancelButton.hidden = false;
  if (modalConfirmButton) modalConfirmButton.textContent = "確定刪除";
  modalBody.className = "modal-body";
  modalBody.innerHTML = `<p>是否刪除本行？刪除後僅從本次導入預覽中移除，不影響原 Excel 文件。</p>`;
  modalLayer.hidden = false;
  modalConfirmButton.onclick = () => {
    const panel = row.closest("[data-upgrade-panel]");
    row.remove();
    validateUpgradePanel(panel, "full");
    applyUpgradeFilters(panel);
    modalLayer.hidden = true;
  };
}

function readUpgradeErrorRowsFromPreview(type) {
  const panelId = upgradeErrorPanelByType[type];
  const panel = panelId ? document.querySelector(`[data-upgrade-panel="${panelId}"]`) : null;
  const rows = panel ? [...panel.querySelectorAll(".upgrade-preview-table tbody tr.validation-failed-row")] : [];
  return rows.map((row) => [...row.children].map(getUpgradePreviewCellValue));
}

function exportUpgradeErrors(type) {
  const exportConfig = {
    teacher: {
      filename: "升級數據01-老師帳號报错.xlsx",
      headers: ["序號", "老師姓名", "權限安排", "登入用戶名", "登入密碼", "電郵", "國家/地區區號", "手機號碼", "校驗結果", "提示"],
      rows: upgradeTeacherErrorRows
    },
    class: {
      filename: "升級數據02-新增班級报错.xlsx",
      headers: ["學年", "年級", "班別", "開啟管理員（科主任）-管理學生權限", "校驗結果", "提示"],
      rows: upgradeClassErrorRows
    },
    classTeacher: {
      filename: "升級數據03-各班科任老師报错.xlsx",
      headers: ["學年", "年級", "班别", "老師角色", "老師用户名", "老師姓名", "校驗結果", "提示"],
      rows: upgradeClassTeacherErrorRows
    },
    student: {
      filename: "升級數據04-班級學生报错.xlsx",
      headers: ["序號", "年級", "班別", "學號", "學生姓名", "英文名", "登入帳號", "登入密碼", "性別", "校驗結果", "提示"],
      rows: upgradeStudentErrorRows
    }
  };
  const target = exportConfig[type];
  if (!target) return;
  const rows = readUpgradeErrorRowsFromPreview(type);
  downloadRankWorkbook(target.filename, target.headers, rows.length ? rows : target.rows);
}

function setWebPage(page, rankingTarget) {
  const legacyRankingTarget = page === "task-rank" ? "task" : page === "practice-rank" ? "practice" : "";
  const actualPage = legacyRankingTarget ? "rankings" : page;
  const activeMenuPage = webMenuActiveMap[page] || actualPage;
  sideSubs.forEach((item) => {
    item.classList.toggle("active", item.classList.contains("side-sub") && item.dataset.webPage === activeMenuPage);
  });
  const activeSub = [...sideSubs].find((item) => (
    item.classList.contains("side-sub") && item.dataset.webPage === activeMenuPage
  ));
  const parentSection = activeSub?.dataset.parentSection;
  sideSections.forEach((item) => item.classList.toggle("active", item.dataset.menuSection === parentSection));
  webPages.forEach((item) => item.classList.toggle("active", item.id === `web-${actualPage}`));
  if (actualPage === "rankings") {
    setWebRankingTab(rankingTarget || legacyRankingTarget || webRankingState.tab);
  }
  if (actualPage === "upgrade-import") {
    setUpgradeStep(upgradeImportState.step);
  }
}

function renderRank(type) {
  const data = rankData[type] || rankData.finish;
  if (rankTitle) rankTitle.textContent = data.title;
  if (rankMetric) rankMetric.textContent = data.metric;
  if (permissionName) permissionName.textContent = data.title;
  if (chartTitle) chartTitle.textContent = data.title;
  if (rankFocusMetric) rankFocusMetric.textContent = data.metric;
  if (rankFocusValue) rankFocusValue.textContent = data.values[1];

  if (rankBody) {
    rankBody.innerHTML = data.values.map((value, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${students[index]}</td>
        <td>S1 A班</td>
        <td>${value}</td>
        <td><span class="status enabled">可見</span></td>
      </tr>
    `).join("");
  }

  if (leaderboardList) {
    leaderboardList.innerHTML = data.values.map((value, index) => `
      <div class="leaderboard-row top-${index + 1}">
        <div class="leaderboard-rank">${index < 3 ? ["金", "銀", "銅"][index] : index + 1}</div>
        <div class="leaderboard-person"><span class="mini-avatar">${students[index].slice(0, 1)}</span><strong>${students[index]}</strong></div>
        <span>S1 A班</span>
        <strong class="leaderboard-value">${data.metric}: ${value}</strong>
        <span class="status enabled">可見</span>
      </div>
    `).join("");
  }

  if (chartBars) {
    const max = Math.max(...data.values);
    chartBars.innerHTML = data.values.map((value, index) => `
      <div class="bar-row">
        <strong>${index + 1}. ${students[index]}</strong>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(12, Math.round((value / max) * 100))}%"></div></div>
        <span>${value}</span>
        <span class="status enabled">可見</span>
      </div>
    `).join("");
  }
}

function selectFirstClassForGrade(gradeFilter, classFilter) {
  if (!gradeFilter || !classFilter) return;
  const gradeValue = (gradeFilter.value || "").trim();
  const selectedClass = (classFilter.value || "").trim();
  const selectedMatchesGrade = selectedClass && selectedClass !== "全部班級" && selectedClass.startsWith(gradeValue);
  if (selectedMatchesGrade) return;

  const firstClassOption = Array.from(classFilter.options).find((option) => {
    const optionValue = (option.value || option.textContent || "").trim();
    return optionValue && optionValue !== "全部班級" && optionValue.startsWith(gradeValue);
  });

  if (firstClassOption) {
    classFilter.value = firstClassOption.value || firstClassOption.textContent.trim();
  }
}

function getSelectedText(select, fallback = "") {
  if (!select) return fallback;
  return select.options[select.selectedIndex]?.textContent.trim() || select.value || fallback;
}

function formatWebRankTrendText(change) {
  if (change === null || change === undefined) return "-";
  if (change === 0) return "持平";
  return `${change > 0 ? "↑" : "↓"}${Math.abs(change)}`;
}

function escapeExportCell(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sanitizeExportFilename(value) {
  return value.replace(/[\\/:*?"<>|]/g, "-");
}

function buildRankExportRows(rows) {
  return rows.map((item, index) => [
    index + 1,
    item.gradeRank,
    formatWebRankTrendText(item.gradeRankChange),
    item.classRank,
    formatWebRankTrendText(item.classRankChange),
    item.name,
    item.no,
    item.grade,
    item.className,
    item.value
  ]);
}

function downloadRankWorkbook(filename, headers, rows) {
  const table = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead><tr>${headers.map((header) => `<th>${escapeExportCell(header)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeExportCell(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob([table], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = sanitizeExportFilename(filename);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}

function exportWebRank(state) {
  const headers = [
    "序號",
    "年級排名",
    "年級排名升跌",
    "班級排名",
    "班級排名升跌",
    "學生姓名",
    "學生編號",
    "年級",
    "班級",
    state.metricLabel
  ];
  const rows = buildRankExportRows(state.rows);
  const filename = `${state.year}_${state.time}_${state.title}.xlsx`;
  downloadRankWorkbook(filename, headers, rows);
}

function filterRowsByManagedClasses(rows) {
  return rows.filter((item) => webRankManagedClasses.includes(item.className));
}

function syncStudentRankVisibility() {
  const practiceVisible = Boolean(practiceWebRankState.studentVisible);
  practiceRankEntryButtons.forEach((button) => {
    button.hidden = !practiceVisible;
    const divider = button.previousElementSibling;
    if (divider?.classList.contains("learning-summary-divider")) {
      divider.hidden = !practiceVisible;
    }
    button.closest(".learning-summary-card")?.classList.toggle("rank-entry-off", !practiceVisible);
  });
}

function syncRankPermissionInputs() {
  if (taskStudentVisibleInput) taskStudentVisibleInput.checked = taskWebRankState.studentVisible;
  if (practiceStudentVisibleInput) practiceStudentVisibleInput.checked = practiceWebRankState.studentVisible;
  syncStudentRankVisibility();
}

function renderTaskWebRank(type = "score") {
  const data = taskWebRankData[type] || taskWebRankData.score;
  taskWebRankState.metric = type;
  const yearValue = getSelectedText(taskWebYearFilter, "2025-2026學年");
  const timeValue = getSelectedText(taskWebTimeFilter, "本週");
  const gradeValue = taskWebGradeFilter?.value || "S1";
  if (taskWebRankState.view === "class") {
    selectFirstClassForGrade(taskWebGradeFilter, taskWebClassFilter);
  }
  const classValue = taskWebClassFilter?.value || "全部班級";
  const gradeRows = filterRowsByManagedClasses([...data.rows])
    .filter((item) => item.grade === gradeValue)
    .sort((first, second) => first.gradeRank - second.gradeRank);
  const filteredRows = gradeRows
    .filter((item) => classValue === "全部班級" || item.className === classValue)
    .sort((first, second) => (
      taskWebRankState.sort === "asc"
        ? first.gradeRank - second.gradeRank
        : second.gradeRank - first.gradeRank
    ));
  if (taskWebRankTitle) taskWebRankTitle.textContent = data.title;
  if (taskWebRankMetric) taskWebRankMetric.textContent = data.metric;
  if (taskWebSortIcon) taskWebSortIcon.textContent = taskWebRankState.sort === "asc" ? "↑" : "↓";
  taskWebRankState.rows = filteredRows;
  taskWebRankState.year = yearValue;
  taskWebRankState.time = timeValue;
  taskWebRankState.title = data.title;
  taskWebRankState.metricLabel = data.metric;
  if (taskWebExport) taskWebExport.hidden = false;
  taskWebViewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.taskWebView === taskWebRankState.view);
  });
  taskWebViewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.taskWebViewPanel === taskWebRankState.view);
  });
  if (taskWebRankBody) {
    taskWebRankBody.innerHTML = filteredRows.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderGradeRankCell(item.gradeRank)}</td>
          <td class="rank-trend-cell">${renderWebRankTrend(item.gradeRankChange)}</td>
          <td>${item.classRank}</td>
          <td class="rank-trend-cell">${renderWebRankTrend(item.classRankChange)}</td>
          <td>${item.name}</td>
          <td>${item.no}</td>
          <td>${item.grade}</td>
          <td>${item.className}</td>
          <td><strong>${item.value}</strong></td>
        </tr>
      `).join("");
  }
  if (taskWebGradeBoard) {
    taskWebGradeBoard.innerHTML = renderTaskWebGradeLeaderboard(gradeRows, data, gradeValue, yearValue, "task");
  }
  if (taskWebClassWarning) taskWebClassWarning.hidden = taskWebRankState.view !== "class" || classValue !== "全部班級";
  if (taskWebClassBoard) {
    taskWebClassBoard.innerHTML = classValue === "全部班級"
      ? ""
      : renderTaskWebClassLeaderboard(filteredRows, data, "task");
  }
}

function renderPracticeWebRank(type = "score") {
  const data = practiceWebRankData[type] || practiceWebRankData.score;
  practiceWebRankState.metric = type;
  const yearValue = getSelectedText(practiceWebYearFilter, "2025-2026學年");
  const timeValue = getSelectedText(practiceWebTimeFilter, "本週");
  const gradeValue = practiceWebGradeFilter?.value || "S1";
  if (practiceWebRankState.view === "class") {
    selectFirstClassForGrade(practiceWebGradeFilter, practiceWebClassFilter);
  }
  const classValue = practiceWebClassFilter?.value || "全部班級";
  const gradeRows = filterRowsByManagedClasses([...data.rows])
    .filter((item) => item.grade === gradeValue)
    .sort((first, second) => first.gradeRank - second.gradeRank);
  const filteredRows = gradeRows
    .filter((item) => classValue === "全部班級" || item.className === classValue)
    .sort((first, second) => (
      practiceWebRankState.sort === "asc"
        ? first.gradeRank - second.gradeRank
        : second.gradeRank - first.gradeRank
    ));
  if (practiceWebRankTitle) practiceWebRankTitle.textContent = data.title;
  if (practiceWebRankMetric) practiceWebRankMetric.textContent = data.metric;
  if (practiceWebSortIcon) practiceWebSortIcon.textContent = practiceWebRankState.sort === "asc" ? "↑" : "↓";
  practiceWebRankState.rows = filteredRows;
  practiceWebRankState.year = yearValue;
  practiceWebRankState.time = timeValue;
  practiceWebRankState.title = data.title;
  practiceWebRankState.metricLabel = data.metric;
  if (practiceWebExport) practiceWebExport.hidden = false;
  practiceWebViewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.practiceWebView === practiceWebRankState.view);
  });
  practiceWebViewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.practiceWebViewPanel === practiceWebRankState.view);
  });
  if (practiceWebRankBody) {
    practiceWebRankBody.innerHTML = filteredRows.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderGradeRankCell(item.gradeRank)}</td>
          <td class="rank-trend-cell">${renderWebRankTrend(item.gradeRankChange)}</td>
          <td>${item.classRank}</td>
          <td class="rank-trend-cell">${renderWebRankTrend(item.classRankChange)}</td>
          <td>${item.name}</td>
          <td>${item.no}</td>
          <td>${item.grade}</td>
          <td>${item.className}</td>
          <td><strong>${item.value}</strong></td>
        </tr>
      `).join("");
  }
  if (practiceWebGradeBoard) {
    practiceWebGradeBoard.innerHTML = renderTaskWebGradeLeaderboard(gradeRows, data, gradeValue, yearValue, "practice");
  }
  if (practiceWebClassWarning) practiceWebClassWarning.hidden = practiceWebRankState.view !== "class" || classValue !== "全部班級";
  if (practiceWebClassBoard) {
    practiceWebClassBoard.innerHTML = classValue === "全部班級"
      ? ""
      : renderTaskWebClassLeaderboard(filteredRows, data, "practice");
  }
}

function renderGradeRankCell(rank) {
  const crowns = { 1: "gold", 2: "silver", 3: "bronze" };
  const crown = crowns[rank];
  if (!crown) return rank;
  return `<span class="rank-crown ${crown}" aria-label="年級第${rank}名">${rank}</span>`;
}

function renderTaskWebAvatar(item) {
  const rank = item.gradeRank || item.classRank || 1;
  const tone = rank % 3;
  const avatar = item.avatar || (((rank - 1) % 10) + 1);
  return `<span class="web-rank-avatar rank-avatar avatar-${avatar} tone-${tone}" aria-hidden="true"></span>`;
}

function renderWebRankTrend(change) {
  if (change === null || change === undefined) {
    return `<span class="web-rank-trend none" aria-label="上一週期無數據">-</span>`;
  }
  if (change === 0) {
    return `<span class="web-rank-trend same">持平</span>`;
  }
  const direction = change > 0 ? "up" : "down";
  const arrow = change > 0 ? "↑" : "↓";
  return `<span class="web-rank-trend ${direction}"><span>${arrow}</span>${Math.abs(change)}</span>`;
}

function renderTaskWebGradeLeaderboard(rows, data, grade, year, source = "task") {
  if (!rows.length) return `<div class="empty-rank-state">暫無排行榜數據</div>`;
  const useTaskAppStyle = source === "task" && ["完成總數", "任務總分"].includes(data.metric);
  const usePracticeAppStyle = source === "practice" && ["完成總數", "練習總分"].includes(data.metric);
  const usePracticeScoreAppStyle = source === "practice" && data.metric === "練習總分";
  const useAppStyle = useTaskAppStyle || usePracticeAppStyle;
  const appStyleClass = useAppStyle
    ? ` task-web-app-grade-layout ${usePracticeAppStyle ? `practice-web-app-grade-layout ${usePracticeScoreAppStyle ? "practice-web-app-score-layout" : "practice-web-app-finish-layout"}` : data.metric === "任務總分" ? "task-web-app-score-layout" : "task-web-app-finish-layout"}`
    : "";
  const topRows = rows.slice(0, 30);
  const podiumRows = rows.slice(0, 3);
  const listRows = topRows.slice(3);
  const maxValue = Math.max(...topRows.map((item) => item.value), 1);
  const stats = data.gradeStats?.[year]?.[grade];
  const inSchoolCount = stats?.inSchoolCount || rows.length;
  const total = stats?.total || rows.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / Math.max(inSchoolCount, 1));
  const averageLabel = data.averageLabel || `平均${data.metric}`;
  const podiumOrder = [1, 0, 2].filter((index) => podiumRows[index]);
  return `
    <section class="task-web-grade-layout${appStyleClass}">
      <div class="task-web-grade-podium" aria-label="${grade} 前三名">
        ${podiumOrder.map((index) => {
          const item = podiumRows[index];
          const level = item.gradeRank === 1 ? "first" : item.gradeRank === 2 ? "second" : "third";
          return `
            <article class="web-grade-podium-card ${level}">
              <span class="web-grade-crown">${item.gradeRank}</span>
              ${renderTaskWebAvatar(item)}
              <strong>${item.name}</strong>
              <small>${item.className}</small>
              <div class="web-grade-badges">
                <span>年級第${item.gradeRank}名</span>
              </div>
              ${renderWebRankTrend(item.gradeRankChange)}
              ${useAppStyle ? "" : `<em>${data.metric}</em>`}
              <b>${item.value}</b>
            </article>
          `;
        }).join("")}
      </div>
      <div class="task-web-grade-side">
        <div class="task-web-grade-stats">
          <article>
            <span class="stat-icon blue">級</span>
            <div><small>年級學生數</small><strong>${inSchoolCount}</strong></div>
          </article>
          <article>
            <span class="stat-icon teal">均</span>
            <div><small>${averageLabel}</small><strong>${average}</strong></div>
          </article>
        </div>
        <div class="task-web-grade-top-list">
          ${listRows.map((item) => `
            <article class="web-grade-top-row">
              <b>${item.gradeRank}</b>
              ${renderTaskWebAvatar(item)}
              <div class="web-grade-student">
                <strong>${item.name}</strong>
                <small>${item.className}</small>
              </div>
              <div class="web-grade-value-cell">
                ${renderWebRankTrend(item.gradeRankChange)}
                <i>${item.value}</i>
              </div>
              <div class="mini-progress"><span style="width: ${Math.max(10, Math.round((item.value / maxValue) * 100))}%"></span></div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTaskWebClassLeaderboard(rows, data, source = "task") {
  if (!rows.length) return `<div class="empty-rank-state">暫無排行榜數據</div>`;
  const useTaskAppStyle = source === "task" && ["完成總數", "任務總分"].includes(data.metric);
  const usePracticeAppStyle = source === "practice" && ["完成總數", "練習總分"].includes(data.metric);
  const usePracticeScoreAppStyle = source === "practice" && data.metric === "練習總分";
  const useAppStyle = useTaskAppStyle || usePracticeAppStyle;
  const appMetricClass = usePracticeAppStyle
    ? `practice-web-app-grade-layout ${usePracticeScoreAppStyle ? "practice-web-app-score-layout" : "practice-web-app-finish-layout"}`
    : data.metric === "任務總分" ? "task-web-app-score-layout" : "task-web-app-finish-layout";
  const appStyleClass = useAppStyle
    ? ` task-web-app-grade-layout task-web-app-class-layout ${appMetricClass}`
    : "";
  const classRows = [...rows].sort((first, second) => first.classRank - second.classRank).slice(0, 10);
  const podiumRows = classRows.slice(0, 3);
  const listRows = classRows.slice(3);
  const maxValue = Math.max(...classRows.map((item) => item.value), 1);
  const studentCount = rows.length;
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / Math.max(studentCount, 1));
  const averageLabel = data.averageLabel || `平均${data.metric}`;
  const podiumOrder = [1, 0, 2].filter((index) => podiumRows[index]);
  return `
    <section class="task-web-grade-layout task-web-class-layout${appStyleClass}">
      <div class="task-web-grade-podium" aria-label="班級前三名">
        ${podiumOrder.map((index) => {
          const item = podiumRows[index];
          const level = item.classRank === 1 ? "first" : item.classRank === 2 ? "second" : "third";
          return `
            <article class="web-grade-podium-card ${level}">
              <span class="web-grade-crown">${item.classRank}</span>
              ${renderTaskWebAvatar(item)}
              <strong>${item.name}</strong>
              <div class="web-grade-badges">
                <span>班級第${item.classRank}名</span>
              </div>
              ${renderWebRankTrend(item.classRankChange)}
              ${useAppStyle ? "" : `<em>${data.metric}</em>`}
              <b>${item.value}</b>
            </article>
          `;
        }).join("")}
      </div>
      <div class="task-web-grade-side">
        <div class="task-web-grade-stats">
          <article>
            <span class="stat-icon blue">班</span>
            <div><small>班級學生數</small><strong>${studentCount}</strong></div>
          </article>
          <article>
            <span class="stat-icon teal">均</span>
            <div><small>${averageLabel}</small><strong>${average}</strong></div>
          </article>
        </div>
        <div class="task-web-grade-top-list">
          ${listRows.map((item) => `
            <article class="web-grade-top-row web-class-top-row">
              <b>${item.classRank}</b>
              ${renderTaskWebAvatar(item)}
              <div class="web-grade-student">
                <strong>${item.name}</strong>
              </div>
              <div class="web-grade-value-cell">
                ${renderWebRankTrend(item.classRankChange)}
                <i>${item.value}</i>
              </div>
              <div class="mini-progress"><span style="width: ${Math.max(10, Math.round((item.value / maxValue) * 100))}%"></span></div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderCompactLeaderboard(rows, metric, mode) {
  if (!rows.length) return `<div class="empty-rank-state">暫無排行榜數據</div>`;
  return rows.map((item, index) => {
    const rank = mode === "class" ? item.classRank : item.gradeRank;
    return `
      <article class="compact-rank-row top-${rank}">
        <div class="compact-rank-no">${renderGradeRankCell(rank)}</div>
        <div>
          <strong>${item.name}</strong>
          <span>${item.no} · ${item.grade} · ${item.className}</span>
        </div>
        <b>${item.value}</b>
        <small>${metric}</small>
      </article>
    `;
  }).join("");
}

function setAppPage(page) {
  appScreens.forEach((screen) => screen.classList.toggle("active", screen.id === `app-${page}`));
  bottomNavButtons.forEach((button) => {
    const active = button.dataset.appPage === page || (button.dataset.appPage === "practice-ranking" && page === "ranking");
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
  });
  if (page === "ranking") renderTaskRank();
  if (page === "practice-ranking") renderPracticeRank();
}

function renderAppRank(type) {
  const data = rankData[type] || rankData.finish;
  const myIndex = students.indexOf(currentAppStudentName);
  const myRank = myIndex + 1;
  const myValue = data.values[myIndex];
  if (appRankTitle) appRankTitle.textContent = data.title;
  if (appRankPosition) appRankPosition.textContent = `第 ${myRank} 名`;
  if (appRankCopy) appRankCopy.textContent = `${data.metric} ${formatMetricValue(data.metric, myValue)}，比上週提升 4 名`;

  if (appPodium) {
    appPodium.innerHTML = [1, 0, 2].map((studentIndex) => `
      <div class="${studentIndex === 0 ? "first" : ""}">
        <b>${studentIndex + 1}</b>
        <strong>${students[studentIndex]}</strong>
        <span>${formatMetricValue(data.metric, data.values[studentIndex])}</span>
      </div>
    `).join("");
  }

  if (appRankList) {
    appRankList.innerHTML = data.values.slice(3).map((value, offset) => {
      const rank = offset + 4;
      return `
        <p>
          <b>${rank}</b>
          <span>${students[rank - 1]}</span>
          <strong>${formatMetricValue(data.metric, value)}</strong>
        </p>
      `;
    }).join("");
  }
}

function renderTaskRank() {
  const scopeData = taskRankData[taskRankState.scope] || taskRankData.class;
  const metricData = scopeData[taskRankState.metric] || scopeData.finish;
  const podiumOrder = [1, 0, 2];
  const rankLimit = 10;
  const mine = metricData.rows.find((item) => item.mine) || metricData.rows[0];
  const showMyRank = mine.rank <= rankLimit;

  if (taskRankPage) {
    taskRankPage.classList.toggle("metric-finish", taskRankState.metric === "finish");
    taskRankPage.classList.toggle("metric-score", taskRankState.metric === "score");
  }

  taskScopeTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.taskScope === taskRankState.scope));
  taskScopeTabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.taskScope === taskRankState.scope)));
  taskMetricTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.taskMetric === taskRankState.metric));
  taskMetricTabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.taskMetric === taskRankState.metric)));
  taskPeriodTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.taskPeriod === taskRankState.period));
  taskPeriodTabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.taskPeriod === taskRankState.period)));
  if (taskRankHeading) taskRankHeading.textContent = scopeData.heading;
  if (taskPodium) {
    taskPodium.innerHTML = podiumOrder.map((index) => {
      const item = metricData.podium[index];
      const className = item.rank === 1 ? "first" : item.rank === 3 ? "third" : "";
      return `
        <article class="task-podium-card ${className}">
          <div class="rank-avatar ${item.color} avatar-${item.avatar || item.rank}"></div>
          <span class="podium-no">${item.rank}</span>
          <strong>${item.name}</strong>
          <small>${metricData.label}</small>
          <b>${formatTaskValue(scaledTaskValue(item))}</b>
        </article>
      `;
    }).join("");
  }

  if (taskMyRank) taskMyRank.textContent = mine.rank;
  if (taskMyName) taskMyName.textContent = mine.name;
  if (taskMyLabel) taskMyLabel.textContent = "";
  if (taskMyValue) taskMyValue.textContent = formatTaskValue(scaledTaskValue(mine));
  if (taskMyAvatar) taskMyAvatar.className = `rank-avatar me avatar-${mine.avatar || mine.rank}`;
  if (taskMyTrend) taskMyTrend.innerHTML = renderTaskMyTrend(mine, metricData);
  if (taskMyCard) taskMyCard.hidden = !showMyRank;

  if (taskRankList) {
    taskRankList.innerHTML = metricData.rows
      .filter((item) => item.rank >= 4 && item.rank <= rankLimit)
      .sort((first, second) => first.rank - second.rank)
      .map((item) => `
      <article class="task-rank-row">
        <b>${item.rank}</b>
        <div class="rank-avatar ${item.color} avatar-${item.avatar || item.rank}"></div>
        <div>
          <strong>${item.name}</strong>
          ${renderTaskTrend(item)}
        </div>
        <em>${formatTaskValue(scaledTaskValue(item))}</em>
      </article>
    `).join("");
  }
}

function renderTaskMyTrend(mine, metricData) {
  const allRows = [...metricData.podium, ...metricData.rows].sort((first, second) => first.rank - second.rank);
  const previous = allRows.find((item) => item.rank === mine.rank - 1);
  const gap = previous ? Math.max(0, scaledTaskValue(previous) - scaledTaskValue(mine)) : 0;
  const unit = metricData.title.includes("總分") ? "分" : "次";
  const change = mine.change ?? 1;
  if (change === 0) return `<span class="rank-change same">持平</span><b>距離上一名還差 ${gap} ${unit}！繼續加油！</b>`;
  const direction = change > 0 ? "up" : "down";
  const arrow = change > 0 ? "↑" : "↓";
  return `<span class="rank-change ${direction}"><span>${arrow}</span>${Math.abs(change)}</span><b>距離上一名還差 ${gap} ${unit}！繼續加油！</b>`;
}

function renderTaskTrend(item) {
  const fallback = item.rank % 2 === 0 ? -1 : 1;
  const change = item.change ?? fallback;
  if (change === 0) return `<small class="rank-change same">持平</small>`;
  const direction = change > 0 ? "up" : "down";
  const arrow = change > 0 ? "↑" : "↓";
  return `<small class="rank-change ${direction}"><span>${arrow}</span>${Math.abs(change)}</small>`;
}

function renderPracticeRank() {
  const { metricData, sourceType } = getPracticeBoardData();
  const podiumOrder = [1, 0, 2];
  const mine = metricData.rows.find((item) => item.mine) || metricData.rows[0];
  const scopeLabel = practiceRankState.scope === "grade" ? "年級" : "班級";
  const rankLimit = 10;
  const showMyRank = mine.rank <= rankLimit;

  if (practiceRankPage) {
    practiceRankPage.classList.toggle("metric-task-score", sourceType === "task");
    practiceRankPage.classList.toggle("metric-practice-score", sourceType === "practice");
  }

  practiceScopeTabs.forEach((tab) => {
    const active = tab.dataset.practiceScope === practiceRankState.scope;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  practiceMetricTabs.forEach((tab) => {
    const active = tab.dataset.practiceMetric === practiceRankState.metric;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  if (practiceScopeLabel) practiceScopeLabel.textContent = scopeLabel;
  practiceScopeOptions.forEach((option) => {
    const active = option.dataset.practiceScopeOption === practiceRankState.scope;
    option.classList.toggle("active", active);
    option.setAttribute("aria-checked", String(active));
  });
  practicePeriodTabs.forEach((tab) => {
    const active = tab.dataset.practicePeriod === practiceRankState.period;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  if (practicePeriodMore) {
    const inMore = ["first", "middle", "second", "year"].includes(practiceRankState.period);
    practicePeriodMore.value = inMore ? practiceRankState.period : "";
    practicePeriodMore.parentElement?.classList.toggle("active", inMore);
  }

  if (practicePodium) {
    practicePodium.innerHTML = podiumOrder.map((index) => {
      const item = metricData.podium[index];
      const className = item.rank === 1 ? "first" : item.rank === 3 ? "third" : "";
      return `
        <article class="task-podium-card ${className}">
          <div class="rank-avatar ${item.color} avatar-${item.avatar || item.rank}"></div>
          <span class="podium-no">${item.rank}</span>
          <strong>${item.name}</strong>
          <small>${metricData.label}</small>
          <b>${formatTaskValue(scaledPracticeValue(item))}</b>
        </article>
      `;
    }).join("");
  }

  if (practiceMyRank) practiceMyRank.textContent = mine.rank;
  if (practiceMyValue) practiceMyValue.textContent = formatTaskValue(scaledPracticeValue(mine));
  if (practiceMyAvatar) practiceMyAvatar.className = `rank-avatar me avatar-${mine.avatar || mine.rank}`;
  if (practiceMyTrend) practiceMyTrend.innerHTML = renderPracticeMyTrend(mine, metricData);
  practiceMyRank?.closest(".task-my-rank")?.toggleAttribute("hidden", !showMyRank);

  if (practiceRankList) {
    practiceRankList.innerHTML = metricData.rows
      .filter((item) => item.rank >= 4 && item.rank <= rankLimit)
      .sort((first, second) => first.rank - second.rank)
      .map((item) => `
      <article class="task-rank-row">
        <b>${item.rank}</b>
        <div class="rank-avatar ${item.color} avatar-${item.avatar || item.rank}"></div>
        <div>
          <strong>${item.name}</strong>
          ${renderTaskTrend(item)}
        </div>
        <em>${formatTaskValue(scaledPracticeValue(item))}</em>
      </article>
    `).join("");
  }
}

function renderPracticeMyTrend(mine, metricData) {
  const allRows = [...metricData.podium, ...metricData.rows].sort((first, second) => first.rank - second.rank);
  const previous = allRows.find((item) => item.rank === mine.rank - 1);
  const gap = previous ? Math.max(0, scaledPracticeValue(previous) - scaledPracticeValue(mine)) : 0;
  const unit = metricData.title.includes("總分") ? "分" : "次";
  const change = mine.change ?? 1;
  if (change === 0) return `<span class="rank-change same">持平</span><b>距離上一名還差 ${gap} ${unit}！繼續加油！</b>`;
  const direction = change > 0 ? "up" : "down";
  const arrow = change > 0 ? "↑" : "↓";
  return `<span class="rank-change ${direction}"><span>${arrow}</span>${Math.abs(change)}</span><b>距離上一名還差 ${gap} ${unit}！繼續加油！</b>`;
}

function applyYearRangeToTermForm(year) {
  const range = schoolYearDateRanges[year] || schoolYearDateRanges["2025-2026學年"];
  const rangeNote = modalBody?.querySelector("[data-year-range-note]");
  const termStart = modalBody?.querySelector("[data-term-start]");
  const termEnd = modalBody?.querySelector("[data-term-end]");
  if (rangeNote) rangeNote.textContent = `所選學年起止日期：${range.start} ~ ${range.end}`;
  [termStart, termEnd].forEach((input) => {
    if (!input) return;
    input.dataset.min = range.start;
    input.dataset.max = range.end;
  });
}

function parseISODate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    return null;
  }
  return date;
}

function formatISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sameDate(first, second) {
  return first && second && formatISODate(first) === formatISODate(second);
}

function dateIsOutOfRange(date, input) {
  const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const minDate = parseISODate(input?.dataset.min);
  const maxDate = parseISODate(input?.dataset.max);
  if (minDate && checkDate < minDate) return true;
  if (maxDate && checkDate > maxDate) return true;
  return false;
}

function ensureDatePickerLayer() {
  if (datePickerLayer) return datePickerLayer;
  datePickerLayer = document.createElement("div");
  datePickerLayer.className = "date-picker-popover";
  datePickerLayer.hidden = true;
  datePickerLayer.innerHTML = `
    <div class="date-picker-head">
      <button type="button" data-date-prev-year>«</button>
      <button type="button" data-date-prev-month>‹</button>
      <strong data-date-title></strong>
      <button type="button" data-date-next-month>›</button>
      <button type="button" data-date-next-year>»</button>
    </div>
    <div class="date-picker-week">
      <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
    </div>
    <div class="date-picker-grid" data-date-grid></div>
    <div class="date-picker-foot">
      <button type="button" class="ghost-btn small" data-date-today>今天</button>
      <button type="button" class="primary-btn small" data-date-confirm>確定</button>
    </div>
  `;
  document.body.appendChild(datePickerLayer);
  datePickerLayer.querySelector("[data-date-prev-year]")?.addEventListener("click", () => shiftDatePicker(-1, "year"));
  datePickerLayer.querySelector("[data-date-prev-month]")?.addEventListener("click", () => shiftDatePicker(-1, "month"));
  datePickerLayer.querySelector("[data-date-next-month]")?.addEventListener("click", () => shiftDatePicker(1, "month"));
  datePickerLayer.querySelector("[data-date-next-year]")?.addEventListener("click", () => shiftDatePicker(1, "year"));
  datePickerLayer.querySelector("[data-date-today]")?.addEventListener("click", () => selectDateFromPicker(new Date()));
  datePickerLayer.querySelector("[data-date-confirm]")?.addEventListener("click", () => {
    if (datePickerState.input && datePickerState.selectedDate) {
      datePickerState.input.value = formatISODate(datePickerState.selectedDate);
    }
    closeDatePicker();
  });
  datePickerLayer.querySelector("[data-date-grid]")?.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-date-value]");
    if (!dayButton || dayButton.disabled) return;
    selectDateFromPicker(parseISODate(dayButton.dataset.dateValue));
  });
  document.addEventListener("click", (event) => {
    if (!datePickerLayer || datePickerLayer.hidden) return;
    if (datePickerLayer.contains(event.target) || event.target.closest("[data-date-picker]")) return;
    closeDatePicker();
  });
  window.addEventListener("resize", positionDatePicker);
  return datePickerLayer;
}

function shiftDatePicker(amount, unit) {
  if (!datePickerState.viewDate) return;
  const next = new Date(datePickerState.viewDate);
  if (unit === "year") next.setFullYear(next.getFullYear() + amount);
  if (unit === "month") next.setMonth(next.getMonth() + amount);
  datePickerState.viewDate = next;
  renderDatePicker();
}

function selectDateFromPicker(date) {
  if (!date || !datePickerState.input || dateIsOutOfRange(date, datePickerState.input)) return;
  datePickerState.selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  datePickerState.viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
  renderDatePicker();
}

function renderDatePicker() {
  const layer = ensureDatePickerLayer();
  const title = layer.querySelector("[data-date-title]");
  const grid = layer.querySelector("[data-date-grid]");
  if (!datePickerState.viewDate || !grid) return;
  const year = datePickerState.viewDate.getFullYear();
  const month = datePickerState.viewDate.getMonth();
  if (title) title.textContent = `${year}年 ${month + 1}月`;
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDay.getDay());
  const today = new Date();
  grid.innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const value = formatISODate(date);
    const isOtherMonth = date.getMonth() !== month;
    const isSelected = sameDate(date, datePickerState.selectedDate);
    const isToday = sameDate(date, today);
    const isDisabled = dateIsOutOfRange(date, datePickerState.input);
    const className = [
      isOtherMonth ? "muted" : "",
      isSelected ? "selected" : "",
      isToday ? "today" : ""
    ].filter(Boolean).join(" ");
    return `<button type="button" class="${className}" data-date-value="${value}"${isDisabled ? " disabled" : ""}>${date.getDate()}</button>`;
  }).join("");
}

function positionDatePicker() {
  if (!datePickerLayer || datePickerLayer.hidden || !datePickerState.input) return;
  const rect = datePickerState.input.getBoundingClientRect();
  const pickerWidth = Math.min(280, window.innerWidth - 24);
  const left = Math.min(Math.max(12, rect.left), window.innerWidth - pickerWidth - 12);
  const top = Math.min(rect.bottom + 8, window.innerHeight - 352);
  datePickerLayer.style.left = `${left}px`;
  datePickerLayer.style.top = `${Math.max(12, top)}px`;
  datePickerLayer.style.width = `${pickerWidth}px`;
}

function openDatePicker(input) {
  const layer = ensureDatePickerLayer();
  const currentDate = parseISODate(input.value) || new Date();
  datePickerState = {
    input,
    viewDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    selectedDate: currentDate
  };
  renderDatePicker();
  layer.hidden = false;
  positionDatePicker();
}

function closeDatePicker() {
  if (datePickerLayer) datePickerLayer.hidden = true;
  datePickerState.input = null;
}

function setupDatePickers(scope = modalBody) {
  scope?.querySelectorAll("[data-date-picker]").forEach((input) => {
    input.addEventListener("click", () => openDatePicker(input));
    input.addEventListener("focus", () => openDatePicker(input));
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDatePicker(input);
      }
    });
  });
}

function setupYearModal(initialYear) {
  const yearSelect = modalBody?.querySelector("[data-year-modal-select]");
  const yearStart = modalBody?.querySelector("[data-year-start]");
  const yearEnd = modalBody?.querySelector("[data-year-end]");
  if (!yearSelect) return;
  if (initialYear) yearSelect.value = initialYear;
  const syncYearDates = () => {
    const range = schoolYearDateRanges[yearSelect.value];
    if (range && yearStart && yearEnd) {
      yearStart.value = range.start;
      yearEnd.value = range.end;
    }
  };
  syncYearDates();
  yearSelect.addEventListener("change", syncYearDates);
  setupDatePickers();
}

function setupTermModal() {
  const yearSelect = modalBody?.querySelector("[data-year-select]");
  if (!yearSelect) return;
  applyYearRangeToTermForm(yearSelect.value);
  yearSelect.addEventListener("change", () => applyYearRangeToTermForm(yearSelect.value));
  setupDatePickers();
}

function setupStudentModal() {
  const statusSelect = modalBody?.querySelector("[data-student-school-status]");
  const reasonGroup = modalBody?.querySelector("[data-status-reason-group]");
  const reasonTitle = modalBody?.querySelector("[data-status-reason-title]");
  const transferReason = modalBody?.querySelector("[data-transfer-reason]");
  const leaveReasons = modalBody?.querySelectorAll("[data-leave-reason]");
  const transferNote = modalBody?.querySelector("[data-transfer-login-note]");
  if (!statusSelect || !reasonGroup) return;
  const syncLeaveReason = () => {
    const isLeave = statusSelect.value === "離校";
    const isTransfer = statusSelect.value === "轉移";
    const shouldShowReason = isLeave || isTransfer;
    reasonGroup.hidden = !shouldShowReason;
    reasonGroup.style.display = shouldShowReason ? "" : "none";
    reasonGroup.setAttribute("aria-hidden", String(!shouldShowReason));
    if (reasonTitle) reasonTitle.textContent = isTransfer ? "轉移原因" : "離校原因";
    if (transferReason) {
      transferReason.hidden = !isTransfer;
      transferReason.style.display = isTransfer ? "" : "none";
    }
    leaveReasons?.forEach((item) => {
      item.hidden = isTransfer;
      item.style.display = isTransfer ? "none" : "";
    });
    if (isTransfer) {
      const transferInput = transferReason?.querySelector("input");
      if (transferInput) transferInput.checked = true;
    } else if (isLeave) {
      const firstLeaveInput = [...(leaveReasons || [])].find((item) => !item.hidden)?.querySelector("input");
      if (firstLeaveInput && transferReason?.querySelector("input")?.checked) firstLeaveInput.checked = true;
    }
    if (transferNote) transferNote.hidden = !isTransfer;
  };
  syncLeaveReason();
  statusSelect.addEventListener("change", syncLeaveReason);
}

function openModal(type, initialYear) {
  const content = modalContent[type];
  if (!content) return;
  if (!modalLayer || !modalTitle || !modalBody) return;
  const isImportDrawer = false;
  modalTitle.textContent = content.title;
  modalBody.className = "modal-body";
  modalLayer.classList.toggle("drawer-modal", isImportDrawer);
  modalFooter?.classList.toggle("single-action", isImportDrawer);
  if (modalCancelButton) modalCancelButton.hidden = isImportDrawer;
  if (modalConfirmButton) {
    modalConfirmButton.textContent = isImportDrawer ? "關閉" : "確定";
    modalConfirmButton.onclick = null;
    modalConfirmButton.disabled = false;
  }
  modalBody.classList.toggle("modal-body-long", type === "class" || type === "student");
  modalBody.innerHTML = content.html;
  if (type === "year" || type === "yearEdit") setupYearModal(initialYear);
  if (type === "term" || type === "termEdit") setupTermModal();
  if (type === "student") setupStudentModal();
  if (isImportDrawer) {
    const importTrigger = modalBody.querySelector("[data-import-trigger]");
    const importFile = modalBody.querySelector("[data-import-file]");
    importTrigger?.addEventListener("click", () => importFile?.click());
  }
  modalLayer.hidden = false;
}

modeTabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
sideSubs.forEach((item) => item.addEventListener("click", () => setWebPage(item.dataset.webPage, item.dataset.rankingTarget)));
devWebButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode("web");
    setWebPage(button.dataset.devWebPage, button.dataset.rankingTarget);
    if (button.dataset.devWebPage === "upgrade-import" && button.dataset.devUpgradeStep) {
      setUpgradeStep(Number(button.dataset.devUpgradeStep));
    }
  });
});
devAppButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode("app");
    setAppPage(button.dataset.devAppPage);
  });
});
devModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode("web");
    if (button.dataset.devWebPage) setWebPage(button.dataset.devWebPage, button.dataset.rankingTarget);
    openModal(button.dataset.devModal);
  });
});
yearListQuery?.addEventListener("click", () => {
  renderSchoolYearList(yearListFilter?.value || "2025-2026學年");
});
yearListReset?.addEventListener("click", () => {
  if (yearListFilter) yearListFilter.value = "2025-2026學年";
  renderSchoolYearList("2025-2026學年");
});
termListQuery?.addEventListener("click", renderTermList);
termListReset?.addEventListener("click", () => {
  if (termListYearFilter) termListYearFilter.value = "2025-2026學年";
  if (termListTermFilter) termListTermFilter.value = "全部";
  renderTermList();
});
upgradeFileTrigger?.addEventListener("click", () => upgradeFile?.click());
upgradeFile?.addEventListener("change", () => {
  setUpgradeFileStatus(upgradeFile.files?.[0]);
});
upgradeNext?.addEventListener("click", () => {
  if (upgradeImportState.fileReady) setUpgradeStep(2);
});
upgradePrevButtons.forEach((button) => {
  button.addEventListener("click", () => setUpgradeStep(upgradeImportState.step - 1));
});
upgradeConfirmButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.textContent.includes("跳過")) {
      const canImport = validateUpgradePanel(document.querySelector(`[data-upgrade-panel="${upgradeImportState.step}"]`), "full");
      if (!canImport) return;
    }
    setUpgradeStep(upgradeImportState.step + 1);
  });
});
upgradeStepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetStep = Number(button.dataset.upgradeStepNav);
    if (targetStep <= upgradeImportState.maxStep) {
      setUpgradeStep(targetStep);
    }
  });
});
document.querySelectorAll("[data-upgrade-complete]").forEach((button) => {
  button.addEventListener("click", () => {
    const canImport = validateUpgradePanel(document.querySelector(`[data-upgrade-panel="${upgradeImportState.step}"]`), "full");
    if (!canImport) return;
    upgradeImportState.maxStep = 5;
    setUpgradeStep(5);
  });
});
document.querySelectorAll(".upgrade-preview-table").forEach((preview) => {
  preview.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-upgrade-row-edit]");
    const deleteButton = event.target.closest("[data-upgrade-row-delete]");
    const row = event.target.closest("tr");
    if (!row) return;
    if (editButton) openUpgradeRowEditModal(row);
    if (deleteButton) openUpgradeRowDeleteConfirm(row);
  });
});
setupUpgradePreviewTables();
rankTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    rankTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderRank(tab.dataset.rankType);
  });
});

taskWebRankTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    taskWebRankTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    taskWebRankState.view = "table";
    renderTaskWebRank(tab.dataset.taskWebRankTab);
  });
});

rankingTabs.forEach((button) => {
  button.addEventListener("click", () => setWebRankingTab(button.dataset.rankingTab));
});

taskWebSort?.addEventListener("click", () => {
  taskWebRankState.sort = taskWebRankState.sort === "asc" ? "desc" : "asc";
  renderTaskWebRank(taskWebRankState.metric);
});

taskWebViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    taskWebRankState.view = button.dataset.taskWebView;
    renderTaskWebRank(taskWebRankState.metric);
  });
});

taskWebQuery?.addEventListener("click", () => {
  renderTaskWebRank(taskWebRankState.metric);
});

taskWebExport?.addEventListener("click", () => {
  exportWebRank(taskWebRankState);
});

taskWebGradeFilter?.addEventListener("change", () => {
  renderTaskWebRank(taskWebRankState.metric);
});

taskWebClassFilter?.addEventListener("change", () => {
  renderTaskWebRank(taskWebRankState.metric);
});

taskWebReset?.addEventListener("click", () => {
  if (taskWebYearFilter) taskWebYearFilter.value = "2025-2026學年";
  if (taskWebTimeFilter) taskWebTimeFilter.value = "本週";
  if (taskWebGradeFilter) taskWebGradeFilter.value = "S1";
  if (taskWebClassFilter) taskWebClassFilter.value = "全部班級";
  taskWebRankState.sort = "asc";
  taskWebRankState.view = "table";
  renderTaskWebRank(taskWebRankState.metric);
});

practiceWebRankTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    practiceWebRankTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    practiceWebRankState.view = "table";
    renderPracticeWebRank(tab.dataset.practiceWebRankTab);
  });
});

practiceWebSort?.addEventListener("click", () => {
  practiceWebRankState.sort = practiceWebRankState.sort === "asc" ? "desc" : "asc";
  renderPracticeWebRank(practiceWebRankState.metric);
});

practiceWebViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    practiceWebRankState.view = button.dataset.practiceWebView;
    renderPracticeWebRank(practiceWebRankState.metric);
  });
});

practiceWebQuery?.addEventListener("click", () => {
  renderPracticeWebRank(practiceWebRankState.metric);
});

practiceWebExport?.addEventListener("click", () => {
  exportWebRank(practiceWebRankState);
});

practiceWebGradeFilter?.addEventListener("change", () => {
  renderPracticeWebRank(practiceWebRankState.metric);
});

practiceWebClassFilter?.addEventListener("change", () => {
  renderPracticeWebRank(practiceWebRankState.metric);
});

practiceWebReset?.addEventListener("click", () => {
  if (practiceWebYearFilter) practiceWebYearFilter.value = "2025-2026學年";
  if (practiceWebTimeFilter) practiceWebTimeFilter.value = "本週";
  if (practiceWebGradeFilter) practiceWebGradeFilter.value = "S1";
  if (practiceWebClassFilter) practiceWebClassFilter.value = "全部班級";
  practiceWebRankState.sort = "asc";
  practiceWebRankState.view = "table";
  renderPracticeWebRank(practiceWebRankState.metric);
});

taskStudentVisibleInput?.addEventListener("change", () => {
  taskWebRankState.studentVisible = taskStudentVisibleInput.checked;
});


practiceStudentVisibleInput?.addEventListener("change", () => {
  practiceWebRankState.studentVisible = practiceStudentVisibleInput.checked;
  syncStudentRankVisibility();
});


viewToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.rankView;
    viewToggles.forEach((item) => item.classList.toggle("active", item.dataset.rankView === view));
    rankViewPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.rankViewPanel === view));
  });
});

appLinks.forEach((link) => link.addEventListener("click", () => setAppPage(link.dataset.appPage)));
appRankTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    appRankTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderAppRank(tab.dataset.appRank);
  });
});

taskScopeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    taskRankState.scope = tab.dataset.taskScope;
    renderTaskRank();
  });
});

taskMetricTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    taskRankState.metric = tab.dataset.taskMetric;
    renderTaskRank();
  });
});

taskPeriodTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    taskRankState.period = tab.dataset.taskPeriod;
    renderTaskRank();
  });
});

practiceScopeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    practiceRankState.scope = tab.dataset.practiceScope;
    renderPracticeRank();
  });
});

practiceScopeToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = practiceScopeDropdown?.classList.toggle("open");
  practiceScopeToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

practiceScopeOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.stopPropagation();
    practiceRankState.scope = option.dataset.practiceScopeOption || "class";
    practiceScopeDropdown?.classList.remove("open");
    practiceScopeToggle?.setAttribute("aria-expanded", "false");
    renderPracticeRank();
  });
});

document.addEventListener("click", (event) => {
  if (!practiceScopeDropdown?.contains(event.target)) {
    practiceScopeDropdown?.classList.remove("open");
    practiceScopeToggle?.setAttribute("aria-expanded", "false");
  }
});

practiceMetricTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    practiceRankState.metric = tab.dataset.practiceMetric;
    renderPracticeRank();
  });
});

practicePeriodTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    practiceRankState.period = tab.dataset.practicePeriod;
    if (practicePeriodMore) practicePeriodMore.value = "";
    renderPracticeRank();
  });
});

practicePeriodMore?.addEventListener("change", () => {
  if (!practicePeriodMore.value) return;
  practiceRankState.period = practicePeriodMore.value;
  renderPracticeRank();
});

document.querySelectorAll(".management-card, .class-management-card").forEach((card) => {
  const gradeButtons = card.querySelectorAll("[data-grade-filter]");
  const gradeRows = card.querySelectorAll("[data-class-grade]");
  gradeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const grade = button.dataset.gradeFilter;
      gradeButtons.forEach((item) => item.classList.toggle("active", item === button));
      gradeRows.forEach((row) => {
        row.hidden = grade !== "all" && row.dataset.classGrade !== grade;
      });
    });
  });
});

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modal, button.dataset.yearValue));
});

document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", () => {
    closeDatePicker();
    modalLayer.hidden = true;
  });
});

if (modalLayer) {
  modalLayer.addEventListener("click", (event) => {
    if (event.target === modalLayer) {
      closeDatePicker();
      modalLayer.hidden = true;
    }
  });
}

renderSchoolYearList("2025-2026學年");
renderTermList();
renderRank("finish");
syncRankPermissionInputs();
renderTaskWebRank("score");
renderPracticeWebRank("score");
renderAppRank("finish");
renderTaskRank();
renderPracticeRank();

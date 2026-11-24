import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/CompositionImport.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/composition-import.css', import.meta.url), 'utf8');
const taskCss = readFileSync(new URL('../src/task-management-overrides.css', import.meta.url), 'utf8');

test('all batch scenarios share class/task metadata labels without changing task names', () => {
  const banner = source.slice(source.indexOf('className="batch-task-banner"'), source.indexOf('className="batch-task-banner"') + 650);
  assert.match(banner, /<b>班级<\/b>/);
  assert.match(banner, /<b>任务<\/b>/);
  assert.doesNotMatch(banner, /<b>题目<\/b>/);
  assert.match(banner, /batchTask \? batchTask.name : "我的老師"/);
});

test('filename publishing menu keeps only the retained publish flow', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const nav = app.slice(app.indexOf('const publishNav ='), app.indexOf('const taskManagementNav ='));
  assert.deepEqual([...nav.matchAll(/\["([^"]+)", \w+, "([^"]+)"(?:, "[^"]+")?\]/g)].map(m=>[m[1],m[2]]), [
    ['publish','发布任务'],
  ]);
  assert.doesNotMatch(nav, /新增需求/);
});

test('prototype sidebar keeps publish and task management as flat screenshot-matched entries', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const sidebar = app.slice(app.indexOf('function LegacySidebar'), app.indexOf('function Dots'));
  assert.match(app, /const sidebarNav = \[publishNav\[0\], taskManagementNav\[0\]\]/);
  assert.match(app, /const taskManagementNav = \[\["tasks", List, "任务管理"\]\]/);
  assert.match(sidebar, /className=\{`composition-item/);
  assert.doesNotMatch(sidebar, /composition-parent|composition-submenu/);
});

test('new publish requirement is marked in the publish menu and essay task card', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /<span className="requirement-name">新增作文題庫<\/span>/);
  assert.match(app, /id === "publish" \|\| id === "essay-bank"\) && <small className="requirement-badge">需求<\/small>/);
  assert.match(app, /id === "essay" && <span className="requirement-badge task-card-requirement">需求<\/span>/);
  assert.doesNotMatch(app, /panel-requirement-badge|需求标识|新增需求/);
  assert.doesNotMatch(app, /新增需求/);
});

test('sidebar hides retired import scenes while keeping retry logic internal', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const nav = app.slice(app.indexOf('const publishNav ='), app.indexOf('const taskManagementNav ='));
  assert.doesNotMatch(nav, /import-exception-reupload/);
  assert.doesNotMatch(nav, /import-exception-partial/);
  assert.match(source, /onClick=\{\(\) => simulateSummaryReupload\(record.id\)\}/);
  const scenes = readFileSync(new URL('../src/dialog-scenarios.mjs', import.meta.url), 'utf8');
  assert.match(scenes, /异常汇总弹窗 → 异常文件行点击重新导入/);
});

test('publish flow selects a topic and carries both topic id and title forward', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const configure = app.slice(app.indexOf('function Configure'), app.indexOf('function Publish'));
  assert.match(app, /import \{ essayTopicsFromCsv \} from "\.\/essayTopicsData";/);
  assert.match(configure, /请输入作文题目/);
  assert.match(configure, /topic-input-note/);
  assert.match(configure, /自主输入并发布后，题目将保存至校本庫/);
  assert.match(configure, /选择作文题目/);
  assert.match(configure, /topic-input-picker-button/);
  assert.doesNotMatch(configure, /topic-mode-switch|topic-tab-requirement/);
  assert.match(app, /CSV 题库中的 42 道题目/);
  assert.match(configure, /输入题目、关键词/);
  assert.match(configure, /<textarea/);
  assert.match(configure, /<h2>設定寫作題目和要求<\/h2>/);
  assert.doesNotMatch(configure, /配置寫作任務參數/);
  assert.match(configure, /公共庫/);
  assert.match(configure, /校本庫/);
  assert.match(configure, /topic-picker-library-tabs/);
  assert.match(configure, /topicLibrary/);
  assert.match(configure, /topic-picker-drawer/);
  assert.match(configure, /topic-picker-backdrop/);
  assert.doesNotMatch(configure, /\["year", "年份"\]/);
  assert.match(app, /questionForm: "題目形式"/);
  assert.match(app, /writingGenre: "寫作體裁"/);
  assert.match(app, /category: "作文類別"/);
  assert.match(configure, /确定选择/);
  assert.match(configure, /取消/);
  assert.match(configure, /role="listbox"/);
  assert.doesNotMatch(configure, /topic-picker-detail|作文完整题目内容|previewNeedsDetail|detailTopicId/);
  assert.match(configure, /data-full-title=\{topic\.displayTitle\.length > 20 \? topic\.displayTitle : undefined\}/);
  assert.doesNotMatch(configure, /title=\{topic\.title\}/);
  assert.doesNotMatch(configure, /作文要求<\/span>/);
  assert.match(configure, /topic-picker-title/);
  assert.match(configure, /value=\{isCustom \? \(form\.customTitle \|\| ""\) : \(form\.title \|\| ""\)\}/);
  assert.match(configure, /topic\.requirement/);
  assert.match(taskCss, /grid-template-columns: 24px minmax\(0, 1fr\) 90px 72px 100px 20px;/);
  assert.match(taskCss, /height: 82px;[\s\S]*-webkit-line-clamp: 3;/);
  assert.match(taskCss, /topic-picker-drawer-body \{[\s\S]*height: 100%;[\s\S]*overflow: hidden;/);
  assert.match(taskCss, /topic-picker-drawer-body \.topic-picker-list \{[\s\S]*height: 100%;/);
  assert.match(taskCss, /topic-picker-library-tabs[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)/);
  assert.match(taskCss, /topic-picker-library-tabs button\.active[\s\S]*color: #2864eb/);
  assert.match(taskCss, /topic-picker-option:not\(:last-child\)[\s\S]*border-bottom: 1px solid #e8edf4/);
  assert.match(taskCss, /topic-picker-option\[data-full-title\]::after[\s\S]*width: min\(760px/);
  assert.match(taskCss, /topic-picker-option\[data-full-title\]::after[\s\S]*padding: 14px 16px/);
  assert.match(taskCss, /topic-picker-option\[data-full-title\]::after[\s\S]*font-size: 19\.5px/);
  assert.match(taskCss, /topic-input-picker-button[\s\S]*background: #2864eb/);
  assert.match(taskCss, /form-card textarea[\s\S]*width: 100%;[\s\S]*box-sizing: border-box/);
  assert.match(taskCss, /publish-flow-shell \.topic-picker-pill,[\s\S]*essay-bank-page \.topic-picker-pill[\s\S]*background: transparent !important/);
  assert.match(taskCss, /task-management-app \.task-workspace \{[\s\S]*padding-top: 72px/);
  assert.match(taskCss, /publish-flow-shell \.workspace \{[\s\S]*padding-top: 72px/);
  assert.match(taskCss, /task-management-app \.task-table thead \{[\s\S]*z-index: 100[\s\S]*background: #f3f6fc[\s\S]*box-shadow: 0 10px 0/);
  assert.match(taskCss, /task-management-app \.task-table th \{[\s\S]*z-index: 20[\s\S]*box-shadow: inset 0 -1px 0/);
  assert.match(taskCss, /task-management-app \.task-table th:last-child \{[\s\S]*z-index: 110/);
  assert.match(taskCss, /task-management-app \.task-table th:last-child,[\s\S]*task-management-app \.task-table td:last-child \{[\s\S]*z-index: 2/);
  assert.doesNotMatch(taskCss, /repeat\(3, max-content\)|topic-picker-detail/);
  const topicData = readFileSync(new URL('../src/essayTopicsData.js', import.meta.url), 'utf8');
  assert.equal((topicData.match(/"questionCode":/g) || []).length, 42);
  assert.doesNotMatch(configure, /<optgroup/);
  assert.match(configure, /onClick=\{isCustom \? generate : nextExisting\}/);
  assert.match(app, /topicId: form\.topicId \|\| null/);
  assert.match(app, /topicTitle: form\.title \|\| ""/);
  assert.match(app, /以「\$\{form\.title\}」為核心意象/);
});

test('essay topic taxonomy uses the shared labels, order and normalized genre value', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /const ESSAY_TOPIC_FIELD_LABELS/);
  assert.match(app, /"觀點評論",\n    "直接命題",\n    "材料引導"/);
  assert.match(app, /writingGenre: \["不限", "論說文", "記敘抒情"\]/);
  assert.match(app, /topic\.writingGenre === "記敍抒情" \? "記敘抒情"/);
  assert.match(app, /setTopicLibrary\("all"\);/);
});

test('publish flow keeps the two upload methods without legacy import modal controls', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const publish = app.slice(app.indexOf('function Publish'), app.indexOf('export function App'));
  const taskList = readFileSync(new URL('../src/TaskManagement.jsx', import.meta.url), 'utf8');
  assert.match(publish, /老師批量導入/);
  assert.match(publish, /學生自助上載/);
  assert.match(publish, /uploadMethod/);
  assert.doesNotMatch(publish, /选择批量导入班级|batchClassOpen/);
  assert.match(publish, /作文上載方式/);
  assert.doesNotMatch(publish, /确认作文要求与发布参数|作文要求（可編輯）|評分標準|AI 生成評分標準與要求/);
  assert.match(publish, /<h3>[\s\S]*任務設置/);
  assert.doesNotMatch(taskList, /批量提交|batch-submit-btn/);
  assert.match(app, /studentResultsVisible,\n      name: form\.title/);
});

test('prototype opens on the publish task-type page by default', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /const \[view, setView\] = useState\("publish"\)/);
  assert.match(app, /<span className="requirement-name">新增作文題庫<\/span>/);
  assert.doesNotMatch(app, /panel-requirement-badge|需求标识|新增需求/);
});

test('all current pages remove the display-mode switch and show the current acceptance checklist', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const checklist = readFileSync(new URL('../src/CurrentAcceptanceChecklist.jsx', import.meta.url), 'utf8');
  const acceptanceItems = readFileSync(new URL('../src/current-acceptance-items.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /theme-selector|明亮模式|深色模式|选择显示模式/);
  assert.match(app, /CurrentAcceptanceChecklist/);
  assert.match(app, /<CurrentAcceptanceChecklist \/>/);
  assert.match(checklist, /composition-acceptance-20261103-v1/);
  assert.match(checklist, /按当前原型流程逐项核对与记录/);
  assert.match(acceptanceItems, /設定寫作題目和要求/);
  assert.match(acceptanceItems, /所有页面不展示模式切换入口/);
  assert.doesNotMatch(acceptanceItems, /命题作文批量导入|批量导入弹窗|全部批量导入菜单/);
});

test('essay bank page keeps the three library sources and fixed topic table', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/task-management-overrides.css', import.meta.url), 'utf8');
  assert.match(app, /function EssayBankPage/);
  const essayBank = app.slice(app.indexOf('function EssayBankPage'), app.indexOf('function Publish'));
  assert.match(essayBank, /作文題庫/);
  assert.match(essayBank, /新增題目/);
  assert.match(essayBank, /onClick=\{onAddTopic\}/);
  assert.doesNotMatch(essayBank, /建議／意見|評價/);
  assert.match(app, /\["all", "全部"\]/);
  assert.match(app, /\["公共庫", "公共庫"\]/);
  assert.match(app, /\["校本庫", "校本庫"\]/);
  assert.match(app, /<EssayBankPage[\s\S]*topics=\{essayTopicsWithTableData\}[\s\S]*onAddTopic/);
  assert.match(css, /\.essay-bank-library-tabs[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)/);
  assert.match(css, /\.essay-bank-table-head,[\s\S]*grid-template-columns: 32px minmax\(0, 1fr\) 90px 72px 100px/);
  assert.match(css, /\.essay-bank-title\[data-full-title\]::after[\s\S]*font-size: 19\.5px/);
});

test('batch outer lists share compact layout without modifying dialogs or single import', () => {
  assert.match(source, /isBatchTableMode \? "compact-batch-list"/);
  assert.match(source, /!isBatchTableMode && <header className="import-heading"/);
  assert.match(source, /!isBatchTableMode && <div className="batch-flow-stepper"/);
  assert.match(css, /\.compact-batch-list \.batch-summary-row/);
  assert.match(source, /<ChartLine \/>成绩概览/);
  assert.ok(source.includes('onClick={() => openGrades(student)}>查看成绩</button>'));
  assert.match(source, /isSingleMode \? "导入文件" : "批量导入"/);
});

test('four status chips count the whole roster and reset only clears filters', () => {
  const chips = source.slice(source.indexOf('className="batch-status-filters"'), source.indexOf('className="batch-list-search-actions"'));
  assert.deepEqual([...chips.matchAll(/label: "([^"]+)"/g)].map(match => match[1]), ['全班', '未上传', '批改中', '已批改']);
  assert.match(source, /listStatusCounts = displayStudents.reduce/);
  assert.match(source, /return matchQuery && matchGrade/);
  assert.doesNotMatch(source, /className="grading-filter"|className="batch-filter-count"/);
  const reset = source.slice(source.indexOf('className="batch-filter-reset"'), source.indexOf('className="batch-filter-reset"') + 300);
  assert.match(reset, /setListQuery\(""\)/);
  assert.match(reset, /setGradingFilter\("all"\)/);
  assert.doesNotMatch(reset, /setStudents|dispatchSimulation/);
});

test('selected-file route starts on its list and opens review only through its entry action', () => {
  assert.doesNotMatch(source, /setReviewOpen\(isStandalonePreview\)/);
  const entry = source.slice(source.indexOf('const openBatchImportEntry ='), source.indexOf('const movePreview ='));
  assert.match(entry, /if \(isStandalonePreview\)[\s\S]*?setReviewOpen\(true\)/);
  assert.match(source, /isStandalonePreview && reviewOpen && <SelectedImportPreview/);
});

test('grade detail closes over the mounted list instead of navigating away', () => {
  const handler = source.slice(source.indexOf('const openGrades ='), source.indexOf('const batchFlowStep ='));
  assert.doesNotMatch(handler, /composition-navigate|dispatchEvent/);
  assert.match(handler, /batchGradingStatus\(target,[\s\S]*?=== "已批改"/);
  assert.match(source, /gradeStudent && createPortal\(/);
  assert.match(source, /onBack=\{\(\) => setGradeStudent\(null\)\} modal/);
  const grading = readFileSync(new URL('../src/TaskManagement.jsx', import.meta.url), 'utf8');
  assert.match(grading, /title="返回原列表" onClick=\{onBack\}/);
  const gradingCss = readFileSync(new URL('../src/task-management.css', import.meta.url), 'utf8');
  assert.match(gradingCss, /\.grading-page\.grading-dialog \{ position: fixed; inset: 52px 0 0 219px/);
  assert.match(gradingCss, /@media \(max-width: 1100px\) \{ \.grading-page\.grading-dialog \{ left: 188px/);
});

test('toolbar overview navigates to the pending overview while row grades keep the detail dialog', () => {
  const toolbar = source.slice(source.indexOf('className="import-toolbar-actions"'), source.indexOf('{isOverwriteException && <div className="overwrite-summary">'));
  assert.ok(toolbar.includes('onClick={() => switchMode("task-detail-empty")}'));
  assert.match(toolbar, /<ChartLine \/>成绩概览/);
  assert.doesNotMatch(toolbar, /openGrades/);
  assert.equal((source.match(/onClick=\{\(\) => openGrades\(student\)\}>查看成绩<\/button>/g) || []).length, 2);
});

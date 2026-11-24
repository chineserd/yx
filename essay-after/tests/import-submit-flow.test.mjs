import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initialImportSimulation, importSimulationReducer as reduce } from '../src/import-simulation.mjs';
import { dialogScenarios } from '../src/dialog-scenarios.mjs';

const source = readFileSync(new URL('../src/CompositionImport.jsx', import.meta.url), 'utf8');
test('both batch dialogs share centered steps, inline progress and submission wording', () => {
  assert.equal((source.match(/<ImportSteps ready=/g) || []).length, 2);
  assert.equal((source.match(/<InlineUploadProgress progress=/g) || []).length, 2);
  const reviewSource = readFileSync(new URL('../src/SelectedImportPreview.jsx', import.meta.url), 'utf8');
  assert.equal((source.match(/>提交并批改<\/button>/g) || []).length, 2);
  assert.equal((reviewSource.match(/>提交并批改<\/button>/g) || []).length, 1);
  assert.match(reviewSource, /disabled=\{Boolean\(reason\)\}/);
  assert.doesNotMatch(source, /确认导入数据|batch-upload-title|batch-upload-backdrop|openBatchGrade|batch-grade-btn/);
  assert.match(source, /role="progressbar"[^>]*aria-valuenow=\{progress\}/);
  assert.doesNotMatch(source, /原型模拟上传；提交并批改后自动开始批改。/);
  const css = readFileSync(new URL('../src/composition-import.css', import.meta.url), 'utf8');
  assert.match(css, /\.import-two-step\s*\{[^}]*justify-content: center/);
  assert.match(css, /\.import-summary-dialog \.delete-dialog-actions\s*\{[^}]*justify-content: center/);
});
test('uploading blocks confirmation; cancellation clears callback and progress without submitting', () => {
  assert.match(source, /summaryConfirmDisabled = batchUploadOpen \|\| summaryStats.unresolved > 0 \|\| summaryStats.ready === 0/);
  assert.match(source, /disabled=\{batchUploadOpen \|\| !simulation.pending \|\| !simulation.draft.length\}/);
  const cancel = source.slice(source.indexOf('const closeBatchImport'), source.indexOf('const openRowImport'));
  assert.match(cancel, /uploadCompletionRef.current = null/);
  assert.match(cancel, /setBatchUploadOpen\(false\)/);
  assert.doesNotMatch(cancel, /dispatchSimulation|setStudents|setImportNotice/);
});
test('retired grading and progress modals are not offered in the current dialog gallery', () => {
  assert.ok(!dialogScenarios.some(s => ['grading-notice', 'upload-progress'].includes(s.id)));
});
test('both batch dialogs share mode controls and hide naming rules in simulated AI mode', () => {
  assert.equal((source.match(/<UploadMethods value=/g) || []).length, 2);
  assert.match(source, /aria-label="导入方式"/);
  assert.doesNotMatch(source, /AI 整理后，请核查学生与文件的对应关系。/);
  assert.match(source, /uploadMethod === "filename" \? <section className="empty-import-rules"/);
  assert.match(source, /progressRef.current \* 50/);
  assert.match(source, /if \(!batchUploadOpen \|\| methodSwitchTarget\) return undefined/);
});
test('switch confirms before discarding dialog files, cancels processing and never starts upload or grading', () => {
  const change = source.slice(source.indexOf('const requestUploadMethod'), source.indexOf('const finishFileSelection'));
  assert.match(change, /batchUploadOpen \|\| \(isBatchEmpty \? simulation.draft.length : summaryRecords.length\)/);
  assert.match(change, /uploadCompletionRef.current = null/);
  assert.match(change, /setBatchUploadOpen\(false\)/);
  assert.match(change, /setSummaryRecords\(\[\]\)/);
  assert.match(change, /dispatchSimulation\(\{ type: "clear-draft" \}\)/);
  assert.match(change, /setUploadProgress\(0\)/);
  assert.match(change, /setImportFilter\("all"\)/);
  assert.doesNotMatch(change, /setStudents|fetch\(|XMLHttpRequest|startUpload\(|setBatchUploadOpen\(true\)|type: "confirm"/);
  assert.match(source, />切换并重新导入<\/button>/);
  assert.match(source, /当前已有文件。切换后将清空当前已选择的文件，需重新导入。是否继续？/);
  assert.doesNotMatch(source, /切换并重新处理|切换后将保留文件/);
  assert.match(source, /autoFocus onClick=\{\(\) => setMethodSwitchTarget\(null\)\}/);
  assert.match(source, /inert=\{methodSwitchTarget \? true : undefined\}/);
});
test('discarding an upload draft preserves committed essays and cannot submit stale data', () => {
  const committed = reduce(reduce(initialImportSimulation(), {type:'uploaded', records:[{code:1,files:[{id:'original'}]}]}), {type:'confirm'});
  const withNewDraft = reduce(committed, {type:'uploaded', records:[{code:2,files:[{id:'new'}]}]});
  const cleared = reduce(withNewDraft, {type:'clear-draft'});
  assert.deepEqual(cleared.draft, []);
  assert.equal(cleared.pending, false);
  assert.equal(cleared.records, committed.records);
  assert.equal(cleared.lastImported, committed.lastImported);
  assert.equal(reduce(cleared, {type:'confirm'}), cleared);
  const nextUpload = reduce(cleared, {type:'uploaded', records:[{code:3,files:[{id:'replacement'}]}]});
  assert.equal(nextUpload.draft.length, 1);
  assert.equal(nextUpload.draft[0].code, 3);
});
test('cleared summary renders true empty rules and creates a new fixture only on explicit upload', () => {
  assert.match(source, /summaryRecords.length \? <>/);
  assert.match(source, /ImportNamingRules titleId="summary-import-rule-title"/);
  assert.match(source, /summaryRecords.length \|\| 30/);
  assert.match(source, /: createImportRecords\(makeStudents\(\), isException\)/);
});
test('a new submission preserves unrelated graded and grading students; a draft alone does not grade', () => {
  const prior = [{ code: 1, files: [{id:'a'}], gradingStatus:'已批改' }, { code:2, files:[{id:'b'}], gradingStatus:'批改中' }];
  const initial = {...initialImportSimulation(), records:prior};
  const uploaded = reduce(initial, {type:'uploaded', records:[{code:3,files:[{id:'c'}]}]});
  assert.deepEqual(uploaded.records, prior);
  assert.equal(uploaded.stage, 'empty');
  const committed = reduce(uploaded, {type:'confirm'});
  assert.deepEqual(committed.records.slice(0,2), prior);
  assert.equal(committed.records[2].gradingStatus, '批改中');
  assert.equal(reduce(committed, {type:'confirm'}), committed);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { createImportRecords, fileRecord, importStats, retryImportRecord, confirmImportRecords, previewImportRecords, commitImportStudents, sortImportExceptions, acknowledgeImportOverwrite } from '../src/import-records.mjs';

const roster = Array.from({ length: 30 }, (_, i) => ({ code: 6655 + i, name: i === 11 ? '吴柏言' : `学生${i}`, files: [{ id: `${i}`, src: 'scan.jpg' }], gradingStatus: '已批改' }));
test('all filenames match students by code, never row position', () => {
  const records = createImportRecords(roster, true);
  assert.equal(records.length, 30);
  assert.equal(new Set(records.map(r => r.id)).size, 30);
  assert.equal(new Set(records.map(r => r.fileName)).size, 30);
  for (const r of records.filter(r => r.studentCode)) {
    assert.equal(r.studentCode, Number(r.fileName.match(/^\d+/)[0]));
    assert.equal(r.studentName, roster.find(s => s.code === r.studentCode).name);
  }
  assert.equal(records[0].studentCode, null);
  assert.equal(records.find(r=>r.id==='exception-4').issue, '待确认：覆盖按新文件批改。');
  assert.equal(records.find(r=>r.id==='exception-4').decision, 'pending');
  assert.equal(records[8].studentCode, 6684);
  assert.deepEqual(importStats(records), {total:30,students:24,ready:22,imported:0,exception:8,deferred:0,unresolved:8});
});
test('retry updates the same record and file count instead of replacing it with another student', () => {
  const before = createImportRecords(roster, true);
  const retried = retryImportRecord(before, 'exception-0', roster);
  assert.equal(retried.find(r=>r.id==='exception-0').issue, '待确认：覆盖按新文件批改。');
  assert.equal(importStats(retried).ready,22);
  const after = acknowledgeImportOverwrite(retried, 'exception-0', roster);
  const record = after.find(r=>r.id==='exception-0');
  assert.equal(record.fileName, '6666.pdf');
  assert.equal(record.studentCode, 6666);
  assert.equal(record.issue, '');
  assert.deepEqual(after.filter(r=>r.id!=='exception-0'), before.filter(r=>r.id!=='exception-0'));
  assert.equal(importStats(after).ready, 23);
  assert.equal(importStats(after).exception, 7);
});
test('default exceptions sort images before PDFs; multi-image files remain normal', () => {
  const records = createImportRecords(roster, true);
  assert.deepEqual(records.slice(0,8).map(r=>r.fileName), ['IMG_20260922.jpg','6682_1.jpg','6682_2.jpg','6682_3.jpg','6666.pdf','6667.pdf','6655.pdf','6675.pdf']);
  assert.deepEqual(records.slice(8,12).map(r => r.pages[0].page), [1,2,3,4]);
  assert.ok(records.slice(8).every(r => !r.issue));
  assert.ok(records.every(r=>!/图片组校验|缺少序号|序号.*重复/u.test(r.issue)));
});
test('deferred exceptions do not inflate success; confirmation is idempotent', () => {
  const records = createImportRecords(roster, true).map(r => r.issue ? {...r,decision:'deferred'} : r);
  const confirmed = confirmImportRecords(records);
  assert.equal(confirmed.result.length,30);
  assert.equal(importStats(confirmed.result).imported,22);
  assert.equal(importStats(confirmed.result).deferred,8);
  assert.equal(importStats(confirmed.records).ready,0);
  assert.deepEqual(confirmImportRecords(confirmed.records).result,[]);
  const retry = acknowledgeImportOverwrite(retryImportRecord(confirmed.records, 'exception-0', roster), 'exception-0', roster);
  assert.equal(importStats(retry).ready,1);
  const second = confirmImportRecords(retry);
  assert.equal(importStats(second.result).imported,1);
  assert.equal(importStats(second.result).deferred,7);
});
test('unresolved records block confirmation', () => {
  assert.deepEqual(confirmImportRecords(createImportRecords(roster,true)).result,[]);
});
test('three different image failures share one student, remain adjacent, and recover independently', () => {
  const records = createImportRecords(roster, true);
  const images = records.filter(r=>r.studentCode===6682);
  assert.deepEqual(images.map(r=>r.fileName),['6682_1.jpg','6682_2.jpg','6682_3.jpg']);
  assert.equal(new Set(images.map(r=>r.issue)).size,3);
  assert.ok(images.every(r=>r.issue && !r.canPreview));
  assert.deepEqual(images.map(r=>records.indexOf(r)),[1,2,3]);
  for (const target of images) {
    const retried = retryImportRecord(records,target.id,roster);
    assert.equal(retried.find(r=>r.id===target.id).issue,'待确认：覆盖按新文件批改。');
    const after = acknowledgeImportOverwrite(retried,target.id,roster);
    assert.deepEqual(after.map(r=>r.id),records.map(r=>r.id));
    assert.deepEqual(after.filter(r=>r.id!==target.id),records.filter(r=>r.id!==target.id));
    assert.equal(after.find(r=>r.id===target.id).issue,'');
    assert.equal(importStats(after).exception,7);
    assert.equal(importStats(after).ready,23);
  }
});
test('image sorting groups interleaved students and uses numeric page order without mutation', () => {
  const records = ['6682_10.jpg','6666.pdf','6683_1.jpg','6682_2.jpg','6683_2.jpg','6682_1.jpg'].map(name=>fileRecord(name,roster));
  const before = structuredClone(records);
  assert.deepEqual(sortImportExceptions(records).map(r=>r.fileName),['6682_1.jpg','6682_2.jpg','6682_10.jpg','6683_1.jpg','6683_2.jpg','6666.pdf']);
  assert.deepEqual(records,before);
});
test('preview keeps the exact record/page association and numeric order', () => {
  const records = createImportRecords(roster,true);
  const students = previewImportRecords(records);
  const student = students.find(s => s.code === 6666);
  assert.equal(student.name,'吴柏言');
  assert.ok(students.find(s=>s.code===6684).files.some(f => f.recordId === '6684_1.jpg' && f.name === '6684_1.jpg'));
  const normal = createImportRecords(roster);
  assert.ok(normal.every(r => r.pages.length === 6));
  assert.ok(previewImportRecords(normal).every(s => s.files.length === 6));
});
test('commit only imported files, retain old versions, automatically grade imported versions only', () => {
  const records = createImportRecords(roster,true).map(r => r.issue ? {...r,decision:'deferred'} : r);
  const result = confirmImportRecords(records).result;
  const committed = commitImportStudents(roster,result);
  assert.deepEqual(committed.find(s => s.code === 6666),roster.find(s => s.code === 6666));
  const changed = committed.find(s => s.code === 6656);
  assert.equal(changed.gradingStatus,'批改中');
  assert.equal(changed.files.length,6);
  assert.equal(changed.history[0].gradingStatus,'已批改');
});
test('unmatched replacement is explicitly renamed and matched; valid multi-images are not errors', () => {
  const records = retryImportRecord(createImportRecords(roster,true),'exception-2',roster);
  assert.equal(records.find(r=>r.id==='exception-2').fileName,'6658_1.jpg');
  assert.equal(records.find(r=>r.id==='exception-2').studentCode,6658);
  assert.match(records.find(r=>r.id==='exception-2').issue,/PDF 和图片不能混合导入/);
  assert.equal(fileRecord('6666_1.jpg',roster).issue,'');
  assert.equal(fileRecord('6666_2.jpg',roster).issue,'');
});
test('ungraded upload directly replaces the current draft without creating graded history', () => {
  const students = roster.map(s => ({...s,gradingStatus:'待批改'}));
  const { result } = confirmImportRecords(createImportRecords(students));
  const committed = commitImportStudents(students,result);
  assert.ok(committed.every(s => s.history.length === 0 && s.gradingStatus === '批改中'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileRecord, bindImportStudent, canSelectImportStudent, importStats, previewImportRecords, confirmImportRecords, commitImportStudents, retryImportRecord } from '../src/import-records.mjs';
const roster = [{code:1,name:'学生甲',files:[{src:'mock-a.jpg'}],gradingStatus:'未上传'}, {code:2,name:'学生乙',files:[{src:'mock-b.jpg'}],gradingStatus:'已批改'}, {code:3,name:'学生丙',files:[{src:'mock-c.jpg'}],gradingStatus:'批改中'}];
const draft = () => [fileRecord('IMG_20260922.jpg',roster,'unmatched')];
test('only unmatched unsubmitted files offer manual selection', () => {
  assert.equal(canSelectImportStudent(draft()[0]),true);
  assert.equal(canSelectImportStudent(fileRecord('1.pdf',roster)),false);
  assert.equal(canSelectImportStudent({...draft()[0],decision:'imported'}),false);
});
test('manual match retains filename, IDs, other records and original draft; updates counts and preview', () => {
  const original = draft(), before = structuredClone(original);
  const bound = bindImportStudent(original,'unmatched',1,roster);
  assert.equal(bound.error,'');
  assert.deepEqual(original,before);
  const record = bound.records[0];
  assert.equal(record.fileName,'IMG_20260922.jpg');
  assert.equal(record.id,'unmatched');
  assert.equal(record.pages[0].id,original[0].pages[0].id);
  assert.equal(record.studentCode,1);
  assert.equal(record.studentName,'学生甲');
  assert.equal(record.pages[0].page,1);
  assert.equal(record.issue,'');
  assert.equal(importStats(bound.records).ready,1);
  assert.equal(importStats(bound.records).exception,0);
  assert.equal(previewImportRecords(bound.records)[0].code,1);
  assert.equal(record.decision,'pending');
});
test('binding never grades: only explicit submission commits the matched student', () => {
  const bound=bindImportStudent(draft(),'unmatched',1,roster).records;
  assert.deepEqual(commitImportStudents(roster,bound),roster);
  const submitted=commitImportStudents(roster,confirmImportRecords(bound).result);
  assert.equal(submitted[0].gradingStatus,'批改中');
  assert.equal(submitted[0].files[0].name,'IMG_20260922.jpg');
  assert.deepEqual(submitted.slice(1),roster.slice(1));
});
test('invalid class choice, stale record or grading student does not mutate draft', () => {
  const original=draft();
  for (const [id,code] of [['unmatched',999],['unmatched',3],['missing',1]]) {
    const result=bindImportStudent(original,id,code,roster);
    assert.ok(result.error);
    assert.equal(result.records,original);
  }
});
test('existing graded essay still requires overwrite confirmation after manual matching', () => {
  const bound=bindImportStudent(draft(),'unmatched',2,roster).records;
  assert.equal(bound[0].issue,'待确认：覆盖按新文件批改。');
  assert.equal(importStats(bound).ready,0);
  assert.equal(confirmImportRecords(bound).result.length,0);
  const source=readFileSync(new URL('../src/CompositionImport.jsx',import.meta.url),'utf8');
  assert.ok(source.includes('record.issue.startsWith("待确认：覆盖")'));
});
test('manual match rechecks unsupported formats and mixed formats', () => {
  const unsupported=[fileRecord('photo.webp',roster,'unmatched')];
  assert.match(bindImportStudent(unsupported,'unmatched',1,roster).error,/格式不支持/);
  for (const name of ['1.pdf']) {
    const records=[...draft(),fileRecord(name,roster)];
    assert.ok(bindImportStudent(records,'unmatched',1,roster).error);
  }
  const valid=[...draft(),fileRecord('1_2.jpg',roster)];
  assert.equal(bindImportStudent(valid,'unmatched',1,roster).error,'');
});
test('matching resolves only matching failures, not unrelated validation errors', () => {
  const original=draft().map(r=>({...r,issue:'学生匹配失败：未知；文件校验失败：内容损坏'}));
  const bound=bindImportStudent(original,'unmatched',1,roster).records;
  assert.equal(bound[0].issue,'文件校验失败：内容损坏');
  assert.equal(bound[0].canPreview,false);
  assert.equal(importStats(bound).ready,0);
});
test('association cannot make empty or unreadable files ready for submission', () => {
  const emptyRoster = [{code:1,name:'学生甲',files:[],gradingStatus:'未上传'}];
  for (const records of [draft(), draft().map(r=>({...r,pages:[]}))]) {
    const bound=bindImportStudent(records,'unmatched',1,emptyRoster).records;
    assert.equal(bound[0].studentCode,1);
    assert.match(bound[0].issue,/文件校验失败/);
    assert.equal(bound[0].canPreview,false);
    assert.equal(importStats(bound).ready,0);
    assert.equal(confirmImportRecords(bound).result.length,0);
  }
});
test('deferred matching can be corrected and retry preserves explicit association and filename', () => {
  const bound=bindImportStudent(draft().map(r=>({...r,decision:'deferred'})),'unmatched',1,roster).records;
  assert.equal(bound[0].decision,'pending');
  const retried=retryImportRecord(bound,'unmatched',roster);
  assert.equal(retried[0].studentCode,1);
  assert.equal(retried[0].fileName,'IMG_20260922.jpg');
  const locked=retryImportRecord(bound,'unmatched',roster.map(s=>({...s,gradingStatus:'批改中'})));
  assert.equal(locked[0].studentCode,bound[0].studentCode);
  assert.equal(locked[0].fileName,bound[0].fileName);
  assert.match(locked[0].issue,/正在批改/);
  assert.match(locked[0].lastAction,/请继续处理/);
});
test('inline searchable selector is not a dialog and keeps keyboard and cancellation paths', () => {
  const source=readFileSync(new URL('../src/ImportStudentSelect.jsx',import.meta.url),'utf8');
  assert.match(source,/type="search"/);
  assert.match(source,/<select/);
  assert.match(source,/取消选择/);
  assert.match(source,/Escape/);
  assert.match(source,/批改中/);
  assert.doesNotMatch(source,/role="dialog"|createPortal|commitImportStudents/);
});

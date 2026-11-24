import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileRecord, bindImportStudent, canSelectImportStudent, retryImportRecord, acknowledgeImportOverwrite, confirmImportRecords, deferImportRecords, restoreImportRecord, importStats, importSubmitBlockReason } from '../src/import-records.mjs';
const roster=[{code:1,name:'甲',gradingStatus:'已批改',files:[{id:'old-1',src:'a.jpg'}]}, {code:2,name:'乙',gradingStatus:'未上传',files:[{src:'b.jpg'}]}, {code:3,name:'丙',gradingStatus:'批改中',files:[{src:'c.jpg'}]}, {code:4,name:'丁',gradingStatus:'已批改',files:[{id:'old-4',src:'d.jpg'}]}];
const draft=()=>[fileRecord('IMG.jpg',roster,'photo')];
test('retry cannot bypass overwrite, and a new replacement revokes earlier approval',()=>{
  const initial=[fileRecord('1.pdf',roster,'pdf','待确认：覆盖按新文件批改。')];
  const retried=retryImportRecord(initial,'pdf',roster);
  assert.match(retried[0].issue,/待确认：覆盖/);
  assert.equal(confirmImportRecords(retried,roster).result.length,0);
  const approved=acknowledgeImportOverwrite(retried,'pdf',roster);
  assert.equal(approved[0].issue,'');
  assert.equal(confirmImportRecords(approved,roster).result.length,1);
  assert.match(retryImportRecord(approved,'pdf',roster)[0].issue,/待确认：覆盖/);
});
test('retry and overwrite acknowledgement respect current grading locks',()=>{
  const records=[fileRecord('3.pdf',roster,'pdf','待确认：覆盖按新文件批改。')];
  for(const next of [retryImportRecord(records,'pdf',roster),acknowledgeImportOverwrite(records,'pdf',roster)]){
    assert.match(next[0].issue,/正在批改/);
    assert.equal(confirmImportRecords(next,roster).result.length,0);
  }
});
test('manual student correction preserves file content and IDs but resets target-specific approval',()=>{
  const bound=bindImportStudent(draft(),'photo',1,roster).records;
  const approved=acknowledgeImportOverwrite(bound,'photo',roster);
  assert.equal(canSelectImportStudent(approved[0]),true);
  const changed=bindImportStudent(approved,'photo',4,roster).records;
  assert.equal(changed[0].studentCode,4);
  assert.equal(changed[0].fileName,'IMG.jpg');
  assert.deepEqual(changed[0].pages,approved[0].pages);
  assert.match(changed[0].issue,/待确认：覆盖/);
  const ungraded=bindImportStudent(changed,'photo',2,roster).records;
  assert.equal(ungraded[0].issue,'');
  assert.equal(ungraded[0].overwriteApproval,null);
  assert.equal(ungraded[0].decision,'pending');
  assert.equal(canSelectImportStudent({...ungraded[0],decision:'imported'}),false);
});
test('invalid correction and choosing same student do not mutate existing matching or approval',()=>{
  const approved=acknowledgeImportOverwrite(bindImportStudent(draft(),'photo',1,roster).records,'photo',roster);
  assert.equal(bindImportStudent(approved,'photo',1,roster).records,approved);
  for(const code of [3,999]) assert.equal(bindImportStudent(approved,'photo',code,roster).records,approved);
  const conflicting=[...approved,fileRecord('2.pdf',roster)];
  assert.equal(bindImportStudent(conflicting,'photo',2,roster).records,conflicting);
});
test('correction retains unrelated content errors and never falsely enables submission',()=>{
  const broken=draft().map(r=>({...r,issue:r.issue+'；文件校验失败：图片损坏'}));
  const bound=bindImportStudent(broken,'photo',1,roster).records;
  const changed=bindImportStudent(bound,'photo',2,roster).records;
  assert.match(changed[0].issue,/图片损坏/);
  assert.equal(changed[0].canPreview,false);
  assert.equal(confirmImportRecords(changed,roster).result.length,0);
});
test('restore reverses defer only, keeps original pages/order and blocks submission again',()=>{
  const records=[fileRecord('2.jpg',roster,'bad','文件校验失败：图片损坏'),fileRecord('2_2.jpg',roster,'good')];
  const deferred=deferImportRecords(records,'bad');
  assert.equal(importStats(deferred).unresolved,0);
  const restored=restoreImportRecord(deferred,'bad',roster);
  assert.equal(restored[0].decision,'pending');
  assert.equal(restored[0].issue,records[0].issue);
  assert.equal(restored[0].pages,records[0].pages);
  assert.equal(restored[1],records[1]);
  assert.equal(importStats(restored).exception,1);
  assert.equal(importStats(restored).unresolved,1);
  assert.equal(confirmImportRecords(restored,roster).result.length,0);
  assert.equal(restoreImportRecord(restored,'bad',roster)[0],restored[0]);
});
test('submit revalidates changed grading state and old-version approval for edited drafts',()=>{
  const approved=acknowledgeImportOverwrite(bindImportStudent(draft(),'photo',1,roster).records,'photo',roster);
  for(const updated of [roster.map(s=>s.code===1?{...s,gradingStatus:'批改中'}:s),roster.map(s=>s.code===1?{...s,files:[{id:'new-version',src:'a.jpg'}]}:s)]){
    const next=confirmImportRecords(approved,updated);
    assert.equal(next.result.length,0);
    assert.ok(next.records[0].issue);
  }
});
test('disabled-submit reasons explain processing, unresolved, empty and deferred-only cases',()=>{
  assert.match(importSubmitBlockReason([],true),/处理中/);
  assert.equal(importSubmitBlockReason([]),'请先导入文件。');
  assert.match(importSubmitBlockReason(draft()),/还有 1 个异常待处理/);
  assert.match(importSubmitBlockReason(deferImportRecords(draft())),/暂无可提交文件/);
  assert.equal(importSubmitBlockReason([fileRecord('2.jpg',roster)]),'');
});
test('UI offers inline correction and restore, with one contextual disabled reason',()=>{
  const source=readFileSync(new URL('../src/CompositionImport.jsx',import.meta.url),'utf8');
  const select=readFileSync(new URL('../src/ImportStudentSelect.jsx',import.meta.url),'utf8');
  assert.match(select,/更换学生/);
  assert.match(source,/>恢复处理<\/button>/);
  assert.match(source,/summarySubmitReason && <p/);
  assert.match(source,/confirmImportRecords\(summaryRecords, currentImportRoster\(\)\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createImportRecords,confirmImportRecords,importStats,commitImportStudents} from '../src/import-records.mjs';

test('normal and deferred completion commit records and automatically grade only imported students',()=>{
  const roster=Array.from({length:30},(_,i)=>({code:6655+i,name:'学生'+i,files:[{src:'example'}],gradingStatus:'未上传'}));
  for(const exceptional of [false,true]){
    const records=createImportRecords(roster,exceptional).map(r=>r.issue?{...r,decision:'deferred'}:r);
    const next=confirmImportRecords(records),stats=importStats(next.result);
    assert.equal(stats.imported,exceptional?22:30);
    assert.equal(stats.deferred,exceptional?8:0);
    assert.equal(next.records.length,30);
    const importedCodes=new Set(next.result.filter(r=>r.decision==='imported').map(r=>r.studentCode));
    for(const student of commitImportStudents(roster,next.result)) {
      if(importedCodes.has(student.code)) assert.equal(student.gradingStatus,'批改中');
      else assert.deepEqual(student,roster.find(s=>s.code===student.code));
    }
    assert.equal(confirmImportRecords(next.records).result.length,0);
  }
});
test('both confirmation paths use a list notice instead of the retired result modal',()=>{
  const source=readFileSync(new URL('../src/CompositionImport.jsx',import.meta.url),'utf8');
  assert.doesNotMatch(source,/importResultOpen|setImportResultOpen|import-result-title/);
  assert.match(source,/setImportNotice\(importStats\(next.result\)\)/);
  assert.match(source,/setImportNotice\(\{ imported: simulation.draft.length, deferred: 0 \}\)/);
  assert.match(source,/className="import-complete-notice" role="status"/);
});

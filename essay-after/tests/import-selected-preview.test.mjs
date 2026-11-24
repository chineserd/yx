import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createImportRecords, validateImportRecords, deferImportRecords, restoreImportRecord, acknowledgeImportOverwrite, confirmImportRecords, retryImportRecord, bindImportStudent, commitImportStudents, importSubmitBlockReason } from '../src/import-records.mjs';
import { previewOriginalStatus, previewActionFeedback, createPreviewDemoRoster, previewStudentOptions, previewSelectionLabel, nextPendingPreviewRecord, createPreviewDemoRecords, previewCounts, previewRecordStatus, previewRecordHelp, removePreviewPage } from '../src/preview-import.mjs';
const roster = () => Array.from({length:30},(_,i)=>({code:6655+i,name:`学生${i+1}`,gradingStatus:i===0?'批改中':'已批改',files:Array.from({length:6},(_,j)=>({id:`old-${i}-${j}`,name:`${6655+i}_${j+1}.jpg`,page:j+1,src:'scan.jpg'}))}));
test('unavailable exceptional preview uses a warning icon while an empty preview retains upload icon',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  assert.match(source,/active\?\.issue \? <Warning size=\{40\} weight="fill" className="review-unavailable-warning" aria-hidden="true" \/> : <UploadSimple size=\{40\} aria-hidden="true" \/>/);
  assert.match(css,/\.review-records \.review-unavailable-warning \{ color: #ff9800; \}/);
});
test('confirmed overwrite revokes approval on defer, requires reconfirmation after restore and retry',()=>{
  const students=createPreviewDemoRoster(roster());
  const records=createPreviewDemoRecords(students,{studentSelectionDemo:true});
  const approved=acknowledgeImportOverwrite(records,'preview-overwrite',students);
  assert.equal(previewCounts(approved).ready,1);
  const deferred=deferImportRecords(approved,'preview-overwrite');
  assert.equal(previewCounts(deferred).ready,0);
  assert.equal(previewCounts(deferred).exception,8);
  const held=deferred.find(record=>record.id==='preview-overwrite');
  assert.equal(held.overwriteApproval,null);
  assert.match(held.issue,/^待确认：覆盖/);
  assert.equal(previewActionFeedback(held),'');
  assert.equal(previewOriginalStatus(held),'待确认覆盖');
  assert.equal(held.decision,'deferred');
  assert.equal(held.pages,approved.find(record=>record.id===held.id).pages);
  for(const record of approved) if(record.id!==held.id) assert.equal(deferred.find(item=>item.id===record.id),record);
  assert.equal(deferImportRecords(deferred,held.id).find(record=>record.id===held.id),held);
  const restored=restoreImportRecord(deferred,'preview-overwrite',students);
  assert.equal(previewCounts(restored).ready,0);
  assert.match(restored.find(record=>record.id===held.id).issue,/^待确认：覆盖/);
  assert.equal(confirmImportRecords(restored,students).result.length,0);
  const reapproved=acknowledgeImportOverwrite(restored,held.id,students);
  assert.equal(previewCounts(reapproved).ready,1);
  const directlyReapproved=acknowledgeImportOverwrite(deferred,held.id,students);
  assert.equal(directlyReapproved.find(record=>record.id===held.id).decision,'pending');
  assert.equal(previewCounts(directlyReapproved).ready,1);
  const retry=retryImportRecord(restored,'preview-overwrite',students);
  const target=retry.find(record=>record.id==='preview-overwrite');
  assert.equal(target.overwriteApproval,null);
  assert.match(target.issue,/待确认：覆盖/);
  assert.equal(previewOriginalStatus(target),'待确认覆盖');
  for(const record of restored) if(record.id!==target.id) assert.equal(retry.find(item=>item.id===record.id),record);
  const surface=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  assert.ok(surface.includes("record.overwriteApproval ? '已确认覆盖' : '确认覆盖'"));
  assert.match(surface,/disabled=\{busy \|\| Boolean\(record.overwriteApproval\)/);
});
test('resolved manual draft retains working defer/restore/retry without affecting other files',()=>{
  const students=createPreviewDemoRoster(roster());
  const records=createPreviewDemoRecords(students,{studentSelectionDemo:true});
  const target=records.find(record=>record.studentCode==null);
  const matched=bindImportStudent(records,target.id,6683,students).records;
  const ready=matched.find(record=>record.id===target.id);
  assert.equal(ready.issue,'');
  assert.equal(previewCounts(matched).ready,1);
  assert.equal(deferImportRecords(matched).find(record=>record.id===target.id),ready);
  const deferred=deferImportRecords(matched,target.id);
  assert.equal(deferred.find(record=>record.id===target.id).decision,'deferred');
  assert.equal(previewCounts(deferred).ready,0);
  assert.equal(previewCounts(deferred).deferred,1);
  assert.equal(previewCounts(deferred).exception,8);
  for(const record of matched) if(record.id!==target.id) assert.equal(deferred.find(item=>item.id===record.id),record);
  assert.equal(confirmImportRecords(deferImportRecords(deferred),students).result.length,0);
  const restored=restoreImportRecord(deferred,target.id,students);
  assert.equal(previewCounts(restored).ready,1);
  assert.equal(previewCounts(restored).deferred,0);
  assert.equal(previewCounts(restored).exception,7);
  const retried=retryImportRecord(deferred,target.id,students).find(record=>record.id===target.id);
  assert.equal(retried.decision,'pending');
  assert.equal(retried.fileName,ready.fileName);
  assert.equal(retried.studentCode,6683);
  assert.equal(retried.issue,'');
  const surface=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  assert.match(surface,/record.issue \|\| record.manualMatch/);
  assert.match(surface,/Boolean\(\(record.issue \|\| record.decision === 'deferred'\)/);
  assert.doesNotMatch(surface,/<strong>\{active \? active.issue/);
  assert.match(surface,/!active && <strong>暂无文件<\/strong>/);
});
test('student selection reuses the centered expiring notice after a successful change only',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const handler=source.slice(source.indexOf('const selectStudent ='),source.indexOf('const canShowPages ='));
  assert.ok(handler.includes("`${record.fileName} 已选择 ${selected.name}（${selected.code}），${next ? '自动切换查看下一个' : '没有更多待处理文件'}`"));
  assert.ok(handler.indexOf('if (busy || record.studentCode === Number(code)) return')<handler.indexOf('onBind('));
  assert.ok(handler.indexOf('if (error) return error')<handler.indexOf('setNotice('));
  assert.match(source,/current === notice \? null : current\), 3000/);
});
test('normal selections have blue student/file/image states without changing exception tones or permissions',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  assert.ok(source.includes("preview-student-item ${exceptions ? 'has-issue' : 'is-normal'}"));
  assert.ok(source.includes("preview-image-card is-active ${active.issue || active.decision === 'deferred' ? 'has-issue' : 'is-normal'}"));
  assert.match(css,/\.preview-student-item\.is-normal\.is-active,[\s\S]*?\.preview-file-item\.is-normal\.is-active \{\s*border-color: #3169ff;\s*background: #eaf2ff/);
  assert.match(css,/\.preview-image-card\.is-normal\.is-active \{ border: 3px solid #3169ff/);
  assert.match(css,/\.preview-file-item\.is-normal\.is-active \.review-file-pages \{ color: #3169ff; background: #dce8ff/);
  assert.match(source,/disabled=\{busy \|\| locked \|\| active.decision === 'imported'\}/);
});
test('selected preview stays inside the main workspace without covering expanded navigation',()=>{
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  assert.match(css,/\.preview-backdrop\.preview-modal-open\.standalone-preview \{\s*left: 219px/);
  assert.match(css,/@media \(max-width: 1100px\) \{\s*\.preview-backdrop\.preview-modal-open\.standalone-preview \{ left: 188px/);
  assert.match(css,/\.essay-preview\.preview-modal-open\.standalone-preview \{\s*position: relative;[\s\S]*?width: 100% !important;\s*height: 100% !important/);
  assert.match(css,/\.essay-preview\.preview-modal-open\.standalone-preview::before \{ content: none; \}/);
});
test('every preview exception supports scoped retry, including deferred and grading-locked drafts',()=>{
  const students=createPreviewDemoRoster(roster()), before=structuredClone(students);
  const records=createPreviewDemoRecords(students,{studentSelectionDemo:true});
  const exceptions=records.filter(record=>record.issue && record.decision!=='imported');
  assert.equal(exceptions.length,8);
  for(const target of exceptions) for(const deferred of [false,true]) {
    const source=deferred?deferImportRecords(records,target.id):records;
    const retried=retryImportRecord(source,target.id,students);
    const result=retried.find(record=>record.id===target.id);
    assert.equal(result.id,target.id);
    assert.equal(result.decision,'pending');
    assert.equal(result.overwriteApproval,null);
    assert.match(result.lastAction,/已重新导入/);
    for(const other of source) if(other.id!==target.id) assert.equal(retried.find(record=>record.id===other.id),other);
    if(students.find(student=>student.code===result.studentCode)?.gradingStatus==='批改中') {
      assert.match(result.issue,/导入受限/);
      assert.ok(importSubmitBlockReason(retried,false));
    }
  }
  assert.deepEqual(students,before);
  const surface=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  assert.match(surface,/const fileActions = record => \(record.issue \|\| record.manualMatch \|\| record.overwriteApproval\) && record.decision !== 'imported'/);
  assert.match(surface,/<button type="button" disabled=\{busy\} onClick=\{\(\) => \{ retain\(record.id\); onRetry\(record.id\); \}\}>重新导入<\/button>/);
});
test('three-scene roster exposes existing, empty, then 28 locked students without mutating shared data',()=>{
  const original=roster(), before=structuredClone(original);
  const students=createPreviewDemoRoster(original), options=previewStudentOptions(students);
  assert.equal(options[0].code,6659);
  assert.equal(options[0].gradingStatus,'已批改');
  assert.equal(options[0].files.length,6);
  assert.equal(options[1].code,6683);
  assert.equal(options[1].gradingStatus,'未上传');
  assert.deepEqual(options[1].files,[]);
  assert.equal(options.slice(2).filter(student=>student.gradingStatus==='批改中').length,28);
  assert.deepEqual(students.map(student=>student.code),original.map(student=>student.code));
  assert.deepEqual(original,before);
});
test('three-scene matching distinguishes overwrite from empty and locks every other choice',()=>{
  const students=createPreviewDemoRoster(roster());
  const records=createPreviewDemoRecords(students,{studentSelectionDemo:true});
  const target=records.find(record=>record.studentCode==null);
  assert.equal(records.length,26);
  assert.equal(previewCounts(records).unresolved,8);
  assert.equal(previewCounts(records).imported,18);
  assert.ok(target.pages.every(page=>page.src));
  for(const student of students.filter(student=>![6659,6683].includes(student.code))) {
    assert.equal(bindImportStudent(records,target.id,student.code,students).records,records);
  }
  const existing=bindImportStudent(records,target.id,6659,students);
  assert.equal(existing.error,'');
  const bound=existing.records.find(record=>record.id===target.id);
  assert.match(bound.issue,/待确认：覆盖/);
  assert.equal(bound.overwriteApproval,null);
  const empty=bindImportStudent(deferImportRecords(existing.records,target.id),target.id,6683,students);
  assert.equal(empty.error,'');
  const ready=empty.records.find(record=>record.id===target.id);
  assert.equal(ready.issue,'');
  assert.equal(ready.decision,'pending');
  assert.equal(ready.overwriteRequired,false);
  assert.equal(ready.canPreview,true);
  assert.equal(ready.fileName,target.fileName);
  assert.deepEqual(ready.pages,target.pages);
  assert.equal(previewCounts(empty.records).ready,1);
  const confirmed=confirmImportRecords(deferImportRecords(empty.records),students);
  const committed=commitImportStudents(students,confirmed.result);
  assert.equal(committed.find(student=>student.code===6683).gradingStatus,'批改中');
  assert.equal(committed.find(student=>student.code===6683).files.length,1);
  assert.deepEqual(students.find(student=>student.code===6683).files,[]);
  assert.equal(createImportRecords(roster(),true).length,30);
});
test('historical unmatched label stays beside selection feedback without overriding live validation',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const selector=readFileSync(new URL('../src/ImportStudentSelect.jsx',import.meta.url),'utf8');
  assert.match(source,/原始状态：\$\{previewOriginalStatus\(record\)\}/);
  assert.match(source,/previewOriginalStatus\(active\) \|\| shortStatus\(active\)/);
  assert.match(source,/review-selection-label">\{previewActionFeedback\(record\)\}/);
  assert.match(source,/review-selection-label">\{previewActionFeedback\(active\)\}/);
  assert.match(source,/students=\{previewStudentOptions\(roster\)\} showEssayStatus/);
  assert.doesNotMatch(source,/尚未覆盖作文/);
  assert.match(selector,/showEssayStatus = false/);
  assert.match(selector,/已有作文，需确认覆盖/);
  assert.match(selector,/暂无作文/);
});
test('original statuses and overwrite feedback survive resolution without inflating exception counts',()=>{
  const students=createPreviewDemoRoster(roster());
  const records=createPreviewDemoRecords(students,{studentSelectionDemo:true});
  const overwrite=records.find(record=>record.id==='preview-overwrite');
  assert.equal(previewOriginalStatus(overwrite),'待确认覆盖');
  assert.equal(previewActionFeedback(overwrite),'');
  const confirmed=acknowledgeImportOverwrite(records,overwrite.id,students);
  const approved=confirmed.find(record=>record.id===overwrite.id);
  assert.equal(previewOriginalStatus(approved),'待确认覆盖');
  assert.equal(previewActionFeedback(approved),'已确认覆盖');
  assert.equal(approved.issue,'');
  assert.equal(previewCounts(confirmed).ready,1);
  assert.equal(previewCounts(confirmed).unresolved,7);
  const unmatched=records.find(record=>record.studentCode==null);
  const empty=bindImportStudent(records,unmatched.id,6683,students).records.find(record=>record.id===unmatched.id);
  assert.equal(previewOriginalStatus(empty),'未匹配学生');
  assert.equal(previewActionFeedback(empty),'已选择 学生29（6683）');
  assert.equal(empty.issue,'');
  const bound=bindImportStudent(records,unmatched.id,6659,students).records;
  const both=acknowledgeImportOverwrite(bound,unmatched.id,students).find(record=>record.id===unmatched.id);
  assert.equal(previewOriginalStatus(both),'未匹配学生');
  assert.equal(previewActionFeedback(both),'已选择 学生5（6659） · 已确认覆盖');
  assert.equal(previewActionFeedback(retryImportRecord(confirmed,overwrite.id,students).find(record=>record.id===overwrite.id)),'');
});
test('selection feedback persists independently of overwrite and subsequent record actions',()=>{
  const students=roster(), records=createPreviewDemoRecords(students);
  const target=records.find(record=>record.studentCode==null);
  assert.equal(previewSelectionLabel(target),'');
  const bound=bindImportStudent(records,target.id,6682,students);
  const selected=bound.records.find(record=>record.id===target.id);
  const label='已选择 学生28（6682）';
  assert.equal(previewSelectionLabel(selected),label);
  assert.equal(selected.fileName,target.fileName);
  assert.match(selected.issue,/待确认：覆盖/);
  assert.equal(selected.overwriteApproval,null);
  assert.equal(previewSelectionLabel(deferImportRecords(bound.records,target.id).find(record=>record.id===target.id)),label);
  assert.equal(previewSelectionLabel(retryImportRecord(bound.records,target.id,students).find(record=>record.id===target.id)),label);
  const emptyStudents=students.map(student=>student.code===6683?{...student,files:[],gradingStatus:'未上传'}:student);
  const emptyMatch=bindImportStudent(bound.records,target.id,6683,emptyStudents).records.find(record=>record.id===target.id);
  assert.equal(previewSelectionLabel(emptyMatch),'已选择 学生29（6683）');
  assert.equal(emptyMatch.issue,'');
  assert.equal(previewSelectionLabel(null),'');
});
test('defer notice names the acted-on file and expires after 3 seconds with timer cleanup',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  assert.ok(source.includes("`${record.fileName} 已选择暂不处理，${next ? '自动切换查看下一个' : '没有更多待处理文件'}`"));
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  assert.match(css,/\.review-defer-notice \{[^}]*grid-template-columns: 40px minmax\(0, 1fr\) 40px/);
  assert.match(css,/\.review-defer-notice > span \{[^}]*text-align: center/);
  assert.match(source,/useEffect\(\(\) => \{\s*if \(!notice\) return;\s*const timer = setTimeout\(\(\) => setNotice\(current => current === notice \? null : current\), 3000\);\s*return \(\) => clearTimeout\(timer\);\s*\}, \[notice\]\)/);
});
test('defer navigation skips handled and normal records, wraps and stops at the final exception',()=>{
  const records=[{id:'a',decision:'pending',issue:'图片损坏'},
    {id:'b',decision:'deferred',issue:'上传失败'},
    {id:'c',decision:'pending',issue:''},
    {id:'d',decision:'imported',issue:''},
    {id:'e',decision:'pending',issue:'未匹配学生'}];
  const before=JSON.stringify(records);
  assert.equal(nextPendingPreviewRecord(records,'a').id,'e');
  assert.equal(nextPendingPreviewRecord(records,'e').id,'a');
  assert.equal(nextPendingPreviewRecord(deferImportRecords(records,'a'),'e'),null);
  assert.equal(nextPendingPreviewRecord([],'missing'),null);
  assert.equal(nextPendingPreviewRecord(records,'missing'),null);
  assert.equal(JSON.stringify(records),before);
});
test('changing a deferred association restores pending without approving overwrite; same choice is a no-op',()=>{
  const students=roster(), records=createPreviewDemoRecords(students);
  const target=records.find(record=>record.studentCode==null);
  const deferred=deferImportRecords(records,target.id);
  const first=bindImportStudent(deferred,target.id,6659,students);
  assert.equal(first.error,'');
  const selected=first.records.find(record=>record.id===target.id);
  assert.equal(selected.decision,'pending');
  assert.equal(selected.fileName,target.fileName);
  assert.deepEqual(selected.pages.map(page=>page.id),target.pages.map(page=>page.id));
  assert.equal(selected.overwriteApproval,null);
  assert.match(selected.issue,/待确认：覆盖/);
  assert.equal(previewSelectionLabel(selected),'已选择 学生5（6659）');
  assert.equal(nextPendingPreviewRecord(first.records,target.id).fileName,'6682_1.jpg');
  const held=deferImportRecords(first.records,target.id);
  assert.equal(bindImportStudent(held,target.id,6659,students).records,held);
  const changed=bindImportStudent(held,target.id,6660,students);
  const updated=changed.records.find(record=>record.id===target.id);
  assert.equal(updated.decision,'pending');
  assert.equal(previewSelectionLabel(updated),'已选择 学生6（6660）');
  assert.equal(updated.overwriteApproval,null);
  assert.match(updated.issue,/待确认：覆盖/);
  assert.equal(previewCounts(changed.records).deferred,0);
  assert.equal(bindImportStudent(held,target.id,6655,students).records,held);
});
test('preview student binding only advances after a changed successful selection and keeps per-file view state',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const handler=source.slice(source.indexOf('const selectStudent ='),source.indexOf('const canShowPages ='));
  assert.match(handler,/record.studentCode === Number\(code\)\) return ''/);
  assert.ok(handler.indexOf('if (error) return error')<handler.indexOf('retain(record.id)'));
  assert.match(handler,/nextPendingPreviewRecord\(records, record.id\)/);
  assert.match(handler,/if \(next\) \{[\s\S]*setRecordId\(next.id\)/);
  assert.match(source,/previewPositions.current.set\(active.id/);
  assert.match(source,/previewPositions.current.get\(active\?\.id\)/);
  assert.match(source,/scales\[active\?\.id\]/);
});
test('selected-preview demo seeds exactly one record per exception without changing shared fixtures',()=>{
  const students=roster(), before=JSON.stringify(students);
  const records=createPreviewDemoRecords(students);
  assert.deepEqual(records.filter(record=>record.issue).map(record=>record.fileName),[
    'IMG_20260922.jpg','6682_1.jpg','6682_2.jpg','6682_3.jpg',
    '6666.pdf','6667.pdf','6655.pdf','6684_1.jpg',
  ]);
  assert.equal(previewCounts(records).total,26);
  assert.equal(previewCounts(records).imported,18);
  assert.equal(previewCounts(records).unresolved,8);
  assert.equal(previewCounts(records).ready,0);
  assert.equal(JSON.stringify(students),before);
  assert.equal(createImportRecords(students,true).length,30);
  assert.equal(createImportRecords(students,true).filter(record=>record.issue).length,8);
  const all=validateImportRecords(createImportRecords(students,true),students);
  for(const record of records.filter(record=>record.issue)) assert.deepEqual(record,all.find(item=>item.id===record.id));
});
test('demo recovery retains all records even when two exceptions now share the overwrite issue',()=>{
  const students=roster(), records=createPreviewDemoRecords(students);
  const target=records.find(record=>record.fileName==='6667.pdf');
  const retried=retryImportRecord(records,target.id,students);
  assert.equal(retried.filter(record=>record.issue.startsWith('待确认：覆盖')).length,2);
  assert.deepEqual(retried.map(record=>record.id),records.map(record=>record.id));
  const deferred=deferImportRecords(retried,target.id);
  assert.equal(previewCounts(deferred).unresolved,7);
  assert.equal(previewCounts(deferred).exception,8);
  assert.equal(previewCounts(deferred).deferred,1);
  const restored=restoreImportRecord(deferred,target.id,students);
  assert.equal(previewCounts(restored).unresolved,8);
  assert.deepEqual(restored.map(record=>record.id),records.map(record=>record.id));
});
test('normal preview examples reuse saved student images without creating new imports or exceptions',()=>{
  const students=roster(), records=createPreviewDemoRecords(students);
  const saved=records.filter(record=>record.demoExisting);
  assert.equal(saved.length,18);
  for(const code of [6656,6659,6660]) {
    const source=students.find(student=>student.code===code);
    const examples=saved.filter(record=>record.studentCode===code);
    assert.deepEqual(examples.map(record=>record.fileName),source.files.map(file=>file.name));
    assert.deepEqual(examples.map(record=>record.pages[0].src),source.files.map(file=>file.src));
    assert.ok(examples.every(record=>record.canPreview && !record.issue && record.decision==='imported'));
  }
  assert.equal(previewCounts(validateImportRecords(records,students)).unresolved,8);
  const target=saved[0];
  assert.equal(removePreviewPage(records,{recordId:target.id,fileId:target.pages[0].id},students),records);
  const deferred=deferImportRecords(records);
  assert.equal(previewCounts(deferred).ready,0);
  assert.equal(confirmImportRecords(deferred,students).result.length,0);
  assert.deepEqual(deferred.filter(record=>record.demoExisting),saved);
  const parent=readFileSync(new URL('../src/CompositionImport.jsx',import.meta.url),'utf8');
  assert.match(parent,/record.decision === "imported" && !record.demoExisting/);
});
test('preview validates imported-class targets upfront: grading locks and overwrite are not ready',()=>{
  const records=validateImportRecords(createImportRecords(roster(),true),roster());
  assert.equal(previewCounts(records).total,30);
  assert.equal(previewCounts(records).ready,0);
  assert.ok(records.find(r=>r.studentCode===6655).issue.includes('导入受限'));
  assert.ok(records.some(r=>r.issue.startsWith('待确认：覆盖')));
  assert.ok(importSubmitBlockReason(records));
});
test('defer and restore preserve identity and pages; deferred exceptions never become success',()=>{
  const records=validateImportRecords(createImportRecords(roster(),true),roster());
  const target=records.find(r=>r.fileName==='6667.pdf');
  const next=deferImportRecords(records,target.id);
  const item=next.find(r=>r.id===target.id);
  assert.equal(item.pages,target.pages);
  assert.equal(item.issue,target.issue);
  assert.equal(previewCounts(next).deferred,1);
  assert.equal(previewCounts(next).exception,30);
  assert.match(previewRecordStatus(item),/暂不处理.*PDF 解析失败/);
  assert.match(previewRecordHelp(item),/未加密/);
  assert.equal(restoreImportRecord(next,target.id,roster()).find(r=>r.id===target.id).decision,'pending');
});
test('PDF retry changes one file only and must acknowledge overwrite before submission',()=>{
  const students=roster(), records=validateImportRecords(createImportRecords(students,true),students);
  const target=records.find(r=>r.fileName==='6667.pdf');
  const retry=retryImportRecord(records,target.id,students);
  for(const r of records) if(r.id!==target.id) assert.equal(retry.find(n=>n.id===r.id),r);
  assert.match(retry.find(r=>r.id===target.id).issue,/待确认：覆盖/);
  const ready=acknowledgeImportOverwrite(deferImportRecords(retry),target.id,students);
  assert.equal(previewCounts(ready).ready,1);
  assert.equal(importSubmitBlockReason(ready),'');
  assert.match(importSubmitBlockReason(ready,true),/处理中/);
  const submitted=confirmImportRecords(ready,students);
  assert.equal(previewCounts(submitted.records).imported,1);
  assert.equal(previewCounts(submitted.records).deferred,29);
  const committed=commitImportStudents(students,submitted.result);
  assert.equal(committed.find(s=>s.code===6667).gradingStatus,'批改中');
  assert.ok(committed.find(s=>s.code===6667).history.length);
  assert.equal(committed.find(s=>s.code===6668),students.find(s=>s.code===6668));
  assert.equal(confirmImportRecords(submitted.records,committed).result.length,0);
});
test('delete is bound to clicked stable page ID and does not touch stored essays',()=>{
  const students=roster(), records=validateImportRecords(createImportRecords(students,true),students);
  const target=records.find(r=>r.fileName==='6668.pdf');
  const old=JSON.stringify(students);
  const next=removePreviewPage(records,{recordId:target.id,fileId:target.pages[2].id},students);
  assert.equal(next.find(r=>r.id===target.id).pages.length,5);
  assert.equal(next.find(r=>r.id===target.id).pages[0].id,target.pages[0].id);
  assert.ok(!next.find(r=>r.id===target.id).pages.some(p=>p.id===target.pages[2].id));
  assert.equal(JSON.stringify(students),old);
  assert.equal(previewCounts(next).total,30);
  assert.equal(previewCounts(next).pages,previewCounts(records).pages-1);
  const locked=records.find(r=>r.studentCode===6655);
  assert.equal(removePreviewPage(records,{recordId:locked.id,fileId:locked.pages[0].id},students),records);
  assert.equal(removePreviewPage(records,{recordId:target.id,fileId:'missing'},students),records);
});
test('manual match retains original filename and refuses grading and mixed-format targets',()=>{
  const students=roster(), records=validateImportRecords(createImportRecords(students,true),students);
  const target=records.find(r=>r.studentCode==null);
  assert.ok(bindImportStudent(records,target.id,6655,students).error);
  assert.ok(bindImportStudent(records,target.id,6667,students).error);
  const bound=bindImportStudent(records,target.id,6682,students);
  assert.equal(bound.error,'');
  assert.equal(bound.records.find(r=>r.id===target.id).fileName,target.fileName);
  assert.equal(bindImportStudent(bound.records,target.id,6682,students).records,bound.records);
});
test('preview adapter connects existing records, scoped actions and disabled submit without fake counters',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const parent=readFileSync(new URL('../src/CompositionImport.jsx',import.meta.url),'utf8');
  assert.match(source,/previewCounts\(records\)/);
  assert.match(source,/onRemove\(active, file\)/);
  assert.match(source,/importSubmitBlockReason\(records, busy\)/);
  assert.match(parent,/records=\{summaryRecords\}/);
  assert.match(parent,/removePreviewPage\(records, deleteTarget, currentImportRoster\(\)\)/);
  assert.doesNotMatch(parent,/31 人|1篇待处理 · 共5个文件|可提交 0 个文件 · 待处理 1 个文件/);
});
test('screenshot layout places per-page deletion inside the image and current-file actions in the toolbar',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  const surface=source.slice(source.indexOf('<div className="review-image-surface">'),source.indexOf('<figcaption className="review-image-caption">'));
  assert.match(surface,/<img src=\{file.src\}/);
  assert.match(surface,/review-image-delete/);
  assert.match(surface,/onRemove\(active, file\)/);
  assert.match(surface,/disabled=\{busy \|\| locked \|\| active.decision === 'imported'\}/);
  assert.match(css,/\.review-records \.review-image-surface \{ position: relative/);
  assert.match(css,/\.review-records \.preview-image-card \.review-image-delete \{ position: absolute; top: 12px; right: 12px/);
  const toolbar=source.slice(source.indexOf('<div className="preview-stage-toolbar">'),source.indexOf('<div className="preview-image-scroll"'));
  assert.match(toolbar,/<ImportStudentSelect key=\{active.id\}/);
  assert.match(toolbar,/fileActions\(active\)/);
});
test('preview toolbar uses the add-button blue outline while preserving disabled styling',()=>{
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  const toolbar=css.match(/\.review-records \.review-toolbar-actions > button, [^{]+\{([^}]+)\}/)[1];
  const add=css.match(/\.preview-column-head button \{([^}]+)\}/)[1];
  for(const declaration of ['border: 1px solid #a9c9ff','background: #fff','color: #1764db','font-weight: 600']) {
    assert.ok(add.includes(declaration));
    assert.ok(toolbar.includes(declaration));
  }
  assert.match(css,/\.review-toolbar-actions > button:disabled[^}]+color: #98a2b3/);
  assert.doesNotMatch(css,/\.review-toolbar-actions \.import-student-select > button \{[^}]*background: #0758ff/);
});
test('deferred preview keeps its issue visible and separates the reversible decision styling',()=>{
  const source=readFileSync(new URL('../src/SelectedImportPreview.jsx',import.meta.url),'utf8');
  const css=readFileSync(new URL('../src/composition-import.css',import.meta.url),'utf8');
  const short=source.slice(source.indexOf('const shortStatus'),source.indexOf('const fileActions'));
  assert.doesNotMatch(short,/deferred|暂不处理/);
  assert.match(source,/shortStatus\(record\).*review-deferred-badge/);
  assert.match(source,/shortStatus\(active\).*review-deferred-badge/);
  assert.match(source,/record.decision === 'deferred' \? 'review-restore-action'/);
  assert.match(source,/record.decision === 'deferred' \? 'is-deferred'/);
  assert.match(css,/\.review-restore-action:not\(:disabled\)[^}]+background: #f3effb/);
  assert.match(css,/\.review-file-row.is-deferred[^}]+background: #faf8fe/);
});

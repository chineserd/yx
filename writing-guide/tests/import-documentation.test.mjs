import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { acceptanceItems } from '../src/acceptance-items.mjs';
import { uploadOperationRows, gradingOperationRows } from '../src/acceptance-operation-matrix.mjs';

const read = file => readFileSync(new URL('../src/' + file, import.meta.url), 'utf8');
const prd = read('App.jsx').split('function PrdPage()')[1].split('function Sidebar')[0];
const item = id => acceptanceItems.find(row => row.id === id);

test('PRD and acceptance use current AI copy while declaring simulation boundaries', () => {
  const copy = '上传文件后，系统自动识别学生并整理文件。';
  for (const source of [prd, read('CompositionImport.jsx'), item('REQ-05').expected]) assert.ok(source.includes(copy));
  assert.match(prd, /不接入真实 AI/);
  assert.match(item('REQ-24').expected, /不调用真实AI/);
  assert.match(item('REQ-02').expected, /停留第1步/);
  assert.match(item('REQ-05').expected, /AI隐藏两者/);
});

test('switching and upload completion acceptance match the guarded inline flow', () => {
  assert.match(item('REQ-22').expected, /暂停处理.*取消.*续传.*确认清空.*第1步.*不自动导入/);
  assert.match(prd, /取消保留方式、文件和进度并续传/);
  assert.match(item('REQ-06').expected, /无进度弹窗.*第2步.*原弹窗/);
  assert.match(item('REQ-21').steps, /切换方式确认/);
  assert.doesNotMatch(prd, /导入成功后进入成绩概览|已确认后只展示|legacy-prd-section|accept-pass/);
});

test('documentation labels match normal filter, submit action and actual grading states', () => {
  for (const file of ['acceptance-items.mjs','acceptance-operation-matrix.mjs','AcceptanceOperationMatrix.jsx','dialog-scenarios.mjs']) {
    assert.doesNotMatch(read(file), /可导入|确认导入/);
  }
  assert.equal(uploadOperationRows.find(row => row.id === 'ready').status, '正常');
  assert.equal(gradingOperationRows.length, 3);
  assert.match(read('AcceptanceOperationMatrix.jsx'), /提交并批改（整批）/);
  assert.match(read('AcceptanceChecklist.jsx'), /3 种学生批改状态/);
  assert.match(read('AcceptanceDialogGallery.jsx'), /历史截图参考，可能含旧文案/);
});

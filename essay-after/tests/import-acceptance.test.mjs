import test from 'node:test';
import assert from 'node:assert/strict';
import { acceptanceItems, sanitizeAcceptanceResults } from '../src/acceptance-items.mjs';
import { operationStates, uploadOperationRows, gradingOperationRows } from '../src/acceptance-operation-matrix.mjs';

test('acceptance cases have unique IDs and complete testable fields', () => {
  assert.equal(acceptanceItems.length, 24);
  assert.equal(new Set(acceptanceItems.map(item => item.id)).size, 24);
  for (const item of acceptanceItems) {
    for (const key of ['id','group','precondition','steps','expected','priority']) assert.ok(item[key]);
  }
});
test('acceptance states default to pending and reject corrupted or obsolete saved data', () => {
  assert.ok(Object.values(sanitizeAcceptanceResults(null)).every(value => value === 'pending'));
  const saved = sanitizeAcceptanceResults({'REQ-01':'passed','REQ-02':'failed','REQ-03':'invalid','obsolete':'passed'});
  assert.equal(saved['REQ-01'],'passed');
  assert.equal(saved['REQ-02'],'failed');
  assert.equal(saved['REQ-03'],'pending');
  assert.equal(Object.keys(saved).length,24);
});
test('operation matrix covers all upload states and distinguishes conditional batch confirmation', () => {
  assert.equal(uploadOperationRows.length,11);
  assert.equal(new Set(uploadOperationRows.map(row => row.id)).size,11);
  for (const row of uploadOperationRows) {
    assert.equal(row.actions.length,5);
    assert.ok(row.result);
    for (const [state] of row.actions) assert.ok(Object.hasOwn(operationStates,state));
  }
  const deferred = uploadOperationRows.find(row => row.id === 'deferred');
  assert.equal(deferred.actions[1][0],'enabled');
  assert.equal(deferred.actions[1][1],'显示“恢复处理”');
  assert.equal(deferred.actions[4][0],'conditional');
  for (const id of ['pdf','match','validation','upload-error']) assert.equal(uploadOperationRows.find(row => row.id === id).actions[0][0],'hidden');
  assert.equal(uploadOperationRows.find(row => row.id === 'overwrite').actions[3][0],'enabled');
});
test('grading matrix keeps preview enabled while grading locks import and delete', () => {
  assert.equal(gradingOperationRows.length,3);
  assert.deepEqual(gradingOperationRows.find(row => row.status === '批改中').actions.map(([state]) => state),['disabled','enabled','disabled']);
  assert.deepEqual(gradingOperationRows.find(row => row.status === '未上传').actions.map(([state]) => state),['enabled','disabled','disabled']);
});

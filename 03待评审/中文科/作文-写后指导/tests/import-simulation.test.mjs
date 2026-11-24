import test from 'node:test';
import assert from 'node:assert/strict';
import { initialImportSimulation, importSimulationReducer as reduce, projectImportRoster } from '../src/import-simulation.mjs';

const records = Array.from({ length: 30 }, (_, i) => ({ code: 6655 + i, name: `学生${i + 1}`, files: [{ id: `${i}-1` }] }));
test('empty essays still show the entire roster as not uploaded', () => {
  const state = initialImportSimulation();
  const roster = projectImportRoster(records, state.records);
  assert.equal(roster.length, 30);
  assert.ok(roster.every(r => r.files.length === 0 && r.gradingStatus === '未上传'));
  assert.equal(state.draft.length, 0);
});
test('importing one student preserves the other 29 not-uploaded students', () => {
  const state = reduce(reduce(initialImportSimulation(), { type: 'uploaded', records: [records[5]] }), { type: 'confirm' });
  const roster = projectImportRoster(records, state.records);
  assert.equal(roster.length, 30);
  assert.equal(roster[5].gradingStatus, '批改中');
  assert.equal(roster.filter(r => r.gradingStatus === '未上传').length, 29);
});
test('starts empty and cannot confirm before upload', () => {
  const state = initialImportSimulation();
  assert.equal(state.records.length, 0);
  assert.equal(state.draft.length, 0);
  assert.equal(reduce(state, { type: 'confirm' }), state);
});
test('upload prepares 30 drafts without changing the outer list', () => {
  const state = reduce(initialImportSimulation(), { type: 'uploaded', records });
  assert.equal(state.draft.length, 30);
  assert.equal(state.records.length, 0);
  assert.equal(state.pending, true);
});
test('explicit confirm commits once, automatically grading; repeated uploads do not duplicate students', () => {
  let state = reduce(initialImportSimulation(), { type: 'uploaded', records });
  state = reduce(state, { type: 'confirm' });
  assert.equal(state.stage, 'grading');
  assert.equal(state.records.length, 30);
  assert.ok(state.records.every(r => r.gradingStatus === '批改中'));
  assert.equal(reduce(state, { type: 'confirm' }), state);
  state = reduce(reduce(state, { type: 'uploaded', records }), { type: 'confirm' });
  assert.equal(state.records.length, 30);
});
test('confirmation advances grading; reset isolates a new class/task', () => {
  let state = reduce(reduce(initialImportSimulation(), { type: 'uploaded', records }), { type: 'confirm' });
  assert.ok(state.records.every(r => r.gradingStatus === '批改中'));
  assert.equal(state.stage, 'grading');
  assert.deepEqual(reduce(state, { type: 'reset' }), initialImportSimulation());
});

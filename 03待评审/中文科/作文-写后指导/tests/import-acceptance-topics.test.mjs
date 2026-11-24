import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { acceptanceItems, sanitizeAcceptanceResults } from '../src/acceptance-items.mjs';
import { acceptanceSections, acceptanceTopics, supplementaryScenes, topicItems, topicProgress } from '../src/acceptance-topics.mjs';
import { uploadOperationGroups, uploadOperationRows } from '../src/acceptance-operation-matrix.mjs';
import { dialogScenarios } from '../src/dialog-scenarios.mjs';

test('four sections and twelve topics preserve each of the 24 original cases exactly once', () => {
  assert.equal(acceptanceSections.length, 4);
  assert.equal(acceptanceTopics.length, 12);
  assert.deepEqual(acceptanceTopics.flatMap(topic => topic.ids).sort(), acceptanceItems.map(item => item.id).sort());
  assert.equal(new Set(acceptanceTopics.map(topic => topic.id)).size, 12);
  assert.deepEqual(acceptanceSections.map(section => acceptanceTopics.filter(topic => topic.section === section).reduce((sum, topic) => sum + topic.ids.length, 0)), [9, 8, 3, 4]);
});

test('topic filtering and progress do not mutate, merge or pre-pass saved child results', () => {
  const results = sanitizeAcceptanceResults({'REQ-01':'passed','REQ-03':'failed'});
  const original = structuredClone(results);
  const topic = acceptanceTopics.find(topic => topic.id === 'entry');
  assert.deepEqual(topicProgress(topic, results), {passed:1,failed:1,total:3,checked:2});
  assert.deepEqual(topicItems(topic, results, 'failed').map(item => item.id), ['REQ-03']);
  assert.deepEqual(topicItems(topic, results, 'pending').map(item => item.id), ['REQ-04']);
  assert.deepEqual(results, original);
  assert.deepEqual(topicProgress(topic, sanitizeAcceptanceResults(null)), {passed:0,failed:0,total:3,checked:0});
  const source = readFileSync(new URL('../src/AcceptanceChecklist.jsx', import.meta.url), 'utf8');
  assert.match(source, /composition-acceptance-20260923-v1/);
});

test('all 14 current scene references remain reachable from topic details or supplement', () => {
  const sceneIds = [...new Set([...acceptanceTopics.flatMap(topic => topic.scenes), ...supplementaryScenes])];
  assert.deepEqual(sceneIds.sort(), dialogScenarios.map(item => item.id).sort());
  assert.deepEqual(acceptanceTopics.find(topic => topic.id === 'delete').scenes, ['delete-page','delete-student']);
});

test('eight upload groups preserve eleven rules and merge only identical actions', () => {
  assert.equal(uploadOperationGroups.length, 8);
  assert.deepEqual(uploadOperationGroups.flatMap(group => group.rows.map(row => row.id)).sort(), uploadOperationRows.map(row => row.id).sort());
  for (const group of uploadOperationGroups) for (const row of group.rows) assert.deepEqual(row.actions, group.actions);
});

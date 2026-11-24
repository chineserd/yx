import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { acceptanceItems } from '../src/acceptance-items.mjs';
import { acceptanceStorageKey, readResults, recordResult } from '../src/vue/acceptance/store.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const memoryStorage = initial => {
  const values = new Map(Object.entries(initial || {}));
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
};

test('Vue acceptance reads the existing 24 marks without writing or marking cases passed', () => {
  const raw = JSON.stringify({ 'REQ-01': 'passed', 'REQ-13': 'failed', unknown: 'passed' });
  const storage = memoryStorage({ [acceptanceStorageKey]: raw });
  const { results, failed } = readResults(storage);
  assert.equal(failed, false);
  assert.equal(Object.keys(results).length, 24);
  assert.equal(results['REQ-01'], 'passed');
  assert.equal(results['REQ-13'], 'failed');
  assert.equal(results['REQ-02'], 'pending');
  assert.equal(storage.getItem(acceptanceStorageKey), raw);
  assert.ok(read('src/AcceptanceChecklist.jsx').includes(acceptanceStorageKey));
});

test('saving one Vue result preserves other current saved marks and their IDs', () => {
  const storage = memoryStorage();
  const stale = readResults(storage).results;
  storage.setItem(acceptanceStorageKey, JSON.stringify({ ...stale, 'REQ-13': 'failed' }));
  const next = recordResult(storage, stale, 'REQ-01', 'passed');
  assert.equal(next.results['REQ-13'], 'failed');
  assert.equal(next.results['REQ-01'], 'passed');
  assert.deepEqual(Object.keys(next.results), acceptanceItems.map(item => item.id));
  assert.deepEqual(readResults(storage).results, next.results);
});

test('malformed saved JSON does not prevent reading, and a deliberate mark can recover it', () => {
  const storage = memoryStorage({ [acceptanceStorageKey]: '{bad json' });
  const initial = readResults(storage);
  assert.equal(initial.failed, true);
  assert.ok(Object.values(initial.results).every(value => value === 'pending'));
  const next = recordResult(storage, initial.results, 'REQ-02', 'failed');
  assert.equal(next.failed, false);
  assert.equal(readResults(storage).results['REQ-02'], 'failed');
});

test('storage denial keeps the new mark in memory and reports persistence failure', () => {
  const storage = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('quota'); } };
  const initial = readResults(storage);
  const next = recordResult(storage, initial.results, 'REQ-02', 'passed');
  assert.equal(next.failed, true);
  assert.equal(next.results['REQ-02'], 'passed');
});

test('invalid IDs/statuses never write or alter acceptance results', () => {
  const storage = memoryStorage();
  const original = readResults(storage).results;
  assert.equal(recordResult(storage, original, 'REQ-99', 'passed').results, original);
  assert.equal(recordResult(storage, original, 'REQ-01', 'automatic-pass').results, original);
  assert.equal(storage.getItem(acceptanceStorageKey), null);
});

test('a later save failure or retry never discards earlier unsaved marks', () => {
  const persisted = memoryStorage();
  let blocked = true;
  const storage = { getItem: persisted.getItem, setItem(key, value) { if (blocked) throw new Error('quota'); persisted.setItem(key, value); } };
  const original = readResults(storage).results;
  persisted.setItem(acceptanceStorageKey, JSON.stringify(original));
  const first = recordResult(storage, original, 'REQ-01', 'passed');
  const second = recordResult(storage, first.results, 'REQ-02', 'failed', { 'REQ-01': 'passed' });
  assert.equal(second.failed, true);
  assert.equal(second.results['REQ-01'], 'passed');
  assert.equal(second.results['REQ-02'], 'failed');
  blocked = false;
  const saved = recordResult(storage, second.results, 'REQ-03', 'passed', { 'REQ-01': 'passed', 'REQ-02': 'failed' });
  assert.equal(saved.failed, false);
  assert.equal(readResults(storage).results['REQ-01'], 'passed');
  assert.equal(readResults(storage).results['REQ-02'], 'failed');
});

test('Vue and legacy menus share the two flat screenshot-matched entries', async () => {
  const { code } = await transform(read('src/vue/navigation.ts'), { loader: 'ts', format: 'esm' });
  const { navigation } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
  const app = read('src/App.jsx');
  const menuSource = ['publishNav', 'taskManagementNav'].map(name => {
    const start = app.indexOf(`const ${name} =`);
    return app.slice(start, app.indexOf(';', start));
  }).join('\n');
  const oldItems = [...menuSource.matchAll(/\[\s*"([^"]+)",\s*\w+,\s*"([^"]+)"/g)].map(match => [match[1], match[2]]);
  assert.deepEqual(navigation.map(item => [item.key, item.label]), oldItems);
  assert.deepEqual(navigation.map(item => item.label), ['发布任务', '任务管理']);
});

test('Vue acceptance reuses business specifications, with no new automatic grading or result dialog', () => {
  const checklist = read('src/vue/acceptance/AcceptanceChecklist.vue');
  assert.match(checklist, /acceptance-items\.mjs/);
  assert.match(checklist, /acceptance-topics\.mjs/);
  assert.match(read('src/vue/acceptance/AcceptanceOperationMatrix.vue'), /acceptance-operation-matrix\.mjs/);
  assert.match(read('src/vue/acceptance/AcceptanceDialogGallery.vue'), /dialog-scenarios\.mjs/);
  assert.doesNotMatch(checklist, /confirmImportRecords|dispatchSimulation|fetch\(/);
  assert.match(checklist, /removeEventListener\('storage'/);
});

test('React is isolated at the migration boundary and unmounts when its Vue host is disposed', () => {
  function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(resolve(dir, entry.name)) : [resolve(dir, entry.name)]); }
  for (const file of files(resolve(root, 'src/vue'))) {
    if (file.endsWith('legacy-bridge.mjs')) continue;
    assert.doesNotMatch(readFileSync(file, 'utf8'), /from ['"]react(?:-dom[^'"]*)?['"]/, file);
  }
  assert.match(read('src/vue/LegacyHost.vue'), /onBeforeUnmount\(\(\) => bridge\?\.unmount\(\)\)/);
  assert.match(read('src/App.jsx'), /if \(productSection === "acceptance"\)[\s\S]*?return embedded \? null : \([\s\S]*?EmptyProductSection/);
  assert.match(read('src/vue/App.vue'), /product-section-change/);
});

test('staging leaves legacy production entry and output separate, without redirecting previews', () => {
  assert.match(read('index.html'), /src\/main\.jsx/);
  assert.match(read('vue.html'), /src\/vue\/main\.ts/);
  assert.match(read('vite.vue.config.mjs'), /outDir: 'dist-vue'/);
  assert.doesNotMatch(read('src/vue/main.ts'), /import ['"].*latest-version/);
  assert.match(read('vite.pages.config.mjs'), /outDir: "dist-pages"/);
  const publisher = read('scripts/publish-pages.mjs');
  assert.doesNotMatch(publisher, /dist-vue|run\("npm", \["run", "build:vue"\]\)/);
  for (const file of ['vue.html', 'vite.vue.config.mjs', 'tsconfig.vue.json', 'MIGRATION-VUE.md']) assert.ok(publisher.includes('"' + file + '"'), file + ' must survive a future source snapshot');
});

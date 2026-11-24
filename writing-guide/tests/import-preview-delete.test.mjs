import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/CompositionImport.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/composition-import.css', import.meta.url), 'utf8');

test('every preview image owns a delete action bound to its own page, not the selection', () => {
  const card = source.slice(source.indexOf('data-preview-file={fileIndex}'), source.indexOf('</figure>', source.indexOf('data-preview-file={fileIndex}')));
  assert.match(card, /className="preview-delete-page"/);
  assert.match(card, /requestRemoveFile\(selected.student, fileIndex, event\)/);
  assert.match(card, /aria-label=\{`删除 \$\{file.name\}`\}/);
  assert.match(card, /disabled=.*批改中/);
  assert.doesNotMatch(source, /preview-delete-floating|删除当前选中作文/);
  assert.match(css, /\.preview-image-card-actions\s*\{[^}]*display: inline-flex/);
  assert.doesNotMatch(css.match(/\.preview-delete-page\s*\{[^}]*\}/)[0], /position:\s*(fixed|absolute|sticky)/);
});

test('delete confirmation preserves the clicked file identity and isolates the preview', () => {
  assert.match(source, /event\?\.stopPropagation\(\)/);
  assert.match(source, /fileId: file.id/);
  assert.match(source, /file.id !== fileId/);
  assert.match(source, /deleteTarget && createPortal/);
  assert.match(source, /inert=\{deleteTarget \? true : undefined\}/);
});

test('delete confirmation uses two concise lines without changing deletion scope', () => {
  assert.match(source, /className="delete-dialog-description"/);
  assert.match(source, /deleteTarget.review \? "仅移除本次待导入图片，已导入作文不变。" : "仅删除当前版本的作文，页数同步更新。"/);
  assert.match(source, /<span>已有批改历史不受影响。<\/span>/);
  assert.doesNotMatch(source, /删除后从当前作文版本移除，页数同步更新；/);
  assert.match(css, /\.delete-dialog > \.delete-dialog-description\s*\{[^}]*display: grid/);
});

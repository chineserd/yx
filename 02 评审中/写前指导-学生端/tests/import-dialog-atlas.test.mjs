import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { dialogCategories, dialogScenarios } from "../src/dialog-scenarios.mjs";

test("dialog atlas covers 14 current scenarios in six categories with unique assets", () => {
  assert.equal(dialogScenarios.length, 14);
  assert.equal(new Set(dialogScenarios.map(item => item.id)).size, 14);
  assert.equal(dialogCategories.length, 6);
  for (const category of dialogCategories) assert.ok(dialogScenarios.some(item => item.category === category));
  for (const item of dialogScenarios) {
    assert.ok(dialogCategories.includes(item.category));
    for (const key of ["title", "state", "entry", "actions", "returns", "check"]) assert.ok(item[key]?.length > 0, `${item.id}: ${key}`);
    const path = new URL(`../src/assets/dialog-atlas/${item.image}`, import.meta.url);
    assert.ok(statSync(path).size > 10000, `${item.id}: missing or empty screenshot`);
    const bytes = readFileSync(path);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  }
});

test("gallery keeps upload, preview and deletion return paths explicit", () => {
  const get = id => dialogScenarios.find(item => item.id === id);
  assert.match(get("essay-preview").returns, /原列表或汇总弹窗/);
  assert.match(get("delete-page").returns, /取消恢复原预览/);
  assert.equal(get("import-result"), undefined);
  assert.equal(get("import-partial-result"), undefined);
  assert.match(get("batch-ready").returns, /直接返回当前列表/);
  assert.match(get("batch-deferred").check, /仍计入异常/);
});

test("empty import reference documents inline naming rules and the post-upload list", () => {
  const empty = dialogScenarios.find(item => item.id === "batch-empty");
  assert.match(empty.check, /0 个文件.*隐藏统计与列表/);
  assert.match(empty.check, /命名规则.*禁用/);
  assert.match(empty.returns, /本弹窗显示带数量的筛选标签与文件列表/);
  assert.match(empty.check, /通栏展示命名规则.*按钮居中/);
  assert.equal(empty.capturedAt, '2026-09-24');
});

test('empty naming-rule layout uses full width and centered persistent actions without changing shared rules', () => {
  const css = readFileSync(new URL('../src/composition-import.css', import.meta.url), 'utf8');
  assert.match(css, /\.import-summary-dialog\.is-empty-upload\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.is-empty-upload \.empty-batch-import-actions\s*\{[^}]*justify-content: center; position: sticky/);
  assert.match(css, /\.import-summary-dialog \.empty-batch-import-actions\s*\{[^}]*justify-content: center/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createImportRecords, importStats, matchesImportFilter, retryImportRecord, confirmImportRecords } from "../src/import-records.mjs";
const roster = Array.from({ length: 30 }, (_, i) => ({ code: 6655 + i, name: `学生${i}`, files: [] }));
test("batch dialogs rename ready copy to normal without changing filter keys or imported state", () => {
  const source = readFileSync(new URL('../src/CompositionImport.jsx', import.meta.url), 'utf8');
  assert.match(source, /\["ready", "正常", stats.ready\]/);
  assert.ok(source.includes('const tabs = [["all", "全部", stats.total], ["ready", "正常", stats.ready], ["exception", "异常", stats.exception]];'));
  assert.equal((source.match(/<ImportFilterTabs value=/g) || []).length, 2);
  assert.doesNotMatch(source, /import-summary-stats|import-status-note|暂不处理计入异常文件/);
  assert.match(source, /simulation.pending \? "正常" : "已导入"/);
  assert.match(source, /record.issue \|\| "正常"/);
  assert.match(source, /暂无正常文件/);
  assert.doesNotMatch(source, /可导入/);
});
test("tabs match whole-batch stats without mutating records or confirmation scope", () => {
  const records = createImportRecords(roster, true);
  const before = JSON.stringify(records);
  for (const [filter, key] of [["all", "total"], ["exception", "exception"], ["ready", "ready"]]) {
    assert.equal(records.filter(r => matchesImportFilter(r, filter)).length, importStats(records)[key]);
  }
  assert.equal(records.filter(r => matchesImportFilter(r, "ready")).length, 22);
  assert.equal(confirmImportRecords(records).result.length, 0);
  assert.equal(JSON.stringify(records), before);
});
test("deferred stays exceptional, successful retry becomes ready, imported is all-only", () => {
  let records = createImportRecords(roster, true).map(r => r.issue ? { ...r, decision: "deferred" } : r);
  assert.equal(records.filter(r => matchesImportFilter(r, "exception")).length, 8);
  records = retryImportRecord(records, "exception-0", roster);
  assert.equal(records.filter(r => matchesImportFilter(r, "exception")).length, 7);
  assert.equal(records.filter(r => matchesImportFilter(r, "ready")).length, 23);
  records = confirmImportRecords(records).records;
  assert.equal(records.filter(r => matchesImportFilter(r, "ready")).length, 0);
  assert.equal(records.filter(r => matchesImportFilter(r, "all")).length, 30);
});
test("normal and uploaded drafts have no exceptions; imported drafts are not ready", () => {
  const records = createImportRecords(roster);
  assert.equal(records.filter(r => matchesImportFilter(r, "exception")).length, 0);
  assert.equal(records.filter(r => matchesImportFilter(r, "ready")).length, 30);
  assert.equal(matchesImportFilter({ issue: "", decision: "imported" }, "ready"), false);
});

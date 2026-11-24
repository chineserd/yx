import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("current single-file build remains readable", () => {
  const html = readFileSync(new URL("../中文作文.html", import.meta.url), "utf8");
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /新增作文題庫/);
});

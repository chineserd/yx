import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const output = new URL("../dist-pages/", import.meta.url);
test("Pages publishes the current static entry without legacy hosting dependencies", () => {
  const html = readFileSync(new URL("index.html", output), "utf8");
  assert.match(html, /type="module"/);
  const assets = readdirSync(new URL("assets/", output));
  assert.ok(assets.some(name => name.endsWith(".js")));
  assert.ok(assets.some(name => name.endsWith(".css")));
  const js = assets.filter(name => name.endsWith(".js")).map(name => readFileSync(new URL(`assets/${name}`, output), "utf8")).join("\n");
  assert.ok(!js.includes("code=zhongwenke-dialog-assets"));
  for (const path of [".env", ".git", ".openai", "server", "mockup-batch-import.html"]) {
    assert.equal(existsSync(new URL(path, output)), false, `Must not publish ${path}`);
  }
});

test("Pages revalidates the stable entry and caches only content-hashed assets", () => {
  const headers = readFileSync(new URL("_headers", output), "utf8");
  assert.match(headers, /\/\*\n  Cache-Control: no-cache, must-revalidate/);
  assert.match(headers, /\/assets\/\*\n  ! Cache-Control\n  Cache-Control: public, max-age=31536000, immutable/);
  assert.match(headers, /X-Robots-Tag: noindex, nofollow/);
  const version = JSON.parse(readFileSync(new URL("version.json", output), "utf8"));
  assert.equal(version.project, "zhongwenlu");
  assert.ok(version.commit);
  assert.ok(Number.isFinite(Date.parse(version.builtAt)));
});

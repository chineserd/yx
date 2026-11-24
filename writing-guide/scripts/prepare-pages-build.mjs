import { cpSync, existsSync, writeFileSync } from "node:fs";

const output = new URL("../dist-pages/", import.meta.url);
if (!existsSync(new URL("index.html", output))) throw new Error("Build Pages before preparing headers");

// HTML revalidates on opening/refresh; content-hashed assets may be cached.
writeFileSync(new URL("_headers", output), `/*
  Cache-Control: no-cache, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Robots-Tag: noindex, nofollow

/assets/*
  ! Cache-Control
  Cache-Control: public, max-age=31536000, immutable
`);
writeFileSync(new URL("version.json", output), JSON.stringify({
  project: "zhongwenlu",
  commit: process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || "local",
  builtAt: new Date().toISOString(),
}) + "\n");
console.log("Prepared Cloudflare Pages output: dist-pages (no credentials or server required)");

// Publish the named-composition app alongside the existing root app.
cpSync(new URL("../static-apps/mingtizuowen/", import.meta.url), new URL("mingtizuowen/", output), { recursive: true });
writeFileSync(new URL("_redirects", output), "/mingtizuowen /mingtizuowen/ 301\n");

#!/usr/bin/env node
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "dist", "client", "index.html");
const target = path.join(root, "中文作文.html");

if (!existsSync(source)) {
  throw new Error(`Missing single-file build output: ${source}`);
}

copyFileSync(source, target);
console.log(`Synced single-file build: ${target}`);

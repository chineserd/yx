#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runCli } from "../../../../scripts/backup-prototype.mjs";

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backupRoot = path.resolve(source, "../../../../backups");
runCli(process.argv.slice(2), {
  source,
  backupRoot,
  project: "中文科",
  module: "作文写前指导",
});

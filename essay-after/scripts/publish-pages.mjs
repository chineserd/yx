// Explicit one-command publication; never runs automatically on local edits.
// Preserve the working project's dirty tree and unrelated Git history.
import { cpSync, existsSync, lstatSync, mkdtempSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repository = "Lynnlgh0824/zhongwenlu";
const inputs = ["static-apps", "src", "scripts", "tests", "worker", ".openai", "package.json", "package-lock.json", "index.html", "vite.config.mjs", "vite.pages.config.mjs", "vue.html", "vite.vue.config.mjs", "tsconfig.vue.json", "MIGRATION-VUE.md", ".gitignore", ".node-version", "AGENTS.md", "DEPLOYMENT.md", "CLOUDFLARE-SETUP.md", "中文作文.html", "弹窗预览资源.html"];
const run = (command, args, cwd = root) => execFileSync(command, args, { cwd, stdio: "inherit", env: { ...process.env, GIT_TERMINAL_PROMPT: "0" } });
function validate(source) {
  const stat = lstatSync(source);
  if (stat.isSymbolicLink()) throw new Error("Refusing publication of symlink: " + source);
  if (/^(?:\.env(?:\..*)?|\.git|node_modules|.*\.(?:pem|key))$/.test(path.basename(source))) throw new Error("Excluded publication path: " + source);
  if (stat.isDirectory()) for (const name of readdirSync(source)) validate(path.join(source, name));
}

const metadata = JSON.parse(execFileSync("gh", ["repo", "view", repository, "--json", "nameWithOwner,visibility,defaultBranchRef"], { encoding: "utf8", cwd: root }));
if (metadata.nameWithOwner !== repository || metadata.visibility !== "PRIVATE" || metadata.defaultBranchRef?.name !== "main") throw new Error("Unexpected repository identity, privacy, or branch; publication stopped.");
for (const input of inputs) validate(path.join(root, input));
run("npm", ["run", "check"]);
run("npm", ["run", "build:pages"]);
const checkout = path.join(mkdtempSync(path.join(tmpdir(), "zhongwenlu-publish-")), "repo");
run("git", ["clone", "--depth", "1", "https://github.com/" + repository + ".git", checkout]);
console.log("Publication checkout (retained for recovery):", checkout);
// Synchronize only reviewed project paths; never copy the parent directory or .git.
// rsync --delete is deliberately limited to these explicit staging subdirectories.
for (const input of inputs) {
  const source = path.join(root, input);
  const target = path.join(checkout, input);
  if (lstatSync(source).isDirectory() && existsSync(target)) {
    run("rsync", ["-a", "--delete", source + "/", target + "/"]);
  } else cpSync(source, target, { recursive: true });
}
run("git", ["add", "--", ...inputs], checkout);
run("git", ["diff", "--cached", "--check"], checkout);
const changed = execFileSync("git", ["diff", "--cached", "--name-only"], { cwd: checkout, encoding: "utf8" }).trim();
if (!changed) { console.log("No changes to publish."); process.exit(0); }
run("git", ["commit", "-m", process.argv[2] || "Update Chinese writing prototype"], checkout);
run("git", ["push", "origin", "HEAD:main"], checkout);
console.log("Source pushed. Wait for Cloudflare's successful build and verify https://zhongwenlu.pages.dev/ before reporting deployment complete.");

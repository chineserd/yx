import { readFileSync, writeFileSync } from "node:fs";
import { dialogScenarios } from "../src/dialog-scenarios.mjs";

const images = Object.fromEntries(dialogScenarios.map(item => [item.image, `data:image/webp;base64,${readFileSync(new URL(`../src/assets/dialog-atlas/${item.image}`, import.meta.url)).toString("base64")}`]));
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>中文科 · 弹窗预览资源</title></head><body><p>中文科验收清单预览资源，请通过原型固定链接查看。</p><script>
const images=${JSON.stringify(images)};
const allowed=new Set(["https://www.htmlcode.fun","https://htmlcode.fun","http://a.localhost:4173","http://localhost:4173"]);
addEventListener("message",event=>{if(event.source!==parent||!allowed.has(event.origin)||event.data?.type!=="composition-atlas-request")return;event.source.postMessage({type:"composition-atlas-images",images},event.origin);});
</script></body></html>`;
if (Buffer.byteLength(html) > 1048576) throw new Error("Dialog image package exceeds hosting limit");
writeFileSync(new URL("../弹窗预览资源.html", import.meta.url), html);
console.log(`Dialog image package: ${Buffer.byteLength(html)} bytes / ${dialogScenarios.length} images`);

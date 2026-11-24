import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../src/' + path, import.meta.url), 'utf8');
test('import method cards explain teacher choices consistently in UI, PRD and acceptance', () => {
  const source = read('CompositionImport.jsx');
  for (const file of ['CompositionImport.jsx', 'App.jsx', 'acceptance-items.mjs']) {
    const content = read(file);
    for (const copy of ['按文件名导入', 'AI 自动识别', '按命名规则准备文件，系统匹配学生并排序。', '上传文件后，系统自动识别学生并整理文件。']) assert.ok(content.includes(copy), `${file}: ${copy}`);
    assert.doesNotMatch(content, /AI\s*自动整理分类/);
  }
  assert.match(source, /aria-label="AI 自动识别" aria-pressed=\{value === "ai"\} onClick=\{\(\) => onChange\("ai"\)\}/);
  assert.match(source, /aria-label="按文件名导入" aria-pressed=\{value === "filename"\} onClick=\{\(\) => onChange\("filename"\)\}/);
});
test('teacher import controls consistently use import terminology without renaming grading states', () => {
  const source = read('CompositionImport.jsx');
  for (const copy of ['导入文件', '按文件名导入', '切换导入方式？', '切换并重新导入', '>重新导入</button>', '<th>文件状态</th>']) assert.ok(source.includes(copy), copy);
  assert.doesNotMatch(source, /批量上传|按文件名分类上传|切换上传方式|重新上传|上传注意事项/);
  assert.match(source, /label: "未上传"/);
  assert.doesNotMatch(read('TaskManagement.jsx'), /批量上傳/);
});

test('file processing completion does not announce successful submission or begin grading', () => {
  const source = read('CompositionImport.jsx');
  const progress = source.slice(source.indexOf('function InlineUploadProgress'), source.indexOf('export function CompositionImport'));
  assert.match(progress, /正在读取文件/);
  assert.match(progress, /正在整理文件/);
  assert.match(progress, /文件处理完成，请核查并提交/);
  assert.doesNotMatch(progress, /导入成功|已导入|setStudents|dispatchSimulation/);
  for (const file of ['acceptance-items.mjs','acceptance-topics.mjs','dialog-scenarios.mjs']) assert.doesNotMatch(read(file), /批量上传|按文件名分类上传|切换上传方式|重新上传/);
});

// Writes an HTML page that runs every exercise of a curriculum, with the real
// test harness, against both its starter and its solution. Open the page in a
// browser: each line reads OK when the starter fails every test and the
// solution passes every test.
//
//   pnpm exec tsx scripts/check-curriculum.ts <id> <out.html>
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildDoc } from '../app/utils/runner'
import type { CurriculumContent, ExerciseContent } from '../content/define'

const [name, out] = process.argv.slice(2)
if (!name || !out) {
  console.error('Usage: pnpm exec tsx scripts/check-curriculum.ts <id> <out.html>')
  process.exit(1)
}

// Same as in seed-curriculum.ts, which can't be imported without opening the database.
function dedent(text: string) {
  const lines = text.replace(/^\n/, '').trimEnd().split('\n')
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^[ \t]*/)![0].length))
  return lines.map(l => l.slice(indent)).join('\n')
}

const files = (f: ExerciseContent['starterFiles']) => ({
  html: dedent(f.html ?? ''),
  css: dedent(f.css ?? ''),
  js: dedent(f.js ?? ''),
})

// Escapes `</` so a doc can't close the page's own <script> tag.
const inline = (value: unknown) => JSON.stringify(value).replace(/<\//g, '<\\/')

const curriculum: CurriculumContent = (await import(pathToFileURL(resolve('content', `${name}.ts`)).href)).default

const runs = curriculum.exercises.flatMap(e => (['starter', 'solution'] as const).map((kind) => {
  const runId = `${e.slug}/${kind}`
  const tests = e.tests.map(t => ({ label: t.label, code: dedent(t.code) }))
  return { runId, doc: buildDoc(files(kind === 'starter' ? e.starterFiles : e.solutionFiles), runId, tests) }
}))

writeFileSync(out, `<!doctype html>
<meta charset="utf-8">
<pre id="out"></pre>
<script>
var runs = ${inline(runs)};
var out = document.getElementById('out');
var done = 0;
window.addEventListener('message', function (e) {
  if (e.data.type !== 'exercise:results') return;
  var results = e.data.results;
  var solution = e.data.runId.split('/')[1] === 'solution';
  var passed = results.filter(function (r) { return r.passed });
  var ok = solution ? passed.length === results.length : passed.length === 0;
  var wrong = results.filter(function (r) { return r.passed !== solution });
  out.textContent += (ok ? 'OK   ' : 'FAIL ') + e.data.runId + ' ' + passed.length + '/' + results.length +
    (ok ? '' : ' ' + JSON.stringify(wrong)) + '\\n';
  if (++done === runs.length) document.title = 'done';
});
runs.forEach(function (run) {
  var frame = document.createElement('iframe');
  frame.sandbox = 'allow-scripts allow-popups allow-forms';
  frame.srcdoc = run.doc;
  document.body.appendChild(frame);
});
</script>
`)
console.log(`${runs.length} runs written to ${out}`)

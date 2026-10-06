import type { CodeFiles, ExerciseTest  } from '#shared/schemas/exercise'
import { guardLoops } from './loop-guard'

export type { CodeFiles, ExerciseTest }
export type TestResult = { label: string; passed: boolean; error?: string }
export type ConsoleEntry = { level: 'log' | 'info' | 'warn' | 'error'; text: string }

// Runs before the student's script: records console output for the `logs`
// test helper and, in the preview, forwards it to the console panel.
const consoleShim = (runId: string, forward: boolean) => `
(function () {
  var RUN_ID = ${safeJson(runId)};
  var FORWARD = ${safeJson(forward)};
  var MAX_FORWARDED = 500;
  var forwarded = 0;
  var logs = window.__exerciseLogs = [];

  function format(v, depth, seen) {
    if (typeof v === 'string') return depth ? "'" + v + "'" : v;
    if (typeof v === 'function') return 'ƒ ' + (v.name || 'anonyme') + '()';
    if (v === null || typeof v !== 'object') return String(v);
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v instanceof Element) return '<' + v.tagName.toLowerCase() + '>';
    if (seen.indexOf(v) !== -1) return '[circulaire]';
    if (depth > 2) return Array.isArray(v) ? '[…]' : '{…}';

    var next = seen.concat([v]);
    if (Array.isArray(v)) {
      return '[' + v.map(function (x) { return format(x, depth + 1, next) }).join(', ') + ']';
    }
    var keys = Object.keys(v);
    if (!keys.length) return '{}';
    return '{ ' + keys.map(function (k) { return k + ': ' + format(v[k], depth + 1, next) }).join(', ') + ' }';
  }

  function forward(level, text) {
    if (!FORWARD) return;
    forwarded++;
    if (forwarded > MAX_FORWARDED + 1) return;
    if (forwarded === MAX_FORWARDED + 1) {
      level = 'warn';
      text = 'Trop de messages : les suivants ne sont pas affichés.';
    }
    parent.postMessage({ type: 'exercise:console', runId: RUN_ID, level: level, text: text }, '*');
  }

  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    var original = console[level];
    console[level] = function () {
      var text = Array.prototype.map.call(arguments, function (a) { return format(a, 0, []) }).join(' ');
      logs.push(text);
      forward(level, text);
      original.apply(console, arguments);
    };
  });

  window.addEventListener('error', function (e) { forward('error', String(e.message)) });

  // Called at the start of every loop body (see loop-guard.ts). The start time
  // resets once the current task ends, so only a loop that never yields trips it.
  var loopStart = 0;
  window.__loopGuard = function () {
    var now = Date.now();
    if (!loopStart) {
      loopStart = now;
      setTimeout(function () { loopStart = 0 }, 0);
    }
    if (now - loopStart > 1000) {
      throw new Error("Boucle infinie ? La boucle tourne depuis plus d'une seconde.");
    }
  };
})();
`

const harness = (tests: ExerciseTest[], runId: string, source: string) => `
(function () {
  var TESTS = ${safeJson(tests)};
  var RUN_ID = ${safeJson(runId)};
  var SOURCE = ${safeJson(source)};

  function $(s) { return document.querySelector(s) }
  function $$(s) { return Array.from(document.querySelectorAll(s)) }
  function style(el) {
    if (!el) throw new Error('Élément introuvable');
    return getComputedStyle(el);
  }

  function hoverStyle(sel) {
    var rules = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      try { rules = rules.concat(Array.from(document.styleSheets[i].cssRules)) }
      catch (e) {}
    }

    var rule = null;
    for (var j = 0; j < rules.length && !rule; j++) {
      var r = rules[j];
      if (!r.selectorText) continue;
      var parts = r.selectorText.split(',');
      for (var k = 0; k < parts.length; k++) {
        if (parts[k].trim() === sel + ':hover') { rule = r; break }
      }
    }
    if (!rule) return null;

    var probe = document.createElement('span');
    probe.style.cssText = rule.style.cssText;
    document.body.appendChild(probe);

    var computed = getComputedStyle(probe);
    var snapshot = {};
    for (var p = 0; p < computed.length; p++) {
      var name = computed[p];
      var camel = name.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase() });
      snapshot[camel] = computed.getPropertyValue(name);
    }
    probe.remove();

    return snapshot;
  }

  function run() {
    var results = TESTS.map(function (t) {
      try {
        var fn = new Function('$', '$$', 'style', 'hoverStyle', 'logs', 'source', t.code);
        return { label: t.label, passed: fn($, $$, style, hoverStyle, window.__exerciseLogs, SOURCE) === true };
      } catch (e) {
        return { label: t.label, passed: false, error: String((e && e.message) || e) };
      }
    });
    parent.postMessage({ type: 'exercise:results', runId: RUN_ID, results: results }, '*');
  }

  window.addEventListener('error', function (e) {
    parent.postMessage({
      type: 'exercise:crash', runId: RUN_ID, message: String(e.message)
    }, '*');
  });

  if (document.readyState === 'complete') setTimeout(run, 0);
  else window.addEventListener('load', function () { setTimeout(run, 0) });
})();
`

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

const navigationShim = `
<script>
(function () {
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    if (href.charAt(0) === '#') {
      e.preventDefault();
      var target = document.getElementById(href.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0) {
      e.preventDefault();
      window.open(href, '_blank');
    }
  });
})();
</script>`

// Without tests, the doc is a live preview and forwards console output tagged with runId.
export function buildDoc(files: CodeFiles, runId: string, tests?: ExerciseTest[]) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><script>${consoleShim(runId, !tests)}</script><style>${files.css}</style></head>
<body>
${files.html}
<script>${guardLoops(files.js)}</script>
${navigationShim}
${tests ? `<script>${harness(tests, runId, files.js)}</script>` : ''}
</body>
</html>`
}
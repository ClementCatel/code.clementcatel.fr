import type { CodeFiles, ExerciseTest  } from '#shared/schemas/exercise'

export type { CodeFiles, ExerciseTest }
export type TestResult = { label: string; passed: boolean; error?: string }

const harness = (tests: ExerciseTest[], runId: string) => `
(function () {
  var TESTS = ${safeJson(tests)};
  var RUN_ID = ${safeJson(runId)};

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
        var fn = new Function('$', '$$', 'style', 'hoverStyle', t.code);
        return { label: t.label, passed: fn($, $$, style, hoverStyle) === true };
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

export function buildDoc(files: CodeFiles, tests?: ExerciseTest[], runId?: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><style>${files.css}</style></head>
<body>
${files.html}
<script>${files.js}</script>
${navigationShim}
${tests && runId ? `<script>${harness(tests, runId)}</script>` : ''}
</body>
</html>`
}
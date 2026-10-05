# Exercise runner

A student's code runs in a sandboxed iframe, both for the live preview and for the tests. `buildDoc()` in `app/utils/runner.ts` assembles the `srcdoc` from a console shim, the student's HTML, CSS and JS, a navigation shim, and (when tests run) the test harness.

## Console

The console shim runs before the student's script. It wraps `console.log`, `info`, `warn` and `error`, formats each call into one line of text, and records it in `window.__exerciseLogs` for the `logs` test helper. In the preview it also forwards each line and every uncaught error as an `exercise:console` message. `code-preview.vue` shows these messages in a panel under the preview, and hides the panel when the JS file is empty. After 500 lines the shim stops forwarding, so a loop that logs too much can't flood the parent.

## Test contract

A teacher writes each test as a **JS function body that returns `true`** to pass. It runs through `new Function('$', '$$', 'style', 'hoverStyle', code)` with these helpers:

| Helper | Returns |
| --- | --- |
| `$(sel)` / `$$(sel)` | `querySelector` / `querySelectorAll`, the latter as an array |
| `style(el)` | `getComputedStyle(el)`, throwing `Élément introuvable` when `el` is null |
| `hoverStyle(sel)` | The computed styles of the `sel:hover` rule (camelCase keys), or `null` |
| `logs` | Every console line since the page loaded, as strings formatted like the console panel shows them (`Bonjour Alice 42`, `[1, 'a']`, `{ nom: 'Alice' }`) |

To add a helper, define it in the `harness` string and add it to **both** the `new Function` parameter list and the call's arguments.

## Gotchas

- The harness is a template string injected into the student's page. Write it in **ES5** (`var`, `function`), like the code around it. Interpolate values only through `safeJson()`, which escapes `<` so a value can't close the `<script>` tag.
- The preview tags each rebuild with a new `runId` and drops console messages from earlier runs. The iframe is client-only, so the message listener already exists when the first run logs.
- `use-test-runner.ts` matches messages on `runId` and the frame's `contentWindow`. A run ends on `exercise:results`, on `exercise:crash`, or after the 3 s timeout, which catches infinite loops. Each of those paths must settle with one result per test.
- The iframe sandbox is `allow-scripts allow-popups`. Never add `allow-same-origin`: it would let student code reach the app's origin.

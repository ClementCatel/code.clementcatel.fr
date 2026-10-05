# Writing exercises

How to write an exercise for the platform. The deliverable fills the teacher form (`app/components/exercise-form.vue`) field by field, so it can be pasted in directly.

## Fields

| Form field | Content |
| --- | --- |
| **Titre** | The concept covered, max 120 chars: `La propriété color`, `Les sélecteurs de classe`. |
| **Consigne** | The statement. See [Consigne](#consigne). |
| **Code de départ** | HTML / CSS / JS the student starts from. |
| **Solution de référence** | HTML / CSS / JS that passes every test. The form refuses to save until it does. |
| **Tests** | 1 to 5 tests, each a label and some code. See [Tests](#tests). |

All student-facing text (title, consigne, test labels, code comments) is in **French**, neutral tone, **vouvoiement** ("Ajoutez", "votre titre").

## Scope

One short concept per exercise. If an objective needs a second concept the student hasn't seen yet, it belongs to the next exercise.

## Consigne

The consigne is rendered as **plain text**: line breaks are kept, Markdown is not rendered, and leading spaces collapse. So write lists with `- `, write examples as flat one-liners, and leave out backticks and `**`.

Keep it as short as possible, in this order, with a blank line between blocks:

1. **Concept**: one or two sentences.
2. **Exemple**: a short snippet, one line where possible.
3. **Précisions**: only if needed (a pitfall, an alternative syntax).
4. **Objectifs**: what the student must do. Use a `- ` list when there is more than one.

```
La propriété color définit la couleur du texte d'un élément.

Exemple :
p { color: red; }

Les couleurs s'écrivent aussi en hexadécimal (#ff0000).

Objectifs :
- Colorez le titre h1 en bleu (blue).
- Colorez les paragraphes en gris (#666666).
```

## Tests

Each test is a **JS function body that returns `true`** to pass. It can use the helpers `$`, `$$`, `style` and `hoverStyle`; their signatures are in [exercise-runner.md](exercise-runner.md).

- **Label**: shown to the student as a checklist item, so state the expected result in the Objectifs' wording: `Le titre h1 est bleu`.
- **Coverage**: one test per objective at minimum, 5 tests at most.
- **Fails on the starter code**: if a test already passes before the student does anything, either the starter code or the test is wrong.
- **Computed values**: `style()` and `hoverStyle()` return normalised values. Colors come back as `rgb(r, g, b)` and lengths in `px`. Compare against those forms (`blue` → `rgb(0, 0, 255)`, `#666666` → `rgb(102, 102, 102)`, `1em` → `16px` by default).

```js
return style($('h1')).color === 'rgb(0, 0, 255)'
```
```js
return $$('p').length > 0 && $$('p').every(p => style(p).color === 'rgb(102, 102, 102)')
```

Guard `$$` checks with a length check, because `every` on an empty array returns `true`.

## JS exercises

Tests run after the student's script, in the same page. They can call the student's top-level functions and read top-level variables (`let`/`const` included).

- **Test results, not timing**: a test returns `true` synchronously, so anything that resolves later (`setTimeout`, Promises, `fetch`) can't be checked. Keep those topics out of exercises.
- **Console output**: top-level `console.log` calls have already run by the time the tests start. To check a log, wrap `console.log` inside the test and then call the student's function:
  ```js
  var logs = []; var log = console.log
  console.log = function (m) { logs.push(m) }
  try { saluer('Alice') } finally { console.log = log }
  return logs[0] === 'Bonjour Alice'
  ```
- **No dialogs**: the sandbox blocks them, so `alert` does nothing and `prompt` returns `null`. Use the DOM for input and output.
- **Shared state**: tests run in order on the same page. If a test clicks a button or mutates something, every later test sees the result.
- **Load errors**: a crash while the student's script loads isn't reported as a crash. The tests fail with messages like `saluer is not defined`, so word the labels so they still point the student at what to fix.

## Recap exercises

Every few exercises, once a group of concepts is done, add a recap:

- **Titre**: `Récapitulatif : <concepts covered>`.
- **Code de départ**: working-looking code with one mistake per concept being reviewed (a wrong property, a mistyped selector, a missing tag). Only use concepts from the previous exercises.
- **Consigne**: one sentence of context, then the Objectifs as a list of what the result must look like. Describe the expected outcome rather than pointing at the bugs.
- **Tests**: one per mistake to fix, still 5 at most.

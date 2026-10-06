# Writing exercises

How to write a curriculum and its exercises for the platform. Each curriculum is one file, `content/<id>.ts`, built with `defineCurriculum` from `content/define.ts`, and `pnpm seed:curriculum` loads it into the database. The file is the single source of truth: running the script overwrites edits made in the teacher UI.

## Drafting loop

Write **one exercise per turn**:

1. Present the exercise in chat for review: the title, the consigne as plain text, starter and solution code as code blocks, then the tests.
2. Stop and wait for the user's feedback, revising until they approve.
3. Add the approved exercise to `content/<id>.ts`, then draft the next one.

## Fields

| Field | Content |
| --- | --- |
| `slug` | Stable kebab-case key. Renaming it creates a new exercise and drops student progress on the old one. Leave published slugs alone. |
| `title` | The concept covered, max 120 chars: `La propriété color`, `Les sélecteurs de classe`. |
| `statement` | The consigne. See [Consigne](#consigne). |
| `starterFiles` | `{ html, css, js }` the student starts from. Leave out empty files. |
| `solutionFiles` | `{ html, css, js }` that passes every test. |
| `tests` | 1 to 5 tests, each with a `label` and some `code`. See [Tests](#tests). |

Array order sets the exercise order. Indent multi-line template literals with the surrounding code, since the script strips the common indentation.

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
- **Console output**: the `logs` helper holds every console line since the page loaded, including top-level ones, formatted as the console panel shows them. To check a function's output, note the length first and then call it:
  ```js
  var n = logs.length
  saluer('Alice')
  return logs[n] === 'Bonjour Alice'
  ```
- **Checking the technique**: tests only see the final values for the starter's fixed inputs, so a student can hard-code the result. When the exercise is about a technique (`const`, `if`, a loop, a template string), add a check on `source`, the student's JS as a string. Keep the regex loose about whitespace, and make sure it can't match the starter's comments:
  ```js
  return /\bif\s*\(/.test(source)
  ```
  Prefer value checks once the student writes functions, since a test can then call them with several inputs.
- **No dialogs**: the sandbox blocks them, so `alert` does nothing and `prompt` returns `null`. Use the DOM for input and output.
- **Shared state**: tests run in order on the same page. If a test clicks a button or mutates something, every later test sees the result.
- **Load errors**: a crash while the student's script loads isn't reported as a crash. The tests fail with messages like `saluer is not defined`, so word the labels so they still point the student at what to fix.

## Recap exercises

Every few exercises, once a group of concepts is done, add a recap:

- **Titre**: `Récapitulatif : <concepts covered>`.
- **Code de départ**: working-looking code with one mistake per concept being reviewed (a wrong property, a mistyped selector, a missing tag). Only use concepts from the previous exercises.
- **Consigne**: one sentence of context, then the Objectifs as a list of what the result must look like. Describe the expected outcome rather than pointing at the bugs.
- **Tests**: one per mistake to fix, still 5 at most.

## Loading into the platform

`DATABASE_URL` points at **production**.

1. Run `pnpm seed:curriculum <id>`. It's a dry run that validates the file and prints, for the curriculum and each exercise, whether it will be created, updated or left unchanged. Show this plan to the user.
2. Run `pnpm seed:curriculum <id> --apply` only after the user confirms the plan. New curricula are created unpublished, and the script never changes `published`.
3. Hand over to the user. The script skips the form's solution check, so the user has to click "Vérifier contre ma solution" on each exercise, play through the curriculum as a student, and then publish it in the UI.

If the database holds exercises that are missing from the file, the script aborts and shows how much student progress each one has. `--prune` deletes them along with that progress, so ask the user before using it.

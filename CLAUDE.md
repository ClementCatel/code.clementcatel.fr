Nuxt 4 app for teaching HTML/CSS/JS: teachers build curricula of exercises with automated tests, and students solve them in an in-browser editor.

- Package manager: **pnpm**.
- Lint with `pnpm exec eslint .`. There is no test suite and no typecheck script.
- Write all user-facing text in **French**: UI copy, error messages, emails and route paths (`/connexion`, `/enseignant/cursus`).

## Area docs

Read the matching doc before touching that area:

- [Server API](docs/agents/server-api.md): adding or changing an endpoint under `server/api/`.
- [Database](docs/agents/database.md): schema changes, migrations, seeding.
- [Auth & roles](docs/agents/auth.md): sign-up rules, sessions, the teacher and student roles.
- [Exercise runner](docs/agents/exercise-runner.md): the preview iframe, the test harness, test helpers like `hoverStyle`.
- [Frontend](docs/agents/frontend.md): pages, components, the CodeMirror editor.
- [Writing exercises](docs/agents/writing-exercises.md): writing a curriculum or exercises in `content/`, and loading them with `pnpm seed:curriculum`.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on ClementCatel/code.clementcatel.fr, using the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

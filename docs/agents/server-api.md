# Server API

Endpoints are Nitro file routes: `server/api/<resource>/[id].<method>.ts`, e.g. `exercises/[id].patch.ts`.

## Handler shape

Every handler follows the same order (see `server/api/exercises/index.post.ts`):

1. **Guard first**: `await requireTeacher(event)` or `const session = await requireUser(event)`. Both are auto-imported from `server/utils/`. Endpoints for logged-out users are the exception, and only `auth/[...all].ts` is one.
2. **Validate input**: `readValidatedBody(event, schema.parse)`. Reusable shapes live in `shared/schemas/` and are imported as `#shared/schemas/...`, which lets the client form use the same schema. A body used by a single endpoint gets an inline `z.object` (see `curricula/[id]/reorder.patch.ts`).
3. **Query** through `db` from `server/utils/db.ts`.
4. **Fail** with `createError({ statusCode, message })`, with the `message` written in French.

## Student vs teacher endpoints

Students and teachers read the same tables through **separate endpoints**, because they're allowed to see different fields:

- `GET /api/exercises/[id]` (student) returns a hand-picked object: the starter files (or the student's draft) and the tests, never `solutionFiles`. It also enforces **sequential unlocking**, returning 403 until the previous exercise in the curriculum is completed.
- `GET /api/teacher/exercises/[id]` returns the full row.

When you add a field to `exercise`, decide which of the two exposes it. Student responses list their fields explicitly. Never spread a whole row into one.

Student-scoped list endpoints live under `server/api/student/`.

# Database

Postgres through Drizzle (`drizzle-orm` 1.0 RC) and the `postgres` driver. Everything reads `DATABASE_URL` from `.env` (see `.env.example`).

- **Schema**: `server/database/schema.ts` is the only schema file. `curriculum`, `exercise` and `progress` belong to the app. `user`, `session`, `account` and `verification` are better-auth's tables.
- **Migrations**: edit the schema, then run `pnpm db:generate` and review the SQL it writes to `server/database/migrations/`, then run `pnpm db:migrate`. Commit the generated migration together with the schema change.
- **Teacher account**: `pnpm seed:teacher` creates or promotes `TEACHER_EMAIL`.

## Gotchas

- The connection in `server/utils/db.ts` uses `{ max: 1, prepare: false }`, which is set up for Vercel serverless functions behind a pooler. Leave it as is.
- The extra `user` columns (`role`, `firstName`, `lastName`, `groupTd`) are also declared in `user.additionalFields` in `server/utils/auth.ts`. Change both together.
- `exercise.position` is 1-based and scoped to its curriculum. Inserts compute `MAX(position) + 1` in SQL, and `curricula/[id]/reorder.patch.ts` renumbers positions inside a transaction.
- The jsonb columns are typed with the zod-inferred types from `#shared/schemas/exercise` (`CodeFiles`, `ExerciseTest`).

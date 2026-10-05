# Auth & roles

better-auth, configured in `server/utils/auth.ts` and mounted at `server/api/auth/[...all].ts`. The browser client is `app/utils/auth-client.ts`.

## Roles

`user.role` is either `'student'` (the default, and `input: false`, so sign-up can't set it) or `'teacher'`. The only way to get a teacher is `pnpm seed:teacher`.

| Layer | Student | Teacher |
| --- | --- | --- |
| Server guard | `requireUser(event)` | `requireTeacher(event)` |
| Page middleware | `definePageMeta({ middleware: 'student' })` | `definePageMeta({ middleware: 'teacher' })` |
| Routes | `/cursus`, `/exercice/[id]` | `/enseignant/...` |

On the client, read the session with `useAuthSession()`. It forwards cookies during SSR and caches the result under the `auth:session` key.

## Sign-up rules

- **In production**, only `@etu.unicaen.fr` addresses and `TEACHER_EMAIL` may register. The check is a `databaseHooks.user.create.before` hook. **In development**, any address is allowed.
- Email verification is required. Verification and password-reset emails go out through Resend (`server/utils/email.ts`), as inline French HTML.

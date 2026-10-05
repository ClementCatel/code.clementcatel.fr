# Frontend

Nuxt 4 (`app/` directory), Nuxt UI v4, Tailwind 4 and VueUse. The color mode is forced to dark in `nuxt.config.ts`.

- **Files**: components and composables use kebab-case filenames (`code-preview.vue`, `use-test-runner.ts`). Route segments are French (`enseignant`, `cursus`, `exercice`, `nouveau`).
- **Data**: pages load data with top-level `await useFetch('/api/...')` and call `refresh()` after a mutation.
- **Layouts**: `default` comes with the header and footer. `bare` is the full-screen exercise view.
- **Forms**: validate with the same zod schema the endpoint uses, from `#shared/schemas/`.

## CodeMirror

- `code-editor.client.vue` is client-only. Keep the `.client` suffix, because CodeMirror touches `document`.
- `@codemirror/state` and `@codemirror/view` must resolve to a single copy. Otherwise extensions break with "multiple instances" errors. Three places pin them: `overrides` in `pnpm-workspace.yaml`, `overrides` in `package.json`, and `vite.resolve.dedupe` in `nuxt.config.ts`. When you upgrade CodeMirror, keep all three in line.

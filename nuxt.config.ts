// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'error',
        'info',
        'success',
        'warning',
      ]
    }
  },
  vite: {
    resolve: {
      dedupe: ['@codemirror/state', '@codemirror/view'],
    },
  },
  typescript: {
    nodeTsConfig: {
      include: ['../drizzle.config.ts', '../scripts/seed-teacher.ts'],
      compilerOptions: { types: ['node'] },
    },
  },
})
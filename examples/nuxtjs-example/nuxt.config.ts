// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-21',
  devtools: { enabled: true },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: [
    '@hidearea-design/tokens/css/variables',
    '~/assets/css/main.css',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@hidearea-design/core',
        '@hidearea-design/vue',
        '@hidearea-design/tokens',
      ],
    },
  },

  app: {
    head: {
      title: 'Hidearea Design System - Nuxt.js Example',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Example integration of Hidearea Design System with Nuxt.js'
        },
      ],
    },
  },
});

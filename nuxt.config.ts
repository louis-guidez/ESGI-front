// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    },
  },
  i18n: {
    defaultLocale: 'fr',
    locales: [{ code: 'fr', name: 'Français', file: 'fr.yaml' }],
  },
})

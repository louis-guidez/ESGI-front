// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    },
  },
})

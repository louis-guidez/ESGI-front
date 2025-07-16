// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/seo', '@vee-validate/nuxt'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
      // TODO need to move this to private variable => only accessible on the server-side
      STRIPE_KEY: process.env.NUXT_PUBLIC_STRIPE_KEY,
      GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
    },
  },
  i18n: {
    defaultLocale: 'fr',
    locales: [{ code: 'fr', name: 'Français', file: 'fr.yaml' }],
  },
  site: {
    url: 'https://lendo.fr',
    name: 'Lendo',
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})

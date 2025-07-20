// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/seo', '@vee-validate/nuxt', 'nuxt-nodemailer'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
      MERCURE_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3001/.well-known/mercure',
      // TODO need to move this to private variable => only accessible on the server-side
      STRIPE_KEY: process.env.NUXT_PUBLIC_STRIPE_KEY,
      GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
      NODEMAILER_USER: process.env.NODEMAILER_USER,
    },
  },
  i18n: {
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.yaml' },
      { code: 'en', name: 'English' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'fr',
    },
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
  // nodemailer: {
  //   from: '"Lendo App" <lendo.app.esgi@gmail.com>',
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: 'lendo.app.esgi@gmail.com',
  //     pass: 'vsmyodmqgznddloi',
  //   },
  // },
  nodemailer: {
    from: `"Lendo App" <${process.env.NODEMAILER_USER || 'lendo.app.esgi@gmail.com'}>`,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER || 'lendo.app.esgi@gmail.com',
      pass: process.env.NODEMAILER_PASS,
    },
  },
  //     nodemailer: {
  //   from: `"Lendo App" <${process.env.NODEMAILER_USER}>`,
  //   host: process.env.NODEMAILER_HOST,
  //   port: process.env.NODEMAILER_PORT,
  //   secure: process.env.NODEMAILER_SECURE,
  //   auth: {
  //     user: process.env.NODEMAILER_USER,
  //     pass: process.env.NODEMAILER_PASS,
  //   },
  // },
})

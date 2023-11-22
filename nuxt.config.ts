// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
const description = 'Cover GP'
import pkg from './package.json'

export default defineNuxtConfig({
  nitro: {
    preset: 'firebase'
  },
  build: {
    transpile: ['vuetify']
  },
  typescript: {
    typeCheck: false,
    strict: true
  },
  runtimeConfig: {
    openAiApiKey: process.env.NUXT_OPEN_AI_API_KEY,
    public: {
      frontEndVersion: pkg.version,
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      }
    }
  },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: { preprocessorOptions: { scss: { additionalData: '@use "@/assets/styles/global.scss" as *;' } } }
  },
  sourcemap: {
    server: false,
    client: false
  },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-icons',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    // eslint-disable-next-line require-await
    async (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      )
    }
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'],
      'storeToRefs' // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  imports: {
    dirs: ['stores']
  },

  app: {
    // Page header settings
    head: {
      title: 'CoverGP',
      titleTemplate: '%s – CoverGP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', content: description }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  }
})

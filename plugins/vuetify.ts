import { createVuetify, ThemeDefinition } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,

    theme: {
      defaultTheme: 'CoverGPLightTheme',
      themes: {
        CoverGPLightTheme
      }
    },
    defaults: { global: { ripple: false } }
  })
  nuxtApp.vueApp.use(vuetify)
})

const CoverGPLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#007BFF',
    'primary-darken-1': '#3700B3',
    secondary: '#FF6C00',
    'secondary-darken-1': '#018786',
    error: '#FF4C4C',
    info: '#17A2B8',
    success: '#28A745',
    warning: '#FFC107'
  }
}

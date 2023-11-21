import en from '@/locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  messages: {
    en
  }
}))

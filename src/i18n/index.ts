import { createI18n } from 'vue-i18n'
import enAU from './languages/en-au.json'

const messages = {
  'en-au': enAU,
}

export const i18n = createI18n({
  locale: 'en-au',
  messages,
})
import { createI18n } from 'vue-i18n'
import * as enAU from './languages/en-au.json'

const messages = {
  'en-au': enAU.default,
}

export default createI18n({
  locale: 'en-au',
  messages,
})
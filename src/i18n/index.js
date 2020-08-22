import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as enAU from './languages/en-au.json'

Vue.use(VueI18n)

const messages = {
  'en-au': enAU.default,
}

export default new VueI18n({
  locale: 'en-au',
  messages,
})
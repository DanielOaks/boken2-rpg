import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import * as ptBR from './pt-br.json'

Vue.use(VueI18n)

const messages = {
  'en-au': {
    'mainButtonsPagination-prev-name': 'Previous Buttons',
    'mainButtonsPagination-prev-description': 'Show previous page of buttons',
    'mainButtonsPagination-next-name': 'Next Buttons',
    'mainButtonsPagination-next-description': 'Show next page of buttons',
    'mainContentPagination-prev-name': 'Previous Page',
    'mainContentPagination-prev-description': 'Show previous page',
    'mainContentPagination-next-name': 'Next Page',
    'mainContentPagination-next-description': 'Show next page',
  },
//    'pt-br': {
//      ...ptBR
//    },
}

export default new VueI18n({
  locale: 'en-au',
  messages,
})
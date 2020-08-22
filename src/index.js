import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
require('@openfonts/open-sans_all')

import exampleData from './store/exampleData'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  template: '<app ref="app" />',
  components: {
    App,
  },
  data: {
  },
  mounted: function() {
    const app = this.$refs.app;

    console.log('Loading example game data', exampleData);
    store.commit('loadExampleGameData', exampleData.gameData);
    store.commit('loadExampleGameState', exampleData.gameState);

    app.$refs.game.show()
  },
});

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
require('@openfonts/open-sans_all')

import exampleData from './store/exampleData'

// page name == game name
store.watch(
  function (state) {
    return state.gameData.name;
  },
  function () {
    document.title = store.getters.gameName;
  }
);

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
    console.log('Loading example game info', exampleData);
    store.commit('loadExampleGameData', exampleData.gameData);
    store.commit('loadExampleGameState', exampleData.gameState);

    const app = this.$refs.app;
    app.$refs.game.show()
  },
});

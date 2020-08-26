import {createApp} from 'vue';
import App from './App.vue'
import { store } from './store'
import { i18n } from './i18n'
require('@openfonts/open-sans_all')

import exampleData from './store/exampleData'

// page name == game name
store.watch(
  function (state) {
    return state.gameData.name;
  },
  function () {
    document.title = store.getters.gameDataGameName;
  }
);

/* eslint-disable no-new */
const app = createApp({
  i18n,
  template: '<app ref="app" />',
  components: {
    App,
  },
  mounted: function() {
    console.log('Loading example game info', exampleData);
    store.commit('loadExampleGameData', exampleData.gameData);
    store.commit('loadExampleGameState', exampleData.gameState);

    const app = this.$refs.app;
    app.$refs.game.show()
  },
});
app.use(i18n);
app.use(store);
app.mount('#app');

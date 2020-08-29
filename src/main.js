import Vue from 'vue'
import VueTreeList from 'vue-tree-list'
import exampleData from './store/exampleData'
import App from './App.vue'
import store from './store'
import i18n from './i18n'

require('@openfonts/open-sans_all')

// page name == game name
store.watch(
  function updatePageTitle() {
    document.title = store.getters.gameDataGameName;
  }
);

Vue.use(VueTreeList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  template: '<app ref="app"/>',
  components: {
    App,
  },
  mounted() {
    // console.log('Loading example game info', exampleData);
    store.commit('loadExampleGameData', exampleData.gameData);
    store.commit('loadExampleGameState', exampleData.gameState);

    const {app} = this.$refs;
    app.$refs.game.show()
  },
});

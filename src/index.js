import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
require('@openfonts/open-sans_all')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameHoverHint: {
      hidden: true,
      name: '',
      description: '',
    },
  },
  mutations: {
    showGameHoverHint (state, pl) {
      state.gameHoverHint.hidden = false;
      state.gameHoverHint.name = pl.name;
      state.gameHoverHint.description = pl.description;
    },
    hideGameHoverHint (state) {
      state.gameHoverHint.hidden = true;
    },
  },
  getters: {
    gameHoverHint: (state) => {
      return state.gameHoverHint;
    },
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<app ref="app" />',
  components: {
    App,
  },
  data: {
  },
  mounted: function() {
    const app = this.$refs.app;
  
    app.$refs.game.show()
  },
});

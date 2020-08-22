import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
});
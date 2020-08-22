import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultGameData = {
  attributes: {},
}

const defaultGameState = {
  player: {
    name: '',
    attributes: {},
  }
}

export default new Vuex.Store({
  state: {
    // hint that shows when you hover over buttons
    gameHoverHint: {
      hidden: true,
      name: '',
      description: '',
    },

    // static game data
    gameData: defaultGameData,

    // transitive game state (player name, quest info, etc)
    // this is what the save-game contains
    gameState: defaultGameState,
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
  
    loadExampleGameData (state, pl) {
      state.gameData = pl;
    },
    loadExampleGameState (state, pl) {
      state.gameState = pl;
    },
  },

  getters: {
    gameHoverHint: (state) => {
      return state.gameHoverHint;
    },
  },
});
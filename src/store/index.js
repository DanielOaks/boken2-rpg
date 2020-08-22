import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // hint that shows when you hover over buttons
    gameHoverHint: {
      hidden: true,
      name: '',
      description: '',
    },

    // static game data
    gameData: {
      attributes: {
        // for example:
        //  str: {
        //    fullName: 'Strength',
        //    uiName: 'STR',
        //  }
      }
    },

    // transitive game state (player name, quest info, etc)
    // this is what the save-game contains
    gameState: {
      player: {
        name: '',
        attributes: {
          // for example:
          //  str: {
          //    base: 12,
          //    mod: -3,
          //  }
        }
      }
    }
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
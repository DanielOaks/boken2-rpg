import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const emptyGameData = {
  stats: {},
  attributes: {},
  xpToLevel: {},
}

const emptyGameState = {
  player: {
    name: {},
    stats: {},
    attributes: {},
    advancement: {
      level: 0,
      xp: 0,
    },
  },
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
    gameData: emptyGameData,

    // transitive game state (player name, quest info, etc)
    // this is what the save-game contains
    gameState: emptyGameState,
  },

  mutations: {
    // misc mutations
    showGameHoverHint (state, pl) {
      state.gameHoverHint.hidden = false;
      state.gameHoverHint.name = pl.name;
      state.gameHoverHint.description = pl.description;
    },
    hideGameHoverHint (state) {
      state.gameHoverHint.hidden = true;
    },
  
    // example mutations
    loadExampleGameData (state, pl) {
      state.gameData = pl;
    },
    loadExampleGameState (state, pl) {
      state.gameState = pl;
    },

    // game data mutations

    // game state mutations
  },

  getters: {
    // misc getters
    gameHoverHint: (state) => {
      return state.gameHoverHint;
    },

    // game data getters
    gameDataStats: (state) => {
      return state.gameData.stats;
    },
    gameDataAttributes: (state) => {
      return state.gameData.attributes;
    },
    gameDataCurrencyName: (state) => {
      return state.gameData.currencyName;
    },

    // game state getters
    gameStatePlayerName: (state) => {
      return state.gameState.player.name;
    },
    gameStatePlayerStats: (state) => {
      return state.gameState.player.stats;
    },
    gameStatePlayerAttributes: (state) => {
      return state.gameState.player.attributes;
    },
    gameStatePlayerCurrency: (state) => {
      return state.gameState.player.currency;
    },
    gameStatePlayerLevel: (state) => {
      const level = state.gameState.player.advancement.level;
      return {
        level: level,
        xp: state.gameState.player.advancement.xp,
        xpToLevel: state.gameData.xpToLevel[level],
      };
    }
  },
});
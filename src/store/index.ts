import { createStore, createLogger } from 'vuex'

const emptyGameData = {
  name: '',
  stats: {},
  attributes: {},
  xpToLevel: {},
  currencyName: '',
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
    currency: 0,
  },
}

export type State = {
  mainMenuActive: boolean,

  gameHoverHint: {
    hidden: boolean,
    name: string,
    description: string,
  },

  gameData: typeof emptyGameData,
  gameState: typeof emptyGameState,
}

const state: State = {
  mainMenuActive: true,

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
}

export const store = createStore({
  state: state,

  mutations: {
    // misc mutations
    showMainMenu (state) {
      state.mainMenuActive = true;
    },
    hideMainMenu (state) {
      state.mainMenuActive = false;
    },
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
    gameDataChangeNames (state, pl) {
      if (pl.gameName) {
        state.gameData.name = pl.gameName;
      }
      if (pl.currencyName) {
        state.gameData.currencyName = pl.currencyName;
      }
    },
    gameDataChangeStat (state, pl) {
      if (pl.uiName !== undefined) {
        state.gameData.stats[pl.id].uiName = pl.uiName;
      }
      if (pl.fullName !== undefined) {
        state.gameData.stats[pl.id].fullName = pl.fullName;
      }
    },
    gameDataDeleteStat (state, pl) {
      delete state.gameData.stats[pl];
    },
    gameDataCreateStat (state, pl) {
      state.gameData.stats[pl.id] = {};
      if (pl.uiName) {
        state.gameData.stats[pl.id].uiName = pl.uiName;
      }
      if (pl.fullName) {
        state.gameData.stats[pl.id].fullName = pl.fullName;
      }
      // will only show in iterface if it exists
      if (!state.gameState.player.stats[pl.id]) {
        state.gameState.player.stats[pl.id] = {};
      }
    },

    // game state mutations
  },

  getters: {
    // misc getters
    mainMenuActive: (state) => {
      return state.mainMenuActive;
    },
    gameHoverHint: (state) => {
      return state.gameHoverHint;
    },

    // game data getters
    gameDataGameName: (state) => {
      return state.gameData.name;
    },
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
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
});
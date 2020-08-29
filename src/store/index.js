import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const emptyGameData = {
  name: '',
  stats: {},
  attributes: {},
  xpToLevel: {},
  regions: {},
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
  },

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
        Vue.set(state.gameData.stats[pl.id], 'uiName', pl.uiName);
      }
      if (pl.fullName !== undefined) {
        Vue.set(state.gameData.stats[pl.id], 'fullName', pl.fullName);
      }
    },
    gameDataDeleteStat (state, pl) {
      Vue.delete(state.gameData.stats, pl);
    },
    gameDataCreateStat (state, pl) {
      Vue.set(state.gameData.stats, pl.id, {});
      if (pl.uiName) {
        state.gameData.stats[pl.id].uiName = pl.uiName;
      }
      if (pl.fullName) {
        state.gameData.stats[pl.id].fullName = pl.fullName;
      }
      // will only show in iterface if it exists
      if (!state.gameState.player.stats[pl.id]) {
        Vue.set(state.gameState.player.stats, pl.id, {});
      }
    },
    gameDataCreateRegion (state, pl) {
      let newRegion = {
        name: pl.name || pl.id,
        maps: {},
        regions: {},
      }

      function getNewId(id, region) {
        if (id === undefined || region.regions[id] || region.maps[id]) {
          id = 'newMap';
          let i = 1;
          while (id + i in region.maps || id + i in region.regions) {
            i++;
          }
          id = id + i;
        }
        return id
      }
      // REALLY INEFFICIENT BECAUSE I'M LAZY, WE SHOULD DO THIS BETTER :<
      function loopThroughRegions(id, region) {
        if (id == pl.parent) {
          Vue.set(region.regions, getNewId(pl.id, region), newRegion);
        } else {
          for (let regionId in region.regions) {
            loopThroughRegions(id+'/'+regionId, region.regions[regionId]);
          }
        }
      }
      if (pl.parent) {
        for (let regionId in state.gameData.regions) {
          loopThroughRegions(regionId, state.gameData.regions[regionId]);
        }
      } else {
        Vue.set(state.gameData.regions, getNewId(pl.id, state.gameData), newRegion);
      }
    },
    gameDataCreateMap (state, pl) {
      let newMap = {
        name: pl.name || pl.id,
        maps: {},
      }

      function getNewId(id, region) {
        if (id === undefined || region.regions[id] || region.maps[id]) {
          id = 'newMap';
          let i = 1;
          while (id + i in region.maps || id + i in region.regions) {
            i++;
          }
          id = id + i;
        }
        return id
      }
      // REALLY INEFFICIENT BECAUSE I'M LAZY, WE SHOULD DO THIS BETTER :<
      function loopThroughRegions(id, region) {
        if (id == pl.parent) {
          Vue.set(region.maps, getNewId(pl.id, region), newMap);
        } else {
          for (let regionId in region.regions) {
            loopThroughRegions(id+'/'+regionId, region.regions[regionId]);
          }
        }
      }
      if (pl.parent) {
        for (let regionId in state.gameData.regions) {
          loopThroughRegions(regionId, state.gameData.regions[regionId]);
        }
      } else {
        Vue.set(state.gameData.maps, getNewId(pl.id, state.gameData), newMap);
      }
    },
    gameDataDeleteRegion (state, pl) {
      let idToDelete = pl;

      function deleteRegionOrMap(id, region) {
        for (let regionId in region.regions) {
          if (id+'/'+regionId == idToDelete) {
            Vue.delete(region.regions, regionId);
          } else {
            deleteRegionOrMap(id+'/'+regionId, region.regions[regionId]);
          }
        }
        for (let mapId in region.maps) {
          if (id+'/'+mapId == idToDelete) {
            Vue.delete(region.maps, mapId);
          }
        }
      }

      for (let regionId in state.gameData.regions) {
        deleteRegionOrMap(regionId, state.gameData.regions[regionId]);
      }
      Vue.delete(state.gameData.regions, idToDelete);
      Vue.delete(state.gameData.maps, idToDelete);
    }

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
    gameDataRegionsInTreeFormat: (state) => {
      // this is the format consumed by vue-tree-list:new Tree()
      let tree = [];

      function solveMap(id, map) {
        // console.log('solving', id, ': map')
        let thisMap = {
          id: id,
          name: id,
          isLeaf: true,
        }
        if (map.name) {
          thisMap.name = map.name;
        }
        return thisMap;
      }

      function solveRegion(id, region) {
        // console.log('solving', id, ': region')
        let thisRegion = {
          id: id,
          name: id,
          children: [],
        };
        if (region.name) {
          thisRegion.name = region.name;
        }

        for (let regionId in region.regions) {
          thisRegion.children.push(solveRegion(id+'/'+regionId, region.regions[regionId]));
        }
        for (let mapId in region.maps) {
          thisRegion.children.push(solveMap(id+'/'+mapId, region.maps[mapId]));
        }
        return thisRegion;
      }

      for (let regionId in state.gameData.regions) {
        // console.log('  solving root region', regionId);
        tree.push(solveRegion(regionId, state.gameData.regions[regionId]));
      }
      for (let mapId in state.gameData.maps) {
        // console.log('  solving root map', mapId);
        tree.push(solveMap(mapId, state.gameData.maps[mapId]));
      }

      return tree;
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
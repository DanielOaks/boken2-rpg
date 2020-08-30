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

function utilGetNewRegionMapId(id, region) {
  let newId = id;
  if (id === undefined || region.regions[id] || region.maps[id]) {
    newId = 'newMap';
    let i = 1;
    while (newId + i in region.maps || newId + i in region.regions) {
      i += 1;
    }
    newId += i;
  }
  return newId
}

export default new Vuex.Store({
  state: {
    showMainMenu: true,
    appPage: 'game',
    gameEditorPage: 'settings',
    regionEditorPage: 'tree',

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
      state.showMainMenu = true;
    },
    hideMainMenu (state) {
      state.showMainMenu = false;
    },
    changeAppPage (state, pl) {
      state.appPage = pl;
    },
    changeGameEditorPage (state, pl) {
      state.gameEditorPage = pl;
    },
    showRegionTreeEditor (state) {
      state.regionEditorPage = 'tree';
    },
    showRegionEditor (state, pl) {
      state.regionEditorId = pl;
      state.regionEditorPage = 'regionEditor';
    },
    showMapEditor (state, pl) {
      state.regionEditorId = pl;
      state.regionEditorPage = 'mapEditor';
    },
    changeRegionEditorShowIds (state, pl) {
      Vue.set(state, 'regionEditorShowIds', pl);
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
      // will only show in iterface if it exists here too
      if (!state.gameState.player.stats[pl.id]) {
        Vue.set(state.gameState.player.stats, pl.id, {});
      }
    },
    gameDataCreateRegion (state, pl) {
      const newRegion = {
        name: pl.name || pl.id,
        maps: {},
        regions: {},
      }

      function setRegion(parentIds, region) {
        if (parentIds.length === 0) {
          Vue.set(region.regions, utilGetNewRegionMapId(pl.id, region), newRegion);
        } else {
          setRegion(parentIds.slice(1), region.regions[parentIds[0]]);
        }
      }
      if (pl.parent) {
        setRegion(pl.parent, state.gameData)
      } else {
        Vue.set(state.gameData.regions, utilGetNewRegionMapId(pl.id, state.gameData), newRegion);
      }
    },
    gameDataCreateMap (state, pl) {
      const newMap = {
        name: pl.name || pl.id,
        maps: {},
        regions: {},
      }

      function setMap(parentIds, region) {
        if (parentIds.length === 0) {
          Vue.set(region.maps, utilGetNewRegionMapId(pl.id, region), newMap);
        } else {
          setMap(parentIds.slice(1), region.regions[parentIds[0]]);
        }
      }
      if (pl.parent) {
        setMap(pl.parent, state.gameData)
      } else {
        Vue.set(state.gameData.maps, utilGetNewRegionMapId(pl.id, state.gameData), newMap);
      }
    },
    gameDataDeleteRegionOrMap (state, pl) {
      function deleteRegionOrMap(ids, region) {
        if (ids.length === 1) {
          if (region.regions[ids[0]]) {
            Vue.delete(region.regions, ids[0]);
          } else {
            Vue.delete(region.maps, ids[0]);
          }
        } else {
          deleteRegionOrMap(ids.slice(1), region.regions[ids[0]]);
        }
      }
      deleteRegionOrMap(pl, state.gameData);
    },
    gameDataChangeLocationId (state, pl) {
      function popOldLocation (ids, region) {
        if (ids.length === 1) {
          if (region.regions[ids[0]]) {
            const location = region.regions[ids[0]];
            Vue.delete(region.regions, ids[0]);
            return {
              type: 'region',
              location,
            }
          } 
          const location = region.maps[ids[0]];
          Vue.delete(region.maps, ids[0]);
          return {
            type: 'map',
            location,
          }
        }
        return popOldLocation(ids.slice(1), region.regions[ids[0]]);
      }
      const locationInfo = popOldLocation(pl.oldId, state.gameData);

      function setNewLocation (ids, region, locationToSet) {
        if (ids.length === 1) {
          if (locationToSet.type === 'region') {
            Vue.set(region.regions, utilGetNewRegionMapId(ids[0], region), locationToSet.location);
            return;
          }
          Vue.set(region.maps, utilGetNewRegionMapId(ids[0], region), locationToSet.location);
          return;
        }
        setNewLocation(ids.slice(1), region.regions[ids[0]], locationToSet);
      }
      setNewLocation(pl.newId, state.gameData, locationInfo);
    },
    gameDataChangeLocationName (state, pl) {
      function renameLocation(ids, region) {
        if (ids.length === 1) {
          if (region.regions[ids[0]]) {
            Vue.set(region.regions[ids[0]], 'name', pl.name);
          } else {
            Vue.set(region.maps[ids[0]], 'name', pl.name);
          }
        } else {
          renameLocation(ids.slice(1), region.regions[ids[0]]);
        }
      }
      renameLocation(pl.id, state.gameData);
    },

    // game state mutations
  },
 
  getters: {
    // misc getters
    showMainMenu: (state) => {
      return state.showMainMenu;
    },
    appPage: (state) => {
      return state.appPage;
    },
    gameEditorPage: (state) => {
      return state.gameEditorPage;
    },
    regionEditorState: (state) => {
      return {
        page: state.regionEditorPage,
        id: state.regionEditorId,
        showIds: state.regionEditorShowIds,
      }
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
      function solveRegion(id, region) {
        const [ finalBitOfRegionId ] = `${id}`.split('/').slice(-1);
        const thisRegion = {
          id,
          name: state.regionEditorShowIds ? finalBitOfRegionId : region.name || finalBitOfRegionId,
          children: [],
        };

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const regionId in region.regions) {
          thisRegion.children.push(solveRegion(id ? `${id}/${regionId}` : regionId, region.regions[regionId]));
        }
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const mapId in region.maps) {
          thisRegion.children.push({
            id: id ? `${id}/${mapId}` : mapId,
            name: state.regionEditorShowIds ? mapId : region.maps[mapId].name || mapId,
            isLeaf: true,
          })
        }
        return thisRegion;
      }
      return solveRegion(undefined, state.gameData).children;
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
      const {level} = state.gameState.player.advancement;
      return {
        level,
        xp: state.gameState.player.advancement.xp,
        xpToLevel: state.gameData.xpToLevel[level],
      };
    }
  },
});
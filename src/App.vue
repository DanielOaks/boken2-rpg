<template>
  <div id="app">
    <game ref="game" v-show="$store.getters.appPage == 'game'"/>
    <game-editor ref="gameEditor" v-show="$store.getters.appPage == 'gameEditor'"/>
    <state-editor ref="stateEditor" v-show="$store.getters.appPage == 'stateEditor'"/>
    <state-switcher ref="stateSwitcher"/>
    <main-menu ref="mainmenu" v-if="$store.getters.showMainMenu"/>
  </div>
</template>

<script>
import StateSwitcher from './components/TheStateSwitcher.vue'
import MainMenu from './game/views/MainMenu.vue'
import Game from './game/views/Game.vue'
import GameEditor from './game-editor/views/GameEditor.vue'
import StateEditor from './state-editor/views/StateEditor.vue'

export default {
  name: 'App',
  components: {
    StateSwitcher,
    MainMenu,
    Game,
    GameEditor,
    StateEditor,
  },
}
</script>

<style lang="scss">
// CSS resets
@import '~ress/ress.css';

// default theme
:root {
  --mainmenu-gameselect-bg-color: #96c3bd;
  --mainmenu-gameselect-text-color: #444;

  --main-text-color: #fff;
  --main-bg-color: #559e94;

  --main-btn-text-color: #fff;
  --main-btn-bg-color: #24645c;
  --main-btn-wasd-bg-color: #85240b;

  --sidebar-text-color: #fff;
  --sidebar-bg-color: var(--main-btn-bg-color);
  --sidebar-btn-text-color: #acc9c5;
  --sidebar-btn-bg-color: #41877e;
  --sidebar-location-text-color: #fff;
  --sidebar-location-bg-color: #1c544d;
  --sidebar-bar-text-color: var(--sidebar-location-text-color);
  --sidebar-bar-bg-color: var(--sidebar-location-bg-color);
  --sidebar-bar-bg-color-fill: #1b8064;
  --sidebar-hr-color: var(--sidebar-btn-bg-color);

  --map-bg-color: var(--main-bg-color);
  --map-tile-text-color: var(--main-btn-text-color);
  --map-tile-bg-color: var(--sidebar-btn-bg-color);
  --map-tile-bg-active-color: #31776e;
  --map-tile-bg-color-error: #974733;
  --map-editor-text-color: #fff;

  --editor-text-color: #151515;
  --editor-bg-2-color: #f9f4e7;
  --editor-bg-color: #fbfaf8;
  --editor-shadow-color: #e2d7d4;
  --editor-header-shadow-color: #e2d7d4;
  --editor-btn-text-color: #333;
  --editor-btn-bg-color: #e8e7e5;
  --editor-btn-shadow-color: #46454354;
  --editor-bar-text-color: #fff;
  --editor-bar-bg-color: #1b1914;
  --editor-bar-tab-bg-color: #423f38;
}

// fonts
@import "~@openfonts/open-sans_all/index.css";

#app {
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  line-height: 1.5;
}
</style>
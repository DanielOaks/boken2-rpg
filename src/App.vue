<template>
  <div id="app">
    <game ref="game" v-show="page == 'game'"/>
    <game-editor ref="gameEditor" v-show="page == 'gameEditor'"/>
    <state-editor ref="stateEditor" v-show="page == 'stateEditor'"/>
    <div id="stateSwitcher">
      <img src="/assets/buttons/game.svg"  v-on:click="show('game')"/>
      <img src="/assets/buttons/game-editor.svg"  v-on:click="show('gameEditor')"/>
      <img src="/assets/buttons/state-editor.svg"  v-on:click="show('stateEditor')"/>
    </div>
    <main-menu ref="mainmenu" v-if="$store.getters.showMainMenu"/>
  </div>
</template>

<script>
import MainMenu from './game/views/MainMenu.vue'
import Game from './game/views/Game.vue'
import GameEditor from './game-editor/views/GameEditor.vue'
import StateEditor from './state-editor/views/StateEditor.vue'

export default {
  name: 'App',
  components: {
    MainMenu,
    Game,
    GameEditor,
    StateEditor,
  },
  data() {
    return {
      page: 'game',
    }
  },
  methods: {
    show(page) {
      this.page = page;
    },
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

#stateSwitcher {
  position: fixed;
  width: auto;
  height: auto;
  left: 0;
  top: 0;
  padding: 0 4em 3em 0;
  transition: opacity .3s;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  img {
    display: inline-block;
    height: 3em;
    cursor: pointer;
  }
}
</style>
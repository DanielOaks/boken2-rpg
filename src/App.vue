<template>
  <div id="app">
    <game ref="game" />
    <game-editor ref="gameEditor" />
    <state-editor ref="stateEditor" />
    <state-switcher ref="stateSwitcher" />
    <homepage ref="homepage" />
  </div>
</template>

<script>
import Game from './pages/Game/index.vue'
import Homepage from './pages/Homepage.vue'
import GameEditor from './pages/GameEditor/index.vue'
import StateEditor from './pages/StateEditor.vue'
import StateSwitcher from './pages/StateSwitcher.vue'

export default {
  name: 'App',
  components: {
    Game,
    Homepage,
    GameEditor,
    StateEditor,
    StateSwitcher,
  },
}
</script>

<style lang="scss">
// CSS resets
@import '~ress/ress.css';

// default theme
:root {
  --homepage-gameselect-bg-color: #96c3bd;
  --homepage-gameselect-text-color: #444;

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
  --map-tile-bg-color-error: #974733;

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
<template>
  <div id="app">
    <game ref="game" />
    <game-editor ref="gameEditor" />
    <state-editor ref="stateEditor" />
    <state-switcher ref="stateSwitcher" />
  </div>
</template>

<script>
import Game from './pages/Game.vue'
import GameEditor from './pages/GameEditor.vue'
import StateEditor from './pages/StateEditor.vue'
import StateSwitcher from './pages/StateSwitcher.vue'

export default {
  name: 'App',
  components: {
    Game,
    GameEditor,
    StateEditor,
    StateSwitcher,
  },
}
</script>

<style lang="scss">
// default theme
:root {
  --main-text-color: #fff;
  --main-bg-color: #4ea79b;

  --main-btn-text-color: #fff;
  --main-btn-bg-color: #38867c;
  --main-btn-bg-color-active: #24645c;
  --main-btn-wasd-bg-color: #925444;
  --main-btn-wasd-bg-color-active: #85240b;

  --sidebar-text-color: #fff;
  --sidebar-bg-color: #24645c;
  --sidebar-btn-text-color: #acc9c5;
  --sidebar-btn-bg-color: #38867c;
  --sidebar-location-text-color: #fff;
  --sidebar-location-bg-color: #103833;
  --sidebar-bar-text-color: #fff;
  --sidebar-bar-bg-color: #103833;
  --sidebar-bar-bg-color-fill: #167a6f;
  --sidebar-hr-color: #38867c;

  --map-bg-color: #4ea79b;
  --map-tile-text-color: #fff;
  --map-tile-bg-color: #38867c;
  --map-tile-bg-color-error: #974733;
}
</style>
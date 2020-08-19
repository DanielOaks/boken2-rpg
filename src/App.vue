<template>
  <div id="app">
    <state-switcher ref="stateSwitcher" />
    <state-editor ref="stateEditor" />
    <game-editor ref="gameEditor" />
    <game ref="game" />
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

<style>
</style>
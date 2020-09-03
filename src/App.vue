<template>
  <div id="app">
    <css-vars/>
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
import CssVars from './components/TheCssVars.vue'
import MainMenu from './game/views/MainMenu.vue'
import Game from './game/views/Game.vue'
import GameEditor from './game-editor/views/GameEditor.vue'
import StateEditor from './state-editor/views/StateEditor.vue'

export default {
  name: 'App',
  components: {
    CssVars,
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
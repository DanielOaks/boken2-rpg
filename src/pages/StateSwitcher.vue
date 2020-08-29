<template>
  <div id="stateSwitcher">
    <img src="/assets/buttons/game.svg" v-on:click="showGame()"/>
    <img src="/assets/buttons/game-editor.svg" v-on:click="showGameEditor()"/>
    <img src="/assets/buttons/state-editor.svg" v-on:click="showStateEditor()"/>
  </div>
</template>

<script>
export default {
  name: 'StateSwitcher',
  methods: {
    showGame() {
      this.$parent.$refs.game.show();
    },
    showGameEditor() {
      this.$parent.$refs.gameEditor.show();
    },
    showStateEditor() {
      this.$parent.$refs.stateEditor.show();
    },
  },
}
</script>

<style lang="scss" scoped>
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
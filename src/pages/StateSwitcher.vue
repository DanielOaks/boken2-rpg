<template>
  <div id="stateSwitcher">
    <img src="/assets/buttons/game.svg" v-on:click="showGame()"/>
    <img src="/assets/buttons/game-editor.svg" v-on:click="showGameEditor()"/>
    <img src="/assets/buttons/state-editor.svg" v-on:click="showStateEditor()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StateSwitcher',
  methods: {
    showGame: function () {
      this.$parent.$refs.game.show();
    },
    showGameEditor: function () {
      this.$parent.$refs.gameEditor.show();
    },
    showStateEditor: function () {
      this.$parent.$refs.stateEditor.show();
    },
  },
});
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
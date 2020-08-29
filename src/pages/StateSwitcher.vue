<template>
  <div id="stateSwitcher">
    <img src="/assets/buttons/game.svg"  v-on:click="show('game')"/>
    <img src="/assets/buttons/game-editor.svg"  v-on:click="show('gameEditor')"/>
    <img src="/assets/buttons/state-editor.svg"  v-on:click="show('stateEditor')"/>
  </div>
</template>

<script>
export default {
  name: 'StateSwitcher',
  methods: {
    show(page) {
      this.$store.commit('changeAppPage', page);
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
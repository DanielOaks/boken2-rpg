<template>
  <div id="stateSwitcher">
    State Switcher
    <img src="/assets/buttons/game.svg"/>
    <img src="/assets/buttons/game-editor.svg"/>
    <img src="/assets/buttons/state-editor.svg"/>
  </div>
</template>

<script>
export default {
  name: 'StateSwitcher',
}
</script>

<style lang="scss" scoped>
#stateSwitcher {
  position: fixed;
  width: auto;
  height: auto;
  left: 0;
  top: 0;
}
</style>
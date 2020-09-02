<template>
  <div id="mainContent">
    <h1 v-text="$store.getters.gameDataGameName"/>
    <p>Welcome to the Boken2-RPG example game. This exists to test the engine's UI. Hope this is interesting!</p>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
}
</script>

<style lang="scss">
#mainContent {
  height: 100%;
  flex: auto;
  padding: 1em 1.7em;
  overflow-y: auto;
  line-height: 1.15;
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.95);
  // other browsers, please define ways to not make scrollbars look too garbage.
  &::-webkit-scrollbar {
    width: 1em;
    background: var(--sidebar-btn-bg-color);
  }
  &::-webkit-scrollbar-thumb {
    width: 1em;
    background: var(--main-bg-color);
  }
  
  h1, h2, h3 {
    margin-bottom: 0.3em;
  }
  h1 {
    font-size: 1.7em;
  }
}
</style>
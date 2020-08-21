<template>
  <div class="menuButtonsPane">
    <menuButton btn="menu"/>
    <menuButton btn="saveload"/>
    <menuButton btn="imnotsure"/>
    <menuButton btn="profile" big/>
    <menuButton btn="messages"/>
    <menuButton btn="perks"/>
    <menuButton btn="levelup"/>
  </div>
</template>

<script>
import menuButton from './buttons/menuButton.vue'

export default {
  name: 'MenuButtonsPane',
  components: {
    menuButton,
  },
}
</script>

<style lang="scss">
.menuButtonsPane {
  flex: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0.2em;
  grid-row-gap: 0.25em;
  margin-top: .5em;
}
</style>
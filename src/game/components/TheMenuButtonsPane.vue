<template>
  <div class="menuButtonsPane">
    <MenuButton btn="menu"/>
    <MenuButton btn="saveload"/>
    <MenuButton btn="quicksave"/>
    <MenuButton btn="profile" big/>
    <MenuButton btn="messages"/>
    <MenuButton btn="perks"/>
    <MenuButton btn="levelup"/>
  </div>
</template>

<script>
import MenuButton from './MenuButton.vue'

export default {
  name: 'MenuButtonsPane',
  components: {
    MenuButton,
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
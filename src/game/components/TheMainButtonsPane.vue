<template>
  <div class="mainButtonsPane">
    <MainButton btn="1"/>
    <MainButton btn="2"/>
    <MainButton btn="3"/>
    <MainButton btn="4"/>
    <MainButton btn="5"/>
    <MainButton btn="q"/>
    <MainButton btn="w" wasd/>
    <MainButton btn="e"/>
    <MainButton btn="r"/>
    <MainButton btn="t"/>
    <MainButton btn="a" wasd/>
    <MainButton btn="s" wasd/>
    <MainButton btn="d" wasd/>
    <MainButton btn="f"/>
    <MainButton btn="g"/>
  </div>
</template>

<script>
import MainButton from './MainButton.vue'

export default {
  name: 'MainButtonsPane',
  components: {
    MainButton,
  },
}
</script>

<style lang="scss">
.mainButtonsPane {
  flex: none;
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
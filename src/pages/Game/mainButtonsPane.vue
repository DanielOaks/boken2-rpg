<template>
  <div class="mainButtonsPane">
    <mainButton btn="1"/>
    <mainButton btn="2"/>
    <mainButton btn="3"/>
    <mainButton btn="4"/>
    <mainButton btn="5"/>
    <mainButton btn="q"/>
    <mainButton btn="w" wasd/>
    <mainButton btn="e"/>
    <mainButton btn="r"/>
    <mainButton btn="t"/>
    <mainButton btn="a" wasd/>
    <mainButton btn="s" wasd/>
    <mainButton btn="d" wasd/>
    <mainButton btn="f"/>
    <mainButton btn="g"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainButton from './buttons/mainButton.vue'

export default defineComponent({
  name: 'MainButtonsPane',
  components: {
    mainButton,
  },
});
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
<template>
  <div class="gameMap">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameMap',
});
</script>

<style lang="scss">
.gameMap {
  width: 100%;
  height: 100%;
  flex: auto;
  background: var(--map-bg-color);
  border-radius: .4em;
  margin: .5em 0;
}
</style>
<template>
  <div class="hover-hint" v-bind:class="{hidden: $store.getters.gameHoverHint.hidden}"><div>
    <span class="name" v-text="$store.getters.gameHoverHint.name"/>
    <span class="description" v-text="$store.getters.gameHoverHint.description"/>
  </div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HoverHint',
});
</script>

<style lang="scss">
.hover-hint {
  position: relative;
  &.hidden {
    display: none;
  }
  > div {
    position: absolute;
    max-width: calc(100% - 2em);
    bottom: -.5em;
    left: .5em;
    background: var(--sidebar-btn-bg-color);
    padding: .5em .75em;
    border-radius: .5em;
    .name {
      display: block;
      font-size: 1.2em;
      font-weight: 700;
    }
  }
}
</style>
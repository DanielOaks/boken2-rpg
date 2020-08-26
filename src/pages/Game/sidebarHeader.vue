<template>
  <div class="sidebarHeader">
    <h3 v-text="name"/>
    <hr/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarHeader',
  props: {
    name: String,
    extraMargin: Boolean,
  },
});
</script>

<style lang="scss">
.sidebarHeader {
  margin-top: .8em;
  margin-bottom: .5em;

  h3 {
    font-weight: 600;
    font-size: 1em;
  }
  hr {
    height: 0.2em;
    background: var(--sidebar-hr-color);
    border: none;
    border-radius: 0.5em;
    margin-top: .2em;
  }
}
</style>
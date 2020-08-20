<template>
  <div class="displayBar" v-bind:class="{matchProgressionBars: margin}">
    <span class="name" v-text="name"/>
    <span class="value" v-text="value"/>
  </div>
</template>

<script>
export default {
  name: 'DisplayBar',
  props: {
    margin: Boolean,
    name: String,
    value: String,
  },
}
</script>

<style lang="scss">
.displayBar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  + .displayBar {
    margin-top: .2em;
  }
  + .progressionBar {
    margin-top: .4em;
  }

  &.matchProgressionBars {
    padding: 0 0.5em;
  }
  > span {
    font-size: 1.5em;
    text-transform: uppercase;
    line-height: 1;
  }
  .name {
    // try to ensure there's some space there :)
    padding-right: .5em;
  }
}
</style>
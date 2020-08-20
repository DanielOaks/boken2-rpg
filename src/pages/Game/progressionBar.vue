<template>
  <div class="progressionBar">
    <span class="name" v-text="name"/>
    <span class="value" v-text="value"/>
  </div>
</template>

<script>
export default {
  name: 'ProgressionBar',
  props: {
    name: String,
    value: String,
    max: Number,
  },
}
</script>

<style lang="scss">
.progressionBar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: .05em 0.5em .1em;
  color: var(--sidebar-bar-text-color);
  
  // we do this so that background-position-x can be set to (100% - percentage-of-bar-filled)
  background-image: linear-gradient(to right, var(--sidebar-bar-bg-color-fill) 50%, var(--sidebar-bar-bg-color) 50.05%);
  background-position-x: 100%;
  background-size: 200%;
  transition: background-position 1.1s cubic-bezier(0.645, 0.045, 0.355, 1);

  border-radius: .5em;
  + .progressionBar {
    margin-top: .25em;
  }
  + .displayBar {
    margin-top: .35em;
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
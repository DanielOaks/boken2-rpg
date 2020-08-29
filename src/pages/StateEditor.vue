<template>
  <div id="stateEditor" class="app-page">
    <br><br><br><br><br><br><br><br>State Editor!
  </div>
</template>

<script>
export default {
  name: 'StateEditor',
  methods: {
    show() {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of document.getElementsByClassName('app-page')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
  },
}
</script>

<style lang="scss" scoped>
#stateEditor {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #3af;
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
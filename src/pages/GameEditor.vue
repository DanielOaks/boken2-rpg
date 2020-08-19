<template>
  <div id="gameEditor" class="app-page">
    <br><br><br><br><br><br><br><br>Game Editor!
  </div>
</template>

<script>
export default {
  name: 'GameEditor',
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('app-page')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
  },
}
</script>

<style lang="scss" scoped>
#gameEditor {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #a3f;
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
<template>
  <div id="game" class="app-page">
    <br><br><br><br><br><br><br><br>Game!
  </div>
</template>

<script>
export default {
  name: 'Game',
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
#game {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--main-bg-color);
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
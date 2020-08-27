<template>
  <div class="gameEditorPage regions hidden">
    <h1>Regions</h1>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('gameEditorPage')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
  },
}
</script>

<style lang="scss">
.gameEditorPage.regions {
  text-align: center;
  .btn {
    color: var(--editor-btn-text-color);
    background: var(--editor-btn-bg-color);
    padding: .2em .4em;
    border-radius: .5em;
    cursor: pointer;
    text-align: center;
  }
}
</style>
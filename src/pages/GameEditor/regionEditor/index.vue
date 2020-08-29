<template>
  <div class="gameEditorPage regions hidden">
    <regionTreePage ref="regionTreePage"/>
    <regionAttributesPage ref="regionAttributesPage"/>
    <mapEditorPage ref="mapEditorPage"/>
  </div>
</template>

<script>
import regionTreePage from './regionTreePage.vue'
import regionAttributesPage from './regionAttributesPage.vue'
import mapEditorPage from './mapEditorPage.vue'

export default {
  name: 'RegionEditorPage',
  components: {
    regionTreePage,
    regionAttributesPage,
    mapEditorPage
  },
  methods: {
    show() {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of document.getElementsByClassName('gameEditorPage')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
    created() {
      this.$refs.regionTreePage.show();
    }
  },
}
</script>

<style lang="scss">
</style>
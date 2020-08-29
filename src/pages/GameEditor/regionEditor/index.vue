<template>
  <div class="gameEditorPage regions">
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
    created() {
      this.$refs.regionTreePage.show();
    }
  },
}
</script>

<style lang="scss">
</style>
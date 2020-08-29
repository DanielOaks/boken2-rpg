<template>
  <div class="gameEditorPage regions">
    <regionTreePage ref="regionTreePage" v-if="$store.getters.regionEditorState.page == 'tree'"/>
    <regionAttributesPage ref="regionAttributesPage" v-if="$store.getters.regionEditorState.page == 'regionEditor'"/>
    <mapEditorPage ref="mapEditorPage" v-if="$store.getters.regionEditorState.page == 'mapEditor'"/>
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
}
</script>

<style lang="scss">
</style>
<template>
  <div class="gameEditorPage locations">
    <TreeEditor v-if="$store.getters.regionEditorState.page == 'tree'"/>
    <RegionEditor v-if="$store.getters.regionEditorState.page == 'regionEditor'"/>
    <MapEditor v-if="$store.getters.regionEditorState.page == 'mapEditor'"/>
  </div>
</template>

<script>
import TreeEditor from './location-editor/TreeEditor.vue'
import RegionEditor from './location-editor/RegionEditor.vue'
import MapEditor from './location-editor/MapEditor.vue'

export default {
  name: 'LocationEditor',
  components: {
    TreeEditor,
    RegionEditor,
    MapEditor,
  },
}
</script>

<style lang="scss">
.gameEditorPage.locations {
  overflow-y: hidden;
}
</style>
<template>
  <div class="gameEditorPage locations">
    <treePage v-if="$store.getters.regionEditorState.page == 'tree'"/>
    <regionEditorPage v-if="$store.getters.regionEditorState.page == 'regionEditor'"/>
    <mapEditorPage v-if="$store.getters.regionEditorState.page == 'mapEditor'"/>
  </div>
</template>

<script>
import treePage from './treePage.vue'
import regionEditorPage from './regionEditorPage.vue'
import mapEditorPage from './mapEditorPage.vue'

export default {
  name: 'LocationEditor',
  components: {
    treePage,
    regionEditorPage,
    mapEditorPage,
  },
}
</script>

<style lang="scss">
</style>
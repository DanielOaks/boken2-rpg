<template>
  <div class="regionEditorPage">
    <div class="contained">
      <h1 v-text="$store.getters.regionEditorState.id"/>
      <div class="settingsMenu">
        <div>
          <button class="btn" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
        </div>
        IOU one map editor page
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapEditorPage',
  methods: {
    goBack() {
      this.$store.commit('showRegionTreeEditor');
    },
  }
}
</script>

<style lang="scss">
</style>
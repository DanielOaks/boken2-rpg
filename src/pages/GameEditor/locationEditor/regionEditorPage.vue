<template>
  <div class="regionEditorPage">
    <div class="contained">
      <h1 v-text="$store.getters.regionEditorState.id"/>
      <div class="settingsMenu">
        <div>
          <button class="btn" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
        </div>
        IOU one region editor page
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegionAttributesPage',
  methods: {
    goBack() {
      this.$store.commit('showRegionTreeEditor');
    },
  }
}
</script>

<style lang="scss">
</style>
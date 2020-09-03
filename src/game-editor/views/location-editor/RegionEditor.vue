<template>
  <div class="regionEditorPage">
    <div class="contained">
      <h1 v-text="$store.getters.locationEditorState.id"/>
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
  name: 'RegionEditor',
  methods: {
    goBack() {
      this.$store.commit('showTreeEditor');
    },
  }
}
</script>

<style lang="scss">
</style>
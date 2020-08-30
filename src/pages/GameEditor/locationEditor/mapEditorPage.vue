<template>
  <div class="mapEditor">
    <div class="mainNavButtons">
      <div class="btn" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
      <div class="btn" @click="save" v-text="$t('gameEditor.regions.saveButton')"/>
    </div>
    <div class="mainPropertyEditor"><div>
      <h2>Map Properties</h2>
      <p>aaaaa1</p>
      <p>aaaaa2</p>
      <h2>Space Properties</h2>
      <p>aaaaa1</p>
      <p>aaaaa2</p>
      <p>aaaaa3</p>
      <p>aaaaa4</p>
    </div></div>
    <p>map editor</p>
  </div>
</template>

<script>
export default {
  name: 'MapEditorPage',
  methods: {
    goBack() {
      this.$store.commit('showRegionTreeEditor');
    },
    save() {
      console.log('TODO: save map');
    },
  }
}
</script>

<style lang="scss">
.mapEditor {
  position: relative;
  height: 100%;
  color: var(--map-editor-text-color);
  background: var(--map-bg-color);
  .mainNavButtons {
    position: absolute;
    bottom: .5em;
    left: .5em;
    display: flex;
    .btn {
      padding: .5em 1em;
      background: var(--map-tile-bg-color);
      border-radius: .5em;
      cursor: pointer;
      + .btn {
        margin-left: .5em;
      }
    }
  }
  .mainPropertyEditor {
    position: absolute;
    top: 0;
    right: 0;
    width: 20em;
    resize: horizontal;
    overflow-x: hidden;
    direction: rtl; // so resize drag handle appears on left
    background: var(--map-tile-bg-color);
    padding: .5em 1em;
    border-bottom-left-radius: .5em;
    > div {
      direction: ltr;
    }
  }
}
</style>
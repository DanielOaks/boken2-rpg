<template>
  <div id="gameEditor" class="app-page">
    <settingsPage v-if="$store.getters.gameEditorPage == 'settings'"/>
    <locationPage v-if="$store.getters.gameEditorPage == 'locations'"/>
    <div class="tabs">
      <div class="tab" v-text="$t('gameEditor.tab.gameinfo')" data-page="settings" v-bind:class="{active: $store.getters.gameEditorPage == 'settings'}" @click="switchTab"/>
      <div class="tab" v-text="$t('gameEditor.tab.characters')"/>
      <div class="tab" v-text="$t('gameEditor.tab.regions')" data-page="locations" v-bind:class="{active: $store.getters.gameEditorPage == 'locations', map: $store.getters.regionEditorState.page == 'mapEditor'}" @click="switchTab"/>
      <div class="tab" v-text="$t('gameEditor.tab.quests')"/>
      <div class="tab" v-text="$t('gameEditor.tab.items')"/>
      <div class="tab" v-text="$t('gameEditor.tab.perks')"/>
    </div>
  </div>
</template>

<script>
import settingsPage from './settingsPage.vue'
import locationPage from './locationEditor/index.vue'

export default {
  name: 'GameEditor',
  components: {
    settingsPage,
    locationPage,
  },
  methods: {
    switchTab(e) {
      this.$store.commit('changeGameEditorPage', e.target.dataset.page);
    },
  },
}
</script>

<style lang="scss">
#gameEditor {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--editor-bg-2-color);
  display: flex;
  flex-direction: column;

  > .gameEditorPage, .regionEditorPage {
    height: 100%;
    flex: auto;
  }
  > .tabs {
    background: var(--editor-bar-bg-color);
    flex: none;
    display: flex;
    > .tab {
      padding: .3em .7em;
      color: var(--editor-bar-text-color);
      margin: 0 0 .1em .15em;
      background: var(--editor-bar-tab-bg-color);
      cursor: pointer;
      border-radius: 0 0 .25em .25em;
      opacity: .8;
      &:hover {
        opacity: 1;
      }
      &.active {
        background: var(--editor-bg-2-color);
        color: var(--editor-text-color);
        opacity: 1;
        &.map {
          color: var(--map-editor-text-color);
          background: var(--map-bg-color);
        }
      }
    }
  }
}
</style>
<template>
  <div id="gameEditor" class="app-page">
    <settingsPage ref="settings"/>
    <regionsPage ref="regions"/>
    <div class="tabs">
      <div class="tab active" v-text="$t('gameEditor.tab.gameinfo')" data-page="settings" @click="switchTab"/>
      <div class="tab" v-text="$t('gameEditor.tab.characters')"/>
      <div class="tab" v-text="$t('gameEditor.tab.regions')" data-page="regions" @click="switchTab"/>
      <div class="tab" v-text="$t('gameEditor.tab.quests')"/>
      <div class="tab" v-text="$t('gameEditor.tab.perks')"/>
    </div>
  </div>
</template>

<script>
import settingsPage from './settingsPage.vue'
import regionsPage from './regionsPage.vue'

export default {
  name: 'GameEditor',
  components: {
    settingsPage,
    regionsPage,
  },
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('app-page')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
    switchTab: function (e) {
      // change tab colour
      for (const p of e.target.parentNode.children) {
        p.classList.remove('active');
      }
      e.target.classList.add('active');

      // change page
      const tab = this.$refs[e.target.dataset.page];
      if (tab) {
        tab.show();
      } else {
        console.log('tab named [', e.target.dataset.page, '] does not exist in $refs');
      }
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
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
  display: flex;
  flex-direction: column;

  > .gameEditorPage {
    height: 100%;
    flex: auto;
    &.hidden {
      display: none;
    }
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
      }
    }
  }
}
</style>
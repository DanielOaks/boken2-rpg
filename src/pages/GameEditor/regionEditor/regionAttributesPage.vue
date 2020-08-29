<template>
  <div class="regionEditorPage">
    <div class="contained">
      <h1 v-text="regionId"/>
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
  data: function () {
    return {
      regionId: '',
    }
  },
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('regionEditorPage')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
    goBack: function () {
      this.$parent.$refs.regionTreePage.show();
    },
  }
}
</script>

<style lang="scss">
.regionEditorPage {
  text-align: center;
  overflow-y: auto;
  padding: .5em 0 1em;
  .contained {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .settingsMenu {
    background: var(--editor-bg-color);
    color: var(--editor-text-color);
    width: 50em;
    max-width: calc(100% - 2em);
    margin: 0 auto;
    text-align: left;
    border-radius: 1em;
    padding: .8em 1.3em 1.2em;
    box-shadow: 0 1px var(--editor-shadow-color);
  }
  h1 {
    margin-bottom: .2em;
    text-shadow: 0 1px var(--editor-header-shadow-color);
  }
  .btn {
    color: var(--editor-btn-text-color);
    background: var(--editor-btn-bg-color);
    padding: .2em .6em;
    border-radius: .5em;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 1px var(--editor-btn-shadow-color);
    margin-bottom: .5em;
  }
  .vtl .btn {
    letter-spacing: 0; // tree sets this to 1px on elements it contains
  }
  .vtl span + span .btn {
    margin-left: .5em;
  }
}
</style>
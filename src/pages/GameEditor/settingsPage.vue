<template>
  <div class="gameEditorPage settings">
    <h1>Game Settings</h1>
    <div class="settingsMenu">
      <label for="gameName" v-text="$t('gameEditor.settings.gameName')"/>
      <input id="gameName" v-model="gameName" placeholder="Game Name" size=35>
      <label for="currencyName" v-text="$t('gameEditor.settings.currencyName')"/>
      <input id="currencyName" v-model="currencyName" placeholder="Currency Name" size=15>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  computed: {
    gameName: {
      get () {
        return this.$store.getters.gameDataGameName;
      },
      set (value) {
        this.$store.commit('gameDataChangeNames', {
          gameName: value,
        });
      },
    },
    currencyName: {
      get () {
        return this.$store.getters.gameDataCurrencyName;
      },
      set (value) {
        this.$store.commit('gameDataChangeNames', {
          currencyName: value,
        });
      },
    },
  },
}
</script>

<style lang="scss">
.gameEditorPage.settings {
  text-align: center;
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
    margin-top: 3em;
    margin-bottom: .5em;
    text-shadow: 0 1px var(--editor-header-shadow-color);
  }
  label {
    display: block;
    font-size: 1.15em;
    font-weight: 600;
    &:not(:first-of-type) {
      margin-top: .7em;
    }
  }
  input {
    display: block;
    margin: 0 0 0 1em;
    padding: .2em .5em;
    border: #333 1px solid;
    border-radius: .5em;
    max-width: calc(100%-1em);
  }
}
</style>
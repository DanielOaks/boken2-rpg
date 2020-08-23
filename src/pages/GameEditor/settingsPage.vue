<template>
  <div class="gameEditorPage settings">
    <h1>Game Settings</h1>
    <div class="settingsMenu">
      <label for="gameName">Game Name</label>
      <input id="gameName" v-model="gameName" placeholder="Game Name" size=35>
      <label for="currencyName">Currency Name</label>
      <input id="gameName" v-model="currencyName" placeholder="Currency Name" size=15>
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
  .settingsMenu {
    background: var(--editor-bg-color);
    color: var(--editor-text-color);
    text-align: center;
    width: 50em;
    margin: 0 auto;
    text-align: left;
    border-radius: 1em;
    padding: .8em 1.3em;
  }
  h1 {
    margin-top: 3em;
    margin-bottom: .5em;
  }
  label {
    display: block;
    font-size: 1.15em;
    font-weight: 600;
    &:not(:first-of-type) {
      margin-top: 1.3em;
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
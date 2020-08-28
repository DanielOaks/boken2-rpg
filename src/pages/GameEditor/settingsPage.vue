<template>
  <div class="gameEditorPage settings">
    <div class="contained">
      <h1 v-text="$t('gameEditor.tab.gameinfo')"/>
      <div class="settingsMenu">
        <label for="gameName" v-text="$t('gameEditor.settings.gameName')"/>
        <input id="gameName" v-model="gameName" placeholder="Game Name" size="35"/>
        <label for="currencyName" v-text="$t('gameEditor.settings.currencyName')"/>
        <input id="currencyName" v-model="currencyName" placeholder="Currency Name" size="15"/>
        <label for="statsList" v-text="$t('terms.stats')"/>
        <p v-text="$t('gameEditor.settings.statsDescription')"/>
        <div id="statsList">
          <span>ID</span>
          <span>UI Name</span>
          <span>Full Name</span>
          <span/>
          <!-- we should replace this with display: contents later... -->
          <template v-for="(info, key) in $store.getters.gameDataStats">
            <span :key="'k_'+key" v-text="key"/>
            <input :key="'u_'+key" :data-id="key" data-field="uiName" :value="info.uiName" size="10" @input="updateGameStat"/>
            <input :key="'f_'+key" :data-id="key" data-field="fullName" :value="info.fullName" size="20" @input="updateGameStat"/>
            <div :key="'d_'+key" :data-id="key" class="btn" v-text="$t('gameEditor.settings.delete')" @click="deleteGameStat"/>
          </template>
          <input id="newStatKey" ref="newGameStatKey" size="10"/>
          <input id="newStatUiName" ref="newGameStatUiName" size="10"/>
          <input id="newStatFullName" ref="newGameStatFullName" size="20"/>
          <div class="btn" v-text="$t('gameEditor.settings.add')" @click="createGameStat"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('gameEditorPage')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },
    updateGameStat (e) {
      const field = e.target.getAttribute('data-field');
      var change = {
        id: e.target.getAttribute('data-id'),
      }
      if (field == 'uiName') {
        change.uiName = e.target.value;
      } else if (field == 'fullName') {
        change.fullName = e.target.value;
      }

      this.$store.commit('gameDataChangeStat', change)
    },
    deleteGameStat (e) {
      const id = e.target.getAttribute('data-id');
      this.$store.commit('gameDataDeleteStat', id);
    },
    createGameStat (e) {
      const change = {
        id: this.$refs.newGameStatKey.value,
        uiName: this.$refs.newGameStatUiName.value,
        fullName: this.$refs.newGameStatFullName.value,
      };
      this.$store.commit('gameDataCreateStat', change);
      this.$refs.newGameStatKey.value = '';
      this.$refs.newGameStatUiName.value = '';
      this.$refs.newGameStatFullName.value = '';
    },
  },
  computed: {
    gameStats: {
      get () {
        return this.$store.getters.gameDataStats;
      },
    },
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
    #statsList {
      display: grid;
      grid-template-columns: auto auto auto auto;
      column-gap: .4em;
      row-gap: .5em;
      margin: .5em 0 0 1em;
      input {
        margin-left: 0;
      }
      // table header elements
      > :nth-child(-n+4) {
        font-weight: 600;
        margin-bottom: -.3em;
      }
    }
  }
  h1 {
    margin-bottom: .2em;
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
  .btn {
    color: var(--editor-btn-text-color);
    background: var(--editor-btn-bg-color);
    padding: .2em .4em;
    border-radius: .5em;
    cursor: pointer;
    text-align: center;
  }
}
</style>
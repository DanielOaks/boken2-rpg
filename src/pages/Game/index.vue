<template>
  <div id="game" class="app-page">
    <div id="leftPane">
      <div class="topPane">
        <locationInfo placeName="Market" regionName="Troto"/>
        <gameMap/>
        <displayBar :name="t('terms.time')" value="08:02"/>
        <displayBar :name="t('terms.day')" value="5"/>
        <menuButtonsPane/>
      </div>
      <div class="sideButtonsPane">
        <mainContentPaginationButton dir="prev"/>
        <mainContentPaginationButton dir="next"/>
      </div>
    </div>
    <div id="middlePane">
      <mainContent/>
      <hoverHint/>
      <mainButtonsPane/>
    </div>
    <div id="rightPane">
      <div class="topPane">
        <h2 class="characterName" v-text="$store.getters.gameStatePlayerName.mainName"/>
        <sidebarHeader :name="t('terms.stats')"/>
        <progressionBar v-for="(info, key) in $store.getters.gameDataStats" :key="key"
          :name="info.uiName || info.fullName"
          :max="$store.getters.gameStatePlayerStats[key].default"
          :value="$store.getters.gameStatePlayerStats[key].current"/>
        <sidebarHeader :name="t('terms.attributes')" extraMargin/>
        <progressionBar v-for="(info, key) in $store.getters.gameDataAttributes" :key="key+'-'+info.uiName+'-'+info.fullName"
          :name="info.uiName || info.fullName"
          :max="$store.getters.gameStatePlayerAttributes[key].base + $store.getters.gameStatePlayerAttributes[key].mod"
          :value="$store.getters.gameStatePlayerAttributes[key].base + $store.getters.gameStatePlayerAttributes[key].mod"/>
        <sidebarHeader :name="t('terms.advancement')" extraMargin/>
        <displayBar margin :name="t('terms.level')" :value="$store.getters.gameStatePlayerLevel.level.toString()"/>
        <progressionBar :name="t('terms.xp')" :value="$store.getters.gameStatePlayerLevel.xp" :max="$store.getters.gameStatePlayerLevel.xpToLevel"/>
        <displayBar margin :name="$store.getters.gameDataCurrencyName" :value="formatBigNumber($store.getters.gameStatePlayerCurrency)"/>
        <sidebarHeader :name="t('terms.statusEffects')" extraMargin/>
      </div>
      <div class="sideButtonsPane">
        <mainButtonsPaginationButton dir="prev"/>
        <mainButtonsPaginationButton dir="next"/>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import locationInfo from './locationInfo.vue'
import gameMap from './gameMap.vue'
import menuButtonsPane from './menuButtonsPane.vue'
import displayBar from './displayBar.vue'
import progressionBar from './progressionBar.vue'
import sidebarHeader from './sidebarHeader.vue'
import mainContent from './mainContent.vue'
import hoverHint from './hoverHint.vue'
import mainButtonsPane from './mainButtonsPane.vue'
import mainContentPaginationButton from './buttons/mainContentPagination.vue'
import mainButtonsPaginationButton from './buttons/mainButtonsPagination.vue'

export default {
  name: 'Game',
  setup() {
    return useI18n();
  },
  components: {
    locationInfo,
    gameMap,
    menuButtonsPane,
    displayBar,
    progressionBar,
    sidebarHeader,
    mainContent,
    hoverHint,
    mainButtonsPane,
    mainContentPaginationButton,
    mainButtonsPaginationButton,
  },
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('app-page')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
    },

    // utility function...
    // feels icky putting it here, but I tried splitting it out and into a
    //  separate js file and webpack seemed to foil me? to revisit later.
    formatBigNumber: function (num, min) {
      // this can happen if the dataStore returns a bad value
      if (num === undefined) {
        return 'NaN';
      }
      if (min && num < min) {
        return num.toString();
      }
      if (1000 < num) {
        return (num/1000).toFixed(1) + 'K';
      }
      return num.toString();
    },
  },
}
</script>

<style lang="scss" scoped>
#game {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--main-bg-color);
  color: var(--main-text-color);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
  display: flex;
}
#leftPane, #rightPane {
  flex: none;
  width: 13.5em;
  display: flex;
  flex-direction: column;
  .topPane {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: auto;
    background: var(--sidebar-bg-color);
    color: var(--sidebar-text-color);
    padding: 0.5em;
    overflow-y: auto;
    // other browsers, please define ways to not make scrollbars look too garbage.
    &::-webkit-scrollbar {
      width: 1em;
      background: var(--sidebar-location-bg-color);
    }
    &::-webkit-scrollbar-thumb {
      width: 1em;
      background: var(--sidebar-bg-color);
    }
  }
  .sideButtonsPane {
    flex: none;
    display: flex;
    justify-content: space-between;
  }
}
#leftPane {
  .topPane {
    border-bottom-right-radius: .5em;
  }
  .sideButtonsPane {
    padding: .5em 0 .5em .5em;
  }
}
#rightPane {
  .topPane {
    border-bottom-left-radius: .5em;
    .characterName {
      font-size: 1.4em;
      font-weight: 600;
      margin-top: -.25em;
      margin-bottom: -.5em;
    }
  }
  .sideButtonsPane {
    padding: .5em .5em .5em 0;
  }
}
#middlePane {
  flex: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
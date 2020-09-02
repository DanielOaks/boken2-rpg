<template>
  <div id="game" class="app-page" v-if="$store.getters.appGameStarted">
    <div id="leftPane">
      <div class="topPane">
        <LocationInfo placeName="Market" regionName="Troto"/>
        <GameMap/>
        <DisplayBar :name="$t('terms.time')" value="08:02"/>
        <DisplayBar :name="$t('terms.day')" value="5"/>
        <MenuButtonsPane/>
      </div>
      <div class="sideButtonsPane">
        <MainContentPaginationButton dir="prev"/>
        <MainContentPaginationButton dir="next"/>
      </div>
    </div>
    <div id="middlePane">
      <MainContent/>
      <HoverHint/>
      <MainButtonsPane/>
    </div>
    <div id="rightPane">
      <div class="topPane">
        <h2 class="characterName" v-text="$store.getters.gameStatePlayerName.mainName"/>
        <SidebarHeader :name="$t('terms.stats')"/>
        <ProgressionBar v-for="(info, key) in $store.getters.gameDataStats" :key="key"
          :name="info.uiName || info.fullName"
          :max="$store.getters.gameStatePlayerStats[key].default"
          :value="$store.getters.gameStatePlayerStats[key].current"/>
        <SidebarHeader :name="$t('terms.attributes')" extraMargin/>
        <ProgressionBar v-for="(info, key) in $store.getters.gameDataAttributes" :key="key+'-'+info.uiName+'-'+info.fullName"
          :name="info.uiName || info.fullName"
          :max="$store.getters.gameStatePlayerAttributes[key].base + $store.getters.gameStatePlayerAttributes[key].mod"
          :value="$store.getters.gameStatePlayerAttributes[key].base + $store.getters.gameStatePlayerAttributes[key].mod"/>
        <SidebarHeader :name="$t('terms.advancement')" extraMargin/>
        <DisplayBar margin :name="$t('terms.level')" :value="$store.getters.gameStatePlayerLevel.level.toString()"/>
        <ProgressionBar :name="$t('terms.xp')" :value="$store.getters.gameStatePlayerLevel.xp" :max="$store.getters.gameStatePlayerLevel.xpToLevel"/>
        <DisplayBar margin :name="$store.getters.gameDataCurrencyName" :value="formatBigNumber($store.getters.gameStatePlayerCurrency)"/>
        <SidebarHeader :name="$t('terms.statusEffects')" extraMargin/>
      </div>
      <div class="sideButtonsPane">
        <MainButtonsPaginationButton dir="prev"/>
        <MainButtonsPaginationButton dir="next"/>
      </div>
    </div>
  </div>
</template>

<script>
import LocationInfo from '../components/TheLocationInfo.vue'
import GameMap from '../components/TheGameMap.vue'
import MenuButtonsPane from '../components/TheMenuButtonsPane.vue'
import DisplayBar from '../components/DisplayBar.vue'
import ProgressionBar from '../components/ProgressionBar.vue'
import SidebarHeader from '../components/SidebarHeader.vue'
import MainContent from '../components/TheMainContent.vue'
import HoverHint from '../components/TheHoverHint.vue'
import MainButtonsPane from '../components/TheMainButtonsPane.vue'
import MainContentPaginationButton from '../components/MainContentPaginationButton.vue'
import MainButtonsPaginationButton from '../components/MainButtonsPaginationButton.vue'

export default {
  name: 'Game',
  components: {
    LocationInfo,
    GameMap,
    MenuButtonsPane,
    DisplayBar,
    ProgressionBar,
    SidebarHeader,
    MainContent,
    HoverHint,
    MainButtonsPane,
    MainContentPaginationButton,
    MainButtonsPaginationButton,
  },
  methods: {
    // utility function...
    // feels icky putting it here, but I tried splitting it out and into a
    //  separate js file and webpack seemed to foil me? to revisit later.
    formatBigNumber(num, min) {
      // this can happen if the dataStore returns a bad value
      if (num === undefined) {
        return 'NaN';
      }
      if (min && num < min) {
        return num.toString();
      }
      if (1000 < num) {
        return `${(num/1000).toFixed(1)}K`;
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
<template>
  <div id="game" class="app-page">
    <div id="leftPane">
      <div class="topPane">
        <locationInfo placeName="Market" regionName="Troto"/>
        <gameMap/>
      </div>
      <div class="sideButtonsPane">
        <mainContentPaginationButton dir="prev"/>
        <mainContentPaginationButton dir="next"/>
      </div>
    </div>
    <div id="middlePane">
      <div id="mainContent"/>
      <div id="mainButtons"/>
    </div>
    <div id="rightPane">
      <div class="topPane">

      </div>
      <div class="sideButtonsPane">
        <mainButtonsPaginationButton dir="prev"/>
        <mainButtonsPaginationButton dir="next"/>
      </div>
    </div>
  </div>
</template>

<script>
import locationInfo from './locationInfo.vue'
import gameMap from './gameMap.vue'
import mainContentPaginationButton from './buttons/mainContentPagination.vue'
import mainButtonsPaginationButton from './buttons/mainButtonsPagination.vue'

export default {
  name: 'Game',
  components: {
    locationInfo,
    gameMap,
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
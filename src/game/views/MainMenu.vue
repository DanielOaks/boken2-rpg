<template>
  <div id="mainmenu" class="app-page"><div>
    <h1>Boken2-RPG</h1>
    <p class="tagline" v-text="$t('engine.tagline')"/>
    <a href="https://github.com/DanielOaks/boken2-rpg/">GitHub Repo</a>

    <div class="newGameCreation">
      <select name="gameSelect" id="gameSelect">
        <option value="example">UI Example</option>
        <option value="troto">Adventures of Troto</option>
      </select>
      <div style="position: relative;">
        <div class="caret"/>
      </div>
      <div class="btn">+<!-- to replace with real add icon: add new game --></div>
      <div class="btn">e<!-- to replace with real add icon: edit this game --></div>
      <div class="btn">-<!-- to replace with real bin icon: delete this game --></div>
    </div>

    <div class="startButtons">
      <div class="btn" @click="loadSavegame()" v-text="$t('mainmenu.newgame')"/>
      <div class="btn" @click="loadSavegame()" v-text="$t('mainmenu.loadgame')"/>
      <div class="btn" @click="loadSavegame()" v-text="$t('mainmenu.resume')"/>
    </div>
  </div></div>
</template>

<script>
export default {
  name: 'MainMenu',
  components: {
  },
  methods: {
    loadSavegame() {
      this.$store.commit('appHideMainMenu');
    },
  },
}
</script>

<style lang="scss">
#mainmenu {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--main-bg-color);
  color: var(--main-text-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 3em;
  }
  .tagline {
    font-style: italic;
  }
  .btn {
    padding: .5em .7em;
    background: var(--main-btn-bg-color);
    color: var(--main-btn-text-color);
    border-radius: .5em;
    cursor: pointer;
    + .btn {
      margin-left: 1em;
    }
  }
  .newGameCreation, .startButtons {
    display: flex;
    justify-content: center;
  }
  .newGameCreation {
    margin-top: 2em;
    select {
      background: var(--mainmenu-gameselect-bg-color);
      color: var(--mainmenu-gameselect-text-color);
      padding: 0 1.75em 0 .5em;
      border-radius: .5em 0 0 .5em;
    }
    .caret {
      width: 0;
      height: 0;
      border-left: .4em solid transparent;
      border-right: .4em solid transparent;
      border-top: 0.5em solid var(--mainmenu-gameselect-text-color);
      position: absolute;
      left: -1.25em;
      top: .78em;
    }
    .btn {
      padding: .2em .4em;
      margin-left: 1px;
      border-radius: 0;
      background: var(--mainmenu-gameselect-bg-color);
      color: var(--mainmenu-gameselect-text-color);
      &:last-of-type {
        border-radius: 0 .5em .5em 0;
      }
    }
  }
  .startButtons {
    margin-top: 1em;
    margin-bottom: 5vh;
  }
  a {
    font-size: .9em;
    color: #fff;
    text-decoration: none;
  }
}

</style>
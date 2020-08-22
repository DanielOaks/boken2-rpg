<template>
  <div class="mainButton" v-bind:class="{wasd: wasd}" @click="clicked()" @mouseover="hover()" @mouseleave="hoverLeave()">
    <span class="word"/>
    <span class="key"><div v-text="btn"/></span>
  </div>
</template>

<script>
export default {
  name: 'MainButton',
  props: {
    btn: String,
    wasd: Boolean,
  },
  methods: {
    clicked: function () {
      console.log('TODO: mainButton clicked', this.$props.btn);
    },
    hover: function () {
      this.$store.commit('showGameHoverHint', {name: this.$props.btn, description: 'This does something!!'});
    },
    hoverLeave: function () {
      this.$store.commit('hideGameHoverHint');
    },
  },
}
</script>

<style lang="scss">
.mainButton {
  display: flex;
  box-sizing: border-box;
  padding: 0 0.5em;
  height: 2em;
  width: calc(20% - 0.4em);
  font-size: 1.2em;
  margin-top: 0.5em;
  border-radius: 0.5em;
  text-align: center;
  text-decoration: none;
  flex-direction: row-reverse;
  cursor: default;
  color: var(--main-btn-text-color);
  background: var(--main-btn-bg-color);
  opacity: .4;
  &.active {
    cursor: pointer;
    opacity: 1;
  }
  &.wasd {
    background: var(--main-btn-wasd-bg-color);
    .key > div {
      color: var(--main-btn-wasd-bg-color);
      border-color: var(--main-btn-wasd-bg-color);
    }
  }

  .word {
    flex: auto;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 0.3em;
    user-select: none;
  }
  .key {
    width: 0;
    flex: none;
    position: absolute;
    > div {
      text-transform: uppercase;
      box-sizing: border-box;
      display: block;
      text-align: center;
      // height: 1.5em;
      width: 1.5em;
      padding-top: 0.185em;
      float: right;
      // bottom: -2em;
      bottom: -1.7em;
      right: -1.2em;
      position: relative;
      font-size: 0.65em;
      color: var(--main-btn-bg-color);
      border-radius: 1em;
      background: var(--main-bg-color);
      border: 1px solid var(--main-btn-bg-color);
    }
  }
}
</style>
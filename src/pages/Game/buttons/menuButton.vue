<template>
  <div class="menuButton" v-bind:class="{big: big}" @click="clicked()" @mouseover="hover()" @mouseleave="hoverLeave()">
    <img :src="'/assets/buttons/menuButton-' + btn + '.svg'"/>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
  props: {
    btn: String,
    big: Boolean,
  },
  methods: {
    clicked: function () {
      console.log('TODO: menuButton clicked', this.$props.btn);
      this.$store.commit('showMainMenu');
    },
    hover: function () {
      this.$store.commit('showGameHoverHint', {name: this.$t(`menuButton.${this.$props.btn}.name`), description: this.$t(`menuButton.${this.$props.btn}.description`)});
    },
    hoverLeave: function () {
      this.$store.commit('hideGameHoverHint');
    },
  },
}
</script>

<style lang="scss">
.menuButton {
  background: var(--sidebar-btn-bg-color);
  border-radius: .3em;
  color: #fff;
  text-decoration: none;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  &.big {
    grid-row: 1/3;
    grid-column: 4/end;
    border-radius: .4em;
  }
  img {
    vertical-align: middle;
  }
}
</style>
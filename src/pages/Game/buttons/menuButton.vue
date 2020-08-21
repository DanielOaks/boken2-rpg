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
    },
    hover: function () {
      console.log('TODO: show menuButton hover text');
    },
    hoverLeave: function () {
      console.log('TODO: cancel menuButton hover text');
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
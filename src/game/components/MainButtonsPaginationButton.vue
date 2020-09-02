<template>
  <a class="mainButtonsPaginationButton">
    <img :src="'/assets/buttons/mainButtonsPagination-' + dir + '.svg'" @click="move()" @mouseover="hover()" @mouseleave="hoverLeave()"/>
  </a>
</template>

<script>
export default {
  name: 'MainButtonsPaginationButton',
  props: {
    dir: String,
  },
  methods: {
    move() {
      console.log('TODO: move mainButtons in direction', this.$props.dir);
    },
    hover() {
      this.$store.commit('showGameHoverHint', {name: this.$t(`mainButtonsPagination.${this.$props.dir}.name`), description: this.$t(`mainButtonsPagination.${this.$props.dir}.description`)});
    },
    hoverLeave() {
      this.$store.commit('hideGameHoverHint');
    },
  },
}
</script>

<style lang="scss">
.mainButtonsPaginationButton {
    display: block;
    background: var(--main-btn-bg-color);
    color: var(--main-btn-text-color);
    border-radius: .5em;
    width: calc(50% - .25em);
    text-align: center;
    height: 2em;
    opacity: .4; // to match main buttons
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>
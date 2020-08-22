<template>
  <a class="mainContentPaginationButton">
    <img :src="'/assets/buttons/mainContentPagination-' + dir + '.svg'" @click="move()" @mouseover="hover()" @mouseleave="hoverLeave()"/>
  </a>
</template>

<script>
export default {
  name: 'MainContentPaginationButton',
  props: {
    dir: String,
  },
  methods: {
    move: function () {
      console.log('TODO: move mainContent in direction', this.$props.dir);
    },
    hover: function () {
      this.$store.commit('showGameHoverHint', {name: this.$t(`mainContentPagination-${this.$props.dir}-name`), description: this.$t(`mainContentPagination-${this.$props.dir}-description`)});
    },
    hoverLeave: function () {
      this.$store.commit('hideGameHoverHint');
    },
  },
}
</script>

<style lang="scss">
.mainContentPaginationButton {
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
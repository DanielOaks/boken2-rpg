<template>
  <a class="mainButtonsPagination">
    <img :src="'/assets/buttons/mainButtonsPagination-' + dir + '.svg'" @click="move()" @mouseover="hover()" @mouseleave="hoverLeave()"/>
  </a>
</template>

<script>
export default {
  name: 'mainButtonsPaginationButton',
  props: {
    dir: String,
  },
  methods: {
    move: function () {
      console.log('TODO: move mainButtons in direction', this.$props.dir);
    },
    hover: function () {
      console.log('TODO: show mainButtonsPagination hover text');
    },
    hoverLeave: function () {
      console.log('TODO: cancel mainButtonsPagination hover text');
    },
  },
}
</script>

<style lang="scss">
.mainButtonsPagination {
    display: block;
    background: var(--main-btn-bg-color);
    color: var(--main-btn-text-color);
    border-radius: .5em;
    width: calc(50% - .25em);
    text-align: center;
    height: 2em;
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>
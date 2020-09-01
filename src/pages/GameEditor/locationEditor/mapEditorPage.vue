<template>
  <div class="mapEditor">
    <div class="mainNavButtons">
      <div class="btn nav" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
      <div class="btn nav" @click="save" v-text="$t('gameEditor.regions.saveButton')"/>
      <div class="btn tool" v-for="tool in mapTools" v-bind:key="tool" @click="changeTool" :data-tool="tool" v-bind:class="{active: mapTool === tool}" v-text="$t('gameEditor.mapTool.'+tool)"/>
    </div>
    <div class="mainPropertyEditor"><div>
      <h2>Map Properties</h2>
      <p>aaaaa1</p>
      <p>aaaaa2</p>
      <h2>Tile Properties</h2>
      <p>aaaaa1</p>
      <p>aaaaa2</p>
      <p>aaaaa3</p>
      <p>aaaaa4</p>
    </div></div>
    <mapCanvas ref="canvas"/>
  </div>
</template>

<script>
import mapCanvas from './mapCanvas.vue'

export default {
  name: 'MapEditorPage',
  components: {
    mapCanvas
  },
  mounted() {
    // generate tiles
    const tileString = 
`X  X     XX XXXX
XXCXX X XXXXX  XXXCX   XXX
   XXXXX   XXX X   XXXXX X
  XXX   XXXX XXX  XXXX  XX
 XX XXXXX  XCX  XXX  XX
  X     XXXX     XX
  X        XXX  XXXX
 XXX            CCXX
 XXX
`;
    this.$refs.canvas.tiles = {}
    let id = 1;
    tileString.split('\n').forEach((line, y) => {
      this.$refs.canvas.tiles[y] = {}
      line.split('').forEach((char, x) => {
        if (char !== ' ') {
          // console.log('tile at', x, y);
          const tile = {id};
          id += 1;
          if (char === 'C') {
            tile.text = 'char';
          }
          this.$refs.canvas.tiles[y][x] = tile;
        }
      });
    });

    // set bg
    this.$refs.canvas.bgs = this.bgs;

    // set colours
    this.$refs.canvas.colors = this.colors;

    // focus on specific square
    this.$refs.canvas.focusOn(10,5);

    this.$refs.canvas.update();
  },
  data() {
    return {
      mapTools: [
        'moveMap',
        'pointer',
      ],
      mapTool: 'moveMap',
      colors: {
        bg: '#559e94',
        tileBg: '#41877e',
        tileText: '#eeeeee',
        tileSurroundedBg: '#4b9289', // when all four sides are surrounded
      },
      bgs: [
        {
          color: '#4b9289',
          x: 8,
          y: 3,
          width: 4,
          height: 3,
        },
        {
          color: '#4098a0',
          x: 12,
          y: 0,
          width: 4,
          height: 3,
          borderRadius: 6,
        },
        {
          color: '#4098a0',
          x: 13,
          y: 2,
          width: 3,
          height: 2,
        },
      ],
    }
  },
  methods: {
    goBack() {
      this.$store.commit('showRegionTreeEditor');
    },
    save() {
      console.log('TODO: save map');
    },
    changeTool(event) {
      this.mapTool = event.target.dataset.tool;
      this.$refs.canvas.setTool(event.target.dataset.tool);
    },
  }
}
</script>

<style lang="scss">
.mapEditor {
  position: relative;
  height: 100%;
  color: var(--map-editor-text-color);
  background: var(--map-bg-color);
  .mainNavButtons {
    position: absolute;
    bottom: .5em;
    left: .5em;
    display: flex;
    .btn {
      padding: .5em 1em;
      background: var(--map-tile-bg-color);
      border-radius: .5em;
      cursor: pointer;
      + .btn {
        margin-left: .5em;
      }
      &.nav + .btn.tool {
        margin-left: 2em;
      }
      &.tool.active {
        background: var(--map-tile-bg-active-color);
      }
    }
  }
  .mainPropertyEditor {
    position: absolute;
    top: 0;
    right: 0;
    width: 20em;
    resize: horizontal;
    overflow-x: hidden;
    direction: rtl; // so resize drag handle appears on left
    background: var(--map-tile-bg-color);
    padding: .5em 1em;
    border-bottom-left-radius: .5em;
    > div {
      direction: ltr;
    }
  }
}
</style>
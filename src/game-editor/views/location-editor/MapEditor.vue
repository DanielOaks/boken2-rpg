<template>
  <div class="mapEditor">
    <div class="mainNavButtons">
      <div class="btn nav" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
      <div class="btn nav" v-if="false" @click="save" v-text="$t('gameEditor.regions.saveButton')"/>
      <div class="btn tool" v-for="tool in mapTools" v-bind:key="tool" @click="changeTool" :data-tool="tool" v-bind:class="{active: mapTool === tool}" v-text="$t('gameEditor.mapTool.'+tool)"/>
    </div>
    <div class="mainPropertyEditor"><div>
      <h1>Map Properties</h1>
      <h2>Name</h2>
      <input v-model="mapName"/>
      <h1>Tile Properties</h1>
      <p>aaaaa1</p>
      <p>aaaaa2</p>
      <p>aaaaa3</p>
      <p>aaaaa4</p>
    </div></div>
    <MapCanvas ref="canvas" :tiles="tiles" :bgs="bgs" :colors="colors"/>
  </div>
</template>

<script>
import MapCanvas from '../../../components/MapCanvas.vue'

export default {
  name: 'MapEditor',
  components: {
    MapCanvas
  },
  mounted() {
    // generate tiles

    // set bg
    this.$refs.canvas.bgs = this.bgs;

    // set colours
    this.$refs.canvas.colors = this.colors;

    // focus on specific square
    this.$refs.canvas.focusOn(10,5);
  },
  computed: {
    bgs () {
      return [
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
      ];
    },
    tiles () {
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
      const tiles = {}
      let id = 1;
      tileString.split('\n').forEach((line, y) => {
        tiles[y] = {}
        line.split('').forEach((char, x) => {
          if (char !== ' ') {
            // console.log('tile at', x, y);
            const tile = {id};
            id += 1;
            if (char === 'C') {
              tile.text = 'char';
            }
            tiles[y][x] = tile;
          }
        });
      });
      return tiles;
    },
    mapName: {
      get () {
        return this.$store.getters.locationEditorCurrentMap.name;
      },
      set (value) {
        this.$store.commit('gameDataChangeLocationName', {
          id: this.$store.getters.locationEditorState.id,
          name: value,
        });
      },
    },
  },
  data() {
    return {
      mapTools: [
        'pointer',
        'moveMap',
      ],
      mapTool: 'moveMap',
      colors: {
        bg: '#559e94',
        tileBg: '#41877e',
        tileText: '#eeeeee',
        tileSurroundedBg: '#4b9289', // when all four sides are surrounded
      },
    };
  },
  methods: {
    goBack() {
      this.$store.commit('showTreeEditor');
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
        background: var(--map-tile-bg-alt-color);
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
    h1 {
      font-size: 1.6em;
      &:not(:first-child) {
        margin-top: .3em;
      }
    }
    h2 {
      font-size: 1.2em;
      font-weight: 600;
    }
    input {
      background: #fff;
      color: #222;
      padding: .2em .5em;
      width: 100%;
      border-radius: .4em;
    }
  }
}
</style>
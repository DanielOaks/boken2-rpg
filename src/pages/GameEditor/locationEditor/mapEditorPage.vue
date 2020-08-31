<template>
  <div class="mapEditor">
    <div class="mainNavButtons">
      <div class="btn" @click="goBack" v-text="$t('gameEditor.regions.goBackButton')"/>
      <div class="btn" @click="save" v-text="$t('gameEditor.regions.saveButton')"/>
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
    <canvas ref="canvas" @mousemove="mousemove" @mousedown="mousedown" @mouseup="mouseup" @mouseenter="mouseenter" @mouseleave="mouseleave"/>
  </div>
</template>

<script>
// canvas high-DPI setup function, from https://www.html5rocks.com/en/tutorials/canvas/hidpi/
function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  let dpr = window.devicePixelRatio || 1;
  dpr *= 1 //TODO(dan): maybe scale up a bit so the edges don't look so dodgy
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  const c = canvas;
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  c.style.width = `${rect.width}px`

  const ctx = c.getContext('2d', {
    antialias: true
  });
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

// canvas utility function, from the Mozilla MDN
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

export default {
  name: 'MapEditorPage',
  mounted() {
    // generate tiles
    const tileString = 
`
X  X     XX XXXX
XXXXX X XXXXX  XXXXX   XXX
   XXXXX   XXX X   XXXXX X
  XXX   XXXX XXX  XXXX  XX
 XX XXXXX  XXX  XXX  XX
  X     XXXX     XX
  X        XXX  XXXX
 XXX            XXXX
 XXX
`;
    this.tiles = {}
    tileString.split('\n').forEach((line, y) => {
      this.tiles[y] = {}
      line.split('').forEach((char, x) => {
        if (char !== ' ') {
          // console.log('tile at', x, y);
          this.tiles[y][x] = {};
        }
      });
    });

    this.updateCanvas();
    window.addEventListener('resize', this.updateCanvas);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateCanvas);
  },
  data() {
    return {
      mouseIsDown: false,
      mouseLastPos: {
        x: 0,
        y: 0,
      },
      canvasPosOffset: {
        x: 0,
        y: 0,
      },
      ctx: undefined,
      canvasSize: {
        width: 0,
        height: 0,
      },
      colors: {
        bg: '#559e94',
        tileBg: '#41877e',
      },
    }
  },
  methods: {
    goBack() {
      this.$store.commit('showRegionTreeEditor');
    },
    save() {
      console.log('TODO: save map');
    },

    // canvas
    updateCanvas() {
      const pageSize = this.$el.getBoundingClientRect();
      this.$refs.canvas.width = pageSize.width
      this.$refs.canvas.height = pageSize.height
      this.canvasSize = {
        width: pageSize.width,
        height: pageSize.height,
      }
      this.ctx = setupCanvas(this.$refs.canvas);
      this.redrawCanvas();
    },
    redrawCanvas() {
      // save non-translated state
      this.ctx.save()

      // draw this in non-translated space so it covers all the screen without weird math
      this.ctx.fillStyle = this.colors.bg;
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);

      // for our purposes, 0,0 is center of the canvas
      this.ctx.translate(this.canvasSize.width/2 + this.canvasPosOffset.x, this.canvasSize.height/2 + this.canvasPosOffset.y)

      // draw our actual map here!!!
      this.ctx.fillStyle = this.colors.tileBg;
      Object.keys(this.tiles).forEach((y,iy) => {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        Object.keys(this.tiles[y]).forEach((x,ix) => {
          roundedRect(this.ctx, x*72, y*72, 50, 50, 13);
          if (this.tiles[y][x-1]) {
            roundedRect(this.ctx, (x)*72-18, y*72+22, 14, 7, 3);
          }
          if (this.tiles[y-1] && this.tiles[y-1][x]) {
            roundedRect(this.ctx, x*72+22, (y)*72-18, 7, 14, 3);
          }
        });
      });

      // restore non-translated state
      this.ctx.restore();

      // draw extra canvas UI elements that always appear in the same place here
    },
    mousedown(event) {
      this.mouseLastPos = {
        x: event.x,
        y: event.y,
      };
      this.mouseIsDown = true;
    },
    mouseup() {
      this.mouseIsDown = false;
    },
    mouseenter(event) {
      this.mouseLastPos = {
        x: event.x,
        y: event.y,
      };
      // update whether primary mouse button is down
      // eslint-disable-next-line no-bitwise
      this.mouseIsDown = event.buttons & 1;
    },
    mouseleave() {
      //HERE ... think more about what makes sense and is easiest to do here.
      // we could just kill the mouseIsDown but that feels janky while using it, since
      // accidentally hovering off the canvas and back on is really common.
    },
    mousemove(event) {
      if (!this.mouseIsDown) {
        return;
      }
      this.canvasPosOffset.x += event.x - this.mouseLastPos.x;
      this.canvasPosOffset.y += event.y - this.mouseLastPos.y;
      this.mouseLastPos = {
        x: event.x,
        y: event.y,
      };
      this.redrawCanvas();
      // console.log(this.canvasPosOffset.x, this.canvasPosOffset.y);
    }
  }
}
</script>

<style lang="scss">
.mapEditor {
  position: relative;
  height: 100%;
  color: var(--map-editor-text-color);
  background: var(--map-bg-color);
  canvas {
    width: 100%;
    height: 100%;
  }
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
<template>
  <canvas ref="canvas" @mousemove="mousemove" @mousedown="mousedown" @mouseup="mouseup" @mouseenter="mouseenter" @mouseleave="mouseleave" @wheel="wheel"/>
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
  name: 'MapCanvas',
  mounted() {
    this.update();
    window.addEventListener('resize', this.update);
  },
  destroyed() {
    window.removeEventListener('resize', this.update);
  },
  computed: {
    scaleDragModifier() {
      // the scale here gets smaller as we get more zoomed in

      // manual values that were found to be correct
      // scale:  .5  == scaleMod: 2
      // scale: 1    == scaleMod: 1
      // scale: 1.1  == scaleMod:  .909
      // scale: 1.2  == scaleMod:  .833
      // scale: 1.3  == scaleMod:  .769
      // scale: 1.4  == scaleMod:  .714
      // scale: 1.5  == scaleMod:  .666
      // scale: 2    == scaleMod:  .5

      // below fn is from curve-fitting site, plugging above values in and using a power curve
      return 0.9997795*this.scale**-1.000343
    }
  },
  data() {
    return {
      scale: 1,
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
        bg: '#222',
        tileBg: '#777',
        tileSurroundedBg: '#444', // when all four sides are surrounded
      },
      tiles: {},
      bgs: [],
      currentHoveredTile: {},
    }
  },
  methods: {
    focusOn(x, y) {
      // this.canvasPosOffset = {
      //   x: -25-72*x,
      //   y: -25-72*y,
      // };
      this.redraw();
    },
    update() {
      const pageSize = this.$el.parentNode.getBoundingClientRect();
      this.$el.width = pageSize.width
      this.$el.height = pageSize.height
      this.canvasSize = {
        width: pageSize.width,
        height: pageSize.height,
      }
      this.ctx = setupCanvas(this.$el);
      this.redraw();
    },
    redraw() {
      // save non-translated state
      this.ctx.save()

      // draw this in non-translated space so it covers all the screen without weird math
      this.ctx.fillStyle = this.colors.bg;
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);

      // translations
      this.ctx.scale(this.scale, this.scale);
      this.ctx.translate(this.canvasPosOffset.x, this.canvasPosOffset.y);
      // this.canvasPosOffset = {
      //   x: 0,
      //   y: 0,
      // }
      // this.ctx.translate(this.canvasSize.width/2 + this.canvasPosOffset.x, this.canvasSize.height/2 + this.canvasPosOffset.y)

      // bg elements
      this.ctx.fillStyle = this.colors.tileSurroundedBg;
      Object.keys(this.tiles).forEach((y,iy) => {
        Object.keys(this.tiles[y]).forEach((x,ix) => {
          if (this.tiles[y][x-1] && this.tiles[y-1] && this.tiles[y-1][x] && this.tiles[y-1][x-1]) {
            this.ctx.fillRect((x-1)*72+25, (y-1)*72+25, 72, 72);
          }
        });
      });
      Object.keys(this.bgs).forEach((i) => {
        const bg = this.bgs[i];
        this.ctx.fillStyle = bg.color;
        const borderRadius = bg.borderRadius || 3;
        roundedRect(this.ctx, bg.x*72+25, bg.y*72+25, bg.width*72-71, bg.height*72-71, borderRadius);
      });

      // draw our actual map here!!!
      this.ctx.fillStyle = this.colors.tileBg;
      Object.keys(this.tiles).forEach((y,iy) => {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        Object.keys(this.tiles[y]).forEach((x,ix) => {
          if (this.tiles[y][x] && this.tiles[y][x].bgColor) {
            this.ctx.fillStyle = this.tiles[y][x].bgColor;
          }
          roundedRect(this.ctx, x*72, y*72, 50, 50, 13);
          this.ctx.fillStyle = this.colors.tileBg;
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

      // draw extra UI elements that always appear in the same place here
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
        const x = ((event.x - this.canvasPosOffset.x*this.scale)/72)/this.scale;
        const y = ((event.y - this.canvasPosOffset.y*this.scale)/72)/this.scale;
        if ((x%1 < .7) && (y%1 < .7)) {
          const tile = {
            x: Math.floor(x),
            y: Math.floor(y),
          }
          if (this.currentHoveredTile.x !== tile.x || this.currentHoveredTile.y !== tile.y) {
            if (this.currentHoveredTile.x !== undefined && this.currentHoveredTile.y !== undefined) {
              // while scrolling, we changed hover tiles.
              const tempTile = this.currentHoveredTile;
              this.currentHoveredTile = {};
              this.onTileHoverEnd({
                tile: tempTile,
              });
            }
            this.currentHoveredTile = tile;
            this.onTileHoverStart({
              tile,
            });
            this.redraw();
          }
        } else if (this.currentHoveredTile.x !== undefined || this.currentHoveredTile.y !== undefined) {
          const oldTile = this.currentHoveredTile;
          this.currentHoveredTile = {};
          this.onTileHoverEnd({
            tile: oldTile,
          });
          this.redraw();
        }
        return;
      }
      this.canvasPosOffset.x += (event.x - this.mouseLastPos.x)*this.scaleDragModifier;
      this.canvasPosOffset.y += (event.y - this.mouseLastPos.y)*this.scaleDragModifier;
      this.mouseLastPos = {
        x: event.x,
        y: event.y,
      };
      this.redraw();
    },
    wheel(event) {
      if (this.mouseIsDown) {
        return;
      }
      this.oldScale = this.scale;
      this.scale = Math.max(.5, Math.min(5, this.scale - (event.deltaY/1000)));
      this.redraw();
      // this mousemove stops issues where (because of a wheel scroll) we accidentally hover
      //  over a different tile and we don't fire an onTileHoverEnd() for the old one.
      this.mousemove({
        x: event.x,
        y: event.y
      });
    },

    // events
    onTileHoverStart(event) {
      const t = event.tile;
      if (this.tiles[t.y] && this.tiles[t.y][t.x]) {
        console.log('hovering over tile', t.x, t.y);
        this.tiles[t.y][t.x].bgColor = '#ee2244';
      }
    },
    onTileHoverEnd(event) {
      const t = event.tile;
      if (this.tiles[t.y] && this.tiles[t.y][t.x]) {
        console.log('              left', t.x, t.y);
        delete this.tiles[t.y][t.x].bgColor;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
canvas {
width: 100% !important;
height: 100% !important;
}
</style>
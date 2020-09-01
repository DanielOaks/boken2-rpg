<template>
  <canvas ref="canvas" @mousemove="mousemove" @mousedown="mousedown" @mouseup="mouseup" @mouseenter="mouseenter" @mouseleave="mouseleave" @wheel="wheel"/>
</template>

<script>
// canvas high-DPI setup function, from https://www.html5rocks.com/en/tutorials/canvas/hidpi/
function setupCanvas(canvas, hqRender) {
  // Get the device pixel ratio, falling back to 1.
  let dpr = window.devicePixelRatio || 1;
  dpr *= hqRender ? 2 : 1.5;
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
    },
    hoveredTile() {
      if (this.tiles[this.hoveredTilePos.y]) {
        return this.tiles[this.hoveredTilePos.y][this.hoveredTilePos.x]
      }
      return undefined
    },
  },
  data() {
    return {
      scale: 1,
      mouseIsDown: false,
      mouseStartPos: {
        x: 0,
        y: 0,
      },
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
      hoveredTilePos: {},

      // optional tweaks~
      hqRender: false,
      minZoom: .5,
      maxZoom: 5,
      maxClickRoam: {
        x: 4,
        y: 4,
      },

      // this is data provided by the user
      tiles: {},
      bgs: [],
      colors: {
        bg: '#222',
        tileBg: '#777',
        tileText: '#eee',
        tileSurroundedBg: '#444', // when all four sides are surrounded
      },
    }
  },
  methods: {
    focusOn(x, y) {
      const pageSize = this.$el.parentNode.getBoundingClientRect();
      this.canvasPosOffset = {
        x: (pageSize.width/2)*this.scaleDragModifier-(25+72*x),
        y: (pageSize.height/2)*this.scaleDragModifier-(25+72*y),
      };
      this.redraw();
    },
    update() {
      const pageSize = this.$el.parentNode.getBoundingClientRect();
      this.canvasSize = {
        width: pageSize.width,
        height: pageSize.height,
      }
      this.ctx = setupCanvas(this.$el, this.hqRender);
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

      // bg elements
      this.ctx.fillStyle = this.colors.tileSurroundedBg;
      Object.keys(this.tiles).forEach((y) => {
        Object.keys(this.tiles[y]).forEach((x) => {
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
      Object.keys(this.tiles).forEach((y) => {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        Object.keys(this.tiles[y]).forEach((x) => {
          const tile = this.tiles[y][x];

          // tile
          if (tile && tile.bgColor) {
            this.ctx.fillStyle = tile.bgColor;
          }
          roundedRect(this.ctx, x*72, y*72, 50, 50, 13);

          // text on tile
          if (tile && tile.text) {
            this.ctx.fillStyle = this.colors.tileText;
            this.ctx.font = '13px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(tile.text, x*72+25, y*72+25);
          }

          // links to other tiles
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
      this.mouseStartPos = this.mouseLastPos;
      this.mouseIsDown = true;

      // deselect all text, since weird things can happen if text is selected
      //  and we try to drag the map around
      document.getSelection().removeAllRanges();
    },
    mouseup() {
      this.mouseIsDown = false;
      if (Math.abs(this.mouseLastPos.x - this.mouseStartPos.x) < this.maxClickRoam.x &&
          Math.abs(this.mouseLastPos.y - this.mouseStartPos.y) < this.maxClickRoam.y) {
        const event = {
          tilePos: this.hoveredTilePos,
        };
        if (this.hoveredTile) {
          event.tile = this.hoveredTile;
        }
        this.onClick(event)
      }
    },
    mouseenter(event) {
      this.mouseLastPos = {
        x: event.x,
        y: event.y,
      };
      // if mouse btn was down, the pointer exited canvas, and then came back onto the
      //  canvas with mouse button up, fix that.
      // eslint-disable-next-line no-bitwise
      if (this.mouseIsDown && !(event.buttons & 1)) {
        this.mouseup();
      }
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
          if (this.hoveredTilePos.x !== tile.x || this.hoveredTilePos.y !== tile.y) {
            if (this.hoveredTilePos.x !== undefined && this.hoveredTilePos.y !== undefined) {
              // while scrolling, we changed hover tiles.
              const tempTilePos = this.hoveredTilePos;
              const tempTile = this.hoveredTile;
              this.hoveredTilePos = {};
              this.onTileHoverEnd({
                tile: tempTile,
                tilePos: tempTilePos,
              });
            }
            this.hoveredTilePos = tile;
            this.onTileHoverStart({
              tile: this.hoveredTile,
              tilePos: tile,
            });
            this.redraw();
          }
        } else if (this.hoveredTilePos.x !== undefined || this.hoveredTilePos.y !== undefined) {
          const oldTile = this.hoveredTile;
          const oldTilePos = this.hoveredTilePos;
          this.hoveredTilePos = {};
          this.onTileHoverEnd({
            tile: oldTile,
            tilePos: oldTilePos,
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
      const oldScale = this.scale;
      const oldScaleDragModifier = this.scaleDragModifier;
      this.scale = Math.max(this.minZoom, Math.min(this.maxZoom, this.scale - (event.deltaY/1000)));

      // this centres the zooming, rather than zooming from the top-left of the lap (tile 0,0)
      if (oldScale !== this.scale) {
        const pageSize = this.$el.parentNode.getBoundingClientRect();
        this.canvasPosOffset = {
          x: this.canvasPosOffset.x - (pageSize.width/2)*oldScaleDragModifier + (pageSize.width/2)*this.scaleDragModifier,
          y: this.canvasPosOffset.y - (pageSize.height/2)*oldScaleDragModifier + (pageSize.height/2)*this.scaleDragModifier,
        }
      }
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
      const t = event.tilePos;
      if (this.tiles[t.y] && this.tiles[t.y][t.x]) {
        console.log('hovering over tile', t.x, t.y);
        // this.tiles[t.y][t.x].bgColor = '#cc4057';
      }
    },
    onTileHoverEnd(event) {
      const t = event.tilePos;
      if (this.tiles[t.y] && this.tiles[t.y][t.x]) {
        console.log('              left', t.x, t.y);
        // delete this.tiles[t.y][t.x].bgColor;
      }
    },
    onClick(event) {
      if (event.tile) {
        console.log('clicked on', event.tilePos.x, event.tilePos.y, event.tile);
        const t = event.tilePos;
        if (event.tile.bgColor) {
          delete this.tiles[t.y][t.x].bgColor;
        } else {
          this.tiles[t.y][t.x].bgColor = '#cc4057';
        }
        this.redraw();
      } else {
        console.log('no tile at', event.tilePos.x, event.tilePos.y);
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
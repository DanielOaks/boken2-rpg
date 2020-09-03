<template>
  <component :is="'style'">
    :root {
      --mainmenu-gameselect-bg-color: {{ c.mainMenu.gameSelect.bg }};
      --mainmenu-gameselect-text-color: {{ c.mainMenu.gameSelect.text }};

      --main-bg-color: {{ c.game.bg }};
      --main-text-color: {{ c.game.text }};

      --main-btn-bg-color: {{ c.game.buttons.bg }};
      --main-btn-bg-wasd-color: {{ c.game.buttons.bgWasd }};
      --main-btn-text-color: {{ c.game.buttons.text }};

      --sidebar-text-color: {{ c.game.sidebar.text }};
      --sidebar-bg-color: {{ c.game.sidebar.bg }};
      --sidebar-bar-bg-color: {{ c.game.sidebar.bars.bg }};
      --sidebar-bar-bg-color-fill: {{ c.game.sidebar.bars.bgFilled }};
      --sidebar-bar-text-color: {{ c.game.sidebar.bars.text }};
      --sidebar-btn-bg-color: {{ c.game.sidebar.buttons.bg }};
      --sidebar-btn-text-color: {{ c.game.sidebar.buttons.text }};
      --sidebar-location-bg-color: {{ c.game.sidebar.location.bg }};
      --sidebar-location-text-color: {{ c.game.sidebar.location.text }};
      --sidebar-hr-color: {{ c.game.sidebar.hr }};

      --map-bg-color: {{ c.game.map.bg }};
      --map-tile-bg-color: {{ c.game.map.tile.bg }};
      --map-tile-bg-alt-color: {{ c.game.map.tile.bgAlt }};
      --map-tile-bg-color-error: {{ c.game.map.tile.bgError }};
      --map-tile-text-color: {{ c.game.map.tile.text }};
      --map-editor-text-color: {{ c.game.map.tile.text }};

      --editor-bg-color: {{ c.editor.bg }};
      --editor-bg-2-color: {{ c.editor.bgPage }};
      --editor-text-color: {{ c.editor.text }};
      --editor-shadow-color: {{ c.editor.shadow }};
      --editor-header-shadow-color: {{ c.editor.headerShadow }};
      --editor-btn-bg-color: {{ c.editor.buttons.bg }};
      --editor-btn-text-color: {{ c.editor.buttons.text }};
      --editor-btn-shadow-color: {{ c.editor.buttons.shadow }};
      --editor-bar-bg-color: {{ c.editor.tabBar.bgBar }};
      --editor-bar-tab-bg-color: {{ c.editor.tabBar.bgTab }};
      --editor-bar-text-color: {{ c.editor.tabBar.text }};
    }
  </component>
</template>

<script>
export default {
  name: 'CssVars',
  computed: {
    c() {
      return this.$store.getters.color;
    },
  },
}
</script>
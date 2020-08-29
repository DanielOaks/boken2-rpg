<template>
  <div class="regionEditorPage">
    <div class="contained">
      <h1 v-text="$t('gameEditor.tab.regions')"/>
      <div class="settingsMenu">
        <div>
          <div class="btnsep">
            <button class="btn" @click="addRootRegion" v-text="$t('gameEditor.regions.createRegionButton')"/>
            <button class="btn" @click="toggleIdNames" v-text="showId ? $t('gameEditor.regions.showNamesButton') : $t('gameEditor.regions.showIDsButton')"/>
          </div>
          <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="data"
            default-tree-node-name="New region"
            default-leaf-node-name="New map"
            v-bind:default-expanded="false"
          >
            <template v-slot:leafNameDisplay="slotProps">
              <span>
                {{ showId ? String(slotProps.model.id).split('/').slice(-1)[0] : slotProps.model.name }}
              </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><span class="btn" v-text="'🌲'"/></span>
            <span class="icon" slot="addLeafNodeIcon"><span class="btn" v-text="'🍃'"/></span>
            <span class="icon" slot="editNodeIcon"><span class="btn" v-text="$t('gameEditor.regions.changeNameButton')"/></span>
            <span class="icon" slot="delNodeIcon"><span class="btn" v-text="$t('gameEditor.regions.deleteButton')"/></span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
          </vue-tree-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tree } from 'vue-tree-list'

export default {
  name: 'RegionTreePage',
  computed: {
    data() {
      return new Tree(this.$store.getters.gameDataRegionsInTreeFormat);
    },
  },
  data() {
    return {
      newTree: {},
      showId: true,
    }
  },
  methods: {
    toggleIdNames() {
      this.showId = !this.showId;
    },

    onDel(node) {
      this.$store.commit('gameDataDeleteRegionOrMap', node.id.split('/'));
    },

    onChangeName(params) {
      console.log('name changed:', params)
    },

    onAddNode(params) {
      const parentId = params.parent.id;
      if (params.isLeaf) {
        this.$store.commit('gameDataCreateMap', {
          parent: parentId.split('/'),
          name: 'New Map',
        });
      } else {
        this.$store.commit('gameDataCreateRegion', {
          parent: parentId.split('/'),
          name: 'New Region',
        });
      }
    },

    onClick(params) {
      if (params.isLeaf) {
        this.$store.commit('showMapEditor', params.id);
        return
      }
      this.$store.commit('showRegionEditor', params.id);
    },

    addRootRegion() {
      this.$store.commit('gameDataCreateRegion', {
        name: 'New Region',
      });
    },
  }
}
</script>

<style lang="scss">
.regionEditorPage {
  text-align: center;
  overflow-y: auto;
  padding: .5em 0 1em;
  .contained {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .settingsMenu {
    background: var(--editor-bg-color);
    color: var(--editor-text-color);
    width: 50em;
    max-width: calc(100% - 2em);
    margin: 0 auto;
    text-align: left;
    border-radius: 1em;
    padding: .8em 1.3em 1.2em;
    box-shadow: 0 1px var(--editor-shadow-color);
  }
  h1 {
    margin-bottom: .2em;
    text-shadow: 0 1px var(--editor-header-shadow-color);
  }
  .btnsep {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    color: var(--editor-btn-text-color);
    background: var(--editor-btn-bg-color);
    padding: .2em .6em;
    border-radius: .5em;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 1px var(--editor-btn-shadow-color);
    margin-bottom: .5em;
  }
  .vtl .btn {
    letter-spacing: 0; // tree sets this to 1px on elements it contains
  }
  .vtl span + span .btn {
    margin-left: .5em;
  }
}
</style>
<template>
  <div class="gameEditorPage regions hidden">
    <div class="contained">
      <h1 v-text="$t('gameEditor.tab.regions')"/>
      <div class="settingsMenu">
        <div>
          <button class="btn" @click="addNode" v-text="$t('gameEditor.regions.createRegionButton')"/>
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
                {{ slotProps.model.name }}
                <!-- <span class="muted">#{{ slotProps.model.id }}</span> -->
              </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><span class="btn" v-text="'🌲'"/></span>
            <span class="icon" slot="addLeafNodeIcon"><span class="btn" v-text="'🍃'"/></span>
            <span class="icon" slot="editNodeIcon"><span class="btn" v-text="$t('gameEditor.regions.changeNameButton')"/></span>
            <span class="icon" slot="delNodeIcon"><span class="btn" v-text="$t('gameEditor.regions.deleteButton')"/></span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
          </vue-tree-list>
          <!-- <button @click="getNewTree">Get tree JSON</button>
          <pre>
            {{newTree}}
          </pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'

export default {
  name: 'SettingsPage',
  computed: {
    data() {
      return new Tree(this.$store.getters.gameDataRegionsInTreeFormat);
    },
  },
  data() {
    return {
      newTree: {},
    }
  },
  methods: {
    show: function () {
      for (const p of document.getElementsByClassName('gameEditorPage')) {
        p.classList.add('hidden');
      }
      this.$el.classList.remove('hidden');
      console.log(this.$store.getters.gameDataRegionsInTreeFormat);
      // this.data = new Tree(this.$store.getters.gameDataRegionsInTreeFormat);
    },

    onDel(node) {
      console.log(node)
      node.remove()
    },

    onChangeName(params) {
      console.log(params)
    },

    onAddNode(params) {
      console.log(params)
    },

    onClick(params) {
      console.log(params)
    },

    addNode() {
      var node = new TreeNode({ name: '', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },

    getNewTree() {
      var vm = this
      function _dfs(oldNode) {
        var newNode = {}

        for (var k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }

      vm.newTree = _dfs(vm.data)
    }
  }
}
</script>

<style lang="scss">
.gameEditorPage.regions {
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
<template>
  <div
    class="tree-node"
    :class="{ selected: isSelected }"
    @click.exact.stop="onClicked"
    @click.ctrl.stop="onCtrlClicked"
  >
    <toggle-caret-component
      v-if="children.length"
      :expanded="showChildren"
      @toggle="onToggleShowChildren"
    />
    <div class="icon inline">
      <icon-component :iconData="icon" />
    </div>
    <span class="label">{{ label }}</span>
    <ol class="children" v-if="showChildren">
      <li v-for="child in children" :key="child.id" class="child">
        <tree-node-component
          :node="child"
          :treeRoot="treeRoot"
          :parentNode="node"
        />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Actions, Mutations } from "@/store";
import { NodeIcon, TreeNode, TreeRoot } from "treedocumentmodel";
import Vue, { PropType } from "vue";
import ToggleCaretComponent from "./ToggleCaret.vue";
import IconComponent from "./Icon.vue";

export default Vue.extend({
  name: "tree-node-component",
  components: { ToggleCaretComponent, IconComponent },
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
    treeRoot: {
      type: Object as PropType<TreeRoot>,
      required: true,
    },
    parentNode: {
      type: Object as PropType<TreeNode>,
      required: false,
    },
  },
  computed: {
    label(): string {
      return this.node.name ?? "<no name>";
    },
    icon(): NodeIcon | undefined {
      const iconOverride = this.node.iconOverride;
      if (iconOverride) {
        if (typeof iconOverride === "string") {
          return { icons: [iconOverride] };
        }
        return iconOverride;
      }

      const type = this.node.type;
      const iconConfig = this.treeRoot.icons?.icons;

      if (iconConfig) {
        const icon = iconConfig[type];
        if (typeof icon === "string") {
          return { icons: [icon] };
        }
        return icon;
      }

      return undefined;
    },
    children(): TreeNode[] {
      return this.node.children;
    },
    showChildren(): boolean {
      const hasChildren = this.node.children.length > 0;
      const collapsed = this.node.editorState?.collapsed ?? false;
      return hasChildren && !collapsed;
    },
    isSelected(): boolean {
      return this.$store.state.selectedNodes.includes(this.node);
    },
  },
  methods: {
    onToggleShowChildren(visible: boolean) {
      // Options here:
      // - use vuex store to mutate/action where you toggle state
      //  - locally change the state to match: lost on new tree document from extension, unless merging
      //  - send a message to the extension to change state, wait for new tree document with new state: more work, more overhead, more flexible
      // - [BAD] store state as data field: does not work; lost on editor tab re-focus.
      // - store expanded/collapsed nodes in vuex as a Set, like selected: desync issues(?), always need lookup,
      this.$store.dispatch(Actions.toggleNodeChildrenVisible, {
        node: this.node,
        visible: visible,
      });
    },
    onClicked() {
      this.$store.commit(Mutations.setSelectedNode, this.node);
    },
    onCtrlClicked() {
      this.$store.dispatch(Actions.toggleNodeSelection, this.node);
    },
  },
});
</script>

<style scoped>
.children {
  list-style-type: none;
}

.icon {
  margin-right: 0.5ex;
}

.inline {
  display: inline-block;
}

.selected.tree-node {
  background-color: lightcoral;
}

.selected > .label {
  background-color: brown;
  font-weight: bold;
}
</style>

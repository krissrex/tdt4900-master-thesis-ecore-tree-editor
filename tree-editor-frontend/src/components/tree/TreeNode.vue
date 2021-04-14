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
    <div class="icon inline"><!-- TODO icon here  -->😎</div>
    <span class="label">{{ label }}</span>
    <ol class="children" v-if="showChildren">
      <li v-for="child in children" :key="child.id" class="child">
        <tree-node-component :node="child" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Actions, Mutations } from "@/store";
import {
  editorStateFactoryInstance,
  NodeIcon,
  TreeNode,
} from "treedocumentmodel";
import Vue, { PropType } from "vue";
import ToggleCaretComponent from "./ToggleCaret.vue";

export default Vue.extend({
  name: "tree-node-component",
  components: { ToggleCaretComponent },
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  computed: {
    label(): string {
      return this.node.name ?? "<no name>";
    },
    icon(): string | NodeIcon {
      // TODO create a component for this
      return this.node.iconOverride ?? "TODO get default icon";
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
    onToggleShowChildren(show: boolean) {
      const editorState =
        this.node.editorState ??
        editorStateFactoryInstance.createDefaultEditorState();
      editorState.collapsed = !show;
      this.node.editorState = editorState;
      // Options here:
      // - use vuex store to mutate/action where you toggle state
      //  - locally change the state to match: lost on new tree document from extension, unless merging
      //  - send a message to the extension to change state, wait for new tree document with new state: more work, more overhead, more flexible
      // - [BAD] store state as data field: does not work; lost on editor tab re-focus.
      // - store expanded/collapsed nodes in vuex as a Set, like selected: desync issues(?), always need lookup,
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

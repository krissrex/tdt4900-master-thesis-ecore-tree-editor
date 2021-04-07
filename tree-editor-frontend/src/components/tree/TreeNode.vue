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
import { NodeIcon, TreeNode } from "treedocumentmodel";
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
  data() {
    return {
      showChildren: true,
    };
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
    isSelected(): boolean {
      return this.$store.state.selectedNodes.includes(this.node);
    },
  },
  methods: {
    onToggleShowChildren(show: boolean) {
      this.showChildren = show;
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

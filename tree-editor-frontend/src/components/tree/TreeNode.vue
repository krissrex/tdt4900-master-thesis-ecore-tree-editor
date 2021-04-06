<template>
  <div class="tree-node">
    <toggle-caret-component
      v-if="children.length"
      :expanded="showChildren"
      @toggle="onToggleShowChildren"
    />
    <div class="icon inline"><!-- TODO icon here  -->😎</div>
    <span>{{ label }}</span>
    <ol class="children" v-if="showChildren">
      <li v-for="child in children" :key="child.id" class="child">
        <tree-node-component :node="child" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
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
  },
  methods: {
    onToggleShowChildren(show: boolean) {
      this.showChildren = show;
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
</style>

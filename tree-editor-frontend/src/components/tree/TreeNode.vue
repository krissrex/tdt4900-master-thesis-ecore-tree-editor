<template>
  <div class="tree-node">
    <div v-if="children.length" class="expand-children inline">
      🔽<!--  TODO: add toggle -->
    </div>
    <div class="icon inline"><!-- TODO icon here  -->😎</div>
    <span>{{ label }}</span>
    <ol class="children">
      <li v-for="child in children" :key="child.id" class="child">
        <tree-node-component :node="child" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { NodeIcon, TreeNode } from "treedocumentmodel";
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "tree-node-component",
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
  },
});
</script>

<style scoped>
.children {
  /* TODO remove list style */
}

.inline {
  display: inline-block;
}
</style>

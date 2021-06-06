<template>
  <div>
    <span class="root-label">Tree root {{ root.id }}</span>
    <tree-node-component
      :node="rootNode"
      :treeRoot="root"
      :parentNode="undefined"
    />
  </div>
</template>

<script lang="ts">
import { TreeNode, TreeRoot } from "treedocumentmodel";
import Vue, { PropType } from "vue";
import TreeNodeComponent from "./TreeNode.vue";

export default Vue.extend({
  components: { TreeNodeComponent },
  props: {
    root: {
      type: Object as PropType<TreeRoot>,
      required: true,
    },
  },
  computed: {
    rootNode(): TreeNode {
      return this.root.rootNode;
    },
  },
  /** https://vuejs.org/v2/api/#provide-inject
   * https://alirezavalizade.medium.com/react-context-in-vue-d40ee145974d
   */
  provide(): object {
    return {
      treeRoot: this.root, // TODO figure out the correct thing to provide.
    };
  },
});
</script>

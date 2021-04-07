<template>
  <div class="form">
    <h2>Properties</h2>
    <div class="title">
      <span v-if="selectedNodeCount == 1"
        >Selected node: {{ selectedNodeLabel }}</span
      >
      <span v-else-if="selectedNodeCount > 1">Multiple nodes selected</span>
      <span v-else>No selection</span>
    </div>
    <form action="#">
      <fieldset>
        <legend>Test attributes</legend>
        <input type="text" name="test" id="test" value="Test" />
        <input type="text" name="testPick" id="test" />
      </fieldset>
      <button>Pick a class</button>
    </form>
  </div>
</template>

<script lang="ts">
import { TreeNode } from "treedocumentmodel";
import Vue from "vue";
export default Vue.extend({
  computed: {
    selectedNodeCount(): number {
      return this.$store.state.selectedNodes.length;
    },
    selectedNode(): TreeNode | undefined {
      if (this.selectedNodeCount == 1) {
        return this.$store.state.selectedNodes[0];
      }
      return undefined;
    },
    selectedNodeLabel(): string | undefined {
      if (this.selectedNode) {
        return this.selectedNode.name ?? "<no name>";
      } else {
        return undefined;
      }
    },
  },
});
</script>

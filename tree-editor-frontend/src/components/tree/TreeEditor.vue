<template>
  <div class="tree-editor">
    <ol class="roots">
      <li v-for="root in this.treeRoots" :key="root.id" class="root">
        <tree-root-component :root="root" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TreeRoot } from "treedocumentmodel";
import TreeRootComponent from "./TreeRoot.vue";

export default Vue.extend({
  components: { TreeRootComponent },
  computed: {
    treeRoots(): TreeRoot[] {
      return this.$store.state.treeDocument?.roots;
    },
  },
});
</script>

<style scoped>
.tree-editor {
  font-size: 1.5rem;
}

.roots {
  list-style-type: none;
}
</style>

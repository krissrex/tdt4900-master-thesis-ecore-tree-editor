<template>
  <span
    class="caret"
    :class="{ 'caret-down': expanded }"
    @click.stop="toggle"
  />
</template>

<script lang="ts">
import Vue from "vue";

export enum CaretEvents {
  TOGGLE = "toggle",
}

/**
 * A caret is the triangle that expands/hides children of a tree node.
 * Control its state with props.
 * It emits an event when it is clicked with its new wanted state.
 */
export default Vue.extend({
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggle() {
      this.$emit(CaretEvents.TOGGLE, !this.expanded);
    },
  },
});
</script>

<style scoped>
.caret {
  position: relative;
  cursor: pointer;
  user-select: none;
  display: block;
}

.caret::before {
  position: absolute;
  font-size: 20px;
  content: "\25B6";
  margin-right: 6px;
  margin-top: 2px;
  left: calc(-1 * var(--tree-node-icon-size));
  color: var(--vscode-button-foreground);
}

.caret-down::before {
  transform: rotate(90deg);
}
</style>

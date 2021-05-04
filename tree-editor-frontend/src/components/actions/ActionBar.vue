<template>
  <div class="action-bar">
    <h2>Tree editor</h2>
    <div class="actions">
      <action-button-component
        v-for="action in actions"
        :key="action.id"
        :action="action"
        @click.stop="sendAction"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Action } from "treedocumentmodel";
import ActionButtonComponent from "./ActionButton.vue";
import Vue from "vue";
import { getChildLogger } from "@/logging";
import { vscodeExtension } from "@/vscode-extension/VscodeExtension";

const log = getChildLogger("ActionBar");

export default Vue.extend({
  components: { ActionButtonComponent },
  computed: {
    availableActions(): Array<Action> {
      return (
        this.$store.state.treeDocument?.roots?.flatMap(
          (root) => root.actions.availableActions
        ) ?? []
      );
    },

    actions(): Array<Action> {
      // FIXME: How to filter out only selected root?

      const defaultActionIds =
        this.$store.state.treeDocument?.roots?.flatMap(
          (root) => root.actions.defaultActionbarActions
        ) ?? [];

      const selection = this.$store.state.selectedNodes;
      // Get a list of all action IDs that can be used for the current selection
      const nodeActions: string[][] = this.$store.state.treeDocument?.roots
        ?.map((root) => root.actions.nodeActions)
        .map((nodeAction) => {
          return selection.flatMap((selectedNode) =>
            nodeAction.get(selectedNode.type)
          );
        });
      // In case of multiple selected, only keep the intersection of all the specific action ids
      while (nodeActions.length > 1) {
        const a = nodeActions[0];
        const b = nodeActions[1];
        const intersection = new Set(a.filter((x) => b.includes(x)));
        nodeActions[0] = [...intersection];
      }
      const selectedNodesActionIntersection: string[] = nodeActions[0];

      const availableActions = this.availableActions;
      const actions =
        availableActions.filter(
          (action) =>
            defaultActionIds.includes(action.id) ||
            selectedNodesActionIntersection.includes(action.id)
        ) ?? [];

      return actions;
    },
  },

  methods: {
    sendAction({ action }: { action: Action }) {
      log.info("Sending action: %s (%s).", action.id, action.name);
      log.error("Action dispatching is not implemented!");

      vscodeExtension.triggerAction({
        action: action.id,
        targetRoot: this.$store.state.treeDocument?.roots[0], // FIXME: How to get this?
        targetNodes: this.$store.state.selectedNodes,
      });
    },
  },
});
</script>

<style scoped>
.action-bar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: row;
}
</style>

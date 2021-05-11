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
import { Action, services } from "treedocumentmodel";
import ActionButtonComponent from "./ActionButton.vue";
import Vue from "vue";
import { getChildLogger } from "@/logging";
import { vscodeExtension } from "@/vscode-extension/VscodeExtension";

const log = getChildLogger("ActionBar");

export default Vue.extend({
  components: { ActionButtonComponent },
  computed: {
    availableActions(): Array<Action> {
      const document = this.$store.state.treeDocument;
      if (document) {
        return services.getAvailableActions(document);
      }

      return [];
    },

    actions(): Array<Action> {
      const doc = this.$store.state.treeDocument;
      const selection = this.$store.state.selectedNodes;

      if (doc && selection) {
        return services.getActionsForSelection(selection, doc);
      }
      return [];
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

import { getChildLogger } from "@/logging";
import { extensionHost } from "@/main";
import { vscode } from "@/vscode-extension";
import { TreeDocument, TreeNode } from "treedocumentmodel";
import Vue from "vue";
import Vuex, { ActionContext, Plugin } from "vuex";

Vue.use(Vuex);

function getInitialState(): RootState {
  const log = getChildLogger("store:getInitialState");
  log.debug("Getting initial state");
  const oldState = vscode.getState();

  if (oldState) {
    log.debug({ oldState }, "Using old state");
    return oldState;
  }

  log.warn("Returning empty state");
  return {
    treeDocument: undefined,
    selectedNodes: [],
  };
}

const saveStateToVscode: Plugin<RootState> = (rootStore) => {
  rootStore.subscribe((_, state) => vscode.setState(state));
};

export interface RootState {
  treeDocument?: TreeDocument;
  selectedNodes: TreeNode[];
}

export enum Mutations {
  setTreeDocument = "setTreeDocument",
  setSelectedNode = "setSelectedNode",
  addNodeToSelection = "addNodeToSelection",
  removeNodeFromSelection = "removeNodeFromSelection",
}

export enum Actions {
  toggleNodeSelection = "toggleNodeSelection",
  toggleNodeChildrenVisible = "toggleNodeChildrenVisible",
}

export default new Vuex.Store({
  state: getInitialState(),
  getters: {
    isNodeSelected: (state) => (node: TreeNode) => {
      return state.selectedNodes.includes(node);
    },
  },
  mutations: {
    [Mutations.setTreeDocument](state, treeDocument: TreeDocument) {
      state.treeDocument = treeDocument;
      //FIXME: update selection if any nodes have changed id? id "should" be stable, but who knows.
    },
    [Mutations.setSelectedNode](state, node: TreeNode) {
      state.selectedNodes = [node];
    },
    [Mutations.addNodeToSelection](state, node: TreeNode) {
      state.selectedNodes.push(node);
    },
    [Mutations.removeNodeFromSelection](state, node: TreeNode) {
      const index = state.selectedNodes.indexOf(node);
      if (index !== -1) {
        state.selectedNodes.splice(index, 1);
      }
    },
  },
  actions: {
    [Actions.toggleNodeSelection](context, node: TreeNode) {
      if (context.getters.isNodeSelected(node)) {
        context.commit(Mutations.removeNodeFromSelection, node);
      } else {
        context.commit(Mutations.addNodeToSelection, node);
      }
    },
    [Actions.toggleNodeChildrenVisible](
      context,
      { node, visible }: { node: TreeNode; visible: boolean }
    ) {
      extensionHost.setNodeChildrenVisibility(node.id, visible);
    },
  },
  modules: {},
  plugins: [saveStateToVscode],
});

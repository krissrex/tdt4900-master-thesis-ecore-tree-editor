import Vue from "vue";
import Vuex, { Plugin } from "vuex";
import { TreeDocument } from "treedocumentmodel/TreeDocument";
import { vscode } from "@/vscode/";
import { mockVscodeApi } from "@/vscode/mockVscode";

Vue.use(Vuex);

function getInitialState(): RootState {
   const oldState = vscode.getState();

  if (oldState) {
    return oldState;
  }

  return {
    treeDocument: undefined,
  };
}

const saveStateToVscode: Plugin<RootState> = (rootStore) => {
  rootStore.subscribe((_, state) => vscode.setState(state));
};

export interface RootState {
  treeDocument?: TreeDocument;
}

export default new Vuex.Store({
  state: getInitialState(),
  mutations: {},
  actions: {},
  modules: {},
  plugins: [saveStateToVscode],
});

import { getChildLogger } from "@/logging";
import { vscode } from "@/vscode/";
import { TreeDocument } from "treedocumentmodel";
import Vue from "vue";
import Vuex, { Plugin } from "vuex";

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

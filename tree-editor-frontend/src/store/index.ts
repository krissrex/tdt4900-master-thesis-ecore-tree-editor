import Vue from "vue";
import Vuex, { Plugin } from "vuex";
import { TreeDocument } from "treedocumentmodel/TreeDocument";
import { TreedocumentmodelFactoryImpl } from "treedocumentmodel/TreedocumentmodelFactoryImpl";
import { vscode } from "@/vscode/";

Vue.use(Vuex);


function getInitialState(): RootState {
  const oldState = vscode.getState();

  if (oldState) {
    return oldState;
  }

  return {
    treeDocument: TreedocumentmodelFactoryImpl.eINSTANCE.createTreeDocument()
  };
}

const saveStateToVscode: Plugin<RootState> = rootStore => {
  rootStore.subscribe((_, state) => vscode.setState(state));
};

export interface RootState {
  treeDocument: TreeDocument;
}


export default new Vuex.Store({
  state: getInitialState(),
  mutations: {},
  actions: {},
  modules: {},
  plugins: [saveStateToVscode]
});

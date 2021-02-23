import { createStore, Plugin } from "vuex";
import { TreeDocument } from "treedocumentmodel/TreeDocument";
import { TreedocumentmodelFactoryImpl } from "treedocumentmodel/src/TreedocumentmodelFactoryImpl";
import { vscode } from "@/vscode/";

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

const store = createStore({
  state: getInitialState(),
  mutations: {},
  actions: {},
  modules: {},
  plugins: [saveStateToVscode]
});

export default store;

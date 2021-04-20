import {
  TreeEditorWebview,
  VscodeExtension,
} from "vscode-webview-tree-editor-rpc";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { extensionEvents, vscode } from "./vscode-extension/index";
import { TreeEditorWebviewServer } from "./vscode-extension/TreeEditorWebview";
import { VscodeExtensionClient } from "./vscode-extension/VscodeExtension";

Vue.config.productionTip = false;

export const extensionHost: VscodeExtension = new VscodeExtensionClient(vscode);
export const webview: TreeEditorWebview = new TreeEditorWebviewServer(
  store,
  extensionEvents
);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { extensionEvents } from "./vscode-extension/index";

import {
  TreeEditorWebview,
  TreeEditorWebviewServer,
} from "./vscode-extension/TreeEditorWebview";
import {
  VscodeExtension,
  VscodeExtensionClient,
} from "./vscode-extension/VscodeExtension";

Vue.config.productionTip = false;

export const extensionHost: VscodeExtension = new VscodeExtensionClient();
export const webview: TreeEditorWebview = new TreeEditorWebviewServer(
  store,
  extensionEvents
);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

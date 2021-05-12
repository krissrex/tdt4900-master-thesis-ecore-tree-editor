import * as vscode from "vscode";
import { TreeLanguageServerClient } from "../tree-language-server/TreeLanguageServerClient";
import { CustomTreeEditorProvider } from "./CustomTreeEditorProvider";

export function registerCustomTreeEditor(
  context: vscode.ExtensionContext,
  server: TreeLanguageServerClient
) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      "ecore-tree-editor.treeEditor",
      new CustomTreeEditorProvider(context, server),
      { webviewOptions: {}, supportsMultipleEditorsPerDocument: false }
    )
  );
}

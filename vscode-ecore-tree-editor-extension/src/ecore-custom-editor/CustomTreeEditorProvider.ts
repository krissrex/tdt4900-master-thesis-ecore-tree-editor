import * as path from "path";
import * as vscode from "vscode";
import { EXTENSION_HUMAN_NAME } from "../config";
import { getLogger } from "../log";
import { TreeLanguageServerClient } from "../tree-language-server/TreeLanguageServerClient";
import { TreeCustomDocument } from "./TreeCustomDocument";
import { TreeEditorWebviewClient } from "./TreeEditorWebview";
import { VscodeExtensionServer } from "./VscodeExtension";

type TreeDocumentChangeEvent =
  | vscode.Event<vscode.CustomDocumentEditEvent<TreeCustomDocument>>
  | vscode.Event<vscode.CustomDocumentContentChangeEvent<TreeCustomDocument>>;

/**
 * An editor provider is not the actual editor. It just *provides* a DocumentModel for VSCode,
 * and acts as glue.
 */
export class CustomTreeEditorProvider
  implements vscode.CustomEditorProvider<TreeCustomDocument>
{
  /*
    It is a possibility that representing the tree as text is the best solution.
    However, the file is not worked upon directly; instead all actions are passed to the Tree Language Server.
   */

  /*
    See [pawDrawEditor](https://github.com/microsoft/vscode-extension-samples/blob/master/custom-editor-sample/src/pawDrawEditor.ts#L194) 
    for a reference implementation.
    Another reference for a webview is https://github.com/gregchamblin/vscode-json-editor.
   */

  private readonly log = getLogger().getChildLogger({
    label: "CustomTreeEditorProvider",
  });

  private readonly panels: Set<vscode.WebviewPanel> = new Set(); // TODO: The pawDraw example also stores the resource uri in this set.

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly treeLanguageServer: TreeLanguageServerClient
  ) {}

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentEditEvent<TreeCustomDocument>
  >();
  public readonly onDidChangeCustomDocument =
    this._onDidChangeCustomDocument.event;

  saveCustomDocument(
    document: TreeCustomDocument,
    cancellation: vscode.CancellationToken
  ): Thenable<void> {
    throw new Error("Method not implemented.");
  }
  saveCustomDocumentAs(
    document: TreeCustomDocument,
    destination: vscode.Uri,
    cancellation: vscode.CancellationToken
  ): Thenable<void> {
    throw new Error("Method not implemented.");
  }
  revertCustomDocument(
    document: TreeCustomDocument,
    cancellation: vscode.CancellationToken
  ): Thenable<void> {
    throw new Error("Method not implemented.");
  }
  backupCustomDocument(
    document: TreeCustomDocument,
    context: vscode.CustomDocumentBackupContext,
    cancellation: vscode.CancellationToken
  ): Thenable<vscode.CustomDocumentBackup> {
    throw new Error("Method not implemented.");
  }
  openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext,
    token: vscode.CancellationToken
  ): TreeCustomDocument | Thenable<TreeCustomDocument> {
    this.log.info("Opening custom document", { uri: uri.toString() });

    return this.treeLanguageServer._onReady
      .catch((err) => {
        this.log.error(
          "Failed to wait for server when creating new TreeCustomDocument"
        );
      })
      .then(() => {
        this.log.info("Created new TreeCustomDocument", {
          uri: uri.toString(),
        });
        return new TreeCustomDocument(uri, this.treeLanguageServer);
      });
  }

  /**
   * Flesh out a webviewPanel with a WebView for the given document.
   * This is what provides the editor's WebView.
   *
   * See the documentation on `vscode.CustomEditorProvider` for more.
   * @param document the document to edit
   * @param webviewPanel the panel to fill with a WebView
   * @param token a cancellation token
   * @returns optional Thenable to indicate the editor has been resolved.
   */
  resolveCustomEditor(
    document: TreeCustomDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.panels.add(webviewPanel);
    webviewPanel.onDidDispose((event) => this.panels.delete(webviewPanel));

    this.log.debug("Resolving an editor", {
      doc: document.uri.toString(),
      webviewPanel: webviewPanel.title, //Title is the filename
      panelSetSize: this.panels.size,
    });

    webviewPanel.webview.options = {
      enableScripts: true, // Allow our editor to use js
      enableCommandUris: false, // False is default. TODO: what is this, and should it be true? Might be clickable links/uris that when opened will dispatch to vscode as commands
    };
    webviewPanel.webview.html = this.createWebviewHtml(webviewPanel.webview);
    webviewPanel.webview.onDidReceiveMessage(
      (event) => {
        this.log.debug("Got event from webview", { event });
      },
      this,
      this.context.subscriptions
    );

    const treeEditorWebview = new TreeEditorWebviewClient(webviewPanel.webview);
    const vscodeExtension = new VscodeExtensionServer(
      webviewPanel.webview,
      document,
      treeEditorWebview
    );
    this.context.subscriptions.push(vscodeExtension);
  }

  createWebviewHtml(webview: vscode.Webview): string {
    // Local path to script and css for the webview
    const toWebviewUri = (fileName: string) => {
      return webview.asWebviewUri(
        vscode.Uri.file(
          path.join(
            this.context.extensionPath,
            "tree-editor-webview-contents",
            fileName
          )
        )
      );
    };

    const css = {
      app: toWebviewUri("dist/css/app.css"),
    };
    const js = {
      app: toWebviewUri("dist/js/app.js"),
      vendor: toWebviewUri("dist/js/chunk-vendors.js"),
    };
    const nonce = getNonce();

    return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} blob: data:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}' 'unsafe-eval';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${EXTENSION_HUMAN_NAME}</title>

        <link href="${css.app}" rel="preload" as="style">
        <link href="${js.app}" nonce="${nonce}" rel="preload" as="script">
        <link href="${js.vendor}" nonce="${nonce}" rel="preload" as="script">
        <link href="${css.app}" rel="stylesheet">
			</head>
			<body>
        <div id="app"></div>
        <script nonce="${nonce}" src="${js.vendor}"></script>
        <script nonce="${nonce}" src="${js.app}"></script>
			</body>
			</html>`;
  }
}

/**
Copyright (c) Microsoft Corporation

All rights reserved. 

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS 
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT 
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

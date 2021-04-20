import { TreeDocument } from "treedocumentmodel";
import { Webview } from "vscode";
import {
  RpcNotification,
  RpcParams,
  TreeEditorWebview,
} from "vscode-webview-tree-editor-rpc";

export interface WebviewRpcNotification {
  from: "extension";
  method: string;
  params: any[];
}

/**
 * This is some ad-hoc JSON-RPC until something proper is used.
 * @param notification
 */
export function sendWebviewNotification(
  webview: Webview,
  notification: RpcNotification
): void {
  webview.postMessage(notification);
}

export class TreeEditorWebviewClient implements TreeEditorWebview {
  constructor(private webview: Webview) {}

  protected sendNotification(
    method: keyof TreeEditorWebview,
    params: RpcParams
  ) {
    const notification: RpcNotification = {
      from: "extension",
      method,
      params: params,
    };
    this.webview.postMessage(notification);
  }
  setDocument(document: TreeDocument): void {
    this.sendNotification("setDocument", [...arguments]);
  }
}

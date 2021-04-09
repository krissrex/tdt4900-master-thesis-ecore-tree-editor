import { Webview } from "vscode";

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
  notification: WebviewRpcNotification
): void {
  webview.postMessage(notification);
}

/* eslint-disable prefer-rest-params */
import { VSCode } from "@/vscode";
import { ActionEvent } from "treedocumentmodel";
import {
  RpcNotification,
  RpcParams,
  VscodeExtension,
} from "vscode-webview-tree-editor-rpc";
import { vscode } from "./index";

/**
 * Represents the other side of the extension, which runs inside VSCode.
 *
 * It works like RPC, where this is the local client and the extension is the remote server.
 */
export class VscodeExtensionClient implements VscodeExtension {
  constructor(private vscode: VSCode) {}

  protected sendNotification(
    method: keyof VscodeExtension,
    params?: RpcParams
  ) {
    const notification: RpcNotification = {
      from: "extension",
      method,
      params: params,
    };
    this.vscode.postMessage(notification);
  }

  /**
   * Call this when this editor is initialized and ready for use.
   */
  public signalReady() {
    // TODO: can this be done automatically with a js Proxy object/wrapper or something?
    this.sendNotification("signalReady");
  }

  public triggerAction(actionEvent: ActionEvent) {
    this.sendNotification("triggerAction", Array.from(arguments));
  }

  setNodeChildrenVisibility(id: string, visible: boolean) {
    this.sendNotification("setNodeChildrenVisibility", Array.from(arguments));
  }
}

export const vscodeExtension = new VscodeExtensionClient(vscode);

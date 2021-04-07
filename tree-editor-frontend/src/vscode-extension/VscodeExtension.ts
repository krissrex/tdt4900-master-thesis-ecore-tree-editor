import { ActionEvent } from "treedocumentmodel";
import { vscode } from "./index";

export enum VscodeWebviewActions {
  READY = "ready",
  TRIGGER_ACTION = "triggerAction",
}

export interface VscodeExtension {
  signalReady(): void;
  triggerAction(actionEvent: ActionEvent): void;
}

/**
 * Represents the other side of the extension, which runs inside VSCode.
 *
 * It works like RPC, where this is the local client and the extension is the remote server.
 */
export class VscodeExtensionClient implements VscodeExtension {
  /**
   * Call this when this editor is initialized and ready for use.
   */
  public signalReady() {
    vscode.postMessage({ type: VscodeWebviewActions.READY });
  }

  public triggerAction(actionEvent: ActionEvent) {
    vscode.postMessage({
      type: VscodeWebviewActions.TRIGGER_ACTION,
      event: actionEvent,
    });
  }
}

export const vscodeExtension = new VscodeExtensionClient();

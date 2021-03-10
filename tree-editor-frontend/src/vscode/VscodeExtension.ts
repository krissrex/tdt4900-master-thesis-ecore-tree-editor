import { vscode } from "./index";

/**
 * Represents the other side of the extension, which runs inside VSCode.
 */
export class VscodeExtension {

  /**
   * Call this when this editor is initialized and ready for use.
   */
  public signalReady() {
    vscode.postMessage({ type: "ready" });
  }
}

export const vscodeExtension = new VscodeExtension();

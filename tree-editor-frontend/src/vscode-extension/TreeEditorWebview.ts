import { getChildLogger } from "@/logging";
import { Mutations, RootState } from "@/store";
import { TinyEmitter } from "tiny-emitter";
import { TreeDocument } from "treedocumentmodel";
import { Store } from "vuex";
import {
  TreeEditorWebview,
  RpcParams,
  isNotification,
  dispatchMethod,
} from "vscode-webview-tree-editor-rpc";
import { EXTENSION_MESSAGE_EVENT } from "./index";

/**
 * Works like RPC, where this webview is the remote server doing the prodcedures called by the local vscode extension.
 */
export class TreeEditorWebviewServer implements TreeEditorWebview {
  private log = getChildLogger("TreeEditorWebviewServer");

  constructor(
    private store: Store<RootState>,
    private extensionEvents: TinyEmitter
  ) {
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.extensionEvents.on(
      EXTENSION_MESSAGE_EVENT,
      (eventData: any) => {
        this.log.debug({ eventData }, "Got event");
        if (isNotification(eventData)) {
          try {
            dispatchMethod(
              this,
              eventData.method as keyof this,
              eventData.params
            );
          } catch (err) {
            this.log.error(
              { err },
              "Failed to dispatch method '%s': %s",
              eventData.method,
              err
            );
          }
        } else {
          this.log.warn({ eventData }, "Not a valid event");
        }
      },
      this
    );
  }

  public setDocument(document: TreeDocument): void {
    this.store.commit(Mutations.setTreeDocument, document);
  }
}

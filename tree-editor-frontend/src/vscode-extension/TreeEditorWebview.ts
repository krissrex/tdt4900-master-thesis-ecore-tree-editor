import { getChildLogger } from "@/logging";
import { Mutations, RootState } from "@/store";
import { TinyEmitter } from "tiny-emitter";
import { TreeDocument } from "treedocumentmodel";
import { Store } from "vuex";
import {
  TreeEditorWebview,
  RpcParams,
  isNotification,
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
    extensionEvents.on(
      EXTENSION_MESSAGE_EVENT,
      (eventData: any) => {
        this.log.debug({ eventData }, "Got event");
        if (isNotification(eventData)) {
          this.dispatchMethod(
            eventData.method as keyof TreeEditorWebview,
            eventData.params
          );
        } else {
          this.log.warn({ eventData }, "Not a valid event");
        }
      },
      this
    );
  }

  private dispatchMethod(
    method: keyof TreeEditorWebview,
    params?: RpcParams
  ): void {
    // Do not use hasOwnProperty for this; the method lies in the prototype.
    if (method && method in this) {
      const func: Function = this[method];
      if (typeof func === "function") {
        if (params === undefined) {
          return func.call(this);
        } else if (Array.isArray(params)) {
          return func.apply(this, params);
        } else {
          this.log.trace({ params }, "The params are an object");
          return func.call(this, params); // Seems like a bad idea. This allows sending one-arg objects but not one-arg arrays.
          // Also, this does not work with "keyword arguments" as expected.
        }
        //FIXME: implement for object params. KW-args like as in python?
      } else {
        this.log.error(
          { method, params },
          "The method '%s' resolved to something that is not a function!",
          method
        );
      }
    }
    this.log.warn({ method, params }, "Failed to dispatch method '%s'", method);
  }
  public setDocument(document: TreeDocument): void {
    this.store.commit(Mutations.setTreeDocument, document);
  }
}

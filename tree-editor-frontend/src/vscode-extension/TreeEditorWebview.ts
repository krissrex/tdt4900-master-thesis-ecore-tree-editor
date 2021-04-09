import { getChildLogger } from "@/logging";
import { Mutations, RootState } from "@/store";
import { TinyEmitter } from "tiny-emitter";
import { TreeDocument } from "treedocumentmodel";
import { Store } from "vuex";
import { EXTENSION_MESSAGE_EVENT } from "./index";

/**
 * A VSCode extension will send messages to the webview,
 * which in turn are interpreted as actions to do, specified here.
 * The frontend/client should implement this.
 */
export interface TreeEditorWebview {
  // TODO
  setDocument(document: TreeDocument): void;
}

type RpcParams = any[] | Record<string, any> | undefined;

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
        const method = eventData.method;
        const params: RpcParams = eventData.params ?? [];
        if (method && typeof method === "string") {
          this.dispatchMethod(method as any, params);
        } else {
          this.log.warn({ eventData }, "No method in event data");
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

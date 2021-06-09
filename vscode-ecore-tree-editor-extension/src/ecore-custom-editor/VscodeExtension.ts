import {
  ActionEvent,
  editorStateFactoryInstance,
  NodeId,
} from "treedocumentmodel";
import * as vscode from "vscode";
import { Disposable, Webview } from "vscode";
import {
  dispatchMethod,
  isNotification,
  TreeEditorWebview,
  VscodeExtension,
} from "vscode-webview-tree-editor-rpc";
import { getChildLogger } from "../log";
import { TreeCustomDocument } from "./TreeCustomDocument";

/**
 * Receives RPC commands from the webview and dispatches them.
 */
export class VscodeExtensionServer implements VscodeExtension, Disposable {
  private disposables: Disposable[] = [];
  private log = getChildLogger("VscodeExtensionServer");

  /**
   * @param webview the vscode webview
   * @param document the vscode document for the tree
   * @param treeEditorWebview the RPC client for the tree editor inside the webview
   */
  constructor(
    private webview: Webview,
    private document: TreeCustomDocument,
    private treeEditorWebview: TreeEditorWebview
  ) {
    webview.onDidReceiveMessage((event) => {
      if (isNotification(event)) {
        try {
          dispatchMethod(this, event.method as any, event.params, ["dispose"]);
        } catch (err) {
          this.log.error(
            "Failed to dispatch method '%s': %s",
            event.method,
            err
          );
        }
      }
    }, this.disposables);
  }
  dispose() {
    this.disposables.forEach((it) => it.dispose());
  }

  /**
   * This is called every time the webview initializes and re-initializes from a editor tab change.
   */
  signalReady(): void {
    if (this.document.uri.scheme === "untitled") {
      this.log.debug("Webview is ready for untitled document.");
      /* this.postMessage(webviewPanel, 'init', {
        untitled: true
      }); */
    } else {
      this.log.debug("Webview is ready for %s.", this.document.uri.toString());

      if (!this.document.documentData) {
        this.log.debug(
          "Fetching tree document from tlsp for %s",
          this.document.uri.toString()
        );

        const warningTimeout = setTimeout(() => {
          const filepath = this.document.uri.path;
          const parts = filepath.split("/");
          const filename = parts.pop() ?? "";

          vscode.window.showWarningMessage(
            `Loading the model for '${filename}' took longer than expected.`
          );
        }, 5000);

        this.document.tlspServer
          .getModel({ modelFileUri: this.document.uri.toString() })
          .then((treeDocument) => {
            clearTimeout(warningTimeout);
            this.log.debug("Got document for %s", this.document.uri);
            this.document.documentData = treeDocument;
            this.refreshDocument();
          })
          .catch((err) => {
            this.log.error(
              "Failed to get document for %s: %s",
              this.document.uri,
              err,
              err
            );
          });
      } else {
        this.refreshDocument();
      }
    }
  }

  triggerAction(actionEvent: ActionEvent): void {
    //FIXME: are we sending the entire root here?
    this.log.debug(
      "The user triggered action %s",
      actionEvent.action,
      actionEvent.targetRoot.id
    );
    //TODO: forward actions to the TLSP server.
    // this.document.tlspServer.doAction(actionEvent);
  }
  setNodeChildrenVisibility(id: NodeId, visible: boolean) {
    try {
      const node = this.document.getNode(id);
      if (!node) {
        this.log.warn("Failed to find node %s", id);
        return;
      }

      const editorState =
        node.editorState ??
        editorStateFactoryInstance.createDefaultEditorState();
      editorState.collapsed = !visible;
      node.editorState = editorState;
      this.refreshDocument(); // TODO: only send a "diff" of changes?
    } catch (err) {
      this.log.error("Failed to change visibility of node '%s': %s", id, err);
    }
  }

  private refreshDocument() {
    const doc = this.document.documentData;
    if (doc) {
      this.treeEditorWebview.setDocument(doc);
    }
  }
}

import * as vscode from "vscode";
import { getLogger } from "../log";
import {
  NodeId,
  TreeDocument as TreeDocumentModel,
  TreeNode,
} from "treedocumentmodel";
import { services } from "treedocumentmodel";
import { TreeLanguageServerClient } from "../tree-language-server/TreeLanguageServerClient";

/**
 * A TreeDocument represents a specific tree which can be mapped to a model.
 *
 */
export class TreeCustomDocument implements vscode.CustomDocument {
  // You can draw inspiration from vscode.TextDocument for what properties and methods are needed.
  // and https://github.com/eclipse-glsp/glsp-vscode-integration/blob/master/vscode-integration/src/glsp-diagram-document.ts
  private readonly log = getLogger().getChildLogger({ label: "TreeDocument" });

  private _documentData?: TreeDocumentModel;
  private treeNodeIdIndex?: services.TreeDocumentIndex;

  constructor(
    public uri: vscode.Uri,
    public readonly tlspServer: TreeLanguageServerClient
  ) {
    this.log.debug("Created tree document", { uri: this.uri });
    //TODO: set this.documentData based on the uri?
  }
  dispose(): void {
    //TODO
    getLogger().debug("Disposing document", { uri: this.uri });
  }

  public get documentData(): TreeDocumentModel | undefined {
    return this._documentData;
  }

  public set documentData(doc: TreeDocumentModel | undefined) {
    this._documentData = doc;
    if (doc) {
      try {
        this.treeNodeIdIndex = services.indexTreeDocument(doc);
      } catch (err) {
        this.log.error("Indexing of document failed: %s", err);
      }
    }
  }

  public getNode(id: NodeId): TreeNode | undefined {
    if (this.treeNodeIdIndex) {
      return this.treeNodeIdIndex.treeNodeById.get(id);
    } else {
      throw new Error(
        "Tree is not indexed. Is the tree set? typeof tree=" +
          typeof this.documentData
      );
    }
  }
}

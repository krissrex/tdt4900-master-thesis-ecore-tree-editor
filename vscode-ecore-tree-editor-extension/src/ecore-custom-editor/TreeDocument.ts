import * as vscode from "vscode";
import { getLogger } from "../log";
import {
  NodeId,
  TreeDocument as TreeDocumentModel,
  TreeNode,
} from "treedocumentmodel";
import { indexToMap } from "treedocumentmodel/dist/util";

/**
 * A TreeDocument represents a specific tree which can be mapped to a model.
 *
 */
export class TreeDocument implements vscode.CustomDocument {
  // You can draw inspiration from vscode.TextDocument for what properties and methods are needed.
  private readonly log = getLogger().getChildLogger({ label: "TreeDocument" });

  private _documentData?: TreeDocumentModel;
  private treeNodeIdIndex: Map<NodeId, TreeNode> = new Map();

  constructor(public uri: vscode.Uri) {
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
        this.treeNodeIdIndex = indexToMap(doc);
      } catch (err) {
        this.log.error("Indexing of document failed: %s", err);
      }
    }
  }

  public getNode(id: NodeId): TreeNode | undefined {
    if (this.treeNodeIdIndex) {
      return this.treeNodeIdIndex.get(id);
    } else {
      throw new Error(
        "Tree is not indexed. Is the tree set? typeof tree=" +
          typeof this.documentData
      );
    }
  }
}

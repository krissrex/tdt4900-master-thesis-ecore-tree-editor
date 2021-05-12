import { NodeId } from "../NodeId";
import { TreeDocument } from "../TreeDocument";
import { TreeNode } from "../TreeNode";
import { TreeRoot } from "../TreeRoot";

export interface TreeDocumentIndex {
  treeNodeById: Map<NodeId, TreeNode>;
  treeRootFromNodeId: Map<NodeId, TreeRoot>;
  treeNodeParentByChildId: Map<NodeId, TreeNode>;
}

/**
 * Indexes a tree by node id and returns several maps that can find parents, tree root and tree nodes.
 *
 * This tries to make up for the "anemic" domain models, where children cannot have references (to parents, roots etc)
 * because of json-deserialization.
 *
 * @param document
 * @returns multiple maps to perform lookups for nodes, parents and roots.
 */
export function indexTreeDocument(document: TreeDocument): TreeDocumentIndex {
  const result: TreeDocumentIndex = {
    treeNodeById: new Map<NodeId, TreeNode>(),
    treeRootFromNodeId: new Map<NodeId, TreeRoot>(),
    treeNodeParentByChildId: new Map<NodeId, TreeNode>(),
  };

  for (const root of document.roots) {
    if (root.rootNode) {
      indexRecursive(result, root, root.rootNode, null);
    }
  }

  return result;
}

function indexRecursive(
  index: TreeDocumentIndex,
  root: TreeRoot,
  node: TreeNode,
  parent?: TreeNode
) {
  // Node by ID
  if (index.treeNodeById.has(node.id)) {
    if (index.treeNodeById.get(node.id) === node) {
      return; // Avoid infinite recursion in case an invalid (circular "tree") node is given.
    } else {
      // FIXME: Duplicate id! Throw error? Or change to Map<NodeId, TreeNode[]>? Last one would not make sense.
      // Or index per root, in case duplicates are in different TreeRoots.
      console.error("Duplicate ID while indexing: " + node.id, node);
    }
  }
  index.treeNodeById.set(node.id, node);

  // Parent
  if (parent) {
    index.treeNodeParentByChildId.set(node.id, parent);
  }

  // Root
  index.treeRootFromNodeId.set(node.id, root);

  // Recursively set on children
  for (const child of node.children) {
    indexRecursive(index, root, child, node);
  }
}

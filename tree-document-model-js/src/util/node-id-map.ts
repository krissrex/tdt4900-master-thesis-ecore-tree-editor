import { NodeId } from "../NodeId";
import { TreeDocument } from "../TreeDocument";
import { TreeNode } from "../TreeNode";

/**
 * Indexes a tree by node id and returns a map.
 * @param document
 * @returns
 */
export function indexToMap(document: TreeDocument): Map<NodeId, TreeNode> {
  const result = new Map<NodeId, TreeNode>();

  for (const root of document.roots) {
    if (root.rootNode) {
      indexRecursive(root.rootNode, result);
    }
  }

  return result;
}

function indexRecursive(node: TreeNode, map: Map<NodeId, TreeNode>) {
  if (map.has(node.id)) {
    if (map.get(node.id) === node) {
      return; // Avoid infinite recursion in case an invalid (circular "tree") node is given.
    } else {
      // FIXME: Duplicate id! Throw error? Or change to Map<NodeId, TreeNode[]>? Last one would not make sense.
    }
  }

  map.set(node.id, node);
  for (const child of node.children) {
    indexRecursive(child, map);
  }
}

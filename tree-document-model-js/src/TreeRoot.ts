import { HierarchyConfiguration } from "./HierarchyConfiguration";
import { TreeNode } from "./TreeNode";
import { IconConfiguration } from "./IconConfiguration";
import { ActionConfiguration } from "./ActionConfiguration";

/**
 * The root of a tree.
 * It has the information on icons, actions and valid hierarchy within this tree.
 * Configure it by specifying icon mappings in {@link .icons}, and allowed node children in {@link .hierarchy}.
 *
 * @category Tree
 * @category Configuration
 */
export interface TreeRoot {
  id: string;

  /**
   * The node that is the root.
   *
   * For multiple roots, use multiple {@link TreeRoot} in the {@link TreeDocument.roots}.
   */
  rootNode?: TreeNode;

  /** A configuration of all available actions, and which ones are in the action bar depending on the selected node etc. */
  actions: ActionConfiguration;

  /**
   * The mapping between a parent {@link TreeNode.type} and their allowed child {@link NodeType | NodeTypes}.
   * A user will only be allowed to add types specified here as children to a node.
   */
  hierarchy: HierarchyConfiguration;

  /**
   * The mapping between {@link NodeType}s and default icons.
   */
  icons?: IconConfiguration;
}

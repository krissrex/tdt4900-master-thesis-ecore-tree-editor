import { NodeType } from "./NodeType";

/**
 * Defines what children {@link NodeType | NodeTypes} are allowed for each parent {@link NodeType}.
 * The {@link .roots} are types that can be used as a {@link TreeRoot.rootNode}, and don't need parent nodes.
 *
 * @category Configuration
 */
export interface HierarchyConfiguration {
  /**
   * The {@link NodeType}s that can be {@link TreeRoot.rootNode | tree roots}.
   */
  roots: Set<NodeType>;

  /**
   * This specifies what child {@link TreeNode}s are allowed as children for each {@link NodeType}.
   *
   * @example
   * For a file browser:
   * `"directory", ["directory", "file"]`
   */
  allowedChildren: Map<NodeType, Array<NodeType>>;
}

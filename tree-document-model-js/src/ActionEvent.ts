import { ActionId } from "./ActionId";
import { TreeNode } from "./TreeNode";
import { TreeRoot } from "./TreeRoot";

/**
 * An event triggering an {@link Action}, optionally against some target {@link TreeNode}s.
 *
 * A user clicking a button could trigger an action.
 *
 * @category Action
 */
export interface ActionEvent {
  /**
   * An action can target zero, one or more nodes.
   *
   * @example
   * In Ecore: running a `"Validate"` might apply to the entire document, and does not need a selected node.
   *
   * @example
   * In Ecore: creating a `"Dynamic instance"` might need a node to use as a root.
   *
   * @example
   * Deleting nodes can target multiple at once, with multi-select in the user interface.
   */
  targetNodes?: Array<TreeNode>;

  /**
   * The action that is triggered.
   */
  action: ActionId;

  /**
   * The root where the action is triggered in.
   */
  targetRoot: TreeRoot;
}

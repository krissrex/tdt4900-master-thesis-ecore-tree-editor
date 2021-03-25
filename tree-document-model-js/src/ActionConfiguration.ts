import { Action } from "./Action";
import { ActionId } from "./ActionId";
import { NodeType } from "./NodeType";

/**
 * Lists all the available {@link Action}s that can be performed.
 * This also maps certain {@link Action}s to certain {@link NodeType | node types},
 * for cases where actions can only be performed on specific types of nodes.
 *
 * @category Action
 * @category Configuration
 */
export interface ActionConfiguration {
  /**
   * The available actions in a {@link TreeRoot}.
   */
  availableActions: Array<Action>;

  /**
   * The actions to always show in the action bar, regardless of what {@link TreeNode}s are selected.
   */
  defaultActionbarActions?: Array<ActionId>;

  /**
   * They *key* is the id of an action in {@link .availableActions}
   * and the *value* is the {@link NodeType} for the {@link TreeNode}s where it is available.
   */
  nodeActions?: Map<ActionId, NodeType>;
}

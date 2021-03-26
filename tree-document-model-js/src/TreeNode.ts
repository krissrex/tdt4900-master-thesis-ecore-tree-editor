import { IconDataUri } from "./IconDataUri";
import { NodeIcon } from "./NodeIcon";
import { NodeType } from "./NodeType";

/**
 * A node in the {@link TreeDocument}.
 * This represents an element in the model being edited, such as a single `"EClass"` instance, `"EReference"` instance, file, directory etc.
 *
 * {@link TreeNode}s are nested with parents and children.
 * A node with no parent is a root node, and a node with no children is a leaf node.
 *
 * Nodes have an unique identifier within a TreeDocument.
 * Nodes have a name that also works as an identifier for the user, but it does not have a uniqueness constraint.
 *
 * @category Tree
 */
export interface TreeNode {
  /**
   * The unique id of a node.
   * This allows actions to know what they are working on, and the editor to know where the user is working.
   */
  id: string;

  /**
   * What type of node this is.
   * The type specifies what properties the node has, what children it can have,
   * what icon it has and what actions are possible to perform on it.
   */
  type: NodeType;

  /* TODO: this property is very important to get right. Should it be a label instead? Or a complex data structure?
     What about things named `myField` but displayed as `myField : String` ?
     And what about editing such complex fields, in e.g. a tabular/cell-like way?
  */
  /**
   * The name of this node.
   */
  name?: string;

  /** The documentation or help text for a node. */
  documentation?: string;

  /**
   * The child nodes of a node.
   *
   * For example, an `"EClass"` would have children of {@link NodeType} `"EReference"` and `"EAttribute"`.
   * A filesystem directory would have children of type `"directory"` or `"file"`. */
  children: Array<TreeNode>;

  /**
   * The parent of this node, or empty (`null`) if this is a root node.
   */
  //parent: TreeNode | null;

  /**
   * An icon to use *instead* of the default icon.
   * The default icon is based on the {@link .type | node's type} and {@link TreeRoot.IconConfiguration | the icon configuration}.
   *
   * @example
   * An invalid node could have a red cross.
   *
   * @example
   * A node with a special property value could have a new icon to indicate this.
   */
  iconOverride?: IconDataUri | NodeIcon;
}

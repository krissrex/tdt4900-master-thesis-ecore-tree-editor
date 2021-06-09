import { IconDataUri } from "./IconDataUri";
import { NodeIcon } from "./NodeIcon";
import { NodeType } from "./NodeType";

/**
 * This defines the default icons for every {@link NodeType}.
 * @category Icon
 */
export interface IconConfiguration {
  /**
   * The *key* is the {@link NodeType} and the *value* is a the icon that should be used for this node type by default.
   */
  icons: Record<NodeType, IconDataUri | NodeIcon>;
}

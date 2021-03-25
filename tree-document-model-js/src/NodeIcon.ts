import { IconDataUri } from "./IconDataUri";

/**
 * The icon shown on a {@link TreeNode}.
 *
 * A composite icon, built with a stack of layers.
 * The first icon (`index=0`) is drawn first (beneath), and the others are drawn on top.
 *
 * @category Icon
 */
export interface NodeIcon {
  icons: Array<IconDataUri>;
}

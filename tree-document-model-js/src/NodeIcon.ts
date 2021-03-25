import { IconDataUri } from "./IconDataUri";

/** A composite icon, built on layers.
 * The first icon (index=0) is on the bottom, and the others are drawn on top.
 */
export interface NodeIcon {
  icons: Array<IconDataUri>;
}

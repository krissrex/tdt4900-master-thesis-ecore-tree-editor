import { IconDataUri } from "./IconDataUri";
import { NodeType } from "./NodeType";

export interface IconConfiguration {
  icons: Map<NodeType, IconDataUri>;
}

import { IconDataUri } from "./IconDataUri";
import { NodeIcon } from "./NodeIcon";
import { NodeType } from "./NodeType";

export interface IconConfiguration {
  icons: Map<NodeType, IconDataUri | NodeIcon>;
}

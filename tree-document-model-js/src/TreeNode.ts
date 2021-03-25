import { IconDataUri } from "./IconDataUri";
import { NodeIcon } from "./NodeIcon";

export interface TreeNode {
  id: string;
  type: string;
  name?: string;
  documentation?: string;

  children: Array<TreeNode>;
  parent: TreeNode | null;
  iconOverride?: IconDataUri | NodeIcon;
}

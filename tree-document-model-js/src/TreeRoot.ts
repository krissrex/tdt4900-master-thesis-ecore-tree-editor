import { HierarchyConfiguration } from "./HierarchyConfiguration";
import { TreeNode } from "./TreeNode";
import { IconConfiguration } from "./IconConfiguration";
import { ActionConfiguration } from "./ActionConfiguration";

export interface TreeRoot {
  id: string;

  rootNode?: TreeNode;
  actions: ActionConfiguration;
  hierarchy: HierarchyConfiguration;
  icons?: IconConfiguration;
}

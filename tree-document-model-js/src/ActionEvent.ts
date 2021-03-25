import { Action } from "./Action";
import { TreeNode } from "./TreeNode";

export interface ActionEvent {
  targetNodes?: Array<TreeNode>;
  action: Action;
}

import { NodeType } from "./NodeType";

export interface HierarchyConfiguration {
  roots: Set<NodeType>;

  allowedChildren: Map<NodeType, Array<NodeType>>;
}

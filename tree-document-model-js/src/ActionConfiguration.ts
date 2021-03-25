import { Action } from "./Action";
import { ActionId } from "./ActionId";
import { NodeType } from "./NodeType";

export interface ActionConfiguration {
  availableActions: Array<Action>;
  defaultActionbarActions?: Array<Action>;
  nodeActions?: Map<ActionId, NodeType>;
}

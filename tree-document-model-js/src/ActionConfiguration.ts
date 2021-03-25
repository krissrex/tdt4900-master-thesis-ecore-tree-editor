import { Action } from "./Action";

export interface ActionConfiguration {
  availableActions: Array<Action>;
  defaultActionbarActions: Array<Action>;
  nodeActions: Map<string, string>;
}

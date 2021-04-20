import { ActionEvent, NodeId } from "treedocumentmodel";

export interface VscodeExtension {
  signalReady(): void;
  triggerAction(actionEvent: ActionEvent): void;

  setNodeChildrenVisibility(id: NodeId, visible: boolean);
}

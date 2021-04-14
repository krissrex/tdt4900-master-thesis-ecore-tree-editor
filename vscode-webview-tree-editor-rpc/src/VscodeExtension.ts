import { ActionEvent } from "treedocumentmodel";

export interface VscodeExtension {
  signalReady(): void;
  triggerAction(actionEvent: ActionEvent): void;
}

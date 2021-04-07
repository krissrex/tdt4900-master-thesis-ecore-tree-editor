import { RootState } from "./store";

export type VSCode = {
  postMessage(message: any): void;
  getState(): RootState;
  setState(state: RootState): void;
};

declare global {
  interface Window {
    acquireVsCodeApi(): vscode.VSCode;
  }
}

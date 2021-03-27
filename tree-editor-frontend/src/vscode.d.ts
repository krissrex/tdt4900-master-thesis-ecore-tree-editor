import { RootState } from "./store";

type VSCode = {
  postMessage(message: any): void;
  getState(): RootState;
  setState(state: RootState): void;
};

//declare const vscode: VSCode;
declare function acquireVsCodeApi(): VSCode;

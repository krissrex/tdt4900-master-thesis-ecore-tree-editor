import {TinyEmitter} from "tiny-emitter";
import { getChildLogger } from "@/logging";
import { MockVSCode } from "./mockVscode";

/*
This file bridges the webview to the vscode API and messages from the vscode extension.
Better abstractions are provided in `ExtensionHost.ts`.
*/


/**
 * Any messages sent from the VSCode extension will be re-sent from this emitter.
 * Subscribe to events with `.on` or `.once`,
 * and unsubscribe with `.off`.
 * 
 */
export const extensionEvents = new TinyEmitter();

window.addEventListener("message", (event) => {
  const logger = getChildLogger("vscode");

  const data = event.data;
  if (data && data.from && data.from === "extension") {
    logger.debug({event}, "Got message from extension");
    extensionEvents.emit("message", event.data);
  } else {
    logger.trace({event}, "Filtered out event");
  }
})

/**
 * @returns VSCode, or undefined if not running inside a vscode webview.
 * @see mockVscodeApi
 */
function getVscodeApi(): VSCode {
  const logger = getChildLogger("vscode");

  if ("acquireVsCodeApi" in window) {
    logger.info("VScode API is available");
    return acquireVsCodeApi();
  } else {
    logger.warn("VScode API is NOT available! Using Mock VSCode")
    return new MockVSCode();
  }
}

/**
 * VSCode, or undefined if not running inside a vscode webview.
 * @see mockVscodeApi
 */
export const vscode: VSCode = getVscodeApi();


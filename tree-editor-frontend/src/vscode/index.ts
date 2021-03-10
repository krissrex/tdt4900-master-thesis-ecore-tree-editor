import {TinyEmitter} from "tiny-emitter";
import roarr from "roarr";
import {loadXmi} from "@/testing/sample_xmi"

/*
This file bridges the webview to the vscode API and messages from the vscode extension.
Better abstractions are provided in `ExtensionHost.ts`.
*/

const logger = roarr.child({
  tag: "vscode"
});

/**
 * Any messages sent from the VSCode extension will be re-sent from this emitter.
 * Subscribe to events with `.on` or `.once`,
 * and unsubscribe with `.off`.
 * 
 */
export const extensionEvents = new TinyEmitter();

window.addEventListener("message", (event) => {
  logger.debug({event}, "Got message: %s", event.data);
  extensionEvents.emit("message", event.data);
})

function getVscodeApi() {
  if ("acquireVsCodeApi" in window) {
    logger.info("VScode API is available");
    return acquireVsCodeApi();
  } else {
    logger.warn("VScode API is NOT available!")
  }

  const mockApi: VSCode = {
    getState: () => {
      const useSampleData = true;
      if (useSampleData) {
        logger.warn("Using sample data");
        return loadXmi();
      } else {
        logger.info("Returning empty state");
        return {};
      }
    },
    setState(state) {
      logger.debug({newState: state}, "Tried setting state");
    },
    postMessage(message){
      logger.debug({message}, "Sent message");
    }
  }
  return mockApi;
}

export const vscode = getVscodeApi();


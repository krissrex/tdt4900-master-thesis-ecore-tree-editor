import * as vscode from "vscode";
import { getLogger, initializeLogger } from "./log";
import { listenToLogSettingsChanges } from "./config/settings-change-listener";
import { registerXmiCommands } from "./xmi-file-commands";
import { registerCustomTreeEditor } from "./ecore-custom-editor/registerCustomTreeEditor";
import { registerServerCommands } from "./tree-language-server/serverCommands";
import { EXTENSION_HUMAN_NAME, EXTENSION_ID } from "./config";
import { startServer } from "./tree-language-server/start-server";

export function activate(context: vscode.ExtensionContext) {
  try {
    initializeLogger(context);
    listenToLogSettingsChanges(context);
  } catch (error) {
    console.error("Failed to start logger!", error);
  }
  const log = getLogger();

  log.info("Extension activated.");
  log.info(
    "Extension mode: %s",
    context.extensionMode === vscode.ExtensionMode.Production
      ? "production"
      : "development"
  );
  log.debug("Logs are written to %s", context.logUri.fsPath);

  registerHelloWorld(context);
  registerXmiCommands(context);
  registerCustomTreeEditor(context);
  registerServerCommands(context);
  startServer(context);
}

function registerHelloWorld(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // TODO: remove hello world.
  let disposable = vscode.commands.registerCommand(
    EXTENSION_ID + ".helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(
        `Hello World from ${EXTENSION_HUMAN_NAME}!`
      );
    }
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  getLogger().info("Extension deactivated.");
}

import * as vscode from "vscode";
import { getLogger, initializeLogger } from "./log";
import { listenToLogSettingsChanges } from "./config/settings-change-listener";
import { registerXmiCommands } from "./xmi-file-commands";
import { registerCustomTreeEditor } from "./ecore-custom-editor/registerCustomTreeEditor";
import { registerServerCommands } from "./tree-language-server/serverCommands";
import { EXTENSION_HUMAN_NAME, EXTENSION_ID } from "./config";
import { startServer } from "./tree-language-server/start-server";
import { TreeLanguageServerClient } from "./tree-language-server/TreeLanguageServerClient";
import { TreeLanguageServerJsonRpcClient } from "./tree-language-server/jsonrpc/TreeLanguageServerRpcClient";

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
  registerServerCommands(context);
  const tlspDispatcher = startTlspServer(context);
  registerXmiCommands(context, tlspDispatcher);
  registerCustomTreeEditor(context, tlspDispatcher);
}

function startTlspServer(
  context: vscode.ExtensionContext
): TreeLanguageServerClient {
  const log = getLogger();

  const server = startServer(context);
  const tlspDispatcher = new TreeLanguageServerJsonRpcClient(
    server.serverConnection,
    server.onReady
  );

  const workspaceFolder = workspaceFolderUri();
  if (workspaceFolder) {
    log.info("Setting workspace to %s", workspaceFolder);
    server.onReady.then(() =>
      tlspDispatcher
        .workspace()
        .setWorkspaceUri({ workspaceUri: workspaceFolder })
    );
  } else {
    log.warn(
      "No workspace was found. It was therefore not set in the tlsp server either."
    );
  }

  return tlspDispatcher;
}

function workspaceFolderUri(): string | null {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri;
  if (workspaceFolder?.scheme === "file") {
    return workspaceFolder.toString();
  }
  return null;
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

import * as vscode from "vscode";
import { EXTENSION_ID } from "../config";
import { getLogger } from "../log";
import { TreeLanguageServerClient } from "../tree-language-server/Client";

export function registerXmiCommands(
  context: vscode.ExtensionContext,
  tlspDispatcher: TreeLanguageServerClient
) {
  const logger = getLogger().getChildLogger({ label: "registerXmiCommands" });

  context.subscriptions.push(
    vscode.commands.registerCommand(EXTENSION_ID + ".xmi-newfile", () => {
      vscode.window
        .showInputBox({
          prompt: "Filename (e.g. MyModel.ecore)",
          validateInput(value) {
            if (!value) {
              return "The filename must not be empty.";
            }
            return undefined;
          },
        })
        .then((name) => {
          if (!name) {
            vscode.window.showErrorMessage(
              "Ecore: No filename given for the new file."
            );
            return;
          }

          throw new Error("Not implemented");
          //client.createNewModel(name);
        });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      EXTENSION_ID + ".server.list-models",
      async () => {
        await tlspDispatcher._onReady;
        const uris = await tlspDispatcher.getDetectedModelUris();
        vscode.window.showInformationMessage(
          "Found models:\n" + uris.join("\n")
        );
      }
    )
  );
}

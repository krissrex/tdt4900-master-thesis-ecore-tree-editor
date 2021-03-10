import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { EXTENSION_ID } from "../config";
import { TreeLanguageServer } from "./TreeLanguageServer";

export function registerServerCommands(context: ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(EXTENSION_ID + ".server.assert-java", async () => {
      try {
        const hasJava = await TreeLanguageServer.create(context).assertEnvironmentHasJava();
        vscode.window.showInformationMessage("Your machine does " + (hasJava ? "" : "NOT ") + "have a valid java version (jre 11 or higher).");
      } catch (err) {
        vscode.window.showErrorMessage("Failed to test for java version:\n " + err);
      }
    }));
}
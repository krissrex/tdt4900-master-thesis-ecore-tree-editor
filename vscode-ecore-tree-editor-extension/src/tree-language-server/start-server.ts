import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { connect } from "./jsonrpc/connection";
import { TreeLanguageServer } from "./TreeLanguageServer";
import { getChildLogger } from "../log";

export function startServer(context: ExtensionContext) {
  const log = getChildLogger("json-rpc");
  log.info("Starting server.");

  const tlspServer = TreeLanguageServer.create(context);
  const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "./"; //FIXME: what is a sane fallback?
  connect(tlspServer.jarPath, cwd, context.subscriptions);
}

import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { startJsonrpcServer } from "./jsonrpc/start-server";
import { TreeLanguageServer } from "./TreeLanguageServer";
import { getChildLogger } from "../log";
import { VscodeJsonRPCServer } from "./jsonrpc/VscodeJsonRPCServer";

export function startServer(context: ExtensionContext) {
  const log = getChildLogger("json-rpc");
  log.info("Starting server.");

  // FIXME: do some cleanup with TreeLanguageServer and VscodeJsonRPCServer.
  const tlspServer = TreeLanguageServer.create(context);
  const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "./"; //FIXME: what is a sane fallback?
  const { connection, serverProcess } = startJsonrpcServer(
    tlspServer.jarPath,
    cwd,
    context.subscriptions
  );
  const server = new VscodeJsonRPCServer(connection, serverProcess);
  context.subscriptions.push(server);

  return server;
}

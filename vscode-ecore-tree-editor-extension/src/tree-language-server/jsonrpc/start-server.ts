import * as cp from "child_process";
import { Disposable } from "vscode";
import * as rpc from "vscode-jsonrpc";
import * as rpcNode from "vscode-jsonrpc/node";
import { getChildLogger } from "../../log";

/**
 *
 * @param jarPath {@link TreeLanguageServer.jarPath}.
 * @param currentWorkingDirectory `vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;`.
 * @param disposables a list to add disposables to
 */
export function startJsonrpcServer(
  jarPath: string,
  currentWorkingDirectory: string,
  disposables: Disposable[]
) {
  const log = getChildLogger("json-rpc:connection");

  const command = "java";
  const args = ["-jar", jarPath];
  const server = cp.spawn(command, args, {
    cwd: currentWorkingDirectory,
    windowsHide: true, // hide console windows on Windows
    detached: false, // false = end when parent process ends
  });
  log.info("TLSP server started at pid %s", server.pid);

  server.on("error", (err) => {
    log.debug("Server logged a message: ", err);
  });

  disposables.push({
    dispose() {
      if (server.killed) {
        log.debug(`Process '${command}' already killed.`);
      } else {
        log.info("Killing server process ", server.pid);
        server.kill("SIGINT");
      }
    },
  });

  // FIXME: wait for stdout to say ready before creating connection.

  const connection = rpc.createMessageConnection(
    new rpcNode.StreamMessageReader(server.stdout),
    new rpcNode.StreamMessageWriter(server.stdin)
  );

  return { connection, serverProcess: server };
}

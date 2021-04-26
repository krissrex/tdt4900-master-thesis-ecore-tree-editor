import * as rpc from "vscode-jsonrpc";
import * as rpcNode from "vscode-jsonrpc/node";
import * as cp from "child_process";
import { getChildLogger } from "../../log";
import { Disposable } from "vscode";

/**
 *
 * @param jarPath {@link TreeLanguageServer.jarPath}.
 * @param currentWorkingDirectory `vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;`.
 * @param disposables a list to add disposables to
 */
export function connect(
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

  const ping = new rpc.RequestType<
    undefined,
    { receivedAtTimestamp: number },
    Error
  >("ping");

  const helloClient = new rpc.RequestType<
    { message: string },
    { message: string },
    Error
  >("helloClient");

  connection.onRequest(helloClient, (hello) => {
    log.debug("Got hello from server: %s", hello.message);
    return {
      message: "Hello from vscode",
    };
  });

  onServerReady(server).then(() => {
    connection.listen();

    log.debug("Sending ping to server");
    connection.sendRequest(ping, undefined).then((pong) => {
      log.debug("Got a ping from the server: %s", pong.receivedAtTimestamp);
    });
  });
}

function onServerReady(process: cp.ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    const listenAfterReady = (data: String | Buffer) => {
      const message = data.toString();
      if (message.startsWith("[JSON-RPC] Server is ready.")) {
        resolve();
        process.stdout?.off("data", listenAfterReady);
      }
    };

    process.stdout?.on("data", listenAfterReady);
  });
}

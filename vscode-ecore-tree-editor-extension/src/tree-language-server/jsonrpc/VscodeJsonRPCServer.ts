import { ChildProcess } from "child_process";
import { Disposable } from "vscode";
import * as rpc from "vscode-jsonrpc";
import * as rpcNode from "vscode-jsonrpc/node";
import { getChildLogger } from "../../log";
import { helloClientRequest, pingRequest } from "./protocol";

/**
 * This handles any incoming requests and notifications from a TLSP server, using json-rpc.
 *
 * Any method found in the java model-server `no/ntnu/stud/krirek/treelsp/jsonrpc/protocol/Client.java`
 * should be implemented here.
 */
export class VscodeJsonRPCServer implements Disposable {
  private readonly log = getChildLogger("VscodeJsonRPCServer");

  public readonly onReady: Promise<void>;
  protected readonly disposables = new Array<Disposable>();

  constructor(
    public serverConnection: rpc.MessageConnection,
    protected serverProcess: ChildProcess
  ) {
    this.addMessageHandlers();

    this.onReady = onServerReady(serverProcess)
      .then(() => {
        this.log.info(
          "TLSP server is ready. Initializing json-rpc connection."
        );
        this.initializeConnection();
      })
      .catch((err) => {
        this.log.error("Failed to initialize connection", { err });
      });
  }

  protected addMessageHandlers() {
    this.disposables.push(
      this.serverConnection.onRequest(helloClientRequest, (hello) => {
        this.log.debug("Got hello from server: %s", hello.message);
        return {
          message: "Hello from vscode",
        };
      })
    );
  }

  protected initializeConnection() {
    this.serverConnection.onError(
      (err) => {
        this.log.error("Error in json-rpc: %s", { err });
      },
      this,
      this.disposables
    );

    this.serverConnection.listen();

    this.serverConnection.sendRequest(pingRequest, undefined).then((pong) => {
      // FIXME: use the TreeLanguageServer interface instead. Or just remove this test code
      this.log.debug(
        "Got a ping from the server: %s",
        pong.receivedAtTimestamp
      );
    });
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
    this.disposables.length = 0;
  }
}

function onServerReady(process: ChildProcess): Promise<void> {
  const log = getChildLogger("VscodeJsonRPCServer:onServerReady");

  return new Promise((resolve, reject) => {
    let message = "";
    const listenAfterReady = (data: String | Buffer) => {
      const chunk = data.toString();
      log.trace("Got server chunk: %s", chunk);

      message += chunk;
      if (message.includes("[JSON-RPC] Server is ready.")) {
        resolve();
        process.stderr?.off("data", listenAfterReady);
      }
    };

    process.stderr?.on("data", listenAfterReady);
  });
}

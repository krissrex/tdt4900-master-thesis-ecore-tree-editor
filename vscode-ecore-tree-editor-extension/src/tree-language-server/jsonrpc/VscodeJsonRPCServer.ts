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

    this.onReady = onServerReady(serverProcess).then(() => {
      this.initializeConnection();
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
    this.log.debug("TLSP server is ready. Initializing json-rpc connection.");
    this.serverConnection.listen();

    this.serverConnection.sendRequest(pingRequest, undefined).then((pong) => {
      this.log.debug(
        "Got a ping from the server: %s",
        pong.receivedAtTimestamp
      );
    });
  }

  dispose() {}
}

function onServerReady(process: ChildProcess): Promise<void> {
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

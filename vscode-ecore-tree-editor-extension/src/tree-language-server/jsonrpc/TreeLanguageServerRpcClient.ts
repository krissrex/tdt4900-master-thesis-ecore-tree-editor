import { TreeDocument } from "treedocumentmodel";
import {
  TreeLanguageServerClient,
  Workspace,
} from "../TreeLanguageServerClient";
import * as rpc from "vscode-jsonrpc";
import * as protocol from "./protocol";

/**
 * Acts as a facade in front of a remote TLSP server.
 * This just relays any calls to the remote server over json-rpc.
 *
 * Any method found in the java model-server `no/ntnu/stud/krirek/treelsp/jsonrpc/protocol/Server.java`
 * should be implemented here.
 */
export class TreeLanguageServerJsonRpcClient
  implements TreeLanguageServerClient
{
  private _workspace: Workspace;

  constructor(
    protected readonly connection: rpc.MessageConnection,
    public readonly _onReady: Promise<void>
  ) {
    this._workspace = new WorkspaceJsonRpcClient(connection);
  }
  initialize(params: object): Promise<protocol.InitializeResult> {
    return this.connection.sendRequest(protocol.initializeRequest, params);
  }
  shutdown(): Promise<object> {
    return this.connection.sendRequest(protocol.shutdownRequest);
  }
  exit(): void {
    this.connection.sendNotification(protocol.exitNotification);
  }
  ping(): Promise<protocol.PingResult> {
    return this.connection.sendRequest(protocol.pingRequest);
  }
  getModel(modelRequest: protocol.ModelRequest): Promise<TreeDocument> {
    return this.connection.sendRequest(protocol.getModelRequest, modelRequest);
  }

  getDetectedModelUris(): Promise<String[]> {
    return this.connection.sendRequest(protocol.getDetectedModelUrisRequest);
  }
  workspace(): Workspace {
    return this._workspace;
  }
}

class WorkspaceJsonRpcClient implements Workspace {
  constructor(protected readonly connection: rpc.MessageConnection) {}
  setWorkspaceUri(config: protocol.workspace.WorkspaceConfig): void {
    this.connection.sendNotification(
      protocol.workspace.setWorkspaceUriNotification,
      config
    );
  }
}

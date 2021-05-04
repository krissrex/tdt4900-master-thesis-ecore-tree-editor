import * as rpc from "vscode-jsonrpc";
import * as rpcNode from "vscode-jsonrpc/node";
import { TreeDocument } from "treedocumentmodel";

export interface PingResult {
  receivedAtTimestamp: number;
}
export const pingRequest = new rpc.RequestType0<PingResult, Error>("ping");

export const helloClientRequest = new rpc.RequestType<
  { message: string },
  { message: string },
  Error
>("helloClient");

export interface InitializeParams {}
export interface InitializeResult {}

export const initializeRequest = new rpc.RequestType<
  InitializeParams,
  InitializeResult,
  Error
>("initialize");

export const shutdownRequest = new rpc.RequestType0<{}, Error>("shutdown");

export const exitNotification = new rpc.NotificationType0("exit");

export interface ModelRequest {
  modelFileUri: string;
}
export const getModelRequest = new rpc.RequestType<
  ModelRequest,
  TreeDocument,
  Error
>("getModel");

export const getDetectedModelUrisRequest = new rpc.RequestType0<
  Array<string>,
  Error
>("getDetectedModelUris");

export namespace workspace {
  export interface WorkspaceConfig {
    workspaceUri: string;
  }
  export const setWorkspaceUriNotification = new rpc.NotificationType<WorkspaceConfig>(
    "workspace/setWorkspaceUri"
  );
}

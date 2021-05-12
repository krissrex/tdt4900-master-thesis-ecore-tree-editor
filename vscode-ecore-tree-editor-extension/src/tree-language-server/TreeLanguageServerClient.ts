import { TreeDocument } from "treedocumentmodel";
import {
  InitializeParams,
  InitializeResult,
  ModelRequest,
  PingResult,
  workspace,
} from "./jsonrpc/protocol";

/**
 * The methods a tree language server can execute.
 */
export interface TreeLanguageServerClient {
  /**
   * Not a part of the protocol. Allows waiting for the underlying server to be ready.
   */
  _onReady: Promise<void>;

  initialize(params: InitializeParams): Promise<InitializeResult>;
  shutdown(): Promise<object>;

  exit(): void;

  ping(): Promise<PingResult>;

  getModel(modelRequest: ModelRequest): Promise<TreeDocument>;

  getDetectedModelUris(): Promise<string[]>;

  workspace(): Workspace;
}

export interface Workspace {
  setWorkspaceUri(config: workspace.WorkspaceConfig): void;
}

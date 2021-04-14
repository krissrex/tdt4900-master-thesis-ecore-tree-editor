/**
 * A notification does not need a response.
 *
 * **Note:** Loosely based on JSON-RPC 2.0
 */
export interface RpcNotification {
  /**
   * Used to filter the incoming events from e.g. webpack hot reload events.
   */
  from: "extension";
  method: string;
  params: any[];
}

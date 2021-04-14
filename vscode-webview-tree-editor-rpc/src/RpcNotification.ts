export type RpcParams = any[] | Record<string, any> | undefined;

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
  params: RpcParams;
}

/**
 *
 * @param obj any unknown object
 * @returns true if obj is a valid RpcNotification.
 */
export function isNotification(obj: unknown): obj is RpcNotification {
  if (typeof obj !== "object") {
    return false;
  }
  if ("from" in obj && "method" in obj) {
    if (obj["from"] === "extension" && typeof obj["method"] === "string") {
      if ("params" in obj) {
        // Params must be valid if present.
        const params: unknown = obj["params"];
        if (
          Array.isArray(params) ||
          typeof params === "object" ||
          params === undefined
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // No params means undefined, which is ok.
        return true;
      }
    }
  }
  return false;
}

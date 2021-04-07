import { getChildLogger } from "@/logging";
import { RootState } from "@/store";
import { getExampleTreeDocument } from "@/testing/sampleTreeDocument";
import { VSCode } from "@/vscode";

export class MockVSCode implements VSCode {
  private readonly logger = getChildLogger("vscode");

  getState(): RootState {
    const useSampleData = true;
    if (useSampleData) {
      this.logger.warn("Using sample data");
      try {
        return { treeDocument: getExampleTreeDocument(), selectedNodes: [] };
      } catch (err) {
        this.logger.error(
          { err },
          "Failed to load sample data. Returning undefined"
        );
        return undefined;
      }
    } else {
      this.logger.info("Returning empty state");
      return {
        selectedNodes: [],
      };
    }
  }
  setState(state: RootState) {
    this.logger.debug({ newState: state }, "Tried setting state");
    //TODO: persist it, either in a member variable or e.g. localstorage.
  }
  postMessage(message: any) {
    this.logger.debug({ message }, "Sent message");
  }
}

/**
 * An alternative to {@link acquireVsCodeApi} when running outside a VSCode webview.
 *
 * **Note: Not for use in production!**
 */
export const mockVscodeApi: VSCode = new MockVSCode();

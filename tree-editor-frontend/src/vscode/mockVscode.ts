import { getChildLogger } from "@/logging";
import { loadXmi } from "@/testing/sample_xmi";


export class MockVSCode implements VSCode {
  private readonly logger = getChildLogger("vscode");

  getState() {
    const useSampleData = true;
    if (useSampleData) {
      this.logger.warn("Using sample xmi data");
      try {
        return loadXmi();
      } catch (err) {
        this.logger.error({err}, "Failed to load sample xmi data. Returning undefined");
        return undefined;
      }
    } else {
      this.logger.info("Returning empty state");
      return {};
    }
  }
  setState(state: any) {
    this.logger.debug({newState: state}, "Tried setting state");
    //TODO: persist it, either in a member variable or e.g. localstorage.
  }
  postMessage(message: any){
    this.logger.debug({message}, "Sent message");
  }
}

/**
 * An alternative to {@link acquireVsCodeApi} when running outside a VSCode webview.
 * 
 * **Note: Not for use in production!**
 */
 export const mockVscodeApi: VSCode = new MockVSCode();
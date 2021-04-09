import * as assert from "assert";
import { getJavaVersion } from "../../../tree-language-server/TreeLanguageServer";

// Skip: cant run in. Failing to initialize logger first...
describe.skip("getJavaVersion", () => {
  it("Should detect openJDK 11", async () => {
    const version = await getJavaVersion();

    assert.strictEqual(
      version,
      "11.0.3",
      "Java version was not read correctly"
    ); // Would only work if you install java 11.0.3
  });
});

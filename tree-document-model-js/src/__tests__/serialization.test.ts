import { example } from "..";
import { TreeDocument } from "../TreeDocument";

describe("JSON serialization", () => {
  /**
   * Instead of Map and Set, use objects typed with `Record`.
   */
  it("is not possible to JSON serialize maps", () => {
    // Given
    const expected = new Map<string, string>([["myKey", "value"]]);

    // When
    const json = JSON.stringify(expected);
    const actual = JSON.parse(json);

    // Then
    expect(actual).not.toEqual(expected);
    expect(json).toBe("{}");
    expect(actual).not.toHaveProperty("myKey");
    expect(actual["myKey"]).toBeUndefined();
  });

  describe("Ecore example", () => {
    it("Should not change from going object to json to object", () => {
      // Given
      const document = example.ecore.getExampleTreeDocument();

      // When
      const documentJson = JSON.stringify(document);
      const actual = JSON.parse(documentJson) as TreeDocument;

      // Then
      expect(document.roots[0].hierarchy.allowedChildren["EPackage"]).toContain(
        "EClass"
      );
      expect(actual.roots[0].hierarchy.allowedChildren["EPackage"]).toContain(
        "EClass"
      );
      expect(actual.roots[0].hierarchy.allowedChildren).not.toBeInstanceOf(Map);

      expect(actual).toEqual(document);
    });
  });
});

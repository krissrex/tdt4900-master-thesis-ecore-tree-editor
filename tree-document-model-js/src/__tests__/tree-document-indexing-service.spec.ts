import { HierarchyConfiguration } from "../HierarchyConfiguration";
import { TreeDocument } from "../TreeDocument";
import { indexTreeDocument } from "../services/tree-document-indexing-service";

function createDocument(): TreeDocument {
  const doc: TreeDocument = {
    roots: [
      {
        id: "root1",
        actions: { availableActions: [] },
        hierarchy: createHierarchy(),
        rootNode: {
          id: "1",
          type: "any",
          name: "Node1",
          children: [
            {
              id: "2",
              type: "any",
              children: [{ id: "3", type: "any", children: [] }],
            },
          ],
        },
      },
      {
        id: "root2",
        actions: { availableActions: [] },
        hierarchy: createHierarchy(),
        rootNode: {
          id: "4",
          type: "any",
          name: "Node4",
          children: [],
        },
      },
    ],
  };

  return doc;
}

describe("TreeDocument indexing service", () => {
  describe("NodeId to TreeNode Map", () => {
    it("should put all nodes in a map", () => {
      // Given
      const doc = createDocument();

      // When
      const index = indexTreeDocument(doc);
      const map = index.treeNodeById;

      // Then
      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(4);

      const node1 = map.get("1");
      expect(node1).toBeTruthy();
      expect(node1.name).toBe("Node1");

      const node4 = map.get("4");
      expect(node4).toBeTruthy();
      expect(node4.name).toBe("Node4");
    });
  });

  describe("Child NodeId to parent TreeNode Map", () => {
    it("should contain all child nodes with parents", () => {
      // Given
      const doc = createDocument();

      // When
      const index = indexTreeDocument(doc);
      const parentMap = index.treeNodeParentByChildId;

      // Then
      expect(parentMap).toBeInstanceOf(Map);
      expect(parentMap.size).toBe(2);
      expect(parentMap.get("3").id).toBe("2");
      expect(parentMap.get("2").id).toBe("1");
      expect(parentMap.has("1")).toBeFalsy();
    });

    it("should not store root nodes", () => {
      // Given
      const doc = createDocument();

      // When
      const index = indexTreeDocument(doc);
      const parentMap = index.treeNodeParentByChildId;

      // Then
      expect(parentMap).toBeInstanceOf(Map);
      expect(parentMap.has("1")).toBe(false);
      expect(parentMap.has("4")).toBe(false);
    });
  });

  describe("NodeId to TreeRoot Map", () => {
    it("should contain all nodes with correct root", () => {
      // Given
      const doc = createDocument();
      const root1 = doc.roots[0];
      const root2 = doc.roots[1];

      // When
      const index = indexTreeDocument(doc);
      const rootMap = index.treeRootFromNodeId;

      // Then
      expect(rootMap).toBeInstanceOf(Map);
      expect(rootMap.size).toBe(4);

      expect(rootMap.get("1")).toBe(root1);
      expect(rootMap.get("2")).toBe(root1);
      expect(rootMap.get("3")).toBe(root1);

      expect(rootMap.get("4")).toBe(root2);
    });
  });
});

function createHierarchy(): HierarchyConfiguration {
  return {
    roots: new Set("any"),
    allowedChildren: new Map([["any", ["any"]]]),
  };
}

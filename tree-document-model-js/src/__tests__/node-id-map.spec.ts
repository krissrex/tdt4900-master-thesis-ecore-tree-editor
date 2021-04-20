import { HierarchyConfiguration } from "../HierarchyConfiguration";
import { TreeDocument } from "../TreeDocument";
import { indexToMap } from "../util/node-id-map";

describe("NodeId to TreeNode Map", () => {
  it("should put all nodes in a map", () => {
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

    const map = indexToMap(doc);
    expect(map).toBeInstanceOf(Map);
    expect(map.size).toEqual(4);

    const node1 = map.get("1");
    expect(node1).toBeTruthy();
    expect(node1.name).toEqual("Node1");

    const node4 = map.get("4");
    expect(node4).toBeTruthy();
    expect(node4.name).toEqual("Node4");
  });
});

function createHierarchy(): HierarchyConfiguration {
  return {
    roots: new Set("any"),
    allowedChildren: new Map([["any", ["any"]]]),
  };
}

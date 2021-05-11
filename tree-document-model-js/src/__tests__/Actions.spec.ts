import { example } from "..";
import {
  getActionsForSelection,
  getAvailableActions,
} from "../services/Actions";
import { TreeDocument } from "../TreeDocument";
import { TreeRoot } from "../TreeRoot";

describe("getAvailableActions", () => {
  it("should get all actions", () => {
    // Given
    const root1: TreeRoot = {
      actions: {
        availableActions: [
          { id: "1a", name: "1a" },
          { id: "1b", name: "1b" },
        ],
      },
    } as any; // Use any to avoid specifying everything else in TreeRoot
    const root2: TreeRoot = {
      actions: {
        availableActions: [
          { id: "2a", name: "2a" },
          { id: "2b", name: "2b" },
          { id: "2c", name: "2c" },
        ],
      },
    } as any;
    const root3: TreeRoot = {
      actions: {
        availableActions: [],
      },
    } as any;

    const document: TreeDocument = {
      roots: [root1, root2, root3],
    };

    // When
    const actions = getAvailableActions(document);

    // Then
    expect(actions).toHaveLength(5);
    expect(actions).toEqual(
      expect.arrayContaining([
        { id: "1a", name: "1a" },
        { id: "1b", name: "1b" },
        { id: "2a", name: "2a" },
        { id: "2b", name: "2b" },
        { id: "2c", name: "2c" },
      ])
    );
  });
});

describe("getActionsForSelection", () => {
  it("should get intersection of actions when two nodes are selected", () => {
    // Given
    const document = example.ecore.getExampleTreeDocument();
    const root = document.roots[0].rootNode;
    const eClass = root.children[0];
    const eDataType = root.children[1];
    expect(eClass.type).toBe("EClass");
    expect(eDataType.type).toBe("EDataType");
    document.roots[0].actions.availableActions = [
      { id: "default", name: "test" },
      { id: "common", name: "test1" },
      { id: "class", name: "test2" },
      { id: "datatype", name: "test3" },
    ];
    document.roots[0].actions.defaultActionbarActions = ["default"];
    document.roots[0].actions.nodeActions = new Map([
      ["class", ["EClass"]],
      ["datatype", ["EDataType"]],
      ["common", ["EClass", "EDataType"]],
    ]);

    const selection = [eClass, eDataType];

    // When
    const actions = getActionsForSelection(selection, document);

    // Then
    expect(actions).toHaveLength(2);
    expect(actions).toEqual(
      expect.arrayContaining([
        { id: "default", name: "test" },
        { id: "common", name: "test1" },
      ])
    );
  });
});

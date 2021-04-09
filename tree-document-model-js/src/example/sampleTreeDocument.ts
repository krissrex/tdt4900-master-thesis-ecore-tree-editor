import { TreeDocument } from "../TreeDocument";
import { ecoreIcons } from "./ecoreIcons";

export function getExampleTreeDocument(): TreeDocument {
  const doc: TreeDocument = {
    roots: [
      {
        id: "1",
        actions: {
          availableActions: [{ id: "validate", name: "Validate" }],
          defaultActionbarActions: [],
        },
        hierarchy: {
          roots: new Set(["EPackage"]),
          allowedChildren: new Map([["EPackage", ["EClass"]]]),
        },
        icons: {
          icons: ecoreIcons,
        },
        rootNode: {
          id: "2",
          name: "MyPackage",
          type: "EPackage",
          children: [
            {
              id: "3",
              name: "MyClass",
              type: "EClass",
              children: [
                {
                  id: "5",
                  name: undefined,
                  type: "EAttribute",
                  children: [],
                  documentation: "An attribute, like *age* or *name*.",
                },
                {
                  id: "6",
                  name: "GenModel",
                  type: "EAnnotation",
                  children: [],
                  documentation:
                    "An annotation of a model element. Use this to set metadata.",
                },
              ],
              documentation: "A class.",
            },
            {
              id: "4",
              name: "MyDataType",
              type: "EDataType",
              children: [],
              documentation: "A custom data type.",
            },
          ],
          documentation: "A package to contain classes and types",
        },
      },
    ],
  };
  return doc;
}

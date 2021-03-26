import { IconDataUri, NodeType, TreeDocument } from "treedocumentmodel";

import treeDocument from "@/assets/example/TreeDocument";
import { getChildLogger } from "@/logging";

export function getExampleTreeDocument(): TreeDocument {
  const log = getChildLogger("exampleDocument");
  log.warn("Loading sample document");

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

// prettier-ignore
const ecoreIcons: Map<NodeType, IconDataUri> = new Map(
  [
    ["EAnnotation", "data:image/gif;base64,R0lGODlhEAAQAOYAAD0xNlBBR8/KzFhJUE08RFlIUFRETEA0OkM3PXdnb3tvdcS8wFNETF1OVnRjbGVYX5mMk0o/RU1CSHZrcV1NVmFTW3xudpqOlX1zeYR6gIB2fNHMz9rV2GBTW2RXX2lcZGxfZ4J1fUY7Qoh9hI+Ei2hcZGtfZ25iapiPldnW2JSKkdPP0q6prbSus/+M/+zd8IpFoKdourJ6w7R9xbyIzMSV0tKv3d/H5uLM6ePO6ebS7KhsvNm+4vf28/b18tvXze3r5uPf1/Hv6/j39ff29N/a0efj3O3p4+rm4HRlWf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEoALAAAAAAQABAAAAeHgEqCg4SFhoeIiYUsJycsioIggiaQSiUuGR+QEg8pGh4rKKKjoi1KERVDGB09R66vripKIhRECg04NEhINL26JEoIBT4TAy8zRkYzNjbII0oHGwY5DDoyMDAyNTUyQSFKAAJCNwE8O0VFMeoxRRaCSQRJQD/09fUJghwLCxAO/v//LlQaeCgQADs="],
    ["EAttribute", "data:image/gif;base64,R0lGODlhEAAQALMAAPj50fj51vf41vj41mpiP3JmPX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAQABAAAAQoUMlJq7046817TmAYXgdgnsBxIeiJXIYgBMFQG1dB7DxReMCgcDiJAAA7"],
    ["EClass", "data:image/gif;base64,R0lGODlhEAAQAMQAAIKGgYKFgfj50fj51vf41vj41qCYbKGYbG1kP2piP3RoPHBlPXlqOoNvN35sOJN3Mo51NIlyNp18L5t7MJd4MP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABUALAAAAAAQABAAAAVLYCWOZGmeqKSu6ykJcCxI5yTH00kRxDAUP8rpcTAYj48T5AaDnCJMQeTU4PmAhcbJAQh4v44TI8o4KaKK08L6+y1OiIR8nkCg7qIQADs="],
    ["EDataType", "data:image/gif;base64,R0lGODlhEAAQAMQAACo3Z3WGyLK84IKGgYKFgfj50fj51vf41vj41m1kP2piP3RoPHBlPXlqOoNvN35sOP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAQABAAAAVEICSOZGmeaIoGwAgEa8vCr8mKQI7D5T1DtZOghROgHCek6TEgOJ+PU6NArRYap4W1ujgxDgeDATFmnBKKtFqRULnfohAAOw=="],
    ["EEnum", "data:image/gif;base64,R0lGODlhEAAQALMAACo3Z3WGyLK84GpiP3FmPX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAAQwMMlJq7044wAmCFvHgZ/FSUCKgtU5JuUldKig3dQwEMVhILigjucDBm/D3u/IvEQAADs="],
    ["EEnumLiteral", "data:image/gif;base64,R0lGODlhEAAQALMAAGpiP3FmPHFmPX1rOX1sOZV4MYpyNZ18L////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQaEMlJq70468275wAQDEZxZKFAlOfnvnAsaxEAOw=="],
    ["EFactory", "data:image/gif;base64,R0lGODlhEAAQAMQAAKeto3N3cGNmYHt8cpOSgouCV5KJXKGXZ6edbIeEdZqPYZKIXKyhb5WMeKGUe6mZfcK3o9Swe8umdcundcqmdb6Zbb6abaBQQP///8DAwP///wAAAAAAAAAAAAAAAAAAACH5BAEAABoALAAAAAAQABAAAAVQoCaOZGmeaHoy15i9WmYibSy+cnm0rHsqvFrK0NqpIIXHY6FsQkoPAAEgjVgjj5IDIwBwrxFHqSEQEMoUiWTSKCUsFXh8nigF7vj8QMXva0IAOw=="],
    ["EGenericElementType", "data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAMraLrc/jDKuUizD18nxirLIDRD8AQeQwAPoClr+xrlmS7dF46bM1c9ijCSAAA7"],
    ["EGenericException", "data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAMxaLrc/jDKuUizD5tSnRgLpwxCMwThEoAMAaQKoCkubMgmqojG2nwPkkPDm7UulOQkAQA7"],
    ["EGenericSuperType", "data:image/gif;base64,R0lGODlhEAAQALMAAN7h68PJ2qOuyLW+05Glx0dpjwFGegE/bf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQ4EMlJq7046z1N9ReIHJ1FFJJHIgVRFcM4kQNKGcCh7wcgpoHZJPBjCYQSgW1yQrJcH2exdONYNxEAOw=="],
    ["EGenericType", "data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGev///wAAAAAAACH5BAEAAAUALAAAAAAQABAAAAMoWLrc/jDKuUizD18nxhtCMwRP4DEE8ACakq5tMZbn0n3h5sSVTv2RBAA7"],
    ["EGenericTypeArgument", "data:image/gif;base64,R0lGODlhEAAQALMAAN7h68PJ2qOuyLW+05Glx0dpjwFGegE/bf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAQABAAAAQ4EMlJq7046z1N9Rf4WURxFURVCNKBuIhgUkbwTm4gSgYA44AdojC4tRCD2aR0hKEsQh5GGOVYKxEAOw=="],
    ["EGenericWildcard", "data:image/gif;base64,R0lGODlhEAAQAKIAALS70aOuyJGlx0dpjwFGegE/bf///wAAACH5BAEAAAYALAAAAAAQABAAAAM0aLrc/jDKuUizD5etMBODUSzjIDRD0IxByBAAMxqA18XKTNtGSi6tBuhhcnh0vMqFwpwkAAA7"],
    ["EObject", "data:image/gif;base64,R0lGODlhEAAQANUAAN3i6Nni7NHY4NHY3d3k6ODk5eHk4dfa1+Lk4dja1djY19LQwuDczMbDt+jl2eHcy+nl2JiOcenl2d3a0ebk3vXoyNTPwunk2N3Rt+ndwendwuDazPXmyN3QtfXmyerdwuncwfDm0eTRruTRsPXmy/XmzPDl0a6PXquPYIp2VJuKcKmbh7Wrn////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAQABAAAAZgwJZwSCwaj8gkkqVKpVSs5CrSKBQakdWRFQl4v5FoUbUgCM4DgEVlTE0QisMhYaCk2hLIg/HYOC53Yx0hIBoZHyYYbEUsKBweFRySKGJFKyciJCUjJ1pLTU+VSqOkpURBADs="],
    ["EOperation", "data:image/gif;base64,R0lGODlhEAAQAIMAAAAAgD8/Xz9ff19/n3+fv6bK8P/78AAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAgALAAAAAAQABAAAAQ6EMlJq704awGERkBwFEcAZAFRFGqACeNwDMThWcB6GAdBnBYYQUazYQIs38CFCfVKwAzn9qlar9hJBAA7"],
    ["EPackage", "data:image/gif;base64,R0lGODlhEAAQAMQAAHM5hYpFoIRCmX4/klgsZqBXt6xswLV8x5JJqmw2fppNs5tPtJ1StZ1TtaNduqdkvbJ4xbqGy8ec1f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAAQABAAAAVM4CSOZGmeaKpOxFowMAAzxbkckdHgxnIqEQkkEIQoTggD5JFQPhAmAiAQSFipgFYpwEvwAidBkSgUnAbOgHNwcgzegPfAsdKu7vhJCAA7"],
    ["EParameter", "data:image/gif;base64,R0lGODlhEAAQAIcAAAAAgD8/X5mZzIODlz9ff19/n3+fv6bK8MXd9dvq+b/M2azB1czZ5f797/3yxv3xxv3xx/3yx/zmnr2EFv/9+bV6E651ErR7E7qAFbqBFbmAFalvEa91Eq50Eq90E691E6ZrEFpaWgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJEJRZEJThInmAIAJBIlhAAAApFBkP2QAJAQBRIkLAAAABIk/JDuGJEJcJfkwJE+b5E+YgACCBIoPBIoFJEJRZEJThIn6AIAJBIl1AAAApFBkP2QAJAQBRIkfAAAABIlTJDuGJEJcJfkwJE+b5E+YgACCBIojBIoZBIk+DoAAJEHMgAAUToVuDoAAGGQCBIk0AAAAhInFJDuGJEHOP///5EHMpEGq5EG6xIn2AACfAAAAEqTIBInRJEicJEVlpEG6wAAAAAE/AAxeBIlZPAAAJEHMgAAN/AQ2PAAAPBFwBIlPJDuGBIngJDuGJEHOP///5EHMpEGq5EG6wABnAABrQAAAQAAAP38AACAAXC26AAAZxIlgHMAXAAAAAoACJE+iAACGgAAAJEGq+8AABIojAAAxgAAAGUAXGwAY8gAxv38ABIl4AAAArPfoAAAEEqTKHMAXG4AYWIAZHgAbzMAXDQALjUATUqYKGwAY3AAaWUAc2UAXBImSDoAAJEHMgAAAzoHGDoAAHJFcBImIEqYMBIoZJDuGJEHOP///5EHMpEGq5EG66GmIAAADAAAADoAADoAADoBeBInOJEOkToGCJEFbRsL/EqTKBsMAO8AAAAAAEqTIDoBeBInQEqTKAAAAIAYmAAAAHC26BIpHFcwSBIm7AAAEQABAIIJYBIpHAAACTScKcHEDDEMCKimjBxeiwAAEngAAAgAEgAMoQEAAAEAAAEAAEAAAEAAAAAAAAAAAAAAAAcAAHAQANQAACH5BAEAACMALAAAAAAQABAAAAhsAEcIHEiwoMGDCBMqFEgAAIGEEyYIGCDigIgAAA5OaDCBAYIDBg4EGIihZMkGDTAoCFHAgIiHIyo4mEnTQYURIgwYyDjCg0+fEiR4WNnypcENEjYkWKCzwEiDIEBMzHmRZ8KGMBdq3cq164iAADs="],
    ["EReference", "data:image/gif;base64,R0lGODlhEAAQAMQAAE9UXkxgdEV/qEhzkjdAQvj50fj51vf41mpiP3JmPcC4n31sOZV4MYpyNcu9m518L////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAQABAAAAU0ICSOZGmeaKqubJs+cAxDgMkUeO7QRNnkBYFgEAAAeqPF4WBoGhS8UgJBrSZorqx2yxWFAAA7"],
    ["EStringToStringMapEntry", "data:image/gif;base64,R0lGODlhEAAQAMQAAHdnb3RjbHxudpqOlYJ1fYh9hI+Ei5iPlZSKkbSus4pFoKdourJ6w7R9xbyIzMSV0tKv3ahsvNvXzePf19/a0efj3O3p4+rm4P///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAAQABAAAAVSICaOZGmeaKqqyeG+8JtgiGXf+I1gxuX8josQGDRgCpUGBNKoOJXMSgFDmDAeD4Zie81OCBgBZUGOUM5kMkWAAUje8DgcgBkE7vg8frDq+/9/IQA7"],
    ["ETypeParameter", "data:image/gif;base64,R0lGODlhEAAQAMQAANrd6LS70aOuyJGlx0dpj6O0x9La4wFGeuDp7/z62/797/vyufvusPvll72EFrZ8FLZ9Fa1yEq1zEqZrEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAQABAAAAVQICWOZGmeaKquouOUBxWXjvKKs9y6tU0NhBFhQHEkjkiHQTASBB+LqJQBAYwCMUljy40gAtfYZDzZTigFpshJKp9/QdGw/caNcqkYnsUvhQAAOw=="],
  ]
);

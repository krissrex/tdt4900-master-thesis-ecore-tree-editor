import { XmiResource } from "crossecore";
import { TreeDocument } from "treedocumentmodel/TreeDocument";
import { TreedocumentmodelPackageImpl } from "treedocumentmodel/TreedocumentmodelPackageImpl";
import { TreedocumentmodelFactoryImpl } from "treedocumentmodel/TreedocumentmodelFactoryImpl";

import treeDocument from "@/assets/example/TreeDocument.xmi.ts";
import { TreeNode } from "local_node_modules/treedocumentmodel/TreeNode";

export function loadXmi(): TreeDocument {
  const resource = new XmiResource(
    TreedocumentmodelPackageImpl.eINSTANCE,
    TreedocumentmodelFactoryImpl.eINSTANCE,
    new DOMParser()
  );
  debugger;
  const doc = resource.load(treeDocument) as TreeDocument;
  //const doc = TreedocumentmodelFactoryImpl.eINSTANCE.createTreeDocument();
  //const root = TreedocumentmodelFactoryImpl.eINSTANCE.createTreeRoot();
  //doc.roots.add(root);
  //const rootNode: TreeNode = TreedocumentmodelFactoryImpl.eINSTANCE.createTreeNode();
  //rootNode.name = "MyPackage";
  //rootNode.type = "EPackage";
  //root.rootNode = rootNode;
  return doc;
}

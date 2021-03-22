import { XmiResource } from "crossecore";
import { TreeDocument } from "treedocumentmodel/TreeDocument";
import { TreedocumentmodelPackageImpl } from "treedocumentmodel/TreedocumentmodelPackageImpl";
import { TreedocumentmodelFactoryImpl } from "treedocumentmodel/TreedocumentmodelFactoryImpl";

import treeDocument from "@/assets/example/TreeDocument";
import { getChildLogger } from "@/logging";

export function loadXmi(): TreeDocument {
  const log = getChildLogger("loadXmi");
  log.warn("Loading sample xmi");
  const resource = new XmiResource(
    TreedocumentmodelPackageImpl.eINSTANCE,
    TreedocumentmodelFactoryImpl.eINSTANCE,
    new DOMParser()
  );
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

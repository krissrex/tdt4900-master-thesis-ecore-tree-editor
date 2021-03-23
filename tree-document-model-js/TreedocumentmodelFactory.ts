import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {Action} from "./Action";
import {NodeTypeToIconDataUriMap} from "./NodeTypeToIconDataUriMap";
import {TreeNode} from "./TreeNode";
import {ActionEvent} from "./ActionEvent";
import {IconConfiguration} from "./IconConfiguration";
import {TreeRoot} from "./TreeRoot";
import {TreeDocument} from "./TreeDocument";
import {ActionConfiguration} from "./ActionConfiguration";
import {NodeIcon} from "./NodeIcon";
import {NodeTypeToNodeTypesMap} from "./NodeTypeToNodeTypesMap";
import {ActionIdToNodeTypeMap} from "./ActionIdToNodeTypeMap";
import {EFactory} from "crossecore/lib/EFactory";
export interface TreedocumentmodelFactory extends EFactory{
	createTreeDocument():TreeDocument;
	createTreeRoot():TreeRoot;
	createTreeNode():TreeNode;
	createHierarchyConfiguration():HierarchyConfiguration;
	createNodeTypeToNodeTypesMap():NodeTypeToNodeTypesMap;
	createAction():Action;
	createActionEvent():ActionEvent;
	createActionConfiguration():ActionConfiguration;
	createActionIdToNodeTypeMap():ActionIdToNodeTypeMap;
	createIconConfiguration():IconConfiguration;
	createNodeIcon():NodeIcon;
	createNodeTypeToIconDataUriMap():NodeTypeToIconDataUriMap;
}

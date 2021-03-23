import {EClass} from "crossecore/lib/EClass";
import {EAttribute} from "crossecore/lib/EAttribute";
import {EDataType} from "crossecore/lib/EDataType";
import {EReference} from "crossecore/lib/EReference";
import {EPackage} from "crossecore/lib/EPackage";
export interface TreedocumentmodelPackage extends EPackage {
	getTreeDocument():EClass;
	getTreeDocument_Roots():EReference;
	
	getTreeRoot():EClass;
	getTreeRoot_RootNode():EReference;
	getTreeRoot_Actions():EReference;
	getTreeRoot_Hierarchy():EReference;
	getTreeRoot_Icons():EReference;
	
	getTreeRoot_Id():EAttribute;
	getTreeNode():EClass;
	getTreeNode_Children():EReference;
	getTreeNode_Parent():EReference;
	getTreeNode_IconOverride():EReference;
	
	getTreeNode_Id():EAttribute;
	getTreeNode_Type():EAttribute;
	getTreeNode_Name():EAttribute;
	getTreeNode_Documentation():EAttribute;
	getHierarchyConfiguration():EClass;
	getHierarchyConfiguration_AllowedChildren():EReference;
	
	getHierarchyConfiguration_Roots():EAttribute;
	getNodeTypeToNodeTypesMap():EClass;
	
	getNodeTypeToNodeTypesMap_Key():EAttribute;
	getNodeTypeToNodeTypesMap_Value():EAttribute;
	getAction():EClass;
	
	getAction_Id():EAttribute;
	getAction_Name():EAttribute;
	getAction_Icon():EAttribute;
	getActionEvent():EClass;
	getActionEvent_TargetNodes():EReference;
	getActionEvent_Action():EReference;
	
	getActionConfiguration():EClass;
	getActionConfiguration_AvailableActions():EReference;
	getActionConfiguration_DefaultActionbarActions():EReference;
	getActionConfiguration_NodeActions():EReference;
	
	getActionIdToNodeTypeMap():EClass;
	
	getActionIdToNodeTypeMap_Key():EAttribute;
	getActionIdToNodeTypeMap_Value():EAttribute;
	getIconConfiguration():EClass;
	getIconConfiguration_Icons():EReference;
	
	getNodeIcon():EClass;
	
	getNodeIcon_Icons():EAttribute;
	getNodeTypeToIconDataUriMap():EClass;
	
	getNodeTypeToIconDataUriMap_Key():EAttribute;
	getNodeTypeToIconDataUriMap_Value():EAttribute;
	getNodeType():EDataType;
	getActionId():EDataType;
	getIconDataUri():EDataType;
}
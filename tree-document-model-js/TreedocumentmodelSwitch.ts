import {Action} from "./Action";
import {ActionEvent} from "./ActionEvent";
import {IconConfiguration} from "./IconConfiguration";
import {TreeDocument} from "./TreeDocument";
import {TreedocumentmodelPackageImpl} from "./TreedocumentmodelPackageImpl";
import {NodeTypeToNodeTypesMap} from "./NodeTypeToNodeTypesMap";
import {ActionIdToNodeTypeMap} from "./ActionIdToNodeTypeMap";
import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {NodeTypeToIconDataUriMap} from "./NodeTypeToIconDataUriMap";
import {TreeNode} from "./TreeNode";
import {TreeRoot} from "./TreeRoot";
import {ActionConfiguration} from "./ActionConfiguration";
import {TreedocumentmodelPackage} from "./TreedocumentmodelPackage";
import {NodeIcon} from "./NodeIcon";
import {Switch} from "crossecore/lib/Switch";
import {EObject} from "crossecore/lib/EObject";
import {EPackage} from "crossecore/lib/EPackage";
export class TreedocumentmodelSwitch<T> extends Switch<T> {
	protected static modelPackage:TreedocumentmodelPackage;
	
	constructor(){
		super();
		if (TreedocumentmodelSwitch.modelPackage == null) {
			TreedocumentmodelSwitch.modelPackage = TreedocumentmodelPackageImpl.eINSTANCE;
		}	
	}
	
	public isSwitchFor(ePackage:EPackage):boolean{
		return ePackage === TreedocumentmodelSwitch.modelPackage;
	}
	
	public doSwitch3(classifierID:number, theEObject:EObject):T {
		switch (classifierID) {
			case TreedocumentmodelPackageImpl.TREEDOCUMENT: {
				let obj:TreeDocument = <TreeDocument>theEObject;
				let result:T = this.caseTreeDocument(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.TREEROOT: {
				let obj:TreeRoot = <TreeRoot>theEObject;
				let result:T = this.caseTreeRoot(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.TREENODE: {
				let obj:TreeNode = <TreeNode>theEObject;
				let result:T = this.caseTreeNode(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.HIERARCHYCONFIGURATION: {
				let obj:HierarchyConfiguration = <HierarchyConfiguration>theEObject;
				let result:T = this.caseHierarchyConfiguration(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.NODETYPETONODETYPESMAP: {
				let obj:NodeTypeToNodeTypesMap = <NodeTypeToNodeTypesMap>theEObject;
				let result:T = this.caseNodeTypeToNodeTypesMap(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.ACTION: {
				let obj:Action = <Action>theEObject;
				let result:T = this.caseAction(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.ACTIONEVENT: {
				let obj:ActionEvent = <ActionEvent>theEObject;
				let result:T = this.caseActionEvent(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.ACTIONCONFIGURATION: {
				let obj:ActionConfiguration = <ActionConfiguration>theEObject;
				let result:T = this.caseActionConfiguration(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.ACTIONIDTONODETYPEMAP: {
				let obj:ActionIdToNodeTypeMap = <ActionIdToNodeTypeMap>theEObject;
				let result:T = this.caseActionIdToNodeTypeMap(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.ICONCONFIGURATION: {
				let obj:IconConfiguration = <IconConfiguration>theEObject;
				let result:T = this.caseIconConfiguration(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.NODEICON: {
				let obj:NodeIcon = <NodeIcon>theEObject;
				let result:T = this.caseNodeIcon(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case TreedocumentmodelPackageImpl.NODETYPETOICONDATAURIMAP: {
				let obj:NodeTypeToIconDataUriMap = <NodeTypeToIconDataUriMap>theEObject;
				let result:T = this.caseNodeTypeToIconDataUriMap(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			default: return this.defaultCase(theEObject);
		}
	}
	
	
	public caseTreeDocument(object:TreeDocument):T {
		return null;
	}
	public caseTreeRoot(object:TreeRoot):T {
		return null;
	}
	public caseTreeNode(object:TreeNode):T {
		return null;
	}
	public caseHierarchyConfiguration(object:HierarchyConfiguration):T {
		return null;
	}
	public caseNodeTypeToNodeTypesMap(object:NodeTypeToNodeTypesMap):T {
		return null;
	}
	public caseAction(object:Action):T {
		return null;
	}
	public caseActionEvent(object:ActionEvent):T {
		return null;
	}
	public caseActionConfiguration(object:ActionConfiguration):T {
		return null;
	}
	public caseActionIdToNodeTypeMap(object:ActionIdToNodeTypeMap):T {
		return null;
	}
	public caseIconConfiguration(object:IconConfiguration):T {
		return null;
	}
	public caseNodeIcon(object:NodeIcon):T {
		return null;
	}
	public caseNodeTypeToIconDataUriMap(object:NodeTypeToIconDataUriMap):T {
		return null;
	}
	
}


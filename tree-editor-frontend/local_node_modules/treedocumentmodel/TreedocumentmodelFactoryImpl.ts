import {TreeNodeImpl} from "./TreeNodeImpl";
import {TreeDocumentImpl} from "./TreeDocumentImpl";
import {Action} from "./Action";
import {ActionEvent} from "./ActionEvent";
import {IconConfiguration} from "./IconConfiguration";
import {NodeTypeToNodeTypesMapImpl} from "./NodeTypeToNodeTypesMapImpl";
import {NodeTypeToIconDataUriMapImpl} from "./NodeTypeToIconDataUriMapImpl";
import {NodeTypeToNodeTypesMap} from "./NodeTypeToNodeTypesMap";
import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {NodeTypeToIconDataUriMap} from "./NodeTypeToIconDataUriMap";
import {IconConfigurationImpl} from "./IconConfigurationImpl";
import {ActionIdToNodeTypeMapImpl} from "./ActionIdToNodeTypeMapImpl";
import {TreeNode} from "./TreeNode";
import {HierarchyConfigurationImpl} from "./HierarchyConfigurationImpl";
import {ActionConfigurationImpl} from "./ActionConfigurationImpl";
import {ActionEventImpl} from "./ActionEventImpl";
import {NodeIconImpl} from "./NodeIconImpl";
import {TreedocumentmodelFactory} from "./TreedocumentmodelFactory";
import {TreeDocument} from "./TreeDocument";
import {TreedocumentmodelPackageImpl} from "./TreedocumentmodelPackageImpl";
import {ActionIdToNodeTypeMap} from "./ActionIdToNodeTypeMap";
import {TreeRoot} from "./TreeRoot";
import {ActionImpl} from "./ActionImpl";
import {ActionConfiguration} from "./ActionConfiguration";
import {TreeRootImpl} from "./TreeRootImpl";
import {NodeIcon} from "./NodeIcon";
import {EFactoryImpl} from "crossecore/lib/EFactoryImpl";
import {EClass} from "crossecore/lib/EClass";
import {EDataType} from "crossecore/lib/EDataType";
import {EObject} from "crossecore/lib/EObject";
export class TreedocumentmodelFactoryImpl extends EFactoryImpl implements TreedocumentmodelFactory{
	public static eINSTANCE : TreedocumentmodelFactory = TreedocumentmodelFactoryImpl.init();
	public static init() : TreedocumentmodelFactory 
	{
		return new TreedocumentmodelFactoryImpl();
	}
	
	public createTreeDocument = () : TreeDocument => {
		let theTreeDocument = new TreeDocumentImpl();
		
		
		return theTreeDocument;
	}
	public createTreeRoot = () : TreeRoot => {
		let theTreeRoot = new TreeRootImpl();
		
		
		return theTreeRoot;
	}
	public createTreeNode = () : TreeNode => {
		let theTreeNode = new TreeNodeImpl();
		
		
		return theTreeNode;
	}
	public createHierarchyConfiguration = () : HierarchyConfiguration => {
		let theHierarchyConfiguration = new HierarchyConfigurationImpl();
		
		
		return theHierarchyConfiguration;
	}
	public createNodeTypeToNodeTypesMap = () : NodeTypeToNodeTypesMap => {
		let theNodeTypeToNodeTypesMap = new NodeTypeToNodeTypesMapImpl();
		
		
		return theNodeTypeToNodeTypesMap;
	}
	public createAction = () : Action => {
		let theAction = new ActionImpl();
		
		
		return theAction;
	}
	public createActionEvent = () : ActionEvent => {
		let theActionEvent = new ActionEventImpl();
		
		
		return theActionEvent;
	}
	public createActionConfiguration = () : ActionConfiguration => {
		let theActionConfiguration = new ActionConfigurationImpl();
		
		
		return theActionConfiguration;
	}
	public createActionIdToNodeTypeMap = () : ActionIdToNodeTypeMap => {
		let theActionIdToNodeTypeMap = new ActionIdToNodeTypeMapImpl();
		
		
		return theActionIdToNodeTypeMap;
	}
	public createIconConfiguration = () : IconConfiguration => {
		let theIconConfiguration = new IconConfigurationImpl();
		
		
		return theIconConfiguration;
	}
	public createNodeIcon = () : NodeIcon => {
		let theNodeIcon = new NodeIconImpl();
		
		
		return theNodeIcon;
	}
	public createNodeTypeToIconDataUriMap = () : NodeTypeToIconDataUriMap => {
		let theNodeTypeToIconDataUriMap = new NodeTypeToIconDataUriMapImpl();
		
		
		return theNodeTypeToIconDataUriMap;
	}
	
	public create(eClass:EClass):EObject {
		switch (eClass.getClassifierID()) {
			case TreedocumentmodelPackageImpl.TREEDOCUMENT: return this.createTreeDocument();
			case TreedocumentmodelPackageImpl.TREEROOT: return this.createTreeRoot();
			case TreedocumentmodelPackageImpl.TREENODE: return this.createTreeNode();
			case TreedocumentmodelPackageImpl.HIERARCHYCONFIGURATION: return this.createHierarchyConfiguration();
			case TreedocumentmodelPackageImpl.NODETYPETONODETYPESMAP: return this.createNodeTypeToNodeTypesMap();
			case TreedocumentmodelPackageImpl.ACTION: return this.createAction();
			case TreedocumentmodelPackageImpl.ACTIONEVENT: return this.createActionEvent();
			case TreedocumentmodelPackageImpl.ACTIONCONFIGURATION: return this.createActionConfiguration();
			case TreedocumentmodelPackageImpl.ACTIONIDTONODETYPEMAP: return this.createActionIdToNodeTypeMap();
			case TreedocumentmodelPackageImpl.ICONCONFIGURATION: return this.createIconConfiguration();
			case TreedocumentmodelPackageImpl.NODEICON: return this.createNodeIcon();
			case TreedocumentmodelPackageImpl.NODETYPETOICONDATAURIMAP: return this.createNodeTypeToIconDataUriMap();
			default:
				throw new Error("The class '" + eClass.name + "' is not a valid classifier");
		}
	}
	
	
	public createFromString(eDataType:EDataType, initialValue:string):any {
		switch (eDataType.getClassifierID()) {
		case TreedocumentmodelPackageImpl.NODETYPE:
			return this.createNodeTypeFromString(eDataType, initialValue);
		case TreedocumentmodelPackageImpl.ACTIONID:
			return this.createActionIdFromString(eDataType, initialValue);
		case TreedocumentmodelPackageImpl.ICONDATAURI:
			return this.createIconDataUriFromString(eDataType, initialValue);
		default:
			throw new Error("The datatype '" + eDataType.name + "' is not a valid classifier");
		}
	}
	public convertToString(eDataType:EDataType, instanceValue:any):string {
		switch (eDataType.getClassifierID()) {
		case TreedocumentmodelPackageImpl.NODETYPE:
			return this.convertNodeTypeToString(eDataType, instanceValue);
		case TreedocumentmodelPackageImpl.ACTIONID:
			return this.convertActionIdToString(eDataType, instanceValue);
		case TreedocumentmodelPackageImpl.ICONDATAURI:
			return this.convertIconDataUriToString(eDataType, instanceValue);
		default:
			throw new Error("The datatype '" + eDataType.name + "' is not a valid classifier");
		}
	}
	
	
	public createNodeTypeFromString(eDataType:EDataType, initialValue:string):string {

		return initialValue == null ? null : JSON.parse(initialValue);
	}
	
	public convertNodeTypeToString(eDataType:EDataType, instanceValue:any):string {
		return instanceValue === null ? null : JSON.stringify(instanceValue);
	}
	public createActionIdFromString(eDataType:EDataType, initialValue:string):string {

		return initialValue == null ? null : JSON.parse(initialValue);
	}
	
	public convertActionIdToString(eDataType:EDataType, instanceValue:any):string {
		return instanceValue === null ? null : JSON.stringify(instanceValue);
	}
	public createIconDataUriFromString(eDataType:EDataType, initialValue:string):string {

		return initialValue == null ? null : JSON.parse(initialValue);
	}
	
	public convertIconDataUriToString(eDataType:EDataType, instanceValue:any):string {
		return instanceValue === null ? null : JSON.stringify(instanceValue);
	}
}

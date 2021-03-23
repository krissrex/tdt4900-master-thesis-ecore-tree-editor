import {TreeNodeImpl} from "./TreeNodeImpl";
import {TreeDocumentImpl} from "./TreeDocumentImpl";
import {IconConfigurationBase} from "./IconConfigurationBase";
import {TreeRootBase} from "./TreeRootBase";
import {NodeTypeToNodeTypesMapImpl} from "./NodeTypeToNodeTypesMapImpl";
import {NodeTypeToIconDataUriMapImpl} from "./NodeTypeToIconDataUriMapImpl";
import {TreeNodeBase} from "./TreeNodeBase";
import {IconConfigurationImpl} from "./IconConfigurationImpl";
import {ActionIdToNodeTypeMapImpl} from "./ActionIdToNodeTypeMapImpl";
import {HierarchyConfigurationImpl} from "./HierarchyConfigurationImpl";
import {ActionConfigurationImpl} from "./ActionConfigurationImpl";
import {TreeDocumentBase} from "./TreeDocumentBase";
import {NodeTypeToNodeTypesMapBase} from "./NodeTypeToNodeTypesMapBase";
import {ActionEventImpl} from "./ActionEventImpl";
import {HierarchyConfigurationBase} from "./HierarchyConfigurationBase";
import {ActionConfigurationBase} from "./ActionConfigurationBase";
import {NodeIconImpl} from "./NodeIconImpl";
import {ActionBase} from "./ActionBase";
import {ActionEventBase} from "./ActionEventBase";
import {ActionIdToNodeTypeMapBase} from "./ActionIdToNodeTypeMapBase";
import {ActionImpl} from "./ActionImpl";
import {NodeTypeToIconDataUriMapBase} from "./NodeTypeToIconDataUriMapBase";
import {NodeIconBase} from "./NodeIconBase";
import {TreedocumentmodelPackage} from "./TreedocumentmodelPackage";
import {TreeRootImpl} from "./TreeRootImpl";
import {EFactory} from "crossecore/lib/EFactory";
import {EPackageImpl} from "crossecore/lib/EPackageImpl";
import {EClass} from "crossecore/lib/EClass";
import {EAttribute} from "crossecore/lib/EAttribute";
import {EcorePackageImpl} from "crossecore/lib/EcorePackageImpl";
import {EDataType} from "crossecore/lib/EDataType";
import {EOperation} from "crossecore/lib/EOperation";
import {EcoreFactoryImpl} from "crossecore/lib/EcoreFactoryImpl";
import {EReference} from "crossecore/lib/EReference";
export class TreedocumentmodelPackageImpl extends EPackageImpl implements TreedocumentmodelPackage{
		public static eNAME:string = "treedocumentmodel";
		
		public static eNS_URI:string = "http://stud.ntnu.no/krirek/2021/treedocumentmodel";
		
		public static eNS_PREFIX:string = "TreeDocumentModel";
		
		
		
		/*
		constructor(){
			//no private constructors in TypeScript
			super(TreedocumentmodelPackageImpl.eNS_URI, TreedocumentmodelFactoryImpl.eINSTANCE as any as EFactory);
		}
		*/
		
		public static init():TreedocumentmodelPackage
		{

	        // Obtain or create and register package
	        let theTreedocumentmodelPackage = new TreedocumentmodelPackageImpl();
	        theTreedocumentmodelPackage.ecorePackage = EcorePackageImpl.eINSTANCE;
	        theTreedocumentmodelPackage.ecoreFactory = EcoreFactoryImpl.eINSTANCE;
	
	        // Create package meta-data objects
	        theTreedocumentmodelPackage.createPackageContents();
	
	        // Initialize created meta-data
	        theTreedocumentmodelPackage.initializePackageContents();

	        return theTreedocumentmodelPackage;
        }
        
        private isCreated:boolean = false;
        
        public createPackageContents = ():void =>
        {
            if (this.isCreated) return;
            this.isCreated = true;
			this.TreeDocumentEClass = this.createEClass(TreedocumentmodelPackageImpl.TREEDOCUMENT);
			TreeDocumentBase.eStaticClass = this.TreeDocumentEClass;
			this.createEReference(this.TreeDocumentEClass, TreedocumentmodelPackageImpl.TREE_DOCUMENT__ROOTS);
			this.TreeRootEClass = this.createEClass(TreedocumentmodelPackageImpl.TREEROOT);
			TreeRootBase.eStaticClass = this.TreeRootEClass;
			this.createEAttribute(this.TreeRootEClass, TreedocumentmodelPackageImpl.TREE_ROOT__ID);
			this.createEReference(this.TreeRootEClass, TreedocumentmodelPackageImpl.TREE_ROOT__ROOT_NODE);
			this.createEReference(this.TreeRootEClass, TreedocumentmodelPackageImpl.TREE_ROOT__ACTIONS);
			this.createEReference(this.TreeRootEClass, TreedocumentmodelPackageImpl.TREE_ROOT__HIERARCHY);
			this.createEReference(this.TreeRootEClass, TreedocumentmodelPackageImpl.TREE_ROOT__ICONS);
			this.TreeNodeEClass = this.createEClass(TreedocumentmodelPackageImpl.TREENODE);
			TreeNodeBase.eStaticClass = this.TreeNodeEClass;
			this.createEAttribute(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__ID);
			this.createEAttribute(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__TYPE);
			this.createEAttribute(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__NAME);
			this.createEAttribute(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__DOCUMENTATION);
			this.createEReference(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__CHILDREN);
			this.createEReference(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__PARENT);
			this.createEReference(this.TreeNodeEClass, TreedocumentmodelPackageImpl.TREE_NODE__ICON_OVERRIDE);
			this.HierarchyConfigurationEClass = this.createEClass(TreedocumentmodelPackageImpl.HIERARCHYCONFIGURATION);
			HierarchyConfigurationBase.eStaticClass = this.HierarchyConfigurationEClass;
			this.createEReference(this.HierarchyConfigurationEClass, TreedocumentmodelPackageImpl.HIERARCHY_CONFIGURATION__ALLOWED_CHILDREN);
			this.createEAttribute(this.HierarchyConfigurationEClass, TreedocumentmodelPackageImpl.HIERARCHY_CONFIGURATION__ROOTS);
			this.NodeTypeToNodeTypesMapEClass = this.createEClass(TreedocumentmodelPackageImpl.NODETYPETONODETYPESMAP);
			NodeTypeToNodeTypesMapBase.eStaticClass = this.NodeTypeToNodeTypesMapEClass;
			this.createEAttribute(this.NodeTypeToNodeTypesMapEClass, TreedocumentmodelPackageImpl.NODE_TYPE_TO_NODE_TYPES_MAP__KEY);
			this.createEAttribute(this.NodeTypeToNodeTypesMapEClass, TreedocumentmodelPackageImpl.NODE_TYPE_TO_NODE_TYPES_MAP__VALUE);
			this.ActionEClass = this.createEClass(TreedocumentmodelPackageImpl.ACTION);
			ActionBase.eStaticClass = this.ActionEClass;
			this.createEAttribute(this.ActionEClass, TreedocumentmodelPackageImpl.ACTION__ID);
			this.createEAttribute(this.ActionEClass, TreedocumentmodelPackageImpl.ACTION__NAME);
			this.createEAttribute(this.ActionEClass, TreedocumentmodelPackageImpl.ACTION__ICON);
			this.ActionEventEClass = this.createEClass(TreedocumentmodelPackageImpl.ACTIONEVENT);
			ActionEventBase.eStaticClass = this.ActionEventEClass;
			this.createEReference(this.ActionEventEClass, TreedocumentmodelPackageImpl.ACTION_EVENT__TARGET_NODES);
			this.createEReference(this.ActionEventEClass, TreedocumentmodelPackageImpl.ACTION_EVENT__ACTION);
			this.ActionConfigurationEClass = this.createEClass(TreedocumentmodelPackageImpl.ACTIONCONFIGURATION);
			ActionConfigurationBase.eStaticClass = this.ActionConfigurationEClass;
			this.createEReference(this.ActionConfigurationEClass, TreedocumentmodelPackageImpl.ACTION_CONFIGURATION__AVAILABLE_ACTIONS);
			this.createEReference(this.ActionConfigurationEClass, TreedocumentmodelPackageImpl.ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS);
			this.createEReference(this.ActionConfigurationEClass, TreedocumentmodelPackageImpl.ACTION_CONFIGURATION__NODE_ACTIONS);
			this.ActionIdToNodeTypeMapEClass = this.createEClass(TreedocumentmodelPackageImpl.ACTIONIDTONODETYPEMAP);
			ActionIdToNodeTypeMapBase.eStaticClass = this.ActionIdToNodeTypeMapEClass;
			this.createEAttribute(this.ActionIdToNodeTypeMapEClass, TreedocumentmodelPackageImpl.ACTION_ID_TO_NODE_TYPE_MAP__KEY);
			this.createEAttribute(this.ActionIdToNodeTypeMapEClass, TreedocumentmodelPackageImpl.ACTION_ID_TO_NODE_TYPE_MAP__VALUE);
			this.IconConfigurationEClass = this.createEClass(TreedocumentmodelPackageImpl.ICONCONFIGURATION);
			IconConfigurationBase.eStaticClass = this.IconConfigurationEClass;
			this.createEReference(this.IconConfigurationEClass, TreedocumentmodelPackageImpl.ICON_CONFIGURATION__ICONS);
			this.NodeIconEClass = this.createEClass(TreedocumentmodelPackageImpl.NODEICON);
			NodeIconBase.eStaticClass = this.NodeIconEClass;
			this.createEAttribute(this.NodeIconEClass, TreedocumentmodelPackageImpl.NODE_ICON__ICONS);
			this.NodeTypeToIconDataUriMapEClass = this.createEClass(TreedocumentmodelPackageImpl.NODETYPETOICONDATAURIMAP);
			NodeTypeToIconDataUriMapBase.eStaticClass = this.NodeTypeToIconDataUriMapEClass;
			this.createEAttribute(this.NodeTypeToIconDataUriMapEClass, TreedocumentmodelPackageImpl.NODE_TYPE_TO_ICON_DATA_URI_MAP__KEY);
			this.createEAttribute(this.NodeTypeToIconDataUriMapEClass, TreedocumentmodelPackageImpl.NODE_TYPE_TO_ICON_DATA_URI_MAP__VALUE);
			
			
			this.NodeTypeEDataType = this.createEDataType(TreedocumentmodelPackageImpl.NODETYPE);
			this.ActionIdEDataType = this.createEDataType(TreedocumentmodelPackageImpl.ACTIONID);
			this.IconDataUriEDataType = this.createEDataType(TreedocumentmodelPackageImpl.ICONDATAURI);
        }
        private isInitialized:boolean = false;
        public initializePackageContents=():void =>
        {
            if (this.isInitialized) return;
            this.isInitialized = true;
            // Initialize package
            this.name = TreedocumentmodelPackageImpl.eNAME;
            this.nsPrefix = TreedocumentmodelPackageImpl.eNS_PREFIX;
            this.nsURI = TreedocumentmodelPackageImpl.eNS_URI;

			
			
			
			
			
			
			
			
			
			
			
			
			var op:EOperation = null;
			
			this.initEClass(
			this.TreeDocumentEClass,
			TreeDocumentImpl, 
			"TreeDocument", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			
			this.initEReference(
				this.getTreeDocument_Roots(),
				this.getTreeRoot(), 
				null, 
				"roots", 
				null, 
				0, 
				-1, 
				TreeDocumentImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.TreeRootEClass,
			TreeRootImpl, 
			"TreeRoot", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getTreeRoot_Id(), 
				this.ecorePackage.getEString(), 
				"id", 
				null, 
				1, 
				1, 
				TreeRootImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			this.initEReference(
				this.getTreeRoot_RootNode(),
				this.getTreeNode(), 
				null, 
				"rootNode", 
				null, 
				0, 
				1, 
				TreeRootImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTreeRoot_Actions(),
				this.getActionConfiguration(), 
				null, 
				"actions", 
				null, 
				1, 
				1, 
				TreeRootImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTreeRoot_Hierarchy(),
				this.getHierarchyConfiguration(), 
				null, 
				"hierarchy", 
				null, 
				1, 
				1, 
				TreeRootImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTreeRoot_Icons(),
				this.getIconConfiguration(), 
				null, 
				"icons", 
				null, 
				0, 
				1, 
				TreeRootImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.TreeNodeEClass,
			TreeNodeImpl, 
			"TreeNode", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getTreeNode_Id(), 
				this.ecorePackage.getEString(), 
				"id", 
				null, 
				1, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getTreeNode_Type(), 
				this.ecorePackage.getEString(), 
				"type", 
				null, 
				1, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getTreeNode_Name(), 
				this.ecorePackage.getEString(), 
				"name", 
				null, 
				0, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getTreeNode_Documentation(), 
				this.ecorePackage.getEString(), 
				"documentation", 
				null, 
				0, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			this.initEReference(
				this.getTreeNode_Children(),
				this.getTreeNode(), 
				this.getTreeNode_Parent(), 
				"children", 
				null, 
				0, 
				-1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTreeNode_Parent(),
				this.getTreeNode(), 
				this.getTreeNode_Children(), 
				"parent", 
				null, 
				0, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTreeNode_IconOverride(),
				this.getNodeIcon(), 
				null, 
				"iconOverride", 
				null, 
				0, 
				1, 
				TreeNodeImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.HierarchyConfigurationEClass,
			HierarchyConfigurationImpl, 
			"HierarchyConfiguration", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getHierarchyConfiguration_Roots(), 
				this.getNodeType(), 
				"roots", 
				null, 
				0, 
				-1, 
				HierarchyConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			this.initEReference(
				this.getHierarchyConfiguration_AllowedChildren(),
				this.getNodeTypeToNodeTypesMap(), 
				null, 
				"allowedChildren", 
				null, 
				0, 
				-1, 
				HierarchyConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.NodeTypeToNodeTypesMapEClass,
			NodeTypeToNodeTypesMapImpl, 
			"NodeTypeToNodeTypesMap", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getNodeTypeToNodeTypesMap_Key(), 
				this.getNodeType(), 
				"key", 
				null, 
				1, 
				1, 
				NodeTypeToNodeTypesMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getNodeTypeToNodeTypesMap_Value(), 
				this.getNodeType(), 
				"value", 
				null, 
				0, 
				-1, 
				NodeTypeToNodeTypesMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			
			this.initEClass(
			this.ActionEClass,
			ActionImpl, 
			"Action", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getAction_Id(), 
				this.getActionId(), 
				"id", 
				null, 
				1, 
				1, 
				ActionImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getAction_Name(), 
				this.ecorePackage.getEString(), 
				"name", 
				null, 
				0, 
				1, 
				ActionImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getAction_Icon(), 
				this.getIconDataUri(), 
				"icon", 
				null, 
				0, 
				1, 
				ActionImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			
			this.initEClass(
			this.ActionEventEClass,
			ActionEventImpl, 
			"ActionEvent", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			
			this.initEReference(
				this.getActionEvent_TargetNodes(),
				this.getTreeNode(), 
				null, 
				"targetNodes", 
				null, 
				0, 
				-1, 
				ActionEventImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getActionEvent_Action(),
				this.getAction(), 
				null, 
				"action", 
				null, 
				1, 
				1, 
				ActionEventImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.ActionConfigurationEClass,
			ActionConfigurationImpl, 
			"ActionConfiguration", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			
			this.initEReference(
				this.getActionConfiguration_AvailableActions(),
				this.getAction(), 
				null, 
				"availableActions", 
				null, 
				0, 
				-1, 
				ActionConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getActionConfiguration_DefaultActionbarActions(),
				this.getAction(), 
				null, 
				"defaultActionbarActions", 
				null, 
				0, 
				-1, 
				ActionConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getActionConfiguration_NodeActions(),
				this.getActionIdToNodeTypeMap(), 
				null, 
				"nodeActions", 
				null, 
				0, 
				-1, 
				ActionConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.ActionIdToNodeTypeMapEClass,
			ActionIdToNodeTypeMapImpl, 
			"ActionIdToNodeTypeMap", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getActionIdToNodeTypeMap_Key(), 
				this.getActionId(), 
				"key", 
				null, 
				1, 
				1, 
				ActionIdToNodeTypeMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getActionIdToNodeTypeMap_Value(), 
				this.getNodeType(), 
				"value", 
				null, 
				1, 
				-1, 
				ActionIdToNodeTypeMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				!EPackageImpl.IS_ORDERED);
			
			
			
			
			this.initEClass(
			this.IconConfigurationEClass,
			IconConfigurationImpl, 
			"IconConfiguration", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			
			this.initEReference(
				this.getIconConfiguration_Icons(),
				this.getNodeTypeToIconDataUriMap(), 
				null, 
				"icons", 
				null, 
				0, 
				-1, 
				IconConfigurationImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.NodeIconEClass,
			NodeIconImpl, 
			"NodeIcon", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getNodeIcon_Icons(), 
				this.getIconDataUri(), 
				"icons", 
				null, 
				0, 
				-1, 
				NodeIconImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				!EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			
			this.initEClass(
			this.NodeTypeToIconDataUriMapEClass,
			NodeTypeToIconDataUriMapImpl, 
			"NodeTypeToIconDataUriMap", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
			this.initEAttribute_EClassifier(
				this.getNodeTypeToIconDataUriMap_Key(), 
				this.getNodeType(), 
				"key", 
				null, 
				1, 
				1, 
				NodeTypeToIconDataUriMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getNodeTypeToIconDataUriMap_Value(), 
				this.getIconDataUri(), 
				"value", 
				null, 
				1, 
				1, 
				NodeTypeToIconDataUriMapImpl, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			
			this.initEDataType(this.NodeTypeEDataType, null, "NodeType", EPackageImpl.IS_SERIALIZABLE, !EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			this.initEDataType(this.ActionIdEDataType, null, "ActionId", EPackageImpl.IS_SERIALIZABLE, !EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			this.initEDataType(this.IconDataUriEDataType, null, "IconDataUri", EPackageImpl.IS_SERIALIZABLE, !EPackageImpl.IS_GENERATED_INSTANCE_CLASS);
			
        }
		
		
		private TreeDocumentEClass:EClass = null;
		private TreeRootEClass:EClass = null;
		private TreeNodeEClass:EClass = null;
		private HierarchyConfigurationEClass:EClass = null;
		private NodeTypeToNodeTypesMapEClass:EClass = null;
		private ActionEClass:EClass = null;
		private ActionEventEClass:EClass = null;
		private ActionConfigurationEClass:EClass = null;
		private ActionIdToNodeTypeMapEClass:EClass = null;
		private IconConfigurationEClass:EClass = null;
		private NodeIconEClass:EClass = null;
		private NodeTypeToIconDataUriMapEClass:EClass = null;
		
		
		
		private NodeTypeEDataType:EDataType = null;
		private ActionIdEDataType:EDataType = null;
		private IconDataUriEDataType:EDataType = null;
		
		
		public static TREEDOCUMENT:number = 0;
		public static TREEDOCUMENT_FEATURE_COUNT:number = 1;
		public static TREEDOCUMENT_OPERATION_COUNT:number = 0;
		
		public static TREE_DOCUMENT__ROOTS:number = 0;
		
		public static TREEROOT:number = 1;
		public static TREEROOT_FEATURE_COUNT:number = 5;
		public static TREEROOT_OPERATION_COUNT:number = 0;
		
		public static TREE_ROOT__ID:number = 0;
		public static TREE_ROOT__ROOT_NODE:number = 1;
		public static TREE_ROOT__ACTIONS:number = 2;
		public static TREE_ROOT__HIERARCHY:number = 3;
		public static TREE_ROOT__ICONS:number = 4;
		
		public static TREENODE:number = 2;
		public static TREENODE_FEATURE_COUNT:number = 7;
		public static TREENODE_OPERATION_COUNT:number = 0;
		
		public static TREE_NODE__ID:number = 0;
		public static TREE_NODE__TYPE:number = 1;
		public static TREE_NODE__NAME:number = 2;
		public static TREE_NODE__DOCUMENTATION:number = 3;
		public static TREE_NODE__CHILDREN:number = 4;
		public static TREE_NODE__PARENT:number = 5;
		public static TREE_NODE__ICON_OVERRIDE:number = 6;
		
		public static HIERARCHYCONFIGURATION:number = 4;
		public static HIERARCHYCONFIGURATION_FEATURE_COUNT:number = 2;
		public static HIERARCHYCONFIGURATION_OPERATION_COUNT:number = 0;
		
		public static HIERARCHY_CONFIGURATION__ALLOWED_CHILDREN:number = 0;
		public static HIERARCHY_CONFIGURATION__ROOTS:number = 1;
		
		public static NODETYPETONODETYPESMAP:number = 5;
		public static NODETYPETONODETYPESMAP_FEATURE_COUNT:number = 2;
		public static NODETYPETONODETYPESMAP_OPERATION_COUNT:number = 0;
		
		public static NODE_TYPE_TO_NODE_TYPES_MAP__KEY:number = 0;
		public static NODE_TYPE_TO_NODE_TYPES_MAP__VALUE:number = 1;
		
		public static ACTION:number = 6;
		public static ACTION_FEATURE_COUNT:number = 3;
		public static ACTION_OPERATION_COUNT:number = 0;
		
		public static ACTION__ID:number = 0;
		public static ACTION__NAME:number = 1;
		public static ACTION__ICON:number = 2;
		
		public static ACTIONEVENT:number = 7;
		public static ACTIONEVENT_FEATURE_COUNT:number = 2;
		public static ACTIONEVENT_OPERATION_COUNT:number = 0;
		
		public static ACTION_EVENT__TARGET_NODES:number = 0;
		public static ACTION_EVENT__ACTION:number = 1;
		
		public static ACTIONCONFIGURATION:number = 8;
		public static ACTIONCONFIGURATION_FEATURE_COUNT:number = 3;
		public static ACTIONCONFIGURATION_OPERATION_COUNT:number = 0;
		
		public static ACTION_CONFIGURATION__AVAILABLE_ACTIONS:number = 0;
		public static ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS:number = 1;
		public static ACTION_CONFIGURATION__NODE_ACTIONS:number = 2;
		
		public static ACTIONIDTONODETYPEMAP:number = 9;
		public static ACTIONIDTONODETYPEMAP_FEATURE_COUNT:number = 2;
		public static ACTIONIDTONODETYPEMAP_OPERATION_COUNT:number = 0;
		
		public static ACTION_ID_TO_NODE_TYPE_MAP__KEY:number = 0;
		public static ACTION_ID_TO_NODE_TYPE_MAP__VALUE:number = 1;
		
		public static ICONCONFIGURATION:number = 11;
		public static ICONCONFIGURATION_FEATURE_COUNT:number = 1;
		public static ICONCONFIGURATION_OPERATION_COUNT:number = 0;
		
		public static ICON_CONFIGURATION__ICONS:number = 0;
		
		public static NODEICON:number = 12;
		public static NODEICON_FEATURE_COUNT:number = 1;
		public static NODEICON_OPERATION_COUNT:number = 0;
		
		public static NODE_ICON__ICONS:number = 0;
		
		public static NODETYPETOICONDATAURIMAP:number = 14;
		public static NODETYPETOICONDATAURIMAP_FEATURE_COUNT:number = 2;
		public static NODETYPETOICONDATAURIMAP_OPERATION_COUNT:number = 0;
		
		public static NODE_TYPE_TO_ICON_DATA_URI_MAP__KEY:number = 0;
		public static NODE_TYPE_TO_ICON_DATA_URI_MAP__VALUE:number = 1;
		
		public static NODETYPE:number = 3;
		
		public static ACTIONID:number = 10;
		
		public static ICONDATAURI:number = 13;
		
		
		/*Important: Call init() AFTER metaobject ids have been assigned.*/
		public static eINSTANCE:TreedocumentmodelPackage = TreedocumentmodelPackageImpl.init();
		
		
		public getTreeDocument=():EClass=>{return this.TreeDocumentEClass;}
		
		public getTreeDocument_Roots=():EReference=>{return <EReference> this.TreeDocumentEClass.eStructuralFeatures.at(0);}
		public getTreeRoot=():EClass=>{return this.TreeRootEClass;}
		
		public getTreeRoot_Id=():EAttribute=>{return <EAttribute> this.TreeRootEClass.eStructuralFeatures.at(0);}
		public getTreeRoot_RootNode=():EReference=>{return <EReference> this.TreeRootEClass.eStructuralFeatures.at(1);}
		public getTreeRoot_Actions=():EReference=>{return <EReference> this.TreeRootEClass.eStructuralFeatures.at(2);}
		public getTreeRoot_Hierarchy=():EReference=>{return <EReference> this.TreeRootEClass.eStructuralFeatures.at(3);}
		public getTreeRoot_Icons=():EReference=>{return <EReference> this.TreeRootEClass.eStructuralFeatures.at(4);}
		public getTreeNode=():EClass=>{return this.TreeNodeEClass;}
		
		public getTreeNode_Id=():EAttribute=>{return <EAttribute> this.TreeNodeEClass.eStructuralFeatures.at(0);}
		public getTreeNode_Type=():EAttribute=>{return <EAttribute> this.TreeNodeEClass.eStructuralFeatures.at(1);}
		public getTreeNode_Name=():EAttribute=>{return <EAttribute> this.TreeNodeEClass.eStructuralFeatures.at(2);}
		public getTreeNode_Documentation=():EAttribute=>{return <EAttribute> this.TreeNodeEClass.eStructuralFeatures.at(3);}
		public getTreeNode_Children=():EReference=>{return <EReference> this.TreeNodeEClass.eStructuralFeatures.at(4);}
		public getTreeNode_Parent=():EReference=>{return <EReference> this.TreeNodeEClass.eStructuralFeatures.at(5);}
		public getTreeNode_IconOverride=():EReference=>{return <EReference> this.TreeNodeEClass.eStructuralFeatures.at(6);}
		public getHierarchyConfiguration=():EClass=>{return this.HierarchyConfigurationEClass;}
		
		public getHierarchyConfiguration_AllowedChildren=():EReference=>{return <EReference> this.HierarchyConfigurationEClass.eStructuralFeatures.at(0);}
		public getHierarchyConfiguration_Roots=():EAttribute=>{return <EAttribute> this.HierarchyConfigurationEClass.eStructuralFeatures.at(1);}
		public getNodeTypeToNodeTypesMap=():EClass=>{return this.NodeTypeToNodeTypesMapEClass;}
		
		public getNodeTypeToNodeTypesMap_Key=():EAttribute=>{return <EAttribute> this.NodeTypeToNodeTypesMapEClass.eStructuralFeatures.at(0);}
		public getNodeTypeToNodeTypesMap_Value=():EAttribute=>{return <EAttribute> this.NodeTypeToNodeTypesMapEClass.eStructuralFeatures.at(1);}
		public getAction=():EClass=>{return this.ActionEClass;}
		
		public getAction_Id=():EAttribute=>{return <EAttribute> this.ActionEClass.eStructuralFeatures.at(0);}
		public getAction_Name=():EAttribute=>{return <EAttribute> this.ActionEClass.eStructuralFeatures.at(1);}
		public getAction_Icon=():EAttribute=>{return <EAttribute> this.ActionEClass.eStructuralFeatures.at(2);}
		public getActionEvent=():EClass=>{return this.ActionEventEClass;}
		
		public getActionEvent_TargetNodes=():EReference=>{return <EReference> this.ActionEventEClass.eStructuralFeatures.at(0);}
		public getActionEvent_Action=():EReference=>{return <EReference> this.ActionEventEClass.eStructuralFeatures.at(1);}
		public getActionConfiguration=():EClass=>{return this.ActionConfigurationEClass;}
		
		public getActionConfiguration_AvailableActions=():EReference=>{return <EReference> this.ActionConfigurationEClass.eStructuralFeatures.at(0);}
		public getActionConfiguration_DefaultActionbarActions=():EReference=>{return <EReference> this.ActionConfigurationEClass.eStructuralFeatures.at(1);}
		public getActionConfiguration_NodeActions=():EReference=>{return <EReference> this.ActionConfigurationEClass.eStructuralFeatures.at(2);}
		public getActionIdToNodeTypeMap=():EClass=>{return this.ActionIdToNodeTypeMapEClass;}
		
		public getActionIdToNodeTypeMap_Key=():EAttribute=>{return <EAttribute> this.ActionIdToNodeTypeMapEClass.eStructuralFeatures.at(0);}
		public getActionIdToNodeTypeMap_Value=():EAttribute=>{return <EAttribute> this.ActionIdToNodeTypeMapEClass.eStructuralFeatures.at(1);}
		public getIconConfiguration=():EClass=>{return this.IconConfigurationEClass;}
		
		public getIconConfiguration_Icons=():EReference=>{return <EReference> this.IconConfigurationEClass.eStructuralFeatures.at(0);}
		public getNodeIcon=():EClass=>{return this.NodeIconEClass;}
		
		public getNodeIcon_Icons=():EAttribute=>{return <EAttribute> this.NodeIconEClass.eStructuralFeatures.at(0);}
		public getNodeTypeToIconDataUriMap=():EClass=>{return this.NodeTypeToIconDataUriMapEClass;}
		
		public getNodeTypeToIconDataUriMap_Key=():EAttribute=>{return <EAttribute> this.NodeTypeToIconDataUriMapEClass.eStructuralFeatures.at(0);}
		public getNodeTypeToIconDataUriMap_Value=():EAttribute=>{return <EAttribute> this.NodeTypeToIconDataUriMapEClass.eStructuralFeatures.at(1);}
		public getNodeType=():EDataType=>{return this.NodeTypeEDataType;}
		public getActionId=():EDataType=>{return this.ActionIdEDataType;}
		public getIconDataUri=():EDataType=>{return this.IconDataUriEDataType;}
		
 
}

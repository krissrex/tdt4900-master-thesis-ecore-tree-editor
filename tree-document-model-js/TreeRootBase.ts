import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {TreeNode} from "./TreeNode";
import {IconConfiguration} from "./IconConfiguration";
import {TreeRoot} from "./TreeRoot";
import {ActionConfiguration} from "./ActionConfiguration";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class TreeRootBase
			extends BasicEObjectImpl
			implements TreeRoot
			{
				private _id:string = '';
				get id():string{
					return this._id;
				}
				set id(value:string){
					this._id = value; 
				}
				private _rootNode:TreeNode = null;
				get rootNode():TreeNode{
				
					return this._rootNode;
				}
				set rootNode(value:TreeNode) {
					if (value != this.rootNode) {
						let msgs:NotificationChain = null;
						if (this.rootNode != null){
							msgs = (this.rootNode).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE, /*null*/ null, msgs);
						}
						msgs = this.basicSetRootNode(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE , value, value));
					}
				}
				private _actions:ActionConfiguration = null;
				get actions():ActionConfiguration{
				
					return this._actions;
				}
				set actions(value:ActionConfiguration) {
					if (value != this.actions) {
						let msgs:NotificationChain = null;
						if (this.actions != null){
							msgs = (this.actions).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS, /*null*/ null, msgs);
						}
						msgs = this.basicSetActions(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS , value, value));
					}
				}
				private _hierarchy:HierarchyConfiguration = null;
				get hierarchy():HierarchyConfiguration{
				
					return this._hierarchy;
				}
				set hierarchy(value:HierarchyConfiguration) {
					if (value != this.hierarchy) {
						let msgs:NotificationChain = null;
						if (this.hierarchy != null){
							msgs = (this.hierarchy).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY, /*null*/ null, msgs);
						}
						msgs = this.basicSetHierarchy(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY , value, value));
					}
				}
				private _icons:IconConfiguration = null;
				get icons():IconConfiguration{
				
					return this._icons;
				}
				set icons(value:IconConfiguration) {
					if (value != this.icons) {
						let msgs:NotificationChain = null;
						if (this.icons != null){
							msgs = (this.icons).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS, /*null*/ null, msgs);
						}
						msgs = this.basicSetIcons(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS , value, value));
					}
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return TreeRootBase.eStaticClass;
				}
			
			
				public basicSetIcons(newobj:IconConfiguration, msgs:NotificationChain):NotificationChain {
					const oldobj = this._icons;
					this._icons = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				public basicSetActions(newobj:ActionConfiguration, msgs:NotificationChain):NotificationChain {
					const oldobj = this._actions;
					this._actions = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				public basicSetHierarchy(newobj:HierarchyConfiguration, msgs:NotificationChain):NotificationChain {
					const oldobj = this._hierarchy;
					this._hierarchy = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				public basicSetRootNode(newobj:TreeNode, msgs:NotificationChain):NotificationChain {
					const oldobj = this._rootNode;
					this._rootNode = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ID:
							return this.id;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE:
							return this.rootNode;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS:
							return this.actions;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY:
							return this.hierarchy;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS:
							return this.icons;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ID:
							this.id = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ROOT_NODE:
							this.rootNode = <TreeNode> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ACTIONS:
							this.actions = <ActionConfiguration> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__HIERARCHY:
							this.hierarchy = <HierarchyConfiguration> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_ROOT__ICONS:
							this.icons = <IconConfiguration> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
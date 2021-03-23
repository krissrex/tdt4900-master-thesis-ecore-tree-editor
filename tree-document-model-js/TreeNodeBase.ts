import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {TreeNode} from "./TreeNode";
import {NodeIcon} from "./NodeIcon";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class TreeNodeBase
			extends BasicEObjectImpl
			implements TreeNode
			{
				private _id:string = '';
				get id():string{
					return this._id;
				}
				set id(value:string){
					this._id = value; 
				}
				private _type:string = '';
				get type():string{
					return this._type;
				}
				set type(value:string){
					this._type = value; 
				}
				private _name:string = '';
				get name():string{
					return this._name;
				}
				set name(value:string){
					this._name = value; 
				}
				private _documentation:string = '';
				get documentation():string{
					return this._documentation;
				}
				set documentation(value:string){
					this._documentation = value; 
				}
				private _children:OrderedSet<TreeNode> = null;
				
				get children():OrderedSet<TreeNode>{
					if(this._children===null){
						this._children = new OrderedSet<TreeNode>(this, TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN, TreedocumentmodelPackageLiterals.TREE_NODE__PARENT);
							
					}
					return this._children;
					
				}
				
				
				get parent():TreeNode{
				
					if (this.eContainerFeatureID() != TreedocumentmodelPackageLiterals.TREE_NODE__PARENT) return null;
					return this.eInternalContainer() as TreeNode;
				}
				set parent(value:TreeNode) {
					if (value != this.eInternalContainer() as TreeNode) {
						let msgs:NotificationChain = null;
						if (this.eInternalContainer() as TreeNode != null){
							msgs = (this.eInternalContainer() as TreeNode).eInverseRemove(this, TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN, /*TreeNode*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN, /*TreeNode*/ null, msgs);
						}
						msgs = this.basicSetParent(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_NODE__PARENT , value, value));
					}
				}
				private _iconOverride:NodeIcon = null;
				get iconOverride():NodeIcon{
				
					return this._iconOverride;
				}
				set iconOverride(value:NodeIcon) {
					if (value != this.iconOverride) {
						let msgs:NotificationChain = null;
						if (this.iconOverride != null){
							msgs = (this.iconOverride).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE, /*null*/ null, msgs);
						}
						msgs = this.basicSetIconOverride(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE , value, value));
					}
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return TreeNodeBase.eStaticClass;
				}
			
				public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN:
							return this.children.basicAdd(otherEnd as TreeNode, msgs);
						case TreedocumentmodelPackageLiterals.TREE_NODE__PARENT:
							if (this.eInternalContainer() != null) {
								msgs = this.eBasicRemoveFromContainer(msgs);
							}
							return this.basicSetParent(otherEnd as TreeNode, msgs);
					}
					return super.eInverseAdd(otherEnd, featureID, msgs);
				}
				
				public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN:
							return this.children.basicRemove(otherEnd as TreeNode, msgs);
						case TreedocumentmodelPackageLiterals.TREE_NODE__PARENT:
							return this.basicSetParent(null, msgs);
					}
					return super.eInverseRemove(otherEnd, featureID, msgs);
				}
				
			
				public basicSetIconOverride(newobj:NodeIcon, msgs:NotificationChain):NotificationChain {
					const oldobj = this._iconOverride;
					this._iconOverride = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				public basicSetParent(newobj:TreeNode, msgs:NotificationChain):NotificationChain {
						msgs = this.eBasicSetContainer(newobj, TreedocumentmodelPackageLiterals.TREE_NODE__PARENT, msgs);
						return msgs;
				}
				
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_NODE__ID:
							return this.id;
						case TreedocumentmodelPackageLiterals.TREE_NODE__TYPE:
							return this.type;
						case TreedocumentmodelPackageLiterals.TREE_NODE__NAME:
							return this.name;
						case TreedocumentmodelPackageLiterals.TREE_NODE__DOCUMENTATION:
							return this.documentation;
						case TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN:
							return this.children;
						case TreedocumentmodelPackageLiterals.TREE_NODE__PARENT:
							return this.parent;
						case TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE:
							return this.iconOverride;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_NODE__ID:
							this.id = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__TYPE:
							this.type = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__NAME:
							this.name = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__DOCUMENTATION:
							this.documentation = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__CHILDREN:
							this.children.clear();
							this.children.addAll(newValue);
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__PARENT:
							this.parent = <TreeNode> newValue;
							return;
						case TreedocumentmodelPackageLiterals.TREE_NODE__ICON_OVERRIDE:
							this.iconOverride = <NodeIcon> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {Action} from "./Action";
import {ActionEvent} from "./ActionEvent";
import {TreeNode} from "./TreeNode";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class ActionEventBase
			extends BasicEObjectImpl
			implements ActionEvent
			{
				private _targetNodes:OrderedSet<TreeNode> = null;
				
				get targetNodes():OrderedSet<TreeNode>{
					if(this._targetNodes===null){
						this._targetNodes = new OrderedSet<TreeNode>(this, TreedocumentmodelPackageLiterals.ACTION_EVENT__TARGET_NODES, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.ACTION_EVENT__TARGET_NODES);
							
					}
					return this._targetNodes;
					
				}
				
				
				private _action:Action = null;
				get action():Action{
				
					return this._action;
				}
				set action(value:Action) {
					let oldvalue = this._action;
					this._action = value;
					if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,TreedocumentmodelPackageLiterals.ACTION_EVENT__ACTION , oldvalue, value));
					}
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return ActionEventBase.eStaticClass;
				}
			
			
				public basicSetAction(newobj:Action, msgs:NotificationChain):NotificationChain {
					const oldobj = this._action;
					this._action = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, TreedocumentmodelPackageLiterals.ACTION_EVENT__ACTION, oldobj, newobj);
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
						case TreedocumentmodelPackageLiterals.ACTION_EVENT__TARGET_NODES:
							return this.targetNodes;
						case TreedocumentmodelPackageLiterals.ACTION_EVENT__ACTION:
							return this.action;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ACTION_EVENT__TARGET_NODES:
							this.targetNodes.clear();
							this.targetNodes.addAll(newValue);
							return;
						case TreedocumentmodelPackageLiterals.ACTION_EVENT__ACTION:
							this.action = <Action> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
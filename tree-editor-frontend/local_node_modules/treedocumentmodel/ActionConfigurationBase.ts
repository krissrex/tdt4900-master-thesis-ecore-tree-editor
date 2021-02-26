import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {Action} from "./Action";
import {ActionIdToNodeTypeMapBase} from "./ActionIdToNodeTypeMapBase";
import {ActionConfiguration} from "./ActionConfiguration";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {Set} from "crossecore/lib/Set";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {EMap} from "crossecore/lib/EMap";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {EcoreEMap} from "crossecore/lib/EcoreEMap";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class ActionConfigurationBase
			extends BasicEObjectImpl
			implements ActionConfiguration
			{
				private _availableActions:OrderedSet<Action> = null;
				
				get availableActions():OrderedSet<Action>{
					if(this._availableActions===null){
						this._availableActions = new OrderedSet<Action>(this, TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__AVAILABLE_ACTIONS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__AVAILABLE_ACTIONS);
							
					}
					return this._availableActions;
					
				}
				
				
				private _defaultActionbarActions:OrderedSet<Action> = null;
				
				get defaultActionbarActions():OrderedSet<Action>{
					if(this._defaultActionbarActions===null){
						this._defaultActionbarActions = new OrderedSet<Action>(this, TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS);
							
					}
					return this._defaultActionbarActions;
					
				}
				
				
				private _nodeActions:EMap<string, string>;
				
				get nodeActions():EMap<string, string>{
					if (this._nodeActions === null)
					{
						this._nodeActions = new EcoreEMap<string, string>(ActionIdToNodeTypeMapBase.eStaticClass, ActionIdToNodeTypeMapBase, this, TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__NODE_ACTIONS);
					}
					return this._nodeActions;
					
				}
				
				

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return ActionConfigurationBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__AVAILABLE_ACTIONS:
							return this.availableActions;
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS:
							return this.defaultActionbarActions;
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__NODE_ACTIONS:
							return this.nodeActions;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__AVAILABLE_ACTIONS:
							this.availableActions.clear();
							this.availableActions.addAll(newValue);
							return;
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__DEFAULT_ACTIONBAR_ACTIONS:
							this.defaultActionbarActions.clear();
							this.defaultActionbarActions.addAll(newValue);
							return;
						case TreedocumentmodelPackageLiterals.ACTION_CONFIGURATION__NODE_ACTIONS:
							(<EcoreEMap<string, string>>this.nodeActions).set(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

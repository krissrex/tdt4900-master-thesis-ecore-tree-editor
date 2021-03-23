import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {NodeTypeToNodeTypesMapBase} from "./NodeTypeToNodeTypesMapBase";
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
		
			export class HierarchyConfigurationBase
			extends BasicEObjectImpl
			implements HierarchyConfiguration
			{
				private _roots:Set<string> = new Set<string>();
				get roots():Set<string>{
					if(this._roots===null){
						this._roots = new Set<string>();
							
					}
					return this._roots;
				}
				set roots(value:Set<string>){
					this._roots = value; 
				}
				private _allowedChildren:EMap<string, string>;
				
				get allowedChildren():EMap<string, string>{
					if (this._allowedChildren === null)
					{
						this._allowedChildren = new EcoreEMap<string, string>(NodeTypeToNodeTypesMapBase.eStaticClass, NodeTypeToNodeTypesMapBase, this, TreedocumentmodelPackageLiterals.HIERARCHY_CONFIGURATION__ALLOWED_CHILDREN);
					}
					return this._allowedChildren;
					
				}
				
				

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return HierarchyConfigurationBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.HIERARCHY_CONFIGURATION__ALLOWED_CHILDREN:
							return this.allowedChildren;
						case TreedocumentmodelPackageLiterals.HIERARCHY_CONFIGURATION__ROOTS:
							return this.roots;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.HIERARCHY_CONFIGURATION__ROOTS:
							this.roots.clear();
							this.roots.addAll(newValue);
							return;
						case TreedocumentmodelPackageLiterals.HIERARCHY_CONFIGURATION__ALLOWED_CHILDREN:
							(<EcoreEMap<string, string>>this.allowedChildren).set(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
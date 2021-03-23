import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {NodeTypeToNodeTypesMap} from "./NodeTypeToNodeTypesMap";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {Set} from "crossecore/lib/Set";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class NodeTypeToNodeTypesMapBase
			extends BasicEObjectImpl
			implements NodeTypeToNodeTypesMap
			{
				private _key:string = '';
				get key():string{
					return this._key;
				}
				set key(value:string){
					this._key = value; 
				}
				private _value:Set<string> = new Set<string>();
				get value():Set<string>{
					if(this._value===null){
						this._value = new Set<string>();
							
					}
					return this._value;
				}
				set value(value:Set<string>){
					this._value = value; 
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return NodeTypeToNodeTypesMapBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_NODE_TYPES_MAP__KEY:
							return this.key;
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_NODE_TYPES_MAP__VALUE:
							return this.value;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_NODE_TYPES_MAP__KEY:
							this.key = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_NODE_TYPES_MAP__VALUE:
							this.value.clear();
							this.value.addAll(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

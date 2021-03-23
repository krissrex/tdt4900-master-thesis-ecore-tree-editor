import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {NodeTypeToIconDataUriMap} from "./NodeTypeToIconDataUriMap";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class NodeTypeToIconDataUriMapBase
			extends BasicEObjectImpl
			implements NodeTypeToIconDataUriMap
			{
				private _key:string = '';
				get key():string{
					return this._key;
				}
				set key(value:string){
					this._key = value; 
				}
				private _value:string = '';
				get value():string{
					return this._value;
				}
				set value(value:string){
					this._value = value; 
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return NodeTypeToIconDataUriMapBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_ICON_DATA_URI_MAP__KEY:
							return this.key;
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_ICON_DATA_URI_MAP__VALUE:
							return this.value;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_ICON_DATA_URI_MAP__KEY:
							this.key = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.NODE_TYPE_TO_ICON_DATA_URI_MAP__VALUE:
							this.value = <string> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
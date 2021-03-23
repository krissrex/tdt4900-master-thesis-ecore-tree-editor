import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {NodeIcon} from "./NodeIcon";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {Sequence} from "crossecore/lib/Sequence";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class NodeIconBase
			extends BasicEObjectImpl
			implements NodeIcon
			{
				private _icons:Sequence<string> = new Sequence<string>();
				get icons():Sequence<string>{
					if(this._icons===null){
						this._icons = new Sequence<string>();
							
					}
					return this._icons;
				}
				set icons(value:Sequence<string>){
					this._icons = value; 
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return NodeIconBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_ICON__ICONS:
							return this.icons;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.NODE_ICON__ICONS:
							this.icons.clear();
							this.icons.addAll(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

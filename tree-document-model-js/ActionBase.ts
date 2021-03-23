import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {Action} from "./Action";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class ActionBase
			extends BasicEObjectImpl
			implements Action
			{
				private _id:string = '';
				get id():string{
					return this._id;
				}
				set id(value:string){
					this._id = value; 
				}
				private _name:string = '';
				get name():string{
					return this._name;
				}
				set name(value:string){
					this._name = value; 
				}
				private _icon:string = '';
				get icon():string{
					return this._icon;
				}
				set icon(value:string){
					this._icon = value; 
				}

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return ActionBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ACTION__ID:
							return this.id;
						case TreedocumentmodelPackageLiterals.ACTION__NAME:
							return this.name;
						case TreedocumentmodelPackageLiterals.ACTION__ICON:
							return this.icon;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ACTION__ID:
							this.id = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.ACTION__NAME:
							this.name = <string> newValue;
							return;
						case TreedocumentmodelPackageLiterals.ACTION__ICON:
							this.icon = <string> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
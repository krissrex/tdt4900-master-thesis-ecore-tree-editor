import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {IconConfiguration} from "./IconConfiguration";
import {NodeTypeToIconDataUriMapBase} from "./NodeTypeToIconDataUriMapBase";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {EMap} from "crossecore/lib/EMap";
import {EcoreEMap} from "crossecore/lib/EcoreEMap";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class IconConfigurationBase
			extends BasicEObjectImpl
			implements IconConfiguration
			{
				private _icons:EMap<string, string>;
				
				get icons():EMap<string, string>{
					if (this._icons === null)
					{
						this._icons = new EcoreEMap<string, string>(NodeTypeToIconDataUriMapBase.eStaticClass, NodeTypeToIconDataUriMapBase, this, TreedocumentmodelPackageLiterals.ICON_CONFIGURATION__ICONS);
					}
					return this._icons;
					
				}
				
				

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return IconConfigurationBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ICON_CONFIGURATION__ICONS:
							return this.icons;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.ICON_CONFIGURATION__ICONS:
							(<EcoreEMap<string, string>>this.icons).set(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

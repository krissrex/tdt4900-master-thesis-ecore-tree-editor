import {TreedocumentmodelPackageLiterals} from "./TreedocumentmodelPackageLiterals";
import {TreeRoot} from "./TreeRoot";
import {TreeDocument} from "./TreeDocument";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {EClass} from "crossecore/lib/EClass";
import {NotificationChain} from "crossecore/lib/NotificationChain";
import {ENotificationImpl} from "crossecore/lib/ENotificationImpl";
import {NotificationImpl} from "crossecore/lib/NotificationImpl";
import {AbstractCollection} from "crossecore/lib/AbstractCollection";
import {InternalEObject} from "crossecore/lib/InternalEObject";
import {BasicEObjectImpl} from "crossecore/lib/BasicEObjectImpl";
		
			export class TreeDocumentBase
			extends BasicEObjectImpl
			implements TreeDocument
			{
				private _roots:OrderedSet<TreeRoot> = null;
				
				get roots():OrderedSet<TreeRoot>{
					if(this._roots===null){
						this._roots = new OrderedSet<TreeRoot>(this, TreedocumentmodelPackageLiterals.TREE_DOCUMENT__ROOTS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - TreedocumentmodelPackageLiterals.TREE_DOCUMENT__ROOTS);
							
					}
					return this._roots;
					
				}
				
				

			
				public static eStaticClass:EClass;
				
				protected eStaticClass():EClass{
					
					return TreeDocumentBase.eStaticClass;
				}
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_DOCUMENT__ROOTS:
							return this.roots;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case TreedocumentmodelPackageLiterals.TREE_DOCUMENT__ROOTS:
							this.roots.clear();
							this.roots.addAll(newValue);
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			

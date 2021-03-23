import {Set} from "crossecore/lib/Set";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface ActionIdToNodeTypeMap
extends InternalEObject

{
	key:string;
	
	value:Set<string>;
	
	

}


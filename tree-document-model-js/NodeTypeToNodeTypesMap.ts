import {OrderedSet} from "crossecore/lib/OrderedSet";
import {Set} from "crossecore/lib/Set";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface NodeTypeToNodeTypesMap
extends InternalEObject

{
	key:string;
	
	value:Set<string>;
	
	

}


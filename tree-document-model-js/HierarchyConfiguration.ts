import {Set} from "crossecore/lib/Set";
import {EMap} from "crossecore/lib/EMap";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface HierarchyConfiguration
extends InternalEObject

{
	
	roots:Set<string>;
	
	allowedChildren:EMap<string, string>;
	

}


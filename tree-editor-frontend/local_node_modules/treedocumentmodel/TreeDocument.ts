import {TreeRoot} from "./TreeRoot";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface TreeDocument
extends InternalEObject

{
	
	roots: OrderedSet<TreeRoot>;
	

}


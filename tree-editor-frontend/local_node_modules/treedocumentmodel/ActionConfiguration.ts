import {Action} from "./Action";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {Set} from "crossecore/lib/Set";
import {EMap} from "crossecore/lib/EMap";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface ActionConfiguration
extends InternalEObject

{
	
	availableActions: OrderedSet<Action>;
	defaultActionbarActions: OrderedSet<Action>;
	nodeActions:EMap<string, string>;
	

}


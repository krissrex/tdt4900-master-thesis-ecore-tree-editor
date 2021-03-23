import {Action} from "./Action";
import {TreeNode} from "./TreeNode";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface ActionEvent
extends InternalEObject

{
	
	targetNodes: OrderedSet<TreeNode>;
	action:Action;
	

}


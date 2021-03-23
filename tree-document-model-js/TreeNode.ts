import {NodeIcon} from "./NodeIcon";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface TreeNode
extends InternalEObject

{
	id:string;
	type:string;
	name:string;
	documentation:string;
	
	children: OrderedSet<TreeNode>;
	parent:TreeNode;
	iconOverride:NodeIcon;
	

}


import {HierarchyConfiguration} from "./HierarchyConfiguration";
import {TreeNode} from "./TreeNode";
import {IconConfiguration} from "./IconConfiguration";
import {ActionConfiguration} from "./ActionConfiguration";
import {OrderedSet} from "crossecore/lib/OrderedSet";
import {Bag} from "crossecore/lib/Bag";
import {InternalEObject} from "crossecore/lib/InternalEObject";

export interface TreeRoot
extends InternalEObject

{
	id:string;
	
	rootNode:TreeNode;
	actions:ActionConfiguration;
	hierarchy:HierarchyConfiguration;
	icons:IconConfiguration;
	

}


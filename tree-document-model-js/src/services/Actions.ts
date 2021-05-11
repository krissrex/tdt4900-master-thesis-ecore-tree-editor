import { Action } from "../Action";
import { ActionId } from "../ActionId";
import { NodeId } from "../NodeId";
import { NodeType } from "../NodeType";
import { TreeDocument } from "../TreeDocument";
import { TreeNode } from "../TreeNode";

export function getAvailableActions(document: TreeDocument): Action[] {
  return document.roots?.flatMap((root) => root.actions.availableActions) ?? [];
}

export function getActionsForSelection(
  selection: TreeNode[],
  document: TreeDocument
): Action[] {
  const defaultActionIds =
    document.roots?.flatMap((root) => root.actions.defaultActionbarActions) ??
    [];

  // Get a list of all action IDs that can be used for the current selection
  const allNodeActions: Array<ActionId[]> =
    selection.map((selectedNode) => {
      // FIXME: get only actions from the tree which has the selected node
      return document.roots
        ?.map((root) => root.actions.nodeActions)
        ?.flatMap((actionMap) =>
          Array.from(actionMap.entries())
            .filter(([_, nodeTypes]) => nodeTypes.includes(selectedNode.type))
            .map(([id, _]) => id)
        );
    }) ?? [];

  // In case of multiple selected, only keep the intersection of all the specific action ids
  const selectedNodesActionIntersection: ActionId[] = allNodeActions.reduce(
    (intersection: string[], nodeActions: ActionId[]) => {
      return Array.from(
        new Set(intersection.filter((action) => nodeActions.includes(action)))
      );
    }
  );

  const availableActions = getAvailableActions(document);
  const actions =
    availableActions.filter(
      (action) =>
        defaultActionIds.includes(action.id) ||
        selectedNodesActionIntersection.includes(action.id)
    ) ?? [];

  return actions;
}

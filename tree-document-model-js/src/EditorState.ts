/**
 * Settings that are relevant to a {@link TreeNode}'s presentation in the tree editor.
 */
export interface EditorState {
  selected: boolean;

  /**
   * Set to `true` if a {@link TreeNode.children} should be hidden/minimized (collapsed) instead of expanded.
   */
  collapsed: boolean;

  // TODO: Add other states, like e.g.: hasWarning, hasError, readOnly. Look to Theia tree node hierarchy for ideas.
}

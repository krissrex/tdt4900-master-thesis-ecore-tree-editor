/**
 * The type (class name or type name) of a {@link TreeNode}.
 * This string must uniquely identify a type within a {@link TreeRoot}.
 *
 * @example
 * For a file browser:
 * `"file"`, `"directory"`
 *
 * @example
 * For an Ecore editor:
 * `"EClass"`, `"EPackage"`, `"EAttribute"`
 *
 * @category Tree
 */
export type NodeType = string;

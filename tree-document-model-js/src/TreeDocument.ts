import { TreeRoot } from "./TreeRoot";

/**
 * The document model that the Tree Editor works with.
 * Add contents to it by adding a {@link TreeRoot} to {@link .roots}, for example an ecore file or genmodel file.
 *
 * @category Tree
 */
export interface TreeDocument {
  /**
   * The roots in the opened document.
   *
   * @example
   * For Ecore: this could be an `MyModel.ecore` file and `MyModel.genmodel` file.
   *
   * @example
   * For Ecore: this could be a `MyInstance.xmi` file and `MyModel.ecore` file.
   *
   * @example
   * For a file browser: this could be `/etc/` and `/home/me`.
   */
  roots: Array<TreeRoot>;
}

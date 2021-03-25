import { ActionId } from "./ActionId";
import { IconDataUri } from "./IconDataUri";

/**
 * An action is something that can be triggered by a user.
 *
 * @example
 * For a file browser, a user could trigger `"Copy"`, `"Delete"`, `"Compress (Zip)"`.
 *
 * @example
 * For Ecore, a user could trigger `"Validation"`, `"Create a dynamic instance"` or `"Create a genmodel"`.
 * @category Action
 */
export interface Action {
  /**
   * An id which is unique in the {@link ActionConfiguration.availableActions | availableActions}.
   */
  id: ActionId;

  /** A human readable name for the user. */
  name: string;

  /** An icon for the action. */
  icon?: IconDataUri;
}

import { ActionId } from "./ActionId";
import { IconDataUri } from "./IconDataUri";

export interface Action {
  id: ActionId;
  name: string;
  icon?: IconDataUri;
}

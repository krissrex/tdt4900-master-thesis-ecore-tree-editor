import { ROARR } from "roarr";
import roarr from "roarr";

ROARR.write = (message) => {
  console.log(JSON.parse(message));
};

export function getChildLogger(tag: string) {
  return roarr.child({ tag });
}

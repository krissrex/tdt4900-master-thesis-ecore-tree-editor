import { ROARR } from "roarr";
import roarr from "roarr";

ROARR.write = (message) => {
  const json = JSON.parse(message);
  console.log(`[${json.context.tag || "Root"}]`, json.message, json);
};

export function getChildLogger(tag: string) {
  return roarr.child({ tag });
}

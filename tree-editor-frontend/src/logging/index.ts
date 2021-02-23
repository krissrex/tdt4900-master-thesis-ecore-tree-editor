import { ROARR } from "roarr";

ROARR.write = (message) => {
  console.log(JSON.parse(message));
};

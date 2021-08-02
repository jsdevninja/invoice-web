import { combineReducers } from "redux";

import invoice from "./invoice";
import product from "./product";
import global from "./global";

export default combineReducers({
  invoice,
  product,
  global,
});

import { all, fork } from "redux-saga/effects";

import invoice from "./invoice";
import product from "./product";

export default function* rootSaga() {
  yield all([fork(invoice)]);
  yield all([fork(product)]);
}

import { put, call, takeLatest, all } from "redux-saga/effects";
import api from "src/utils/api";
import actions from "../actions";
import { GET_PRODUCTS_REQUEST } from "../actions/types";

function* getProducts(action) {
  yield put(actions.globalActions.toggleLoading(true));
  try {
    const { invoiceId } = action.payload;

    const { data } = yield call(api.get, `/products/${invoiceId}`);
    yield put(actions.productActions.getProductsSuccess(data));
  } catch (error) {
    console.log(error);
  }
  yield put(actions.globalActions.toggleLoading(false));
}

export default function* productSaga() {
  yield all([takeLatest(GET_PRODUCTS_REQUEST, getProducts)]);
}

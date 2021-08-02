import { put, call, takeLatest, all } from "redux-saga/effects";
import api from "src/utils/api";
import actions from "../actions";
import { GET_INVOICES_REQUEST, CREATE_INVOICE_REQUEST } from "../actions/types";

function* getInvoices(action) {
  yield put(actions.globalActions.toggleLoading(true));
  try {
    const { data } = yield call(api.get, "/invoices");
    yield put(actions.invoiceActions.getInvoicesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.invoiceActions.getInvoicesFail(error));
  }
  yield put(actions.globalActions.toggleLoading(false));
}

function* createInvoice(action) {
  const products = action.payload.products;
  try {
    const { data } = yield call(api.post, "/invoices", action.payload);
    for (let i = 0; i < products.length; i++) {
      const product = {
        ...products[i],
        invoiceId: data.id,
      };
      yield call(api.post, "/products", product);
    }
    data.products = products.length;
    data.subtotal = products.reduce(
      (acc, cur) => acc + parseFloat(cur.price),
      0
    );
    yield put(actions.invoiceActions.createInvoicesSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export default function* invoiceSaga() {
  yield all([takeLatest(GET_INVOICES_REQUEST, getInvoices)]);
  yield all([takeLatest(CREATE_INVOICE_REQUEST, createInvoice)]);
}

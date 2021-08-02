import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CLEAR_PRODUCT_STORE,
} from "./types";

export const getProductsRequest = (invoiceId) => ({
  type: GET_PRODUCTS_REQUEST,
  payload: { invoiceId },
});

export const getProductsSuccess = (payload) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload,
});

export const getProductsFail = (payload) => ({
  type: GET_PRODUCTS_FAIL,
  payload,
});

export const clearStore = () => ({
  type: CLEAR_PRODUCT_STORE,
});

import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
} from "./types";

export const getInvoicesRequest = () => ({
  type: GET_INVOICES_REQUEST,
});

export const getInvoicesSuccess = (payload) => ({
  type: GET_INVOICES_SUCCESS,
  payload,
});

export const getInvoicesFail = (payload) => ({
  type: GET_INVOICES_FAIL,
  payload,
});

export const createInvoicesRequest = (payload) => ({
  type: CREATE_INVOICE_REQUEST,
  payload,
});

export const createInvoicesSuccess = (payload) => ({
  type: CREATE_INVOICE_SUCCESS,
  payload,
});

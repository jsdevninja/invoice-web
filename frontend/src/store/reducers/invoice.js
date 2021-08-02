import {
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  CREATE_INVOICE_SUCCESS,
} from "../actions/types";

const initialState = {
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return { ...state, list: action.payload };
    case CREATE_INVOICE_SUCCESS:
      return { ...state, list: [action.payload, ...state.list] };
    case GET_INVOICES_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;

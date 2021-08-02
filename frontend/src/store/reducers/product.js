import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CLEAR_PRODUCT_STORE,
} from "../actions/types";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case CLEAR_PRODUCT_STORE:
      return { ...state, products: [] };
    case GET_PRODUCTS_FAIL:
      return { ...state, products: [] };
    default:
      return state;
  }
};

export default reducer;

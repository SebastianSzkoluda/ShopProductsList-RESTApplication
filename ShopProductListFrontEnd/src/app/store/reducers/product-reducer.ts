import * as product from '../actions/product-actions';
import {Product} from '../../model/product';


export interface ProductReducerState {
  create?: boolean;
  edit?: boolean;
  editButtonClicked?: boolean;
  delete?: boolean;
  product: Product;
}

const initialState: ProductReducerState = {
  create: false,
  edit: false,
  editButtonClicked: false,
  delete: false,
  product: null,
};

export function productReducer(state = initialState, action: product.ProductActionsUnion): ProductReducerState {
  switch (action.type) {
    case product.ACTION_INITIAL_PRODUCT:
      return {
        ...initialState
      };
    case product.ACTION_CREATE_PRODUCT:
      return {
        ...state,
        create: true,
        edit: false,
        editButtonClicked: false,
        delete: false,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT:
      return {
        ...state,
        create: false,
        edit: true,
        editButtonClicked: false,
        delete: false,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT:
      return {
        ...state,
        create: false,
        edit: false,
        editButtonClicked: false,
        delete: true,
        product: action.payload
      };
    case product.ACTION_EDIT_BUTTON:
      return {
        ...state,
        create: false,
        edit: false,
        editButtonClicked: true,
        delete: false,
        product: action.payload
      };
  }
  return state;
}

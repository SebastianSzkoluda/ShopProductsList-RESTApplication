import {ACTION_CREATE, ACTION_EDIT_BUTTON, ACTION_INITIAL_PRODUCT} from '../actions/product-actions';
import { ACTION_EDIT } from '../actions/product-actions';
import { ACTION_DELETE } from '../actions/product-actions';
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

export function productReducer(state = initialState, action): ProductReducerState {
  switch (action.type) {
    case ACTION_INITIAL_PRODUCT:
      return {
        ...initialState
      }
    case ACTION_CREATE:
      return {
        ...state,
        create: true,
        edit: false,
        editButtonClicked: false,
        delete: false,
        product: action.payload
      };
    case ACTION_EDIT:
      return {
        ...state,
        create: false,
        edit: true,
        editButtonClicked: false,
        delete: false,
        product: action.payload
      };
    case ACTION_DELETE:
      return {
        ...state,
        create: false,
        edit: false,
        editButtonClicked: false,
        delete: true,
        product: action.payload
      };
    case ACTION_EDIT_BUTTON:
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

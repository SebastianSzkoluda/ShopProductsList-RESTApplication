import * as product from '../actions/product-actions';
import {Product} from '../../model/product';


export interface ProductReducerState {
  createPending: boolean;
  createFinish: boolean;
  createFailed: boolean;
  editPending: boolean;
  editFinish: boolean;
  editFailed: boolean;
  showEditProductModal: boolean;
  deletePending: boolean;
  deleteFinish: boolean;
  deleteFailed: boolean;
  product: Product;
  familyId: number;
}

const initialState: ProductReducerState = {
  createPending: false,
  createFinish: false,
  createFailed: false,
  editPending: false,
  editFinish: false,
  editFailed: false,
  showEditProductModal: false,
  deletePending: false,
  deleteFinish: false,
  deleteFailed: false,
  product: null,
  familyId: null
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
        createPending: true,
        editPending: false,
        showEditProductModal: false,
        deletePending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createPending: false,
        createFinish: true,
        createFailed: false,
        editPending: false,
        showEditProductModal: false,
        deletePending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_CREATE_PRODUCT_FAILED:
      return {
        ...state,
        createPending: false,
        createFinish: false,
        createFailed: true,
        editPending: false,
        showEditProductModal: false,
        deletePending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_EDIT_PRODUCT:
      return {
        ...state,
        createPending: false,
        editPending: true,
        showEditProductModal: false,
        deletePending: false,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        createPending: false,
        editPending: false,
        editFinish: true,
        editFailed: false,
        showEditProductModal: false,
        deletePending: false,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT_FAILED:
      return {
        ...state,
        createPending: false,
        editPending: false,
        editFinish: false,
        editFailed: true,
        showEditProductModal: false,
        deletePending: false,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT:
      return {
        ...state,
        createPending: false,
        editPending: false,
        showEditProductModal: false,
        deletePending: true,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        createPending: false,
        editPending: false,
        showEditProductModal: false,
        deletePending: false,
        deleteFinish: true,
        deleteFailed: false,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT_FAILED:
      return {
        ...state,
        createPending: false,
        editPending: false,
        showEditProductModal: false,
        deletePending: true,
        deleteFinish: false,
        deleteFailed: true,
        product: action.payload
      };
    case product.ACTION_EDIT_BUTTON:
      return {
        ...state,
        createPending: false,
        editPending: false,
        showEditProductModal: true,
        deletePending: false,
        product: action.payload
      };
  }
  return state;
}

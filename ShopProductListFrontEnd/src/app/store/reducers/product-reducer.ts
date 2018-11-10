import * as product from '../actions/product-actions';
import {Product} from '../../model/product';


export interface ProductReducerState {
  createProductPending: boolean;
  createProductFinish: boolean;
  createProductFailed: boolean;
  editProductPending: boolean;
  editProductFinish: boolean;
  editProductFailed: boolean;
  showEditProductModal: boolean;
  deleteProductPending: boolean;
  deleteProductFinish: boolean;
  deleteProductFailed: boolean;
  product: Product;
  familyId: number;
}

const initialState: ProductReducerState = {
  createProductPending: false,
  createProductFinish: false,
  createProductFailed: false,
  editProductPending: false,
  editProductFinish: false,
  editProductFailed: false,
  showEditProductModal: false,
  deleteProductPending: false,
  deleteProductFinish: false,
  deleteProductFailed: false,
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
        createProductPending: true,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductPending: false,
        createProductFinish: true,
        createProductFailed: false,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_CREATE_PRODUCT_FAILED:
      return {
        ...state,
        createProductPending: false,
        createProductFinish: false,
        createProductFailed: true,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.product,
        familyId: action.familyId
      };
    case product.ACTION_EDIT_PRODUCT:
      return {
        ...state,
        createProductPending: false,
        editProductPending: true,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        editProductFinish: true,
        editProductFailed: false,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT_FAILED:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        editProductFinish: false,
        editProductFailed: true,
        showEditProductModal: false,
        deleteProductPending: false,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: true,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: false,
        deleteProductFinish: true,
        deleteProductFailed: false,
        product: action.payload
      };
    case product.ACTION_DELETE_PRODUCT_FAILED:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        showEditProductModal: false,
        deleteProductPending: true,
        deleteProductFinish: false,
        deleteProductFailed: true,
        product: action.payload
      };
    case product.ACTION_EDIT_PRODUCT_BUTTON:
      return {
        ...state,
        createProductPending: false,
        editProductPending: false,
        showEditProductModal: true,
        deleteProductPending: false,
        product: action.payload
      };
  }
  return state;
}

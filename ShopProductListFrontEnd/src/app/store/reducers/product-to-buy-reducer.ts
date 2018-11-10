import * as productToBuy from '../actions/product-to-buy-actions';
import {ProductToBuy} from '../../model/product-to-buy';


export interface ProductToBuyReducerState {
  createProductToBuyPending: boolean;
  createProductToBuyFinish: boolean;
  createProductToBuyFailed: boolean;
  editProductToBuyPending: boolean;
  editProductToBuyFinish: boolean;
  editProductToBuyFailed: boolean;
  showEditProductToBuyModal: boolean;
  deleteProductToBuyPending: boolean;
  deleteProductToBuyFinish: boolean;
  deleteProductToBuyFailed: boolean;
  productToBuy: ProductToBuy;
  familyId: number;
}

const initialState: ProductToBuyReducerState = {
  createProductToBuyPending: false,
  createProductToBuyFinish: false,
  createProductToBuyFailed: false,
  editProductToBuyPending: false,
  editProductToBuyFinish: false,
  editProductToBuyFailed: false,
  showEditProductToBuyModal: false,
  deleteProductToBuyPending: false,
  deleteProductToBuyFinish: false,
  deleteProductToBuyFailed: false,
  productToBuy: null,
  familyId: null
};

export function productToBuyReducer(state = initialState, action: productToBuy.ProductToBuyActionsUnion): ProductToBuyReducerState {
  switch (action.type) {
    case productToBuy.ACTION_INITIAL_PRODUCT_TO_BUY:
      return {
        ...initialState
      };
    case productToBuy.ACTION_CREATE_PRODUCT_TO_BUY:
      return {
        ...state,
        createProductToBuyPending: true,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.productToBuy,
        familyId: action.familyId
      };
    case productToBuy.ACTION_CREATE_PRODUCT_TO_BUY_SUCCESS:
      return {
        ...state,
        createProductToBuyPending: false,
        createProductToBuyFinish: true,
        createProductToBuyFailed: false,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.productToBuy,
        familyId: action.familyId
      };
    case productToBuy.ACTION_CREATE_PRODUCT_TO_BUY_FAILED:
      return {
        ...state,
        createProductToBuyPending: false,
        createProductToBuyFinish: false,
        createProductToBuyFailed: true,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.productToBuy,
        familyId: action.familyId
      };
    case productToBuy.ACTION_EDIT_PRODUCT_TO_BUY:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: true,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_EDIT_PRODUCT_TO_BUY_SUCCESS:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        editProductToBuyFinish: true,
        editProductToBuyFailed: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_EDIT_PRODUCT_TO_BUY_FAILED:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        editProductToBuyFinish: false,
        editProductToBuyFailed: true,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_DELETE_PRODUCT_TO_BUY:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: true,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_DELETE_PRODUCT_TO_BUY_SUCCESS:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: false,
        deleteProductToBuyFinish: true,
        deleteProductToBuyFailed: false,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_DELETE_PRODUCT_TO_BUY_FAILED:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        showEditProductToBuyModal: false,
        deleteProductToBuyPending: true,
        deleteProductToBuyFinish: false,
        deleteProductToBuyFailed: true,
        productToBuy: action.payload
      };
    case productToBuy.ACTION_EDIT_PRODUCT_TO_BUY_BUTTON:
      return {
        ...state,
        createProductToBuyPending: false,
        editProductToBuyPending: false,
        showEditProductToBuyModal: true,
        deleteProductToBuyPending: false,
        productToBuy: action.payload
      };
  }
  return state;
}

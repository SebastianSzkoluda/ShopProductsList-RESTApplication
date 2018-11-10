import {Action} from '@ngrx/store';
import {ProductToBuy} from '../../model/product-to-buy';

export const ACTION_CREATE_PRODUCT_TO_BUY = 'CREATE_PRODUCT_TO_BUY_PENDING';
export const ACTION_CREATE_PRODUCT_TO_BUY_SUCCESS = 'CREATE_PRODUCT_TO_BUY_SUCCESS';
export const ACTION_CREATE_PRODUCT_TO_BUY_FAILED = 'CREATE_PRODUCT_TO_BUY_FAILED';
export const ACTION_EDIT_PRODUCT_TO_BUY = 'EDIT_PRODUCT_TO_BUY_PENDING';
export const ACTION_EDIT_PRODUCT_TO_BUY_SUCCESS = 'EDIT_PRODUCT_TO_BUY_SUCCESS';
export const ACTION_EDIT_PRODUCT_TO_BUY_FAILED = 'EDIT_PRODUCT_TO_BUY_FAILED';
export const ACTION_DELETE_PRODUCT_TO_BUY = 'DELETE_PRODUCT_TO_BUY_PENDING';
export const ACTION_DELETE_PRODUCT_TO_BUY_SUCCESS = 'DELETE_PRODUCT_TO_BUY_SUCCESS';
export const ACTION_DELETE_PRODUCT_TO_BUY_FAILED = 'DELETE_PRODUCT_TO_BUY_FAILED';
export const ACTION_EDIT_PRODUCT_TO_BUY_BUTTON = 'EDIT_PRODUCT_TO_BUY_BUTTON_CLICKED';
export const ACTION_INITIAL_PRODUCT_TO_BUY = 'PRODUCT_TO_BUY_INITIAL_STATE';

export class CreateProductToBuyAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT_TO_BUY;

  constructor(public productToBuy: ProductToBuy, public familyId: number) {
  }
}

export class CreateProductToBuySuccessAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT_TO_BUY_SUCCESS;

  constructor(public productToBuy: ProductToBuy, public familyId: number) {
  }
}

export class CreateProductToBuyFailedAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT_TO_BUY_FAILED;

  constructor(public productToBuy: ProductToBuy, public familyId: number) {
  }
}

export class EditProductToBuyAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_TO_BUY;

  constructor(public payload: any) {
  }
}

export class EditProductToBuySuccessAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_TO_BUY_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditProductToBuyFailedAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_TO_BUY_FAILED;

  constructor(public payload: any) {
  }
}

export class DeleteProductToBuyAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT_TO_BUY;

  constructor(public payload: any) {
  }
}

export class DeleteProductToBuySuccessAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT_TO_BUY_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteProductToBuyFailedAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT_TO_BUY_FAILED;

  constructor(public payload: any) {
  }
}

export class EditProductToBuyButtonAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_TO_BUY_BUTTON;

  constructor(public payload: any) {
  }
}

export class InitialProductToBuyAction implements Action {
  readonly type = ACTION_INITIAL_PRODUCT_TO_BUY;

  constructor() {
  }
}

export type ProductToBuyActionsUnion
  = CreateProductToBuyAction
  | CreateProductToBuySuccessAction
  | CreateProductToBuyFailedAction
  | EditProductToBuyAction
  | EditProductToBuySuccessAction
  | EditProductToBuyFailedAction
  | DeleteProductToBuyAction
  | DeleteProductToBuySuccessAction
  | DeleteProductToBuyFailedAction
  | EditProductToBuyButtonAction
  | InitialProductToBuyAction;

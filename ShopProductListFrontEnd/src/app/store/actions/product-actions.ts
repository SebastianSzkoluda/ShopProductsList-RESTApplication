import {Action} from '@ngrx/store';
import {Product} from '../../model/product';

export const ACTION_CREATE_PRODUCT = 'CREATE_PRODUCT';
export const ACTION_CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const ACTION_CREATE_PRODUCT_FAILED = 'CREATE_PRODUCT_FAILED';
export const ACTION_EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ACTION_EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const ACTION_EDIT_PRODUCT_FAILED = 'EDIT_PRODUCT_FAILED';
export const ACTION_DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ACTION_DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const ACTION_DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED';
export const ACTION_EDIT_BUTTON = 'EDIT_BUTTON_CLICKED';
export const ACTION_INITIAL_PRODUCT = 'PRODUCT_INITIAL_STATE';

export class CreateProductAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT;

  constructor(public product: Product, public familyId: number) {
  }
}

export class CreateProductSuccessAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT_SUCCESS;

  constructor(public product: Product, public familyId: number) {
  }
}

export class CreateProductFailedAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT_FAILED;

  constructor(public product: Product, public familyId: number) {
  }
}

export class EditProductAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT;

  constructor(public payload: any) {
  }
}

export class EditProductSuccessAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditProductFailedAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT_FAILED;

  constructor(public payload: any) {
  }
}

export class DeleteProductAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT;

  constructor(public payload: any) {
  }
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteProductFailedAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT_FAILED;

  constructor(public payload: any) {
  }
}

export class EditButtonAction implements Action {
  readonly type = ACTION_EDIT_BUTTON;

  constructor(public payload: any) {
  }
}

export class InitialProductAction implements Action {
  readonly type = ACTION_INITIAL_PRODUCT;

  constructor() {
  }
}

export type ProductActionsUnion
  = CreateProductAction
  | CreateProductSuccessAction
  | CreateProductFailedAction
  | EditProductAction
  | EditProductSuccessAction
  | EditProductFailedAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | DeleteProductFailedAction
  | EditButtonAction
  | InitialProductAction;

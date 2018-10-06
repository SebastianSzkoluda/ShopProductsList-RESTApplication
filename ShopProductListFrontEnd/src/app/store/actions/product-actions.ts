import {Action} from '@ngrx/store';
import {
  AcceptNotificationAction, CreateNotificationAction,
  DeclineNotificationAction,
  InitialNotificationAction,
  ReceivedNotificationAction, RefreshNotificationAction
} from './notification-actions';

export const ACTION_CREATE_PRODUCT = 'CREATE_PRODUCT';
export const ACTION_EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ACTION_DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ACTION_EDIT_BUTTON = 'EDIT_BUTTON_CLICKED';
export const ACTION_INITIAL_PRODUCT = 'PRODUCT_INITIAL_STATE';

export class CreateProductAction implements Action {
  readonly type = ACTION_CREATE_PRODUCT;

  constructor(public payload: any) { }
}
export class EditProductAction implements Action {
  readonly type = ACTION_EDIT_PRODUCT;

  constructor(public payload: any) { }
}
export class DeleteProductAction implements Action {
  readonly type = ACTION_DELETE_PRODUCT;

  constructor(public payload: any) { }
}
export class EditButtonAction implements Action {
  readonly type = ACTION_EDIT_BUTTON;

  constructor(public payload: any) { }
}
export class InitialProductAction implements Action {
  readonly type = ACTION_INITIAL_PRODUCT;

  constructor(public payload: any) { }
}

export type ProductActionsUnion
  = CreateProductAction
  | EditProductAction
  | DeleteProductAction
  | EditButtonAction
  | InitialProductAction;

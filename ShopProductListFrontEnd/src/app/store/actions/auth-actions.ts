import {Action} from '@ngrx/store';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN = 'LOGIN';
export const ACTION_RENEW_TOKEN = 'RENEW TOKEN';
export const ACTION_RECEIVED_TOKEN = 'RECEIVED TOKEN';

export class LoginAction implements Action {
  readonly type = ACTION_LOGIN;

  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = ACTION_LOGOUT;

  constructor(public payload: any) {
  }
}


export class RenewTokenAction implements Action {
  readonly type = ACTION_RENEW_TOKEN;

  constructor(public payload: any) {
  }
}


export class ReceivedTokenAction implements Action {
  readonly type = ACTION_RECEIVED_TOKEN;

  constructor(public payload: any) {
  }
}

export type AuthActionsUnion
  = LoginAction
  | LogoutAction
  | RenewTokenAction
  | ReceivedTokenAction;

import {Action} from '@ngrx/store';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN = 'LOGIN';

export class LoginAction implements Action {
  readonly type = ACTION_LOGIN;

  constructor(public payload: any) { }
}
export class LogoutAction implements Action {
  readonly type = ACTION_LOGOUT;

  constructor(public payload: any) { }
}

export type AuthActionsUnion
  = LoginAction
  | LogoutAction;

import {Action} from '@ngrx/store';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGGEDIN = 'LOGGEDIN';
export const ACTION_UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const ACTION_USER_CREATED = 'USER_CREATED';
export const ACTION_RENEW_TOKEN = 'RENEW TOKEN';
export const ACTION_RECEIVED_TOKEN = 'RECEIVED TOKEN';

export class LoginAction implements Action {
  readonly type = ACTION_LOGGEDIN;

  constructor(public payload: any, public token: Array<any>) {
  }
}

export class LogoutAction implements Action {
  readonly type = ACTION_LOGOUT;

  constructor() {
  }
}

export class UploadAvatarAction implements Action {
  readonly type = ACTION_UPLOAD_AVATAR;

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
  | UploadAvatarAction
  | RenewTokenAction
  | ReceivedTokenAction;

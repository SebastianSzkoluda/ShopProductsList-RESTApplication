import {Action} from '@ngrx/store';

export const ACTION_CREATE_FAMILY = 'CREATE_FAMILY';
export const ACTION_FAIMLY_CREATE_SUCCESS = 'FAMILY_CREATE_SUCCESS';
export const ACTION_FAIMLY_CREATE_FAILED = 'FAMILY_CREATE_FAILED';
export const ACTION_JOIN_FAMILY = 'JOIN_FAMILY';
export const ACTION_INITIAL_FAMILY = 'FAMILY_INITIAL_STATE';

export class CreateFamilyAction implements Action {
  readonly type = ACTION_CREATE_FAMILY;

  constructor(public payload: any) {
  }
}

export class FamilyCreateSuccessAction implements Action {
  readonly type = ACTION_FAIMLY_CREATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class FamilyCreateFailedAction implements Action {
  readonly type = ACTION_FAIMLY_CREATE_FAILED;

  constructor(public payload: any) {
  }
}

export class JoinFamilyAction implements Action {
  readonly type = ACTION_JOIN_FAMILY;

  constructor(public payload: any) {
  }
}

export class InitialFamilyAction implements Action {
  readonly type = ACTION_INITIAL_FAMILY;

  constructor() {
  }
}

export type FamilyActionsUnion
  = CreateFamilyAction
  | FamilyCreateSuccessAction
  | FamilyCreateFailedAction
  | JoinFamilyAction
  | InitialFamilyAction;

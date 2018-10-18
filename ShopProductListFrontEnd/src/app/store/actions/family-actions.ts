import {Action} from '@ngrx/store';

export const ACTION_CREATE_FAMILY = 'CREATE_FAMILY';
export const ACTION_JOIN_FAMILY = 'JOIN_FAMILY';
export const ACTION_INITIAL_FAMILY = 'FAMILY_INITIAL_STATE';

export class CreateFamilyAction implements Action {
  readonly type = ACTION_CREATE_FAMILY;

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

  constructor(public payload: any) {
  }
}

export type FamilyActionsUnion
  = CreateFamilyAction
  | JoinFamilyAction
  | InitialFamilyAction;

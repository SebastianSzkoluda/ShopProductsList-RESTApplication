import * as family from '../actions/family-actions';
import {Family} from '../../model/family';


export interface FamilyReducerState {
  createPending: boolean;
  join: boolean;
  createFinish: boolean;
  createFailed: boolean;
  family: Family;
}

const initialState: FamilyReducerState = {
  createPending: false,
  join: false,
  createFinish: false,
  createFailed: false,
  family: null,
};

export function familyReducer(state = initialState, action: family.FamilyActionsUnion): FamilyReducerState {
  switch (action.type) {
    case family.ACTION_INITIAL_FAMILY:
      return {
        ...initialState,
      };
    case family.ACTION_CREATE_FAMILY:
      return {
        ...state,
        createPending: true,
        join: false,
        family: action.payload
      };
    case family.ACTION_FAIMLY_CREATE_SUCCESS:
      return {
        ...state,
        createPending: false,
        createFinish: true,
        createFailed: false,
        join: false,
        family: action.payload
      };
    case family.ACTION_FAIMLY_CREATE_FAILED:
      return {
        ...state,
        createPending: false,
        createFinish: false,
        createFailed: true,
        join: false,
        family: action.payload
      };
    case family.ACTION_JOIN_FAMILY:
      return {
        ...state,
        createPending: false,
        createFinish: false,
        createFailed: false,
        join: true,
        family: action.payload
      };
  }
  return state;
}

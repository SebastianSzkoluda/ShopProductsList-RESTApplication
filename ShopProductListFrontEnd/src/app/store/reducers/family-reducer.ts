import * as family from '../actions/family-actions';
import {Family} from '../../model/family';


export interface FamilyReducerState {
  createFamilyPending: boolean;
  joinFamily: boolean;
  createFamilyFinish: boolean;
  createFamilyFailed: boolean;
  family: Family;
}

const initialState: FamilyReducerState = {
  createFamilyPending: false,
  joinFamily: false,
  createFamilyFinish: false,
  createFamilyFailed: false,
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
        createFamilyPending: true,
        joinFamily: false,
        family: action.payload
      };
    case family.ACTION_FAIMLY_CREATE_SUCCESS:
      return {
        ...state,
        createFamilyPending: false,
        createFamilyFinish: true,
        createFamilyFailed: false,
        joinFamily: false,
        family: action.payload
      };
    case family.ACTION_FAIMLY_CREATE_FAILED:
      return {
        ...state,
        createFamilyPending: false,
        createFamilyFinish: false,
        createFamilyFailed: true,
        joinFamily: false,
        family: action.payload
      };
    case family.ACTION_JOIN_FAMILY:
      return {
        ...state,
        createFamilyPending: false,
        createFamilyFinish: false,
        createFamilyFailed: false,
        joinFamily: true,
        family: action.payload
      };
  }
  return state;
}

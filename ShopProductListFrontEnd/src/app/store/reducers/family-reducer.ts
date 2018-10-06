import * as family from '../actions/family-actions';
import {Family} from '../../model/family';


export interface FamilyReducerState {
  create: boolean;
  family: Family;
}

const initialState: FamilyReducerState = {
  create: false,
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
        create: true,
        family: action.payload
      };
  }
  return state;
}

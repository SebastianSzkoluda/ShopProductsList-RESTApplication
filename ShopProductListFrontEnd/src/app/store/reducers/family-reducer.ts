import {ACTION_CREATE, ACTION_INITIAL_FAMILY} from '../actions/family-actions';
import {Family} from '../../model/family';


export interface FamilyReducerState {
  create: boolean;
  family: Family;
}

const initialState: FamilyReducerState = {
  create: false,
  family: null,
};

export function familyReducer(state = initialState, action): FamilyReducerState {
  switch (action.type) {
    case ACTION_INITIAL_FAMILY:
      return {
        ...initialState,
      }
    case ACTION_CREATE:
      return {
        ...state,
        create: true,
        family: action.payload
      };
  }
  return state;
}

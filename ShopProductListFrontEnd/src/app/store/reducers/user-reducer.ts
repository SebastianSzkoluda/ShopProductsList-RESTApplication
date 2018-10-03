import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/user-actions';


export interface UserReducerState {
  login: boolean;
  user?: string;
}

const initialState: UserReducerState = {
  login: (sessionStorage.getItem('currentUser') != null),
  user: sessionStorage.getItem('currentUser')
};

export function userReducer(state = initialState, action): UserReducerState {
  switch (action.type) {
    case ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        user: action.payload
      };
    case ACTION_LOGIN:
      return {
        ...state,
        login: true,
        user: action.payload,
      };
  }
  return state;
}

import * as auth from '../actions/user-actions';


export interface UserReducerState {
  login: boolean;
  user?: string;
}

const initialState: UserReducerState = {
  login: (localStorage.getItem('currentUser') != null),
  user: localStorage.getItem('currentUser')
};

export function userReducer(state = initialState, action: auth.AuthActionsUnion): UserReducerState {
  switch (action.type) {
    case auth.ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        user: action.payload
      };
    case auth.ACTION_LOGIN:
      return {
        ...state,
        login: true,
        user: action.payload,
      };
  }
  return state;
}

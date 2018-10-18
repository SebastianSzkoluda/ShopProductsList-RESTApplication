import * as auth from '../actions/auth-actions';


export interface AuthReducerState {
  login: boolean;
  renew: boolean;
  received: boolean;
  user: string;
  token: string;
}

const initialState: AuthReducerState = {
  login: (localStorage.getItem('currentUser') != null),
  renew: false,
  received: false,
  user: localStorage.getItem('currentUser'),
  token: null
};

export function authReducer(state = initialState, action: auth.AuthActionsUnion): AuthReducerState {
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
    case auth.ACTION_RENEW_TOKEN:
      return {
        ...state,
        renew: true,
        received: false,
      };
    case auth.ACTION_RECEIVED_TOKEN:
      return {
        ...state,
        login: true,
        renew: false,
        received: true,
        token: action.payload,
      };
  }
  return state;
}

import * as auth from '../actions/auth-actions';


export interface AuthReducerState {
  login: boolean;
  renew: boolean;
  received: boolean;
  token: any;

}

const initialState: AuthReducerState = {
  login: (localStorage.getItem('currentUser') != null),
  renew: false,
  received: false,
  token: JSON.parse(localStorage.getItem('token'))
};

export function authReducer(state = initialState, action: auth.AuthActionsUnion): AuthReducerState {
  switch (action.type) {
    case auth.ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        token: null
      };
    case auth.ACTION_LOGGEDIN:
      return {
        ...state,
        login: true,
        token: action.payload,
      };
    case auth.ACTION_UPLOAD_AVATAR:
      return {
        ...state,
        token: {
          ...state.token,
          avatar: action.payload
        }
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

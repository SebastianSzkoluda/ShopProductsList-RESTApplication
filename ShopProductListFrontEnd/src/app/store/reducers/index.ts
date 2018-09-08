import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/app-actions';


interface AppReducerState {
  login: boolean;
  user?: string;
}

const initialState: AppReducerState = {
  login: false,
  user: 'guest'
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOGOUT:
      return {
        ...state,
        login: false
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

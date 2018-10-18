import {authReducer, AuthReducerState} from './auth-reducer';
import {familyReducer, FamilyReducerState} from './family-reducer';
import {productReducer, ProductReducerState} from './product-reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {notificationReducer, NotificationReducerState} from './notification-reducer';

interface AppState {
  authReducer: AuthReducerState;
  familyReducer: FamilyReducerState;
  productReducer: ProductReducerState;
  notificationReducer: NotificationReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer: authReducer,
  familyReducer: familyReducer,
  productReducer: productReducer,
  notificationReducer: notificationReducer
};

export const selectLoginState = createFeatureSelector<AppState, AuthReducerState>('authReducer');

export const selectLoggedIn = createSelector(
  selectLoginState, (state: AuthReducerState) => state.login
);

export const selectLoggedUsername = createSelector(
  selectLoginState, (state: AuthReducerState) => state.user
);

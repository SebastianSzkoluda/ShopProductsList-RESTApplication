import {userReducer, UserReducerState} from './user-reducer';
import {familyReducer} from './family-reducer';
import {productReducer, ProductReducerState} from './product-reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {FamilyReducerState} from './family-reducer';
import {notificationReducer, NotificationReducerState} from './notification-reducer';

interface AppState {
  userReducer: UserReducerState;
  familyReducer: FamilyReducerState;
  productReducer: ProductReducerState;
  notificationReducer: NotificationReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  userReducer: userReducer,
  familyReducer: familyReducer,
  productReducer: productReducer,
  notificationReducer: notificationReducer
};

export const selectLoginState = createFeatureSelector<AppState,UserReducerState>('userReducer');

export const selectLoggedIn = createSelector(
  selectLoginState, (state: UserReducerState) => state.login
);

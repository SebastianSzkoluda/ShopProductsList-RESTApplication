import {userReducer, UserReducerState} from './user-reducer';
import {familyReducer} from './family-reducer';
import {productReducer, ProductReducerState} from './product-reducer';
import { ActionReducerMap } from '@ngrx/store';
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

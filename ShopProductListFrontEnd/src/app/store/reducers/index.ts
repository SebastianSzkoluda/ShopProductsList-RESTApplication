import {userReducer, UserReducerState} from './user-reducer';
import {familyReducer} from './family-reducer';
import {productReducer, ProductReducerState} from './product-reducer';
import { ActionReducerMap } from '@ngrx/store';
import {FamilyReducerState} from './family-reducer';

interface AppState {
  userReducer: UserReducerState;
  familyReducer: FamilyReducerState;
  productReducer: ProductReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  userReducer: userReducer,
  familyReducer: familyReducer,
  productReducer: productReducer,
};

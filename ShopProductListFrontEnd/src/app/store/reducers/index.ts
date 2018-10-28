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

export const selectAuthState = createFeatureSelector<AppState, AuthReducerState>('authReducer');

export const selectFamilyState = createFeatureSelector<AppState, FamilyReducerState>('familyReducer');

export const selectNotificationState = createFeatureSelector<AppState, NotificationReducerState>('notificationReducer');

export const selectProductState = createFeatureSelector<AppState, ProductReducerState>('productReducer');


/*
* Auth Selectors
*/

export const selectLoggedIn = createSelector(
  selectAuthState, (state: AuthReducerState) => state.login
);

export const selectLoggedUsername = createSelector(
  selectAuthState, (state: AuthReducerState) => state.token.sub
);

export const selectTokenInfo = createSelector(
  selectAuthState, (state: AuthReducerState) => state.token
);

export const selectUserAvatar = createSelector(
  selectAuthState, (state: AuthReducerState) => state.token ? state.token.avatar : null
);

export const selectIsAdmin = createSelector(
  selectAuthState, (state: AuthReducerState) => state.token ? state.token.scopes.filter(item => item.name === 'ROLE_ADMIN').length > 0 : false
);

/*
* Family Selectors
*/
export const selectFamily = createSelector(
  selectFamilyState, (state: FamilyReducerState) => state.family
);

export const selectCreateFamilySuccess = createSelector(
  selectFamilyState, (state: FamilyReducerState) => state.createFinish
);

export const selectCreateFamilyFailed = createSelector(
  selectFamilyState, (state: FamilyReducerState) => state.createFailed
);
/*
* Notification Selectors
*/
export const selectNotification = createSelector(
  selectNotificationState, (state: NotificationReducerState) => state.notification
);

export const selectInvitation = createSelector(
  selectNotificationState, (state: NotificationReducerState) => state.invitation
);

export const selectSendInvitationSuccess = createSelector(
  selectNotificationState, (state: NotificationReducerState) => state.sendFinish
);

export const selectSendInvitationFailed = createSelector(
  selectNotificationState, (state: NotificationReducerState) => state.sendFailed
);
/*
* Product Selectors
*/
export const selectProduct = createSelector(
  selectProductState, (state: ProductReducerState) => state.product
);

export const selectFamilyId = createSelector(
  selectProductState, (state: ProductReducerState) => state.familyId
);

export const selectShowEditProductModal = createSelector(
  selectProductState, (state: ProductReducerState) => state.showEditProductModal
);

export const selectCreateProductSuccess = createSelector(
  selectProductState, (state: ProductReducerState) => state.createFinish
);

export const selectCreateProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.createFailed
);

export const selectEditProductSuccess = createSelector(
  selectProductState, (state: ProductReducerState) => state.editFinish
);

export const selectEditProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.editFailed
);

export const selectDeleteProductSuccess = createSelector(
  selectProductState, (state: ProductReducerState) => state.deleteFinish
);

export const selectDeleteProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.deleteFailed
);

import {authReducer, AuthReducerState} from './auth-reducer';
import {familyReducer, FamilyReducerState} from './family-reducer';
import {productReducer, ProductReducerState} from './product-reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {notificationReducer, NotificationReducerState} from './notification-reducer';
import {productToBuyReducer, ProductToBuyReducerState} from './product-to-buy-reducer';

interface AppState {
  authReducer: AuthReducerState;
  familyReducer: FamilyReducerState;
  productReducer: ProductReducerState;
  productToBuyReducer: ProductToBuyReducerState;
  notificationReducer: NotificationReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer: authReducer,
  familyReducer: familyReducer,
  productReducer: productReducer,
  productToBuyReducer: productToBuyReducer,
  notificationReducer: notificationReducer
};

export const selectAuthState = createFeatureSelector<AppState, AuthReducerState>('authReducer');

export const selectFamilyState = createFeatureSelector<AppState, FamilyReducerState>('familyReducer');

export const selectNotificationState = createFeatureSelector<AppState, NotificationReducerState>('notificationReducer');

export const selectProductState = createFeatureSelector<AppState, ProductReducerState>('productReducer');

export const selectProductToBuyState = createFeatureSelector<AppState, ProductToBuyReducerState>('productToBuyReducer');


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
  selectFamilyState, (state: FamilyReducerState) => state.createFamilyFinish
);

export const selectCreateFamilyFailed = createSelector(
  selectFamilyState, (state: FamilyReducerState) => state.createFamilyFailed
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
  selectProductState, (state: ProductReducerState) => state.createProductFinish
);

export const selectCreateProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.createProductFailed
);

export const selectEditProductSuccess = createSelector(
  selectProductState, (state: ProductReducerState) => state.editProductFinish
);

export const selectEditProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.editProductFailed
);

export const selectDeleteProductSuccess = createSelector(
  selectProductState, (state: ProductReducerState) => state.deleteProductFinish
);

export const selectDeleteProductFailed = createSelector(
  selectProductState, (state: ProductReducerState) => state.deleteProductFailed
);
/*
* ProductToBuy Selectors
*/
export const selectProductToBuy = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.productToBuy
);

export const selectFamilyIdProductToBuy = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.familyId
);

export const selectCreateProductToBuySuccess = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.createProductToBuyFinish
);

export const selectEditProductToBuySuccess = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.editProductToBuyFinish
);

export const selectDeleteProductToBuySuccess = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.deleteProductToBuyFinish
);

export const selectDeleteProductToBuyFailed = createSelector(
  selectProductToBuyState, (state: ProductToBuyReducerState) => state.deleteProductToBuyFailed
);

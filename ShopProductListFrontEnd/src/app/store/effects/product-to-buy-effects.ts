import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {selectFamilyIdProductToBuy, selectProduct, selectProductToBuy} from '../reducers';
import * as prodToBuy from '../actions/product-to-buy-actions';
import {
  CreateProductToBuyFailedAction,
  CreateProductToBuySuccessAction, DeleteProductToBuyFailedAction, DeleteProductToBuySuccessAction,
  EditProductToBuyFailedAction,
  EditProductToBuySuccessAction
} from '../actions/product-to-buy-actions';
import {DeleteProductFailedAction, DeleteProductSuccessAction} from '../actions/product-actions';
import {of} from 'rxjs/internal/observable/of';
import {NzMessageService} from 'ng-zorro-antd';
import {ProductToBuyService} from '../../products-to-buy/product-to-buy-manager/product-to-buy.service';

@Injectable()
export class ProductToBuyEffects {

  constructor(private actions$: Actions, private productToBuyService: ProductToBuyService, private store: Store<any>, private message: NzMessageService) {
  }

  @Effect()
  createProductToBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_CREATE_PRODUCT_TO_BUY),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProductToBuy)), this.store.pipe(select(selectFamilyIdProductToBuy))),
      switchMap(([, productToBuy, familyId]) => {
        return this.productToBuyService.saveProductToBuyForCurrentFamily(productToBuy, familyId)
          .pipe(map(pr => new CreateProductToBuySuccessAction(pr, familyId)),
            catchError(() => of(new CreateProductToBuyFailedAction(null, null))));
      })
    );

  @Effect()
  editProductToBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_EDIT_PRODUCT_TO_BUY),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProductToBuy))),
      switchMap(([, productToBuy]) => {
        return this.productToBuyService.editProductToBuy(productToBuy)
          .pipe(map(pr => new EditProductToBuySuccessAction(pr)),
            catchError(() => of(new EditProductToBuyFailedAction(null))));
      })
    );

  @Effect()
  deleteProductToBuy$: Observable<Action> = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_DELETE_PRODUCT_TO_BUY),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProductToBuy))),
      switchMap(([, productToBuy]) => {
        return this.productToBuyService.deleteProductToBuy(productToBuy.productId)
          .pipe(map(() => new DeleteProductToBuySuccessAction(productToBuy)),
            catchError(() => of(new DeleteProductToBuyFailedAction(null))));
      })
    );

  @Effect({dispatch: false})
  createProductToBuySuccessMessage$ = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_CREATE_PRODUCT_TO_BUY_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Product created successfully!');
      })
    );

  @Effect({dispatch: false})
  createProductToBuyFailedMessage$ = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_CREATE_PRODUCT_TO_BUY_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Create product failed!');
      })
    );

  @Effect({dispatch: false})
  editProductSuccessMessage$ = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_EDIT_PRODUCT_TO_BUY_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Product edited successfully!');
      })
    );

  @Effect({dispatch: false})
  editProductFailedMessage$ = this.actions$
    .pipe(
      ofType(prodToBuy.ACTION_EDIT_PRODUCT_TO_BUY_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Edit product failed!');
      })
    );
}

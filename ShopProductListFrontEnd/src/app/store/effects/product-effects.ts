import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {selectFamilyId, selectProduct} from '../reducers';
import * as prod from '../actions/product-actions';
import {
  CreateProductFailedAction,
  CreateProductSuccessAction,
  DeleteProductFailedAction,
  DeleteProductSuccessAction,
  EditProductFailedAction,
  EditProductSuccessAction
} from '../actions/product-actions';
import {of} from 'rxjs/internal/observable/of';
import {ProductService} from '../../products/product-manager/product.service';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService, private store: Store<any>, private message: NzMessageService) {
  }

  @Effect()
  createProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(prod.ACTION_CREATE_PRODUCT),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProduct)), this.store.pipe(select(selectFamilyId))),
      switchMap(([, product, familyId]) => {
        return this.productService.saveProductForCurrentFamily(product, familyId)
          .pipe(map(() => new CreateProductSuccessAction(product, familyId)),
            catchError(() => of(new CreateProductFailedAction(null, null))));
      })
    );

  @Effect()
  editProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(prod.ACTION_EDIT_PRODUCT),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProduct))),
      switchMap(([, product]) => {
        return this.productService.editProduct(product)
          .pipe(map(() => new EditProductSuccessAction(product)),
            catchError(() => of(new EditProductFailedAction(null))));
      })
    );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(prod.ACTION_DELETE_PRODUCT),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectProduct))),
      switchMap(([, product]) => {
        return this.productService.deleteProduct(product.productId)
          .pipe(map(() => new DeleteProductSuccessAction(product)),
            catchError(() => of(new DeleteProductFailedAction(null))));
      })
    );

  @Effect({dispatch: false})
  createProductSuccessMessage$ = this.actions$
    .pipe(
      ofType(prod.ACTION_CREATE_PRODUCT_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Product created successfully!');
      })
    );

  @Effect({dispatch: false})
  createProductFailedMessage$ = this.actions$
    .pipe(
      ofType(prod.ACTION_CREATE_PRODUCT_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Create product failed!');
      })
    );

  @Effect({dispatch: false})
  editProductSuccessMessage$ = this.actions$
    .pipe(
      ofType(prod.ACTION_EDIT_PRODUCT_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Product edited successfully!');
      })
    );

  @Effect({dispatch: false})
  editProductFailedMessage$ = this.actions$
    .pipe(
      ofType(prod.ACTION_EDIT_PRODUCT_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Edit product failed!');
      })
    );
}

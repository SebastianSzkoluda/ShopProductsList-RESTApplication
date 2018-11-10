import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FamilyService} from '../../family/family-manager/family.service';
import {map, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {InitialFamilyAction} from '../../store/actions/family-actions';
import {Family} from '../../model/family';
import {NzMessageService} from 'ng-zorro-antd';
import {selectDeleteProductToBuyFailed, selectDeleteProductToBuySuccess} from '../../store/reducers';
import {ProductToBuy} from '../../model/product-to-buy';
import {ProductToBuyService} from '../product-to-buy-manager/product-to-buy.service';
import {
  DeleteProductToBuyAction,
  EditProductToBuyButtonAction,
  InitialProductToBuyAction
} from '../../store/actions/product-to-buy-actions';

@Component({
  selector: 'app-product-to-buy-list',
  templateUrl: './product-to-buy-list.component.html',
  styleUrls: ['./product-to-buy-list.component.css']
})
export class ProductToBuyListComponent implements OnInit, OnDestroy {

  familyName = 'No family selected';
  familyId = 0;
  families: Array<Family>;
  productsToBuy: Array<ProductToBuy>;
  sortName = null;
  sortValue = null;
  deleteSuccess$: Observable<boolean>;
  deleteFailed$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private familyService: FamilyService, private productToBuyService: ProductToBuyService, private store: Store<any>, private message: NzMessageService) {
    this.deleteSuccess$ = this.store.pipe(select(selectDeleteProductToBuySuccess));
    this.deleteFailed$ = this.store.pipe(select(selectDeleteProductToBuyFailed));
  }

  ngOnInit() {
    this.initializeProductToBuyList();
    this.updateFamilyState();
    this.updateProductToBuyState();
  }

  getFamilies() {
    return this.familyService.loggedUserFamilies().pipe(map(value => {
      this.families = value;
    }));
  }

  getProductsToBuyForFamily(familyName: string, familyId: number) {
    this.familyName = familyName;
    this.familyId = familyId;

    this.productToBuyService.getProductsToBuyForCurrentFamily(familyId).pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.productsToBuy = value;
    });
  }

  editMode(productToBuy: ProductToBuy) {
    this.store.dispatch(new EditProductToBuyButtonAction(productToBuy));
  }

  deleteProduct(productToBuy: ProductToBuy) {
    this.store.dispatch(new DeleteProductToBuyAction(productToBuy));

    this.deleteSuccess$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      if (value) {
        this.createMessage('success', 'Product deleted successfully!');
        this.productsToBuy = this.productsToBuy.filter(item => item !== productToBuy);
      }
    });

    this.deleteFailed$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      if (value) {
        this.createMessage('error', 'Delete product failed!');
      }
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    if (this.sortName) {
      const data = this.productsToBuy.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
      this.productsToBuy = [...data];
    }
  }

  updateFamilyState() {
    this.store.dispatch(new InitialFamilyAction());
    this.familyService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.family !== null && (state.createFamilyFinish === true || state.joinFamily === true)) {
        console.log(state.family);
        this.families = [...this.families, state.family];
        console.log(this.families);
        this.store.dispatch(new InitialFamilyAction());
      }
    });
  }

  updateProductToBuyState() {
    this.productToBuyService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.productToBuy !== null) {
        console.log(state.productToBuy);
        if (state.editProductToBuyFinish === true) {
          this.productsToBuy.forEach(element => {
            if (element.productId === state.productToBuy.productId) {
              element = state.productToBuy;
            }
          });
          console.log(this.productsToBuy);
          this.store.dispatch(new InitialProductToBuyAction());
        } else if (state.createProductToBuyFinish === true) {
          this.productsToBuy = [...this.productsToBuy, state.productToBuy];
          console.log(this.productsToBuy);
          this.store.dispatch(new InitialProductToBuyAction());
        }
      }
    });
  }

  initializeProductToBuyList() {
    this.getFamilies().pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.families.length !== 0) {
        console.log(this.families);
        this.familyName = this.families[0].familyName;
        this.familyId = this.families[0].familyId;
        this.getProductsToBuyForFamily(this.familyName, this.familyId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}

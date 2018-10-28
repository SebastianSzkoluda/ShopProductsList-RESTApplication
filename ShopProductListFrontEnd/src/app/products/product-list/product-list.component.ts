import {Component, OnDestroy, OnInit} from '@angular/core';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';
import {ProductService} from '../product-manager/product.service';
import {Product} from '../../model/product';
import {map, takeUntil} from 'rxjs/operators';
import {DeleteProductAction, EditButtonAction, InitialProductAction} from '../../store/actions/product-actions';
import {InitialFamilyAction} from '../../store/actions/family-actions';
import {Subject} from 'rxjs/internal/Subject';
import {select, Store} from '@ngrx/store';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable} from 'rxjs/internal/Observable';
import {selectDeleteProductFailed, selectDeleteProductSuccess} from '../../store/reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  familyName = 'No family selected';
  familyId: number = 0;
  families: Array<Family>;
  products: Array<Product>;
  sortName = null;
  sortValue = null;
  deleteSuccess$: Observable<boolean>;
  deleteFailed$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private familyService: FamilyService, private productService: ProductService, private store: Store<any>, private message: NzMessageService) {
    this.deleteSuccess$ = this.store.pipe(select(selectDeleteProductSuccess));
    this.deleteFailed$ = this.store.pipe(select(selectDeleteProductFailed));
  }

  ngOnInit() {
    this.initializeProductList();
    this.updateFamilyState();
    this.updateProductState();
  }

  getFamilies() {
    return this.familyService.loggedUserFamilies().pipe(map(value => {
      this.families = value;
    }));
  }

  getProductsForFamily(familyName: string, familyId: number) {
    this.familyName = familyName;
    this.familyId = familyId;

    this.productService.getProductsForCurrentFamily(familyId).pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.products = value;
    });
  }

  editMode(product: Product) {
    this.store.dispatch(new EditButtonAction(product));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));

    this.deleteSuccess$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      if (value) {
        this.createMessage('success', 'Product deleted successfully!');
        this.products = this.products.filter(item => item != product);
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
      const data = this.products.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
      this.products = [...data];
    }
  }

  updateFamilyState() {
    this.familyService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.family !== null && (state.createFinish === true || state.join === true)) {
        console.log(state.family);
        this.families.push(state.family);
        this.store.dispatch(new InitialFamilyAction());
      }
    });
  }

  updateProductState() {
    this.productService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.product !== null && (state.editFinish === true || state.createFinish === true)) {
        this.getProductsForFamily(this.familyName, this.familyId);
        this.products.push(state.product);
        this.store.dispatch(new InitialProductAction());
      }
    });
  }

  initializeProductList() {
    this.getFamilies().pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.families.length !== 0) {
        console.log(this.families);
        this.familyName = this.families[0].familyName;
        this.familyId = this.families[0].familyId;
        this.getProductsForFamily(this.familyName, this.familyId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}

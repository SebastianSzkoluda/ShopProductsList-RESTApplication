import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../product-manager/product.service';
import {EditProductAction, InitialProductAction} from '../../store/actions/product-actions';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectEditProductSuccess} from '../../store/reducers';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Input()
  productId: number;
  product = new Product();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  editProductSucces$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder, private productService: ProductService, private store: Store<any>) {
    this.editProductSucces$ = this.store.pipe(select(selectEditProductSuccess));
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      frequencyOfUse: [null, [Validators.required]],
      price: [null, [Validators.required]],
      inStock: [null, [Validators.required]],
      userComment: [null, [Validators.required]]
    });
    this.productService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.showEditProductModal === true) {
        this.productId = state.product.productId;
        this.product = state.product;
        this.validateForm.get('productName').setValue(this.product.productName);
        this.validateForm.get('frequencyOfUse').setValue(this.product.frequencyOfUse);
        this.validateForm.get('price').setValue(this.product.price);
        this.validateForm.get('inStock').setValue(this.product.inStock);
        this.validateForm.get('userComment').setValue(this.product.userComment);
        this.showModal();
      }
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  editProduct() {
    this.product.productName = this.validateForm.get('productName').value;
    this.product.frequencyOfUse = this.validateForm.get('frequencyOfUse').value;
    this.product.price = this.validateForm.get('price').value;
    this.product.inStock = this.validateForm.get('inStock').value;
    this.product.userComment = this.validateForm.get('userComment').value;

    this.store.dispatch(new EditProductAction(this.product));
    this.editProductSucces$.pipe().subscribe(value => {
      if (value) this.handleOk();
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.editProduct();
  }

  handleCancel(): void {
    this.store.dispatch(new InitialProductAction());
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectEditProductToBuySuccess} from '../../store/reducers';
import {ProductToBuyService} from '../product-to-buy-manager/product-to-buy.service';
import {ProductToBuy} from '../../model/product-to-buy';
import {EditProductToBuyAction, InitialProductToBuyAction} from '../../store/actions/product-to-buy-actions';

@Component({
  selector: 'app-edit-product-to-buy',
  templateUrl: './edit-product-to-buy.component.html',
  styleUrls: ['./edit-product-to-buy.component.css']
})
export class EditProductToBuyComponent implements OnInit, OnDestroy {

  @Input()
  productId: number;
  productToBuy = new ProductToBuy();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  editProductSucces$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder, private productToBuyService: ProductToBuyService, private store: Store<any>) {
    this.editProductSucces$ = this.store.pipe(select(selectEditProductToBuySuccess));
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      amountToBuy: [null, [Validators.required]],
      shop: [null, [Validators.required]]
    });
    this.productToBuyService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.showEditProductToBuyModal === true) {
        this.productId = state.productToBuy.productId;
        this.productToBuy = state.productToBuy;
        this.validateForm.get('productName').setValue(this.productToBuy.productName);
        this.validateForm.get('amountToBuy').setValue(this.productToBuy.amountToBuy);
        this.validateForm.get('shop').setValue(this.productToBuy.shop);
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
    this.productToBuy.productName = this.validateForm.get('productName').value;
    this.productToBuy.amountToBuy = this.validateForm.get('amountToBuy').value;
    this.productToBuy.shop = this.validateForm.get('shop').value;

    this.store.dispatch(new EditProductToBuyAction(this.productToBuy));
    this.editProductSucces$.pipe().subscribe(value => {
      if (value) {
        this.handleOk();
      }
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
    this.store.dispatch(new InitialProductToBuyAction());
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}

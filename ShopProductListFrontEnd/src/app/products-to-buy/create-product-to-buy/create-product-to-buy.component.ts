import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectCreateProductToBuySuccess} from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {NzMessageService} from 'ng-zorro-antd';
import {CreateProductToBuyAction, InitialProductToBuyAction} from '../../store/actions/product-to-buy-actions';
import {ProductToBuy} from '../../model/product-to-buy';

@Component({
  selector: 'app-create-product-to-buy',
  templateUrl: './create-product-to-buy.component.html',
  styleUrls: ['./create-product-to-buy.component.css']
})
export class CreateProductToBuyComponent implements OnInit, OnDestroy {
  @Input()
  familyId: number;
  productToBuy = new ProductToBuy();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  createProductFinish$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder, private message: NzMessageService, private store: Store<any>) {
    this.createProductFinish$ = this.store.pipe(select(selectCreateProductToBuySuccess));
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      amountToBuy: [null, [Validators.required]],
      shop: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  showModal(): void {
    if (this.familyId === 0) {
      this.createMessage('error', 'No family selected! Please select family!');
    } else {
      this.initialize();
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  createProduct() {
    this.productToBuy.productName = this.validateForm.get('productName').value;
    this.productToBuy.amountToBuy = this.validateForm.get('amountToBuy').value;
    this.productToBuy.shop = this.validateForm.get('shop').value;

    this.store.dispatch(new CreateProductToBuyAction(this.productToBuy, this.familyId));
    this.createProductFinish$.pipe().subscribe(value => {
      if (value) {
        this.handleOk();
      }
    });

  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.createProduct();
  }

  handleCancel(): void {
    this.store.dispatch(new InitialProductToBuyAction());
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}

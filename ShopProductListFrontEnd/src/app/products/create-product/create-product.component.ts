import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../product-manager/product.service';
import {CreateProductAction, InitialProductAction} from '../../store/actions/product-actions';
import {NzMessageService} from 'ng-zorro-antd';
import {Subject} from 'rxjs/internal/Subject';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectCreateProductSuccess} from '../../store/reducers';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  @Input()
  familyId: number;
  product = new Product();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  createProductFinish$: Observable<boolean>;
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder, private productService: ProductService, private message: NzMessageService, private store: Store<any>) {
    this.createProductFinish$ = this.store.pipe(select(selectCreateProductSuccess));
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      frequencyOfUse: [null, [Validators.required]],
      price: [null, [Validators.required]],
      inStock: [null, [Validators.required]],
      userComment: [null, [Validators.required]]
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
    this.product.productName = this.validateForm.get('productName').value;
    this.product.frequencyOfUse = this.validateForm.get('frequencyOfUse').value;
    this.product.price = this.validateForm.get('price').value;
    this.product.inStock = this.validateForm.get('inStock').value;
    this.product.userComment = this.validateForm.get('userComment').value;

    this.store.dispatch(new CreateProductAction(this.product, this.familyId));
    this.createProductFinish$.pipe().subscribe(value => {
      if(value) this.handleOk();
    })

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
    this.store.dispatch(new InitialProductAction());
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}

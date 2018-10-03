import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../product-manager/product.service';
import {ACTION_CREATE} from '../../store/actions/product-actions';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  @Input()
  familyName: string;
  products: Array<Product>;
  product = new Product();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [ null, [ Validators.required ] ],
      frequencyOfUse: [ null, [ Validators.required ] ],
      amount: [ null, [ Validators.required ] ],
      inStock: [ null, [ Validators.required ] ],
      userComment: [ null, [ Validators.required ] ]
    });
  }
  ngOnInit(): void {
    this.initialize();
  }

  showModal(): void {
    this.initialize();
    this.isVisible = true;
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
    this.product.amount = this.validateForm.get('amount').value;
    this.product.inStock = this.validateForm.get('inStock').value;
    this.product.userComment = this.validateForm.get('userComment').value;
    this.productService.saveProductForCurrentFamily(this.product, this.familyName).subscribe(() => {
      this.productService.updateProductState({
        action: ACTION_CREATE,
        payload: this.product,
      });
      this.handleOk();
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.createProduct();
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}

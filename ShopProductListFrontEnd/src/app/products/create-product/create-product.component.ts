import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../product-manager/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  @Output()
  productsListChanged = new EventEmitter();
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
      inStock: [ null, [ Validators.required ] ]
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
  productsListChange() {
    this.productsListChanged.emit(this.products);
  }
  createProduct() {
    this.product.product_name = this.validateForm.get('productName').value;
    this.product.frequency_of_use = this.validateForm.get('frequencyOfUse').value;
    this.product.amount = this.validateForm.get('amount').value;
    this.product.in_stock = this.validateForm.get('inStock').value;
    this.productService.saveProductForCurrentFamily(this.product, this.familyName).subscribe(value => {
      this.productService.getProductsForCurrentFamily(this.familyName).subscribe(value1 => {
        this.products = value1;
        console.log('In create product component: ' + value1);
        this.productsListChange();
      });
      console.log(value);
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

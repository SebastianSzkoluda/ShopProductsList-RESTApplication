import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../product-manager/product.service';
import {ACTION_EDIT_PRODUCT} from '../../store/actions/product-actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input()
  productId: number;
  product = new Product();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      frequencyOfUse: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      inStock: [null, [Validators.required]],
      userComment: [null, [Validators.required]]
    });
    this.productService.getAllState().subscribe(state => {
      if (state.editButtonClicked == true) {
          this.productId = state.product.productId;
          this.product = state.product;
          this.validateForm.get('productName').setValue(this.product.productName);
          this.validateForm.get('frequencyOfUse').setValue(this.product.frequencyOfUse);
          this.validateForm.get('amount').setValue(this.product.amount);
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
    this.product.amount = this.validateForm.get('amount').value;
    this.product.inStock = this.validateForm.get('inStock').value;
    this.product.userComment = this.validateForm.get('userComment').value;
    this.productService.editProduct(this.product, this.productId).subscribe(value => {
      this.productService.updateProductState({
        action: ACTION_EDIT_PRODUCT,
        payload: this.product,
      });
      console.log(value);
      this.handleOk();
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
    this.isVisible = false;
  }
}

import {Component, OnInit} from '@angular/core';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';
import {ProductService} from '../product-manager/product.service';
import {Product} from '../../model/product';
import {map} from 'rxjs/operators';
import {ACTION_DELETE, ACTION_EDIT_BUTTON, ACTION_INITIAL_PRODUCT} from '../../store/actions/product-actions';
import {ACTION_INITIAL_FAMILY} from '../../store/actions/family-actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  familyName = 'No family selected';
  families: Array<Family>;
  products: Array<Product>;
  sortName = null;
  sortValue = null;
  constructor( private familyService: FamilyService, private productService: ProductService) { }
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

  getProductsForFamily (family: string) {
    this.familyName = family;
    this.productService.getProductsForCurrentFamily(family).subscribe(value => {
      this.products = value;
    });
  }

  editMode(product: Product) {
    this.productService.updateProductState({
      action: ACTION_EDIT_BUTTON,
      payload: product,
    })
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.productId).subscribe(() => {
      this.productService.updateProductState({
        action: ACTION_DELETE,
        payload: product
      });
      this.products = this.products.filter(item => item != product);
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    if (this.sortName) {
      const data = this.products.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      this.products = [...data];
    }
  }

  updateFamilyState() {
    this.familyService.getAllState().subscribe( state => {
      if (state.family != null && state.create == true) {
        this.families.push(state.family);
        this.familyService.updateFamiliesState({
          action: ACTION_INITIAL_FAMILY,
         })
      }
    });
  }

  updateProductState() {
    this.productService.getAllState().subscribe(state => {
      if(state.product != null && (state.edit == true || state.create == true)) {
        this.getProductsForFamily(this.familyName);
        this.products.push(state.product);
        this.productService.updateProductState({
          action: ACTION_INITIAL_PRODUCT,
        })
      }
    })
  }

  initializeProductList() {
    this.getFamilies().subscribe(() => {
      if (this.families.length !== 0) {
        console.log(this.families);
        this.familyName = this.families[0].familyName;
        this.getProductsForFamily(this.familyName);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../services/family-manager/family.service';
import {Family} from '../services/family-manager/family';
import {ProductService} from '../services/product-manager/product.service';
import {Product} from '../services/product-manager/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor( private familyService: FamilyService, private productService: ProductService) { }
  familyName: string;
  families: Array<Family>;
  products: Array<Product>;
  sortName = null;
  sortValue = null;
  ngOnInit() {
  }

  getFamilies() {
    this.familyService.loggedUserFamilies().subscribe(value => {
      this.families = value;
    });
  }
  getProductsForFamily (family: string) {
    this.familyName = family;
    this.productService.getProductsForCurrentFamily(family).subscribe(value => {
      this.products = value;
      console.log(family);
      console.log(value);
    });
  }

  productsListHandler(products: Array<Product>) {
    this.products = products;
    console.log(this.products);
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
}

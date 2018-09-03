import {Component, OnInit} from '@angular/core';
import {FamilyService} from '../services/family-manager/family.service';
import {Family} from '../services/family-manager/family';
import {ProductService} from '../services/product-manager/product.service';
import {Product} from '../services/product-manager/product';
import {map} from 'rxjs/operators';

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
    this.getFamilies().subscribe(() => {
      console.log(this.families);
      this.familyName = this.families[0].family_name;
      this.getProductsForFamily(this.families[0].family_name);
    });
  }
//problem z defaultowym widokiem listy produktow dla rodzinki bo podczas klikania na dropdowna dopiero wtedy pobierane sa rodzinki
  getFamilies() {
    return this.familyService.loggedUserFamilies().pipe(map(value => {
      this.families = value;
    }));
  }
  clickOnDropDownGetFamilies() {
    this.getFamilies().subscribe(() => {
      console.log(this.families);
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

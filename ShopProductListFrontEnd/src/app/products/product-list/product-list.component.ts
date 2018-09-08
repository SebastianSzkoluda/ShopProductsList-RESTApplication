import {Component, OnInit} from '@angular/core';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';
import {ProductService} from '../product-manager/product.service';
import {Product} from '../../model/product';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  familyName = 'No create-family selected';
  families: Array<Family>;
  products: Array<Product>;
  sortName = null;
  sortValue = null;
  constructor( private familyService: FamilyService, private productService: ProductService) { }
  ngOnInit() {
    this.getFamilies().subscribe(() => {
      if (this.families.length !== 0) {
        console.log(this.families);
        this.familyName = this.families[0].familyName;
        this.getProductsForFamily(this.families[0].familyName);
      }
    });
    this.familyService.getAllState().subscribe( state => {
      if (state.family != null) {
        this.families.push(state.family);
      }
    });
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

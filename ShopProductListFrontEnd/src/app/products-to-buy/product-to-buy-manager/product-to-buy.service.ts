import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductToBuy} from '../../model/product-to-buy';

@Injectable({
  providedIn: 'root'
})
export class ProductToBuyService {

  private productToBuyUrl = '/api/productToBuy';

  constructor(private http: HttpClient, private store: Store<any>) {
  }

  getProductsToBuyForCurrentFamily(familyId: number): Observable<Array<ProductToBuy>> {
    const params = new HttpParams().set('familyId', familyId.toString());
    return this.http.get<Array<ProductToBuy>>(this.productToBuyUrl, {params: params});
  }

  saveProductToBuyForCurrentFamily(productToBuy: ProductToBuy, familyId: number): Observable<ProductToBuy> {
    const params = new HttpParams().set('familyId', familyId.toString());
    return this.http.post<ProductToBuy>(this.productToBuyUrl, productToBuy, {params: params});
  }

  getProductToBuy(productToBuyId: number): Observable<ProductToBuy> {
    return this.http.get<ProductToBuy>(this.productToBuyUrl + `/${productToBuyId}`);
  }

  editProductToBuy(productToBuy: ProductToBuy): Observable<ProductToBuy> {
    return this.http.put<ProductToBuy>(this.productToBuyUrl + `/${productToBuy.productId}`, productToBuy);
  }

  deleteProductToBuy(productToBuyId: number) {
    return this.http.delete(this.productToBuyUrl + `/${productToBuyId}`);
  }

  getAllState() {
    return this.store.pipe(select('productToBuyReducer'));
  }
}

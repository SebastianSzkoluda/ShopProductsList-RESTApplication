import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../model/product';
import {select, Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = '/api/product';

  constructor(private http: HttpClient, private store: Store<any>) {
  }

  getProductsForCurrentFamily(familyId: number): Observable<Array<Product>> {
    const params = new HttpParams().set('familyId', familyId.toString());
    return this.http.get<Array<Product>>(this.productUrl, {params: params});
  }

  saveProductForCurrentFamily(product: Product, familyId: number): Observable<Product> {
    const params = new HttpParams().set('familyId', familyId.toString());
    return this.http.post<Product>(this.productUrl, product, {params: params});
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + `/${productId}`);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productUrl + `/${product.productId}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.productUrl + `/${productId}`);
  }

  getAllState() {
    return this.store.pipe(select('productReducer'));
  }

}

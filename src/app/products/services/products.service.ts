import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Product } from '../interfaces/product.interface';
import { environment } from './../../../environments/environment';
import { SortOrder } from '../interfaces/sort.interface';

const BASE_URL = environment.base_url;
const API_PRODUCTS = environment.apis.products;
const API_CART = environment.apis.carts;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  createProduct(formData: Product) {
    const index = API_PRODUCTS.indexOf('?');
    return this.http.post(
      `${BASE_URL}/${API_PRODUCTS}`.substring(0, index),
      formData
    );
  }

  getProducts(
    limit?: number,
    page?: number,
    sort?: SortOrder
  ): Observable<Product> {
        
    let apiWithQuery = `${API_PRODUCTS}`;
    if (!!limit) apiWithQuery = apiWithQuery.concat('?', `limit=${limit}`)
    if (!!page) apiWithQuery = apiWithQuery.concat(`&page=${ page}`);
    if (!!sort) apiWithQuery = apiWithQuery.concat(`&sort=${ sort }`);

    return this.http.get<Product>(`${BASE_URL}/${apiWithQuery}`)
  }

  getProductsSocket(): Observable<Product[]> {
    return this.wsService
      .listen('products-list')
      .pipe(map((res: any) => res.listProducts));
  }

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/${API_CART}`
    .replace('#cartId#', '6442a40f7b7deb7e494c7a6a')
    .replace('#productId#', productId), {})
  }
}

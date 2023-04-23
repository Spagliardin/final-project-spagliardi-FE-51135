import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartUpdate, ProductElement } from '../interfaces/cart.interface';

const BASE_URL = environment.base_url;
const API_CART = environment.apis.carts

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartbyId(cartId: string): Observable<ProductElement[]> {
    return this.http.get<Cart>(`${BASE_URL}/carts/${cartId}`).pipe(map(({cart}) => cart.products));
  }

  deleteProductToCart(productId: string): Observable<ProductElement[]>{
    return this.http.delete<CartUpdate>(`${BASE_URL}/${API_CART}`
        .replace('#cartId#', '6442a40f7b7deb7e494c7a6a')
        .replace('#productId#', productId))
        .pipe(map(({cartUpdateWithoutDelete}) => cartUpdateWithoutDelete.products))
  }
}

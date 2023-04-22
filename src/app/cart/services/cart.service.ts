import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, ProductElement } from '../interfaces/cart.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartbyId(cartId: string): Observable<ProductElement[]> {
    return this.http.get<Cart>(`${base_url}/carts/${cartId}`).pipe(map(({cart}) => cart.products));
  }

  deleteProductToCart(cartId: string, productId: string){
    return this.http.delete(`${base_url}carts/${cartId}/product/${productId}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartUpdate, ProductElement, UpdateQuantity } from '../interfaces/cart.interface';

const BASE_URL = environment.base_url;
const API_CART = environment.apis.carts

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _totalPrice = new BehaviorSubject<number>(0);
  public readonly totalPrice$ = this._totalPrice.asObservable();
  private _cartLength = new BehaviorSubject<number>(0);
  public readonly cartLength$ = this._cartLength.asObservable();

  constructor(private http: HttpClient) {}

  getCartbyId(cartId: string): Observable<ProductElement[]> {
    return this.http.get<Cart>(`${BASE_URL}/carts/${cartId}`).pipe(map(({cart}) => {
      
      const totalPrice = this.getTotalPrice(cart.products)
      this._totalPrice.next(totalPrice)
      this._cartLength.next(cart.products.length)

      return cart.products
    }));
  }

  deleteProductToCart(productId: string): Observable<ProductElement[]>{
    return this.http.delete<CartUpdate>(`${BASE_URL}/${API_CART}`
        .replace('#cartId#', '6442a40f7b7deb7e494c7a6a')
        .replace('#productId#', productId))
        .pipe(map(({cartUpdateWithoutDelete}) => {

          const totalPrice = this.getTotalPrice(cartUpdateWithoutDelete.products)
          this._totalPrice.next(totalPrice)
          this._cartLength.next(cartUpdateWithoutDelete.products.length)
          

          return cartUpdateWithoutDelete.products
        }))
  }

  updateQuantity(quantity: number, pid: string) : Observable<ProductElement[]> {
    return this.http.put<UpdateQuantity>(`${BASE_URL}/${API_CART}`
        .replace('#cartId#', '6442a40f7b7deb7e494c7a6a')
        .replace('#productId#', pid), { quantity })
        .pipe(map(({cartUpdated}) => {
          const totalPrice = this.getTotalPrice(cartUpdated.products)
          this._totalPrice.next(totalPrice)
          return cartUpdated.products
        }))   
  }

  private getTotalPrice( products: ProductElement[] ){
    return products.reduce((partialSum, sum) => partialSum + (sum.product.price * sum.quantity), 0)
  }
}

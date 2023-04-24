import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

import { Observable, Subscription, finalize } from 'rxjs';
import { ProductElement } from '../../interfaces/cart.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  public productsInCart$: Observable<ProductElement[]> = new Observable()  
  public updateQuantitySubscription: Subscription = new Subscription

  constructor(private cartService: CartService,
              public loader: LoadingService ) {}
  
  ngOnInit() {
    this.productsInCart$ = this.cartService.getCartbyId('6442a40f7b7deb7e494c7a6a').pipe(
      finalize( () => this.loader.hide() )
    )
  }

  deleteProduct(pid: string){
    this.loader.show()
    this.productsInCart$ = this.cartService.deleteProductToCart(pid).pipe(
      finalize( () => this.loader.hide() )
    )
  }

  updateQuantity( newQuantity: number, pid: string) {
    this.updateQuantitySubscription = this.cartService.updateQuantity(newQuantity, pid).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'success...',
          text: 'Quantity updated',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Opss...',
          text: err,
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.updateQuantitySubscription.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

import { Observable } from 'rxjs';
import { ProductElement } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  public productsInCart$: Observable<ProductElement[]> = new Observable()

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.productsInCart$ = this.cartService.getCartbyId('6442a40f7b7deb7e494c7a6a')
  }

  deleteProduct(pid: string){
    console.log(pid);
  }

}

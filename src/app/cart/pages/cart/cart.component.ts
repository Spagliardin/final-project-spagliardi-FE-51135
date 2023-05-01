import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public totalPrice$ = this.cartService.totalPrice$
  public cartLength$ = this.cartService.cartLength$

  constructor(private cartService: CartService) { }

}

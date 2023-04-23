import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Payload } from './../../interfaces/product.interface';
import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnDestroy {

  @Input() product!: Payload
  private addtoCartSubscription: Subscription = new Subscription

  constructor(private productsService: ProductsService) { }

  
  addToCart( id: string ){
    this.productsService.addToCart(id).subscribe({
      next(){}
    })
  }
  
  ngOnDestroy(): void {
    this.addtoCartSubscription.unsubscribe()
  }
}

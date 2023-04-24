import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Payload } from './../../interfaces/product.interface';
import { Component, Input, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

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
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'success...',
          text: 'Product add to Cart',
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
    this.addtoCartSubscription.unsubscribe()
  }
}

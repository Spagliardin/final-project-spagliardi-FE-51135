import { Product } from './../../interfaces/product.interface';
import { Observable, Subscriber, Subscription, take } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list-socket',
  templateUrl: './product-list-socket.component.html',
  styleUrls: ['./product-list-socket.component.scss']
})
export class ProductListSocketComponent implements OnInit {

  public productsList$!: Observable<Product | any>
  public subscriberProducts!: Subscription

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsList$ = this.getProductsSocket()
  }

  getProductsSocket(){
    return this.productsService.getProductsSocket()
  }

  addProduct(e: any){
    this.productsService.createProduct(e)
      .pipe(
        take(1)
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'success...',
            text: 'Producto Creado en socket',
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

}

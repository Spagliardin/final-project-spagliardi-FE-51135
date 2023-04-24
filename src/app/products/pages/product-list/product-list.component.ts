import { Payload, Product } from './../../interfaces/product.interface';
import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public totalPages: number = 0
  public product: Payload[] = []
  public page: number = 1
  private limit: number = 6
  private productsSubscribe: Subscription = new Subscription()

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  private getProducts(){
    this.productsSubscribe = this.productService.getProducts(this.limit, this.page).subscribe({
      next: (res) => {
        this.product = res.payload
        this.totalPages = res.totalPages
      }
    })
  }

  addProduct(e: any){
    this.productService.createProduct(e)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'success...',
            text: 'Producto Creado',
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

  changePage( value: number ){
    if (this.totalPages >= this.page) this.page += value
    else this.page -= value

    if (this.page <= 1) this.page = 1 
    
    this.getProducts()
  }

  ngOnDestroy(): void {
    this.productsSubscribe.unsubscribe()
  }

}

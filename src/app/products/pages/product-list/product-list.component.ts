import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$!: Observable<any>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.getProducts()
  }

  getProducts(){
    return this.productService.getProducts()
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

}

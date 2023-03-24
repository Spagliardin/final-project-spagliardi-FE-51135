import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.scss']
})
export class ProductCreatorComponent implements OnInit {

  @Output() sendProduct: EventEmitter<Product | any> = new EventEmitter()

  public productForm = this.fb.group({
    title: [ null, Validators.required],
    price: [ 0 , Validators.required ],
    code: [ null , Validators.required ],
    stock: [ 0, Validators.required ],
    category: [ null , Validators.required ],
    status: [ true, Validators.required ],
    description: [ null, Validators.required ]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createProduct(){

    if (this.productForm.invalid) {
      return
    }

    this.sendProduct.emit( this.productForm.value )

  }

}

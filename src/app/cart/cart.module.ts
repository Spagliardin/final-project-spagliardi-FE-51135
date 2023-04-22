import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CartComponent,
    CartListComponent,
    CartProductComponent
  ]
})
export class CartModule { }

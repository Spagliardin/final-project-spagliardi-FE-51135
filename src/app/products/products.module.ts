import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductListSocketComponent } from './pages/product-list-socket/product-list-socket.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCreatorComponent } from './components/product-creator/product-creator.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductListSocketComponent,
    ProductDetailComponent,
    ProductCreatorComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],

  exports: [
    ProductListComponent,
    ProductListSocketComponent
  ]
})
export class ProductsModule { }

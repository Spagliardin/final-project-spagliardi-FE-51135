import { CartComponent } from './cart/pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products-routing.module').then( m => m.ProductsRoutingModule ),
    // pathMatch: 'full'
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart-routing.module').then( m => m.CartRoutingModule )
  },
  {
    path: '**',
    redirectTo: 'products'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

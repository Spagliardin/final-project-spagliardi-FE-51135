import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth-routing.module').then( m => m.AuthRoutingModule ),
    data: { breadcrumb: 'Login' }
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products-routing.module').then( m => m.ProductsRoutingModule ),
    data: { breadcrumb: 'Products' }
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart-routing.module').then( m => m.CartRoutingModule ),
    data: { breadcrumb: 'Cart' }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductListSocketComponent } from './pages/product-list-socket/product-list-socket.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'socket',
        component: ProductListSocketComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

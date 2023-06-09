import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductListSocketComponent } from './pages/product-list-socket/product-list-socket.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsService } from './services/products.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
        path: 'product/:id',
        component: ProductDetailComponent,
        data: { 
          breadcrumb: (data: any) => `${data.product.name}`
         },
         resolve: { product: ProductsService }
      },
    ]
  },
  {
    path: 'socket',
    component: ProductListSocketComponent,
    data: { breadcrumb: 'Socket' } 
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

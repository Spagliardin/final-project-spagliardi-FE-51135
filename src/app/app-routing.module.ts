import { ProductDetailComponent } from './products/pages/product-detail/product-detail.component';
import { ProductListSocketComponent } from './products/pages/product-list-socket/product-list-socket.component';
import { ProductListComponent } from './products/pages/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    pathMatch: 'full'
  },
  {
    path: 'socket',
    component: ProductListSocketComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

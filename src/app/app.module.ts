import { environment } from './../environments/environment';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CartModule } from './cart/cart.module';

const config: SocketIoConfig = {
  url: environment.wsUrl ,
  options: {
    transports: ['websocket']
    }
  };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    CartModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

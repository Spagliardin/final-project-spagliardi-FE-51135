import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Product } from '../interfaces/product.interface';
import { environment } from './../../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,
              private wsService: WebsocketService) { }

  createProduct(formData: Product) {
    return this.http.post( `${ base_url }/products`, formData )
  }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${ base_url }/products`)
              .pipe(
                map((res: any) => res.payload),
              )
  }

  getProductsSocket(): Observable<Product[]> {
    return this.wsService.listen( 'products-list' )
              .pipe(
                map( ( res: any ) => res.listProducts ),
              )
  }
}

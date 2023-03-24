import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from './../../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  createProduct(formData: Product) {
    return this.http.post( `${ base_url }/products`, formData )
  }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${ base_url }/products`)
              .pipe(
                map((res: any) => res.products),
                tap( console.log )
              )
  }
}

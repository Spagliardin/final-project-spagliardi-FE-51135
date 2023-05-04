import { TokenStorageService } from './../../auth/services/token-storage.service';
import { UserService } from 'src/app/auth/services/user.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenStorageService.getToken()}` 
    })

    const reqClone = req.clone({
      headers
    })

    
    return next.handle( reqClone )
  }
}

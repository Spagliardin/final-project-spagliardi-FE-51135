import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm, RestLogin } from '../interfaces/login-form.interface';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

const BASE_URL = environment.base_url;
const API_USERS = environment.apis.user

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: User
  private readonly _isToken$?: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token') || false)
  public readonly isToken$ = this._isToken$?.asObservable()

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  createUser(formData: RegisterForm) {
    return this.http.post<RestLogin>(`${BASE_URL}/${API_USERS}`, formData)
  }

  login(formData: LoginForm | any) : Observable<boolean> {
    return this.http.post<RestLogin>(`${BASE_URL}/login`, formData)
    .pipe(
      tap((res) => {
        if (res.ok) {
          this._isToken$?.next(true)
          this.tokenStorageService.setToken(res.token)
          const { email, google, name, role, img = '', uid } = res.user
          this.user = new User(
            name, email, '', img, google, role, uid
          )
        }
      }),
      map((res) => !!res.user),
      catchError((err) => of(false))
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<RestLogin>(`${BASE_URL}/login/renew`)
      .pipe(
        tap((res) => {
          if (res.ok) {
            this._isToken$?.next(true)
            const { email, google, name, role, img = '', uid } = res.user
            this.user = new User(
              name, email, '', img, google, role, uid
            )
          }
        }),
        map((res: any) => !!res.user),
        catchError((err) => of(false))
      );
  }

  logout() {
    this.tokenStorageService.removeToken()
    this._isToken$?.next(false)
    this.user = undefined
    window.location.reload()
  }
}

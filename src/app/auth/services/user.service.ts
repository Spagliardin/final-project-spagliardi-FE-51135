import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';

const BASE_URL = environment.base_url;
const API_USERS = environment.apis.user

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: BehaviorSubject<User> = new BehaviorSubject(Object());

  get token() :string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  constructor(private http: HttpClient) { }

  createUser(formData: RegisterForm) {
    return this.http.post(`${BASE_URL}/${API_USERS}`, formData)
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    )
  }

  login(formData: LoginForm | any) {
    return this.http.post(`${BASE_URL}/login`, formData)
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map((res: any) => {

        const { email, google, name, role, img = '', uid }= res.userDB

        this.user?.next(new User(
          name, email, '', img, google, role, uid
        ))

        localStorage.setItem('token', res.token);
        return res.userDB
      }),
    );
  }

  vaidateToken(): Observable<boolean> | any {

    return this.http
      .get(`${BASE_URL}/login/renew`, this.headers)
      .pipe(
        map((res: any) => {

          const { email, google, name, role, img = '', uid }= res.user

          this.user?.next(new User(
            name, email, '', img, google, role, uid
          ))

          localStorage.setItem('token', res.token);
          return true
        }),
        catchError((err) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}

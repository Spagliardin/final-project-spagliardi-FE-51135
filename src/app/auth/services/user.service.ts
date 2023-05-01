import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const BASE_URL = environment.base_url;
const API_USERS = environment.apis.user

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(formData: RegisterForm) {
    return this.http.post(`${BASE_URL}/${API_USERS}`, formData)
  }

  login(formData: LoginForm | any) {
    return this.http.post(`${BASE_URL}/login`, formData)
    // .pipe(
    //   tap((res: any) => {
    //     localStorage.setItem('token', res.token);
    //   })
    // );
  }
}

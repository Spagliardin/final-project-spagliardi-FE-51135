import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'x-token';

  public getToken(){
    return localStorage.getItem(this.TOKEN_KEY) || ''
  }

  public setToken(token: string){
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  public removeToken(){
    localStorage.removeItem(this.TOKEN_KEY)
  }
}

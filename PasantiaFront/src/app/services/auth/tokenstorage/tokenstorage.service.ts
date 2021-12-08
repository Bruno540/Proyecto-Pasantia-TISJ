import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const ROLE_NAME = 'rol';
const USER_EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public deleteToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(ROLE_NAME);
    window.sessionStorage.removeItem(USER_EMAIL);
  }


  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRoleName(rol: string): void {
    window.sessionStorage.removeItem(ROLE_NAME);
    window.sessionStorage.setItem(ROLE_NAME, rol);
  }

  public getRoleName(): string | null {
    return window.sessionStorage.getItem(ROLE_NAME);
  }

  public saveUserEmail(email: string): void {
    window.sessionStorage.removeItem(USER_EMAIL);
    window.sessionStorage.setItem(USER_EMAIL, email);
  }

  public getUserEmail(): string | null {
    return window.sessionStorage.getItem(USER_EMAIL);
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.deleteToken()
  }
}

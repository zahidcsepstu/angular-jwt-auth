import {Injectable} from '@angular/core';

const JWT_TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(jwtToken: string, refreshToken: string): void {
    window.sessionStorage.removeItem(JWT_TOKEN_KEY);
    window.sessionStorage.removeItem(refreshToken);
    window.sessionStorage.setItem(JWT_TOKEN_KEY, jwtToken);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getJwtToken(): string | null {
    return window.sessionStorage.getItem(JWT_TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY) || '';
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}

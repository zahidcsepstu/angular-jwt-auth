import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const AUTH_API = 'https://tassistant.azurewebsites.net/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': ' Basic Q2xpZW50SWQ6Q2xpZW50U2VjcmV0'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'users/login', {
      email,
      password
    }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'users/logout', {
      jwtToken: this.tokenService.getJwtToken(),
      refreshToken: this.tokenService.getRefreshToken()
    }, httpOptions);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASE_API = 'https://tassistant.azurewebsites.net/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<any> {
    return this.http.get(BASE_API + '/api/task-lists');
  }
}

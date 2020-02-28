import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from "@angular/http";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private headers = new Headers();
  private requestOptions: any;

  constructor(private http: HttpClient) {
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.requestOptions = new RequestOptions({ headers: this.headers });
  }

  private url = "http://localhost:3000";
  add_new_user(json) {
    // return this.http.post(`${this.url}/account-register`, json, this.requestOptions).pipe(map(res => res.json()));
    return this.http.post<any>(`${this.url}/account-register`, json);
  }

  login_varification(json) {
    return this.http.post<any>(`${this.url}/account-login`, json);
  }

  register_validation(json) {
    return this.http.post<any>(`${this.url}/account-get-username`, json);
  }

}

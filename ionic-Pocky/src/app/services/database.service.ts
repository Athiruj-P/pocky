import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from "@angular/http";
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
    return this.http.post<any>(`${this.url}/account-register`, json);
  }

  login_varification(json) {
    return this.http.post<any>(`${this.url}/account-login`, json);
  }

  register_validation(json) {
    return this.http.post<any>(`${this.url}/account-get-username`, json);
  }

  add_wallet(json){
    return this.http.post<any>(`${this.url}/wallet-add`, json);
  }

  get_wallet_by_ac_id(json){
    return this.http.post<any>(`${this.url}/wallet-get-by-id`, json);
  }

  get_transaction_by_wal_id(json){
    return this.http.post<any>(`${this.url}/transaction-get-by-id`, json);
  }
}

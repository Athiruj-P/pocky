import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private headers = new Headers();
  private requestOptions: any;

  constructor(private http: Http) {
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.requestOptions = new RequestOptions({ headers: this.headers });
  }

  private url = "http://localhost:3000";
  add_new_user(json) {
    return this.http.post(`${this.url}/account-register`, json).map(res => res.json());
  }

  login_varification(json) {
    return this.http.post(`${this.url}/account-login`, json).map(res => res.json());
  }

  register_validation(json) {
    return this.http.post(`${this.url}/account-get-username`, json).map(res => res.json());
  }

  add_wallet(json) {
    return this.http.post(`${this.url}/wallet-add`, json).map(res => res.json());
  }

  get_wallet_by_ac_id(json) {
    return this.http.post(`${this.url}/wallet-get-by-id`, json).map(res => res.json());
  }

  get_transaction_by_wal_id(json) {
    return this.http.post(`${this.url}/transaction-get-all-by-wal-id`, json).map(res => res.json());
  }

  get_all_currency() {
    return this.http.get(`${this.url}/currency-get-all`).map(res => res.json());
  }

  remove_wallet_by_id(json) {
    return this.http.post(`${this.url}/wallet-remove-by-id`, json).map(res => res.json());
  }

  rename_wallet_by_id(json) {
    return this.http.post(`${this.url}/wallet-rename-by-id`, json).map(res => res.json());
  }

  update_wallet_balance(json) {
    console.log("in service update_wallet_balance")
    return this.http.post(`${this.url}/wallet-set-balance-by-id`, json).map(res => res.json());
  }

  add_transaction(json) {
    return this.http.post(`${this.url}/transaction-add`, json).map(res => res.json());
  }

  edit_transaction(json) {
    return this.http.post(`${this.url}/transaction-edit-by-id`, json).map(res => res.json());
  }

  remove_transaction(json) {
    return this.http.post(`${this.url}/transaction-remove-by-id`, json).map(res => res.json());
  }

  show_transaction(json) {
    return this.http.post(`${this.url}/transaction-remove-by-id`, json).map(res => res.json());
  }

  get_all_transaction_by_wal_id(json) {
    return this.http.post(`${this.url}/transaction-get-all-by-wal-id`, json).map(res => res.json());
  }

  get_transaction_by_tran_id(json) {
    return this.http.post(`${this.url}/transaction-get-by-tran-id`, json).map(res => res.json());
  }

}

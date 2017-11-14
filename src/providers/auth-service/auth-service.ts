import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  hostAddress = 'http://10.0.2.2:8080/';
  token;
  email;
  requestHeaders: Headers = new Headers();
  user;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  loginClient(email, password) {
    return this.http.post(this.hostAddress + 'login', { username: email, password: password })
      .map(
      (data) => {
        this.email = email;
        this.token = data.headers.get('Authorization');
        this.requestHeaders.set('Authorization', this.token);
        return this.token;
      }
      );
  }

  getUserData() {
    let params = new URLSearchParams();
    params.append('email', this.email);
    console.log(params);
    return this.http.get(this.hostAddress + 'clients/getByEmail',
      { params: params, headers: this.requestHeaders }).map(data => {
        this.user = data.json();
        return this.user;
      });
  }

  getUser() {
    return this.user;
  }

  getHeaders() {
    return this.token;
  }

}

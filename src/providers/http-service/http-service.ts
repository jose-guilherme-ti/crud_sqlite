import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  private url: string = 'http://www.ftc.br/slimapi/public/api';
  constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
  }

  save(endpoint, resource) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/${endpoint}`, resource, options)
      .map(res => {
        return res.json()
      });
  }
  pegar(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`)
    .map(res => {
      return res.json()
    });
  }
 



}

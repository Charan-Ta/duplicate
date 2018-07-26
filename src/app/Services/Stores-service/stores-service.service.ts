import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';



@Injectable()
export class StoresServiceService {
  public _url: string;
  public storesList = [];

  constructor(private http: HttpClient) {

  }

  getStores(parameters): Observable<any> {
    this._url = "http://localhost:8003/stores?limit=" + parameters.limit + "&sortBy=" +
      parameters.sortBy + "&sortDir=" + parameters.sortDir
      + "&startFrom=" + parameters.startFrom;
    return this.http.get(this._url);
  }
}


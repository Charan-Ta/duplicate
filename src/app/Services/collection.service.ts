import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Collection} from '../Interfaces/collection';
import { Observable } from 'rxjs';


@Injectable()
export class StoresCollection extends Collection {
  public _url;
  constructor(private http:HttpClient) { 
    super("/stores");
  }
  
  load(parameters):Observable<any> {
    if(parameters.sortBy&&parameters.sortDir)
    this._url = this.url+"?limit="+parameters.limit+"&startFrom="+parameters.startFrom+"&sortBy="
	         +parameters.sortBy+"&sortDir="+parameters.sortDir;
    else
    this._url = this.url+"?limit="+parameters.limit+"&startFrom="+parameters.startFrom;	
    return this.http.get(this._url);
  }
        	
  }


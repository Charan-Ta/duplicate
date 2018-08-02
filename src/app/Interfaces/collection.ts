import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
const base_url = "http://localhost:8003";

@Injectable()
export abstract class Collection {
  fields: Array<string>;
  url:string;
  constructor(fields,url){
    this.fields=fields;
    this.url=base_url+url;
  }
  abstract load(parameters:any) : Observable<any>;  
}
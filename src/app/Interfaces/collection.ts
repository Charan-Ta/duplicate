import { Observable } from 'rxjs';
const base_url = "http://localhost:8003";

export abstract class Collection {
  url:string;
  constructor(url){
    this.url=base_url+url;
  }
  abstract load(parameters:any) : Observable<any>;  
}
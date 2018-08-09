import { Observable } from 'rxjs';
const base_url = "http://localhost:8003";

export abstract class Collection {
  url:string;
  parameters:any;
  tableData:any;
  constructor(url){
    this.url=base_url+url;
  }
  abstract getURLParams();
  abstract updateURLParams();  
  abstract makeURL();
  abstract load():Observable<any>;
  abstract loadNext():Observable<any>;
  abstract sort(sortBy:string,sortOrder:string):Observable<any>;
}
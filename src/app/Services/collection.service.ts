import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Collection} from '../Interfaces/collection';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class StoresCollection extends Collection {
  public _url;
  constructor(private http:HttpClient, private _route: ActivatedRoute, private router:Router) { 
    super("/stores");
  }
  
  getURLParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
    });
  }
  
  makeURL() {
    if(this.parameters.sortBy&&this.parameters.sortDir)
    this._url = this.url+"?limit="+this.parameters.limit+"&startFrom="+this.parameters.startFrom+"&sortBy="
           +this.parameters.sortBy+"&sortDir="+this.parameters.sortDir;
    else
    this._url = this.url+"?limit="+this.parameters.limit+"&startFrom="+this.parameters.startFrom;	
  }

  load():Observable<any>{
    this.makeURL();
    return this.http.get(this._url);
  }

  loadNext(isFiltered,filter):Observable<any>{
      if(!this.parameters.sortBy&&!this.parameters.sortDir)
      this.parameters={limit:50,startFrom:Number(this.parameters['startFrom'])+Number(this.parameters['limit'])};
      else
      this.parameters={limit:50,startFrom:Number(this.parameters['startFrom'])+Number(this.parameters['limit']),sortBy:this.parameters['sortBy'],sortDir:this.parameters['sortDir']};
      this.makeURL();
      if(!isFiltered)
      return this.http.get(this._url);
      else
      return this.http.post(this._url,filter);
  }

  sort(sortBy,sortOrder,isFiltered,filter):Observable<any>{
      this.parameters={limit:50,startFrom:0,sortBy:sortBy,sortDir:sortOrder};
      this.makeURL();
      if(!isFiltered)
      return this.http.get(this._url);
      else
      return this.http.post(this._url,filter);
  }
  
  updateURLParams(){
    this.router.navigate([],{relativeTo: this._route,queryParams:this.parameters});
  }

  filter(filter):Observable<any>{
    if(!this.parameters.sortBy&&!this.parameters.sortDir)
    this.parameters={limit:50,startFrom:0};
    else
    this.parameters={limit:50,startFrom:0,sortBy:this.parameters['sortBy'],sortDir:this.parameters['sortDir']};
    this.makeURL();
    return this.http.post(this._url,filter);
  }
  }


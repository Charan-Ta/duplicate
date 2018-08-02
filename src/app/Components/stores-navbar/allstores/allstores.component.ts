import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Collection} from '../../../Interfaces/collection';
import {StoresCollection} from '../../../Services/collection.service';
import 'rxjs/add/observable/throw';
import { } from 'rxjs';

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.css'],
  providers:[{provide: Collection,useClass:StoresCollection}]
})
export class AllstoresComponent implements OnInit {
   public parameters;
  constructor(private collection:Collection,  private _route: ActivatedRoute) {}

  ngOnInit() {
    this.getRouteParams();
  }

  public getRouteParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
      this.processData(this.parameters);
    });
  }

  processData(parameters){
    this.collection.load(parameters).subscribe(res=>{
      console.log(res);
    });
  }

  
}

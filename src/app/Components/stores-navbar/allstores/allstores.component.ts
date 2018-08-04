import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  public tableData;
  public tableHeadingNames;
  constructor(private collection:Collection,  private _route: ActivatedRoute, private router:Router) {}

  ngOnInit() {
    this.getRouteParams();
  }

  public getRouteParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
      this.processData(this.parameters);
    });
  }

  public processData(parameters){
    this.collection.load(parameters).subscribe(res=>{
      this.tableData = res;
      this.tableHeadingNames = Object.keys(this.tableData[0]);
      this.tableHeadingNames = this.tableHeadingNames.splice(1, this.tableHeadingNames.length - 2);
    });
  }

  public lazyLoadData(event){
    if(event){
      if(!this.parameters.sortBy&&!this.parameters.sortDir)
      this.parameters={limit:50,startFrom:Number(this.parameters['startFrom'])+Number(this.parameters['limit'])};
      else
      this.parameters={limit:50,startFrom:Number(this.parameters['startFrom'])+Number(this.parameters['limit']),sortBy:this.parameters['sortBy'],sortDir:this.parameters['sortDir']};
      this.router.navigate([],{queryParams:this.parameters});
    }
  }

  public sortData(event){
    if(event){
      this.parameters={limit:50,startFrom:0,sortBy:event.column,sortDir:event.order};
      this.router.navigate([],{queryParams:this.parameters});
    }
  }
  
}

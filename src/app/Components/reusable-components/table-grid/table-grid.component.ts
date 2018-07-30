import { Component, OnInit, OnChanges, SimpleChange, Input, Renderer  } from '@angular/core';
import { StoresServiceService } from '../../../Services/Stores-service/stores-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { } from 'rxjs';
declare var $: any;
@Component({
  selector: 'table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit, OnChanges {
  @Input('serviceCall')serviceCall;
  @Input('functionCall')functionCall;
  public tableData = [];
  public scrollCallback;
  public start;
  public pressed;
  public startX;
  public startWidth ;
  public parameters;
  public _tableHeadingNames;
  public count = 0;
  constructor(private renderer: Renderer,private _storesservice:StoresServiceService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.scrollCallback = this.getTableDetails.bind(this); 
  }

  ngOnInit() {
    this.getRouteParams();
  }

  public getRouteParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
      this.getTableDetails();
    });
  }

  ngOnChanges(changes:{[propKey: string]:SimpleChange}){
    if(changes.serviceCall && changes.serviceCall.currentValue){
      this.serviceCall = changes.serviceCall.currentValue;
    }
    if(changes.functionCall && changes.functionCall.currentValue){
      this.functionCall = changes.functionCall.currentValue;
    }
  }  

  private onMouseDown(event){
  this.start = event.target;
  this.pressed = true;
  this.startX = event.x;
  this.startWidth = $(this.start).parent().width();
  this.initResizableColumns();
  }

  public getTableDetails(): Observable<any> | any {
    if ((((this.tableData.length - this.parameters.startFrom) < 50) && (this.parameters.startFrom != 0))) {
      return ;
    } else {
      return this.serviceCall[this.functionCall](this.parameters).do(this.processData);
    }
  }

  public processData = (datasource) => {
    this.count = this.count + 1;

    if (!this._tableHeadingNames) {
      this._tableHeadingNames = Object.keys(datasource[0]);
      this._tableHeadingNames = this._tableHeadingNames.splice(1, this._tableHeadingNames.length - 2);
    }

    if (this.count == 1) {
      this.parameters = {
        limit: 50,
        sortBy: this.parameters.sortBy,
        sortDir: this.parameters.sortDir,
        startFrom: Number(this.parameters['limit']) + Number(this.parameters['startFrom']) - 50
      };
    }
    else if (this.count != 1 && (this.parameters.startFrom == (this.tableData.length - this.parameters.limit))) {
      this.parameters = {
        limit: 50,
        sortBy: this.parameters.sortBy,
        sortDir: this.parameters.sortDir,
        startFrom: Number(this.parameters['limit']) + Number(this.parameters['startFrom'])
      };
    } else {
      const Final_startFrom = this.parameters.startFrom;
      this.parameters = {
        limit: 50,
        sortBy: this.parameters.sortBy,
        sortDir: this.parameters.sortDir,
        startFrom: Final_startFrom
      };
    }

    this._router.navigate([], { queryParams: this.parameters });
    this.tableData = this.tableData.concat(datasource);
  }
  
  sortBy(heading, order) {
    this.parameters = {
      limit: 50, sortBy: heading, sortDir: order, startFrom: 0
    };
    this.tableData = [];
    this.count=1;
    this._router.navigate([],{queryParams:this.parameters});
    this.serviceCall[this.functionCall](this.parameters).subscribe(res=>{
      this.tableData= this.tableData.concat(res);
    });
  }

  private initResizableColumns() {
     this.renderer.listenGlobal('body', 'mousemove', (event) => {
        if(this.pressed) {
           let width = this.startWidth + (event.x - this.startX);
           $(this.start).parent().css({'min-width': width, 'max-width': width});
           let index = $(this.start).parent().index() + 1;
           $('.divTableBody .divTableRow .divTableCell:nth-child(' + index + ')').css({'min-width': width, 'max-width': width});
        }
     });
     this.renderer.listenGlobal('body', 'mouseup', (event) => {
     if(this.pressed) {
         this.pressed = false;
     }
   });
}
}

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
  public sortOrder=[];
  public count = 0;
  constructor(private renderer: Renderer,private _storesservice:StoresServiceService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.scrollCallback = this.getTableDetails.bind(this); 
  }

  ngOnInit() {
  }

  public getRouteParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
    });
    return this.parameters;
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
      return this.serviceCall[this.functionCall](this.getRouteParams()).do(this.processData);
  }

  public processData = (datasource) => {
    
    if (!this._tableHeadingNames) {
      this._tableHeadingNames = Object.keys(datasource[0]);
      this._tableHeadingNames = this._tableHeadingNames.splice(1, this._tableHeadingNames.length - 2);
      for(let i=0;i<this._tableHeadingNames.length;i++){
        this.sortOrder.push(true);
      }
    }
    this.parameters = {
        limit: 50,
        sortBy: this.parameters.sortBy,
        sortDir: this.parameters.sortDir,
        startFrom: Number(this.parameters['limit']) + Number(this.parameters['startFrom'])
      };
    if(datasource.length>0){
    this.tableData = this.tableData.concat(datasource);
    this._router.navigate([], { queryParams: this.parameters });  
    }
  }
  
  sortBy(heading, order, i) {
    if(order=='asc'){
      this.sortOrder[i]=false;
    }
    else{
      this.sortOrder[i]=true;
    }
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

onScroll(event){
    let width = $(".stores-table").width();
    $(".table-header").width(width);
    var target = $(".table-header")[0];
    target.scrollTop = event.target.scrollTop;
    target.scrollLeft = event.target.scrollLeft;
}
}

import { Component, OnInit, OnChanges, SimpleChange, Input, Renderer, Output, EventEmitter  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit, OnChanges {
  @Input('tableData')tableData;
  @Input('columnNames')tableHeadingNames;
  @Output('lazyLoadData') lazyLoadData = new EventEmitter<any>();
  @Output('sortData') sortData = new EventEmitter<any>();
  public columnWidth=[];
  public sortOrder=[];
  public start;
  public pressed=false;
  public lazyLoad=false;
  public startX;
  public startWidth;
  public _tableData=[];
  public selectedindex=0;
  constructor(private renderer: Renderer) { 
  }

  ngOnInit() {
    if(localStorage.getItem('columnWidth')){
      this.columnWidth = localStorage.getItem('columnWidth').split(",");
    }
  }

  ngOnChanges(changes:{[propKey: string]:SimpleChange}){
    if(changes.tableData && changes.tableData.currentValue!=undefined){
      this.updateData(changes.tableData.currentValue);
    }
    if(changes.columnNames && changes.columnNames.currentValue!=undefined){
      this.updateColumnNames(changes.columnNames.currentValue);
    }
  }

  updateColumnNames(res){
    this.tableHeadingNames=res;
  }
  
  updateData(res){
      this.lazyLoad=false;
      this._tableData=this._tableData.concat(res);
      for(let i=0;i<this.tableHeadingNames.length;i++){
        this.sortOrder.push(true);
      }
      if(this.columnWidth.length==0){
        for(let i=0;i<this.tableHeadingNames.length;i++){
          this.columnWidth.push(($(window).width()-17)/this.tableHeadingNames.length); 
        }
      }
  }
  
  onMouseDown(event){
      this.start = event.target;
      this.pressed = true;
      this.startX = event.clientX;
      this.startWidth = $(this.start).parent().width();
      this.initResizableColumns();
    }
    
    initResizableColumns() {
      this.renderer.listenGlobal('body', 'mousemove', (event) => {
        if(this.pressed) {
          let increment = event.clientX - this.startX;
          let width = this.startWidth + increment;
          this.selectedindex = $(this.start).parent().index();
          let previousWidth= this.columnWidth[this.selectedindex];
          this.columnWidth[this.selectedindex]=width;
          if($('.table-header').width()<$(window).width()&&previousWidth>width){
            this.columnWidth[this.selectedindex+1] += previousWidth-width;
          }
        }
      });
      this.renderer.listenGlobal('body', 'mouseup', (event) => {
        localStorage.setItem("columnWidth",this.columnWidth.join(","));
        if(this.pressed) {
          this.pressed = false;
      }
    });
  } 
  
    handleScroll() {
    this.lazyLoad=true;
    this.lazyLoadData.emit(this.lazyLoad);
    }
    
    sortBy(heading, order, i) {
      this._tableData=[];
      //toggling icon
      if(order=='asc'){
        this.sortOrder[i]=false;
      }
      else{
        this.sortOrder[i]=true;
      }
      this.sortData.emit({column:heading,order:order});
    }
}

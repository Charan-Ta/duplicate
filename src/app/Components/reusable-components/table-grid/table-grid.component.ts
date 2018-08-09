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
  public leftColIndex;
  public rightColIndex;
  public leftColWidth;
  public rightColWidth;
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
          this.columnWidth.push(($('.tableWrapper').width()-(2*this.tableHeadingNames.length-1))/this.tableHeadingNames.length); 
        }
      }
  }
  
  onMouseDown(event){
      this.start = event.target;
      this.pressed = true;
      this.startX = event.pageX;
      this.leftColIndex = $(this.start).parent().index();
      this.rightColIndex = this.leftColIndex+1; 
      this.leftColWidth = Number(this.columnWidth[this.leftColIndex]);
      this.rightColWidth = Number(this.columnWidth[this.rightColIndex]);
      event.stopPropagation();
      event.preventDefault();
      this.initResizableColumns();
    }
    
    initResizableColumns() {
      let minWidth = 40;
      this.renderer.listenGlobal('body', 'mousemove', (event) => {
        if(this.pressed) {
          var rightWidth = this.rightColWidth - (event.pageX - this.startX);
          var leftWidth = this.leftColWidth + (event.pageX - this.startX);
          if(rightWidth < minWidth) {
              leftWidth = leftWidth + rightWidth - minWidth;
              rightWidth = minWidth;
          } else if(leftWidth < minWidth) {
              rightWidth = leftWidth + rightWidth - minWidth;
              leftWidth = minWidth;
          }
          this.columnWidth[this.leftColIndex]=leftWidth;
          this.columnWidth[this.rightColIndex]=rightWidth;
        }
      });
      this.renderer.listenGlobal('body', 'mouseup', (event) => {
        if(this.pressed) {
          var rightWidth = this.rightColWidth - (event.pageX - this.startX);
          var leftWidth = this.leftColWidth + (event.pageX - this.startX);
          if(rightWidth < minWidth) {
            leftWidth = leftWidth + rightWidth - minWidth;
            rightWidth = minWidth;
          } else if(leftWidth < minWidth) {
            rightWidth = leftWidth + rightWidth - minWidth;
            leftWidth = minWidth;
          }
          this.columnWidth[this.leftColIndex]=leftWidth;
          this.columnWidth[this.rightColIndex]=rightWidth;
          this.pressed = false;
          localStorage.setItem("columnWidth",this.columnWidth.join(","));
      }
    });
  }

    adjustColumnSize(){}
  
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

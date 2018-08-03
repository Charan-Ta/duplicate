import { Component, OnInit, OnChanges, SimpleChange, Input, Renderer, Output, EventEmitter  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit, OnChanges {
  @Input('tableData')tableData;
  @Output('lazyLoadData') lazyLoadData = new EventEmitter<any>();
  @Output('sortData') sortData = new EventEmitter<any>();
  public columnWidth=[];
  public tableHeadingNames=[];
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
  }
  
  updateData(res){
      this.lazyLoad=false;
      this._tableData=this._tableData.concat(res);
      this.tableHeadingNames = Object.keys(this._tableData[0]);
      this.tableHeadingNames = this.tableHeadingNames.splice(1, this.tableHeadingNames.length - 2);
      for(let i=0;i<this.tableHeadingNames.length;i++){
        this.sortOrder.push(true);
      }
      if(this.columnWidth.length==0){
        for(let i=0;i<this.tableHeadingNames.length;i++){
          this.columnWidth.push(($(window).width()-137)/this.tableHeadingNames.length); 
        }
      }
  }
  
  onMouseDown(event){
      this.start = event.target;
      this.pressed = true;
      this.startX = event.clientX;
      this.startWidth = $(this.start).parent().width();
      this.renderer.listenGlobal('body', 'mousemove', (event) => {
        if(this.pressed) {
          let width = this.startWidth + (event.clientX - this.startX);
          this.selectedindex = $(this.start).parent().index() + 1;
          for(let i=0;i<=this.tableHeadingNames.length;i++){
            if(i==this.selectedindex-1){
              this.columnWidth[i]=width;
            }
            else{
              this.columnWidth[i]=($(window).width()-width-137)/(this.tableHeadingNames.length-1);
            }
          }
          $(this.start).parent().css({'min-width': width, 'max-width': width});
          $('.divTableBody .divTableRow .divTableCell:nth-child(' + this.selectedindex + ')').css({'min-width': width, 'max-width': width});          
          setTimeout(this.initResizableColumns(),500);
        }
      });
    }
    
    initResizableColumns() {
      this.renderer.listenGlobal('body', 'mouseup', (event) => {
        if(this.pressed) {
          this.pressed = false;
          for(let i=0;i<this.tableHeadingNames.length;i++){
            if(i!=this.selectedindex-1){
              $('.divTableBody .divTableRow .divTableHead:nth-child(' + i+1 + ')').css({'min-width': this.columnWidth[i], 'max-width': this.columnWidth[i]});
              $('.divTableBody .divTableRow .divTableCell:nth-child(' + i+1 + ')').css({'min-width': this.columnWidth[i], 'max-width': this.columnWidth[i]});
            }
          }
          localStorage.setItem("columnWidth",this.columnWidth.join(","));
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

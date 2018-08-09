import { Component, OnInit} from '@angular/core';
import {Collection} from '../../../Interfaces/collection';
import {StoresCollection} from '../../../Services/collection.service';

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
  constructor(private collection:Collection) {}

  ngOnInit() {
    this.collection.getURLParams();
    this.collection.load().subscribe(res=>{
      this.processData(res);
    });
  }
  
  processData(res){
    this.tableData=res;
    if(this.tableData){
      this.tableHeadingNames = Object.keys(this.tableData[0]);
      this.tableHeadingNames = this.tableHeadingNames.splice(1, this.tableHeadingNames.length - 2);
    }
  }

  lazyLoadData(event){
    if(event){
      this.collection.loadNext().subscribe(res=>{
        this.tableData=res;
        if(this.tableData.length>0)
        this.collection.updateURLParams();
      });
    }
  }

  sortData(event){
    this.collection.sort(event.column,event.order).subscribe(res=>{
      this.tableData=res;
    });
  }
  
}

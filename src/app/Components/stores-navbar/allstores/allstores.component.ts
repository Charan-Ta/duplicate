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
  public tableConfig;
  public autosuggestData;
  constructor(private collection:Collection) {}

  ngOnInit() {
    this.autosuggestData={
      suggestions: [
        {
          id: "QT1",
          name: "class",
          autosuggest: "true",
          values: ["1", "2", "3", "4"]
        },
        {
          id: "QT2",
          name: "core_skill",
          autosuggest: "true",
          values: ["core_skill_1", "core_skill_2", "core_skill_3", "core_skill_4"]
        },
        {
          id: "QT3",
          name: "unique_skill",
          autosuggest: "true",
          values: ["unique_skill_1","unique_skill_2","unique_skill_3","unique_skill_4"]
        },
        {
          id: "QT4",
          name: "qCode",
          autosuggest: "true",
          values: ["11", "12", "22", "44"]
        }
      ]};
    this.setTableConfig();
    this.collection.getURLParams();
    this.collection.load().subscribe(res=>{
      this.processData(res);
    });
  }
  
  setTableConfig(){
    this.tableConfig = {
      tableHeight: 300,//in px
      tableWidth: 100,// in %
      cellPadding: 15,// in px
      cellMinWidth: 100,// in px
      resize: true,
      sort: true
    }
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
      if(this.tableData.length>0)
        this.collection.updateURLParams();
    });
  }
  
}

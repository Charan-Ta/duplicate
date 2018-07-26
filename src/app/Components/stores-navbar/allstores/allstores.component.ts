import { Component, OnInit, ChangeDetectorRef, Renderer } from '@angular/core';
import { StoresServiceService } from '../../../Services/Stores-service/stores-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.css']
})
export class AllstoresComponent implements OnInit {
  public stores = [];
  public scrollCallback;
  public parameters;
  public _tableHeadingNames;
  public count = 0;

  constructor(private renderer: Renderer,
    private _storesservice: StoresServiceService,
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router) {
    this.scrollCallback = this.getStoreDetails.bind(this);
  }

  ngOnInit() {
    this.getRouteParams();
  }

  public getRouteParams() {
    this._route.queryParams.subscribe(params => {
      this.parameters = params;
      this.getStoreDetails();
    });
  }

  public getStoreDetails(): Observable<any> | any {
    if ((((this.stores.length - this.parameters.startFrom) < 50) && (this.parameters.startFrom != 0))) {
      return ;
    } else {
      return this._storesservice.getStores(this.parameters).do(this.processData);
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
    else if (this.count != 1 && (this.parameters.startFrom == (this.stores.length - this.parameters.limit))) {
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
    this.stores = this.stores.concat(datasource);



  }
  // sortBy(heading, order) {
  //   this.parameters = {
  //     limit: 50, sortBy: heading, sortDir: order,
  //     startFrom: 0
  //   };
  //   this.stores = [];

  //   // this._router.navigate([],{queryParams:this.parameters});
  //   // console.log('test');
  //   // this.getRouteParams();

  // }
}

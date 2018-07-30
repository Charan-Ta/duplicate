import { Component, OnInit} from '@angular/core';
import { StoresServiceService } from '../../../Services/Stores-service/stores-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { } from 'rxjs';

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.css']
})
export class AllstoresComponent implements OnInit {
  public _functionCall="getStores";
  constructor(private _storesservice:StoresServiceService) {}

  ngOnInit() {
  }

  
}

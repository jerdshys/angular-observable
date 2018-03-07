import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/map";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'underscore';

@Component({
  selector: 'my-app',
  templateUrl: './city.component.html',
  styleUrls: [ './city.component.css' ],

})
export class CityComponent implements OnInit  {

  constructor() {
  }

  ngOnInit() {
    console.log("hello city component")
  }


}
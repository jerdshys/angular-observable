import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {City} from './city.model';
import "rxjs/add/operator/map";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'underscore';
import { ApiService } from './services/api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ApiService]

})
export class AppComponent implements OnInit  {


  constructor( ) {
  }

  ngOnInit() {

  }

  // // Renvoie le tableua des planètes avec les terrains sous forme de tableau
  // this.data$ = this.apiService.searchByLatLong(36.96,-122.02);
  // console.log(this.data$)




}

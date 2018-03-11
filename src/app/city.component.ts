import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/map";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'my-app',
  templateUrl: './city.component.html',
  styleUrls: [ './city.component.css' ],
})

export class CityComponent implements OnInit  {
  id:String;
  city:Object;
  httpClient:HttpClient;
  data$: Observable<Any>;

  constructor(private route: ActivatedRoute, httpClient : HttpClient) {
    this.route.params.subscribe( (params => this.id = params.id; );
    this.httpClient = httpClient;
  }

  ngOnInit() {
    console.log("init "+this.id):
    this.httpClient.get('https://www.metaweather.com/api/location/'+this.id+'').subscribe((response: Response) => {
      console.log(response);
      this.city = response;

   });

    console.log("hello city component")
  }


}

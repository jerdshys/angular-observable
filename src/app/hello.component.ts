import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {City} from './city.model';
import "rxjs/add/operator/map";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';



@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: [ './hello.component.css' ],
})

export class HelloComponent implements OnInit {
   search: string ='';
  data$: Observable<City[]>;


  constructor(
    private httpClient: HttpClient,
  ) {}

  ngOnInit(){

  }

public setHemisphere(value) {
  
}

public searchChange() {
  console.log("onSearchChange")
  this.data$ = this.httpClient.get('https://www.metaweather.com/api/location/search/?query='+this.search+'').map(
    // Renvoie le tableau de city
    (data: any) => data
  )
  .map(
  (cities: any[]) => {
    cities = cities.map(
      (city: City) => {
          city.title = city.title;
        return city;
      }
    );
    return cities;
  }
);
}

}
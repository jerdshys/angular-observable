// https://blog.angularindepth.com/rxjs-understanding-expand-a5f8b41a3602

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import "rxjs/add/operator/map";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';


import * as _ from 'underscore';
import { City } from './city.model';

@Component({
  selector: 'my-app',
  templateUrl: './hello.component.html',
  styleUrls: [ './hello.component.css' ]
})
export class HelloComponent implements OnInit  {
  search:string;
  region,hemisphere: string;
  name = 'Angular 5';
  //interval$: Observable.interval(1000);
  onSearchChange$: BehaviorSubject<string> = new BehaviorSubject('');
  sum$: Observable<number>;
  sum2$: Observable<number>;
  data$: Observable<City[]>;
  filteredCities$: Observable<City[]>;
  paramsObservable$: Observable<any>;
  categories$: Observable<string[]>;
  selectedCategory: string;
  hemisphere$: BehaviorSubject<string>  = new BehaviorSubject('');
  region$: BehaviorSubject<string>  = new BehaviorSubject('');

  constructor(
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    this.hemisphere="nord";
    this.region="europe";
    const clicks = Observable.fromEvent(document, 'click')
    clicks.subscribe(click => {
      var c = click.target.className;
      if(c==="sud" || c==="nord") {
        this.hemisphere = c;
        this.hemisphere$.next(c);
      }
      else if(c==="europe" ||c==="asie" || c==="amerique") {
        this.region = c:
        this.region$.next(c);
      }
    });


    this.data$ = this.httpClient.get('https://www.metaweather.com/api/location/search/?query=e').map(
      // Renvoie le tableau de city
      (data: any) => data
    )
    // Renvoie le tableua des planètes avec les terrains sous forme de tableau
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



  //converti les parametres d'entree en coordonnées
  this.paramsObservable$ = Observable.combineLatest(this.hemisphere$,this.region$,
    (hemisphere,region) => {
      var coords = { xmin : -10000 , xmax : 10000 , ymin : -10000 , ymax : 10000 };
      if(hemisphere === "nord") {
        coords.ymin = 0;
        coords.ymax= 10000;
      } else if(hemisphere === "sud") {
        coords.ymin = -10000;
        coords.ymax= 0;
      }
      if(region==="europe") {
        coords.xmax=40;
        coords.xmin= -12;
      } else if(region==="asie") {
        coords.xmax=140;
        coords.xmin= 56;
      } else if (region==="amerique") {
        coords.xmax=-60;
        coords.xmin= -130;
      }
      return coords;
    }
  );

  this.filteredCities$ = Observable.combineLatest(this.data$, this.onSearchChange$.debounceTime(500),this.paramsObservable$,
    (cities, searchText,coords) => {
      var filtered = cities.filter(
        city => city.title.toLowerCase().includes(searchText.toLowerCase())
      );
      var res = filtered.filter( 
        city =>  parseInt(city.latt_long.split(",")[0]) > coords.ymin && parseInt(city.latt_long.split(",")[0]) <coords.ymax
      )
      res = res.filter( 
        city =>  parseInt(city.latt_long.split(",")[1]) > coords.xmin && parseInt(city.latt_long.split(",")[1]) <coords.xmax
      )
      return res;
    }
  );

  public searchChange() {
    this.onSearchChange$.next(this.search);
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
    this.onSearchChange$.next(category);
  }
}

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
  search: string;
  name = 'Angular 5';
  interval$: Observable.interval(1000);

  onSearchChange$: BehaviorSubject<string> = new BehaviorSubject('');

  sum$: Observable<number>;
  sum2$: Observable<number>;

  data$: Observable<City[]>;
  filteredCities$: Observable<City[]>;
  categories$: Observable<string[]>;

  selectedCategory: string;

  obs$: new BehaviorSubject<string>  = new BehaviorSubject('');



  constructor(
    private httpClient: HttpClient,
  ) {}


  ngOnInit() {
    const clicks = Observable.fromEvent(document, 'click')
    clicks.subscribe(click => {
      var val= null;
      if(click.target.className==="south") {
        val = false;
      }else if(click.target.className==="north") {
        val = true;
      }
      if(val !== null) {
        this.hemisphere = val;
        this.obs$.next(val);
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


  this.filteredCities$ = Observable.combineLatest(this.data$, this.onSearchChange$.debounceTime(500),this.obs$,
    (cities, searchText,hemisphere) => {

      var filtered = cities.filter(
        planet => planet.title.toLowerCase().includes(searchText.toLowerCase())
      );
      var res = filtered.filter( 
        planet =>  (parseInt(planet.latt_long.split(",")[0]) >0) == hemisphere
      )
      return res;
    }
  );
  }



  // public updateFilteredCities(terrain: string) {
  //   this.filteredCities$ = this.data$.map(
  //     (cities) => cities.filter(
  //       planet => (planet.terrain === terrain)
  //     )
  //   );
  // }

  //interval$.subscribe(i => console.log("z" ))



  public searchChange() {
    console.log("on search change")
    this.onSearchChange$.next(this.search);
  }



  public selectCategory(category: string) {
    this.selectedCategory = category;
    this.onSearchChange$.next(category);
  }

  // public setHemisphere(hemisphere: boolean) {
  //   this.hemisphere = hemisphere;
  //   this.obs$.next(hemisphere);
  // }


}






//
// import { Component, OnInit, OnChanges } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {City} from './city.model';
// import "rxjs/add/operator/map";
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/operator/debounceTime';
// import * as _ from 'underscore';
// import { ApiService } from './services/api.service';
//
// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: [ './app.component.css' ],
//   providers: [ApiService]
//
// })
// export class HelloComponent implements OnInit  {
//   search: string ='';
//   name = 'Angular 5';
//   onSearchChange$: BehaviorSubject<string> = new BehaviorSubject('');
//   data$: Observable<City[]>;
//   filteredCities$: Observable<City[]>;
//   categories$: Observable<string[]>;
//   httpClient:HttpClient
//
//   constructor( httpClient : HttpClient ) {
//     this.httpClient = httpClient;
//   }
//
//   ngOnInit() {
//     this.data$ = this.httpClient.get('https://www.metaweather.com/api/locations').map(
//       // Renvoie le tableau de city
//       (data: any) => data
//     )
//     // Renvoie le tableua des planètes avec les terrains sous forme de tableau
//     .map(
//     (cities: any[]) => {
//       cities = cities.map(
//         (city: City) => {
//             city.title = city.title;
//           return city;
//         }
//       );
//       return cities;
//     }
//   );
//
//   // // Renvoie le tableua des planètes avec les terrains sous forme de tableau
//   // this.data$ = this.apiService.searchByLatLong(36.96,-122.02);
//   // console.log(this.data$)
//   this.filteredCities$ = Observable.combineLatest(this.data$, this.onSearchChange$,
//     (cities, searchText) => {
//       console.log('observable update', searchText);
//       return cities.filter(
//         city => city.title.includes(searchText)
//       )
//     }
//   );
//
//   // this.categories$ = this.data$.map(
//   //     cities => {
//   //       let categories = cities.map(
//   //         city => city.title
//   //       );
//   //       return _.uniq(_.flatten(categories));
//   //     }
//   //   );
//   // }
//   //
//   // public updateFilteredCities(title: string) {
//   //   this.filteredCities$ = this.data$.map(
//   //     (cities) => cities.filter(
//   //       city => (city.title === title)
//   //     )
//   //   );
//   // }
//
//   public searchChange() {
//     console.log("search change");
//     this.onSearchChange$.next(this.search);
//   }
//
//
// }

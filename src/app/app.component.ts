import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
  search: string;
  name = 'Angular 5';
  onSearchChange$: BehaviorSubject<string> = new BehaviorSubject('');
  data$: Observable<City>;
  filteredCities$: Observable<City[]>;
  categories$: Observable<string[]>;
  apiService:ApiService;

  constructor( apiService : ApiService, httpClient : HttpClient ) {
    this.apiService = apiService;
    this.httpClient = httpClient;
  }

  ngOnInit() {
    this.data$ = this.httpClient.get('https://www.metaweather.com/api/location/search/?lattlong=50.068,-5.316').map(
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

  // // Renvoie le tableua des planètes avec les terrains sous forme de tableau
  // this.data$ = this.apiService.searchByLatLong(36.96,-122.02);
  // console.log(this.data$)


  this.filteredCities$ = Observable.combineLatest(this.data$, this.onSearchChange$,
    (cities, searchText) => {
      console.log('observable update', searchText);
      return cities.filter(
        city => city.title.includes(searchText)
      )
    }
  );

  this.categories$ = this.data$.map(
      cities => {
        let categories = cities.map(
          city => city.terrains
        );
        return _.uniq(_.flatten(categories));
      }
    );
  }

  public updateFilteredPlanets(title: string) {
    this.filteredPlanets$ = this.data$.map(
      (cities) => cities.filter(
        city => (city.title === title)
      )
    );
  }

  public searchChange() {
    console.log("onSearchChange")
    this.onSearchChange$.next(this.search);
  }


}

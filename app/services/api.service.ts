import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient)  { }
  data : string

  public searchByLatLong(lat,long) {
    console.log('LONG', long)
    console.log('LAT', lat)
    this.data = this.httpClient.get('https://www.metaweather.com/api/location/search/?lattlong=50.068,-5.316').map(
        // Renvoie le tableau de city
        (data: any) => this.data
    ).map(
        (cities: any[]) => {
          cities = cities.map(
            (city: City) => {
                city.title = city.title;
              return city;
            }
          );
          console.log("cities "+cities)
          return cities;
        });


    // Renvoie le table
    //
    //
    // this.httpClient.get('https://www.metaweather.com/api/location/search/?lattlong='+lat+','+long).map(
    //   // Renvoie le tableau de city
    //   (data: any) => data
    //   console.log('THIS.DATA', this.data)
    //
    // )

  }

}

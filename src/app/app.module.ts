import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityComponent } from './city.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: 'city/:id', component : CityComponent},
  { path: '', component: HelloComponent }
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  declarations: [ AppComponent, HelloComponent,CityComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

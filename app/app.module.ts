import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: 'hello',  component: HelloComponent },
  { path: '', component: AppComponent },
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
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

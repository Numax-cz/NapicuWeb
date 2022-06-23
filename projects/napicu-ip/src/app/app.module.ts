import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NapicuApiModule} from "@Napicu/Modules/napicu-api/napicu-api.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NapicuApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

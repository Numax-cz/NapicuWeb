import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NapicuApiModule} from "@Napicu/Modules/napicu-api/napicu-api.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
      HttpClientModule,
      NapicuApiModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

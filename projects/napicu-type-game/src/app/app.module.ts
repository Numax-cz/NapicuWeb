import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {ApiErrorSchemaModule} from "@Napicu/Modules/Error/api-error-schema/api-error-schema.module";
import {NapicuApiModule} from "@Napicu/Modules/napicu-api/napicu-api.module";


@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [BrowserModule, ApiErrorSchemaModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule, ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }),
    ApiErrorSchemaModule,
    NapicuApiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

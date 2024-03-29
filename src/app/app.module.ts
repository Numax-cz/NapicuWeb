import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Error404Component} from './error404/error404.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {IndexComponent} from './index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {BiosWaitListComponent} from './bios-wait-list/bios-wait-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiModule} from "@Napicu/OpenAPI/api.module";
import {Configuration} from "@Napicu/OpenAPI/configuration";
import {environment} from "../../environments/environment";
import {NapicuApiModule} from "@Napicu/Modules/napicu-api/napicu-api.module";

@NgModule({
    declarations: [AppComponent, Error404Component, IndexComponent, BiosWaitListComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        NoopAnimationsModule,
        MatMenuModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NapicuApiModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
        IndexComponent
    ]
})
export class AppModule {
}

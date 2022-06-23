import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiModule, Configuration} from "../../../OpenAPI";
import {environment} from "../../../environments/environment";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule.forRoot( () => {return new Configuration({basePath: environment.basePath})}),
  ],
  exports: [
  ]
})
export class NapicuApiModule { }

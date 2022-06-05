import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiErrorSchema1Component } from './api-error-schema1/api-error-schema1.component';


@NgModule({
  declarations: [
    ApiErrorSchema1Component
  ],
  exports: [
    ApiErrorSchema1Component
  ],
  imports: [
    CommonModule
  ]
})
export class ApiErrorSchemaModule { }

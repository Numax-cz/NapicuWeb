import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { IndexComponent } from './index/index.component';
import {BiosWaitListComponent} from "./bios-wait-list/bios-wait-list.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bios', component: BiosWaitListComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

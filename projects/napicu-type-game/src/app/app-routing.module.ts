import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from 'src/app/error404/error404.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Component } from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public declare inputValue: string;
  public filterList: string[] = [];


  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public updateFilterMenu(): void {
    this.filterList = NapicuPocasiCities.filter((item: string) => {
      // return this.inputValue.toLowerCase().includes(item.toLowerCase());
      return item.toLocaleLowerCase().startsWith(this.inputValue.toLocaleLowerCase())
    });
    this.filterList.length = NapicuPocasiCitiesMaxView;
  }


}

import { Component } from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";
import {NapicuPocasiService} from "./napicu-pocasi.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public declare inputValue: string;
  public filterList: string[] = [];

  constructor(private service: NapicuPocasiService) {

  }

  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public updateFilterMenu(): void {
    this.filterList = NapicuPocasiCities.filter((item: string) => {
      return item.toLocaleLowerCase().startsWith(this.inputValue.toLocaleLowerCase())
    });
    this.filterList = this.filterList.slice(0, NapicuPocasiCitiesMaxView);
  }


}

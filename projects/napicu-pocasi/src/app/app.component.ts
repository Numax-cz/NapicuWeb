import {Component} from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";
import {NapicuPocasiService} from "./napicu-pocasi.service";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public declare inputValue: string;
  public filterList: string[] = [];
  public apiData: INapicuWeatherApiResponse | null = null;

  constructor(public service: NapicuPocasiService) {

  }

  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public updateFilterMenu(): void {
    this.filterList = NapicuPocasiCities.filter((item: string) => {
      return item.toLocaleLowerCase().startsWith(this.inputValue.toLocaleLowerCase())
    });
    this.filterList = this.filterList.slice(0, NapicuPocasiCitiesMaxView);
    if( this.filterList[0]?.toLocaleLowerCase() === this.inputValue?.toLocaleLowerCase()) {
      this.filterList = [];
    }
  }

  public selectCity(city: string): void {
    this.inputValue = city;
    this.updateFilterMenu();
    this.submit();
  }

  public submit(): void {

    if(this.inputValue.length) {
      this.service.getOpenWeather(this.inputValue).then((data: INapicuApiResponse<INapicuWeatherApiResponse>) => {
        this.apiData = data.data;
      }).catch((error: any) => {
        console.log(error)
        }
      )
    }
  }

  public getIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${this.apiData?.icon}@2x.png`
  }
}




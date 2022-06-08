import {Component} from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";
import {NapicuPocasiService} from "./napicu-pocasi.service";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";
import {HttpClient} from "@angular/common/http";
import {NAPICU_SERVER_404_ERROR} from "../../../configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public declare inputValue: string;
  public filterList: string[] = [];
  public apiData: INapicuWeatherApiResponse | null = null;
  public err: boolean = true;

  constructor(public service: NapicuPocasiService) {

  }

  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public updateFilterMenu(): void {
    this.err = false;
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

  public async submit(): Promise<void> {
    this.err = true;
    if (this.inputValue.length) {
      await this.service.getOpenWeather(this.inputValue).then((data: INapicuApiResponse<INapicuWeatherApiResponse>) => {
        this.apiData = data.data;
      }).catch((error: any) => {
          console.log(error)
        }
      )
    }
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }

  public getIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${this.apiData?.icon}@2x.png`
  }
}




import {Component} from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";
import {NapicuPocasiService} from "./napicu-pocasi.service";
import {NapicuApiResponse, NapicuApiResponseException} from "@Napicu/Interface/Api";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";
import {NAPICU_POCASI_CITY_NOT_FOUND, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {NapicuApiResponseStatus} from "@Napicu/Api/ResponseStatus";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public declare inputValue: string;
  public filterList: string[] = [];
  public apiData: INapicuWeatherApiResponse | null = null;
  public err: string | null = null;

  constructor(public service: NapicuPocasiService) {

  }

  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public updateFilterMenu(): void {
    this.err = null;
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
    this.err = null;
    if (this.inputValue.length) {
      await this.service.getOpenWeather(this.inputValue).then((data: NapicuApiResponse<INapicuWeatherApiResponse>) => {
        this.apiData = data.data;
      }).catch((error: NapicuApiResponseException) => {
          if(error.code === NapicuApiResponseStatus.NAPICU_POCASI_CITY_NOT_FOUND) {
              this.err = this.getCityNotFound;
          }
        }
      )
    }
    this.resetInput();
  }

  protected resetInput(): void {
    this.filterList = [];
    this.inputValue = "";
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }

  get getCityNotFound(): string {
    return NAPICU_POCASI_CITY_NOT_FOUND;
  }

  public getIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${this.apiData?.icon}@2x.png`
  }
}




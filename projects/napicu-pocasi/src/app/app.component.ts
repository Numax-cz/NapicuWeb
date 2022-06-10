import {Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit{
  public declare inputValue: string;
  public filterList: string[] = [];
  public apiData: INapicuWeatherApiResponse | null = null;
  public err: string | null = null;
  public selectedFilterListItem: number | null = null;

  constructor(public service: NapicuPocasiService) {

  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.onKeyDown);
  }

  public onInputChange(event: Event): void {
    this.updateFilterMenu();
  };

  public onKeyDown = (event: KeyboardEvent): void =>  {
    if(event.keyCode === 38 || event.keyCode === 40){
      if(this.filterList.length){
        if(this.selectedFilterListItem == null) {
          this.selectedFilterListItem = 0;
          return;
        }
        //UP
        if(event.keyCode === 38 && this.selectedFilterListItem > 0){
          this.selectedFilterListItem -= 1;
        }
        //DOWN
        else if(event.keyCode === 40 && this.selectedFilterListItem < this.filterList.length - 1) {
          {
            this.selectedFilterListItem += 1
          }
        }
      }
      event.preventDefault();
    }
  }

  public onMouseHover(itemIndex: number): void {
    this.selectedFilterListItem = itemIndex;
  }

  public updateFilterMenu(): void {
    this.err = null;
    this.selectedFilterListItem = null
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
          }else {
            this.err = this.get404ErrorText;
          }
        this.clearApiData();
        }
      )
    }
    this.resetInput();
  }

  protected resetInput(): void {
    this.filterList = [];
    this.inputValue = "";
  }

  protected clearApiData(): void {
    this.apiData = null;
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




import {Component, OnInit} from '@angular/core';
import {NapicuPocasiCities, NapicuPocasiCitiesMaxView} from "./config";
import {NAPICU_POCASI_CITY_NOT_FOUND, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {NapicuApiResponseStatus} from "@Napicu/Api/ResponseStatus";
import {HttpErrorResponse} from "@angular/common/http";
import {NapicuPocasiResponseModel} from "@Napicu/OpenAPI/model/napicuPocasiResponseModel";
import {NapicuPocasiControllerService} from "@Napicu/OpenAPI/api/napicuPocasiController.service";
import {RequestExceptionSchema} from "@Napicu/OpenAPI/model/requestExceptionSchema";
import {NAPICU_TO_MANY_REQUESTS} from "../../../../lib/msgs";
import {HttpStatusCode} from "@Napicu/Api/HttpCodes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public declare inputValue: string;
  public filterList: string[] = [];
  public apiData: NapicuPocasiResponseModel | null = null;
  public err: string | null = null;
  public selectedFilterListItem: number | null = null;

  constructor(public service: NapicuPocasiControllerService) {}

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
            this.selectedFilterListItem += 1;
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
      this.service.get(this.inputValue).subscribe({
          next: (data) => {
            if (data) {
              this.apiData = data;
            }
          },
          error: (data: HttpErrorResponse) => {
            let i = data.error as RequestExceptionSchema;
            this.apiData = null;
            if(i.code === NapicuApiResponseStatus.NAPICU_POCASI_CITY_NOT_FOUND){
              this.err = this.getCityNotFound;
            } else  if(i.code === HttpStatusCode.TOO_MANY_REQUESTS) {
              this.err = this.tooManyRequestsErrMsg;
            }else this.err = this.get404ErrorText;
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

  protected clearApiData(): void {
    this.apiData = null;
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }

  get getCityNotFound(): string {
    return NAPICU_POCASI_CITY_NOT_FOUND;
  }


  get tooManyRequestsErrMsg(): string  {
    return NAPICU_TO_MANY_REQUESTS;
  }

  public getIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${this.apiData?.icon}@2x.png`
  }

}




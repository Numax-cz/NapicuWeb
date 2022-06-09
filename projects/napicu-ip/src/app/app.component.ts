import {Component, OnInit} from '@angular/core';
import {NapicuIPService} from "./napicu-ip.service";
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NAPICU_IP_LOADING_TEXT, NAPICU_POCASI_CITY_NOT_FOUND, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {NapicuApiResponseException, NapicuApiResponse} from "@Napicu/Interface/Api";
import {NapicuApiResponseStatus} from "@Napicu/Interface/ApiResponseStatus";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  public err: boolean = false;
  public text: string = this.getLoadingText;

  public declare data: INapicuIPApiResponse;

  constructor(private service: NapicuIPService) {
  }


  ngOnInit(): void {
    console.log(NapicuApiResponseStatus.NAPICU_BAD_IP)
  }

  public getApiData(): any {
    this.err = false;
    this.service.getIP().then((data: NapicuApiResponse<INapicuIPApiResponse>) => {
      this.data = data.data;
    }).catch((error: NapicuApiResponseException) => {
      this.err = true;
    })
  }

  get getLoadingText(): string {
    return NAPICU_IP_LOADING_TEXT;
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }
}

import {Component, OnInit} from '@angular/core';
import {NapicuIPService} from "./napicu-ip.service";
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NAPICU_IP_LOADING_TEXT, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {NapicuApiResponse, NapicuApiResponseException} from "@Napicu/Interface/Api";
import {NapicuApiResponseStatus} from "@Napicu/Interface/ApiResponseStatus";
import {HttpStatusCode} from "@Napicu/Api/HttpCodes";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  public txt: string = this.getLoadingText;

  public declare data: INapicuIPApiResponse;

  constructor(private service: NapicuIPService) {
  }


  ngOnInit(): void {
    this.getApiData();
  }

  public getApiData(): any {
    this.service.getIP().then((data: NapicuApiResponse<INapicuIPApiResponse>) => {
      this.data = data.data;
      console.log(data)
    }).catch((error: NapicuApiResponseException) => {
        this.txt = this.get404ErrorText;
    })
  }

  get getLoadingText(): string {
    return NAPICU_IP_LOADING_TEXT;
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }
}

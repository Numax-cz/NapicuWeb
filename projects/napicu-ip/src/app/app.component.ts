import {Component, OnInit} from '@angular/core';
import {NAPICU_IP_LOADING_TEXT, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {HttpErrorResponse} from "@angular/common/http";
import {NapicuIpControllerService} from "@Napicu/OpenAPI/api/napicuIpController.service";
import {NapicuIPResponseModel} from "@Napicu/OpenAPI/model/napicuIPResponseModel";
import {NAPICU_TO_MANY_REQUESTS} from "../../../../lib/msgs";
import {RequestExceptionSchema} from "@Napicu/OpenAPI/model/requestExceptionSchema";
import {HttpStatusCode} from "@Napicu/Api/HttpCodes";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  public txt: string = this.getLoadingText;

  public declare data: NapicuIPResponseModel;

  constructor(private service: NapicuIpControllerService) {
  }

  ngOnInit(): void {
    this.getApiData();
  }

  public getApiData(): any {
    this.service.get1().subscribe(
      {
        next: (value: NapicuIPResponseModel) => {
          this.data = value;
        },
        error: (error: HttpErrorResponse) => {
          let err = error.error as RequestExceptionSchema;
          if(err.code == HttpStatusCode.TOO_MANY_REQUESTS){
            this.txt = this.tooManyRequestsErrMsg;
          }else this.txt = this.get404ErrorText;
        }
      }
    )
  }

  get getLoadingText(): string {
    return NAPICU_IP_LOADING_TEXT;
  }

  get get404ErrorText(): string{
    return NAPICU_SERVER_404_ERROR;
  }

  get tooManyRequestsErrMsg(): string  {
    return NAPICU_TO_MANY_REQUESTS;
  }
}

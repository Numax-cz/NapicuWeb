import {Component, OnInit} from '@angular/core';
import {NAPICU_IP_LOADING_TEXT, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {HttpErrorResponse} from "@angular/common/http";
import {NapicuIpControllerService} from "@Napicu/OpenAPI/api/napicuIpController.service";
import {NapicuIPResponseModel} from "@Napicu/OpenAPI/model/napicuIPResponseModel";


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
          this.txt = this.get404ErrorText;
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
}

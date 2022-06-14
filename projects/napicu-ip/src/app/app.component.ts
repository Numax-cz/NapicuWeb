import {Component, OnInit} from '@angular/core';
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NAPICU_IP_LOADING_TEXT, NAPICU_SERVER_404_ERROR} from "../../../configuration";
import {NapicuIpControllerService} from "../../../../open-api";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  public txt: string = this.getLoadingText;

  public declare data: INapicuIPApiResponse;

  constructor(private service: NapicuIpControllerService) {
  }

  ngOnInit(): void {
    this.getApiData();
  }

  public getApiData(): any {
    this.service.get1().subscribe(
      {
        next: value => {
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

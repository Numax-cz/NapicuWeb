import {Component, OnInit} from '@angular/core';
import {NapicuIPService} from "./napicu-ip.service";
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NAPICU_IP_404_ERROR, NAPICU_IP_LOADING_TEXT} from "./configuration";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {HttpClient} from "@angular/common/http";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";


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
    this.err = false;
    service.getIP().then((data: INapicuApiResponse<INapicuIPApiResponse>) => {
      this.data = data.data;
    }).catch((error: any) => {
      this.text = this.get404ErrorText;
      this.err = true;
    })
  }


  ngOnInit(): void {
  }

  public getApiData(): any {

  }

  get getLoadingText(): string {
    return NAPICU_IP_LOADING_TEXT;
  }

  get get404ErrorText(): string{
    return NAPICU_IP_404_ERROR;
  }
}

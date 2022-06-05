import {Component, OnInit} from '@angular/core';
import {NapicuIPService} from "./napicu-ip.service";
import {INapicuIPApiResponse} from "../../../../Interface/NapicuIP";
import {NAPICU_IP_404_ERROR, NAPICU_IP_LOADING_TEXT} from "./configuration";


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
    let apiData = service.getApiData();
    if (apiData) apiData
      .subscribe((d) => this.data = JSON.parse(d.data), (error) => {
        this.err = true;
          this.text = this.get404ErrorText;
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

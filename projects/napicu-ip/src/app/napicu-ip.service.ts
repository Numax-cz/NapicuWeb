import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NapicuIPApi} from "../../../../api";
import {INapicuIPApiResponse} from "../../../../Interface/NapicuIP";
import {INapicuApiResponse} from "../../../../Interface/Api";

@Injectable({
  providedIn: 'root'
})
export class NapicuIPService{
  public api_url: string = NapicuIPApi;

  constructor(protected http: HttpClient) {

  }

  public getApiData(){
   return this.http.get<INapicuApiResponse<string>>(this.api_url)
  }
}

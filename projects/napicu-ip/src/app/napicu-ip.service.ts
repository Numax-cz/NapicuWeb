import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NapicuIPApi} from "../../../../api";
import {NapicuIPApiResponse} from "../../../../Interface/NapicuIP";
import {NapicuApiResponse} from "../../../../Interface/Api";

@Injectable({
  providedIn: 'root'
})
export class NapicuIPService{
  public api_url: string = NapicuIPApi;

  constructor(protected http: HttpClient) {

  }

  public getApiData(){
   return this.http.get<NapicuApiResponse<string>>(this.api_url)
  }
}

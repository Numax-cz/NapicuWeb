import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NapicuApiURLWords, NapicuApiURLIp, NapicuApiURLWeather} from "@Napicu/Api/URL";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NapicuApiHandler} from "@Napicu/Class/NapicuApi";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";


@Injectable({
  providedIn: 'root'
})
export class NapicuIPService extends NapicuApiHandler{


  constructor(protected http: HttpClient) {
    super();
  }

  public getIP(): Promise<INapicuApiResponse<INapicuIPApiResponse>>{
    return this.getApiData<INapicuIPApiResponse>(NapicuApiURLIp);
  }
}

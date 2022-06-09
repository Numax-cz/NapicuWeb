import {Injectable} from '@angular/core';
import {NapicuApiHandler} from "@Napicu/Class/NapicuApi";
import {HttpClient} from "@angular/common/http";
import {NapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";
import {NapicuApiURLWeather} from "@Napicu/Api/URL";


@Injectable({
  providedIn: 'root'
})
export class NapicuPocasiService extends NapicuApiHandler {
  constructor(protected http: HttpClient) {
    super();
  }
  public getOpenWeather(city: string): Promise<NapicuApiResponse<INapicuWeatherApiResponse>>{
    return this.getApiData<INapicuWeatherApiResponse>(`${NapicuApiURLWeather}?city=${city}`);
  }
}


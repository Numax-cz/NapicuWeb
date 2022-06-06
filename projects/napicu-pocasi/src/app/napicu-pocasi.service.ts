import { Injectable } from '@angular/core';
import {NapicuApiHandler} from "@Napicu/Class/NapicuApi";
import {HttpClient} from "@angular/common/http";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuWeatherApiResponse} from "@Napicu/Interface/NapicuWeather";
import {NapicuApiWeather} from "@Napicu/Api/URL";


@Injectable({
  providedIn: 'root'
})
export class NapicuPocasiService extends NapicuApiHandler {
  protected declare http: HttpClient;

  public getOpenWeather(city: string): Promise<INapicuApiResponse<INapicuWeatherApiResponse>>{
    return this.getApiData<INapicuWeatherApiResponse>(`${NapicuApiWeather}?city=${city}`);
  }
}


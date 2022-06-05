import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NapicuApiURLWords} from "@Napicu/Api/URL";
import {INapicuApiResponse} from "@Napicu/Interface/Api";


@Injectable({
  providedIn: 'root'
})
export class NapicuIPService{

  constructor(protected http: HttpClient) {

  }

  public getApiData(){
   return this.http.get<INapicuApiResponse<string>>(NapicuApiURLWords)
  }
}

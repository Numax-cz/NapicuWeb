import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {INapicuWordsApiResponse} from "@Napicu/Interface/NapicuWords";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {NapicuApiURLWords} from "@Napicu/Api/URL";
import {Observable} from "rxjs";
import {HttpStatusCode} from "@Napicu/Interface/HttpCodes";
import {NapicuApiHandler} from "../../../../../lib/Class/NapicuApi";


@Injectable({
  providedIn: 'root'
})
export class NapicuTypeGameService extends NapicuApiHandler{

  constructor(protected http: HttpClient) {
    super();
  }

  public getWords(count: number): Promise<INapicuApiResponse<INapicuWordsApiResponse>>{
    return this.getApiData<INapicuWordsApiResponse>(`${NapicuApiURLWords}?count=${count}`);
  }

}


import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INapicuWordsApiResponse} from "@Napicu/Interface/NapicuWords";
import {NapicuApiResponse} from "@Napicu/Interface/Api";
import {NapicuApiURLWords} from "@Napicu/Api/URL";
import {NapicuApiHandler} from "@Napicu/Class/NapicuApi";


@Injectable({
  providedIn: 'root'
})
export class NapicuTypeGameService extends NapicuApiHandler{

  constructor(protected http: HttpClient) {
    super();
  }

  public getWords(count: number): Promise<NapicuApiResponse<INapicuWordsApiResponse>>{
    return this.getApiData<INapicuWordsApiResponse>(`${NapicuApiURLWords}?count=${count}`);
  }

}


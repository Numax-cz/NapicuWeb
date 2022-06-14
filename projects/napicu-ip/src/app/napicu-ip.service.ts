import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NapicuApiURLIp} from "@Napicu/Api/URL";
import {NapicuApiResponse} from "@Napicu/Interface/Api";
import {INapicuIPApiResponse} from "@Napicu/Interface/NapicuIP";
import {NapicuApiHandler} from "@Napicu/Class/NapicuApi";


@Injectable({
  providedIn: 'root'
})
export class NapicuIPService extends NapicuApiHandler{


  constructor(protected http: HttpClient) {
    super();
  }

  public getIP(): Promise<NapicuApiResponse<INapicuIPApiResponse>>{
    return this.getApiData<INapicuIPApiResponse>(NapicuApiURLIp);
  }
}

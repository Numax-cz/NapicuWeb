import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {INapicuApiResponse} from "@Napicu/Interface/Api";
import {HttpStatusCode} from "@Napicu/Interface/HttpCodes";
import {INapicuWordsApiResponse} from "@Napicu/Interface/NapicuWords";

export abstract class NapicuApiHandler{
  protected abstract declare http: HttpClient

  protected async getApiData<T>(url: string): Promise<INapicuApiResponse<T>>{
    return new Promise<INapicuApiResponse<T>>((resolve, reject) => {
      this.http.get<INapicuApiResponse<T>>(url).subscribe({
        next: (data: INapicuApiResponse<T>) => {
          if(data.status !== HttpStatusCode.OK) reject({status: data.status, data: null});
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          reject({status: error.status, data: null});
        }
      })
    })
  }

}

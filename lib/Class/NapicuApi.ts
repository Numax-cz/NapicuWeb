import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NapicuApiResponseException, NapicuApiResponse} from "@Napicu/Interface/Api";


export abstract class NapicuApiHandler{
  protected abstract declare http: HttpClient

  protected async getApiData<T>(url: string): Promise<NapicuApiResponse<T>>{
    return new Promise<NapicuApiResponse<T>>((resolve, reject:  (reason: NapicuApiResponseException) => void) => {
      this.http.get<NapicuApiResponse<T>>(url).subscribe({
        next: (data: NapicuApiResponse<T>) => {
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          let i: NapicuApiResponseException = error.error as NapicuApiResponseException;
          reject(i);
        }
      })
    })
  }
}

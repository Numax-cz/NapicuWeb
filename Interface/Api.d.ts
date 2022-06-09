import {HttpStatusCode} from "./HttpCodes";
import {NapicuApiResponseStatus} from "@Napicu/Interface/ApiResponseStatus";




export declare interface NapicuApiResponse<T>{
  status: HttpStatusCode,
  data: T,
}

export declare interface NapicuApiResponseException {
  status: HttpStatusCode,
  code: HttpStatusCode | NapicuApiResponseStatus,
}


import {HttpStatusCode} from "./HttpCodes";

export declare interface INapicuApiResponse<T>{
  status: HttpStatusCode,
  data: T
}

import {ApiResponse} from "../interface/ApiResponse";

export class HttpResponse<T> implements ApiResponse<T>{
  public declare code: number;
  public declare success: boolean;
  public declare data: T;

  constructor(code: number, success: boolean, data: T) {
    this.code = code;
    this.success = success;
    this.data = data;
  }
}

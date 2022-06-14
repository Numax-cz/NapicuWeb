import {ApiResponse} from "../interface/ApiResponse";

export class HttpResponse<T> implements ApiResponse<T> {
  public declare status: number;
  public declare ok: boolean;
  public declare data: T;

  constructor(code: number, ok: boolean, data: T) {
    this.status = code;
    this.ok = ok;
    this.data = data;
  }
}

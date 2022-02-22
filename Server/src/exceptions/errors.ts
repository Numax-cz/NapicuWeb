export class HttpException extends Error {
  public declare message: string
  public declare codeStatus: number;

  constructor(message: string, codeStatus: number) {
    super(message);
    this.message = message;
    this.codeStatus = codeStatus
  }

}

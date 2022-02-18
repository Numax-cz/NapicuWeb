import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions/errors";


export function middlewareError(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction

): void{
  let message = error.message || "Error";
  let codeStatus = error.codeStatus || 500;
  res.status(codeStatus).send({
    codeStatus,
    message
  })
}

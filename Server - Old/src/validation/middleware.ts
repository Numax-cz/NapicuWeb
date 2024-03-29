import {NextFunction, Request, RequestHandler, Response} from "express";
import joi, {ValidationErrorItem} from "joi";
import {HttpStatusCode} from "../interface/HttpStatusCode";
import rateLimit from "express-rate-limit";


export function middlewareValidation(schema: joi.Schema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.validateAsync(req.body, {
        stripUnknown: true,
        allowUnknown: true,
        abortEarly: false
      })
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: ValidationErrorItem) => {
        errors.push(error.message)
      });
      res.status(HttpStatusCode.badRequest).send({errors: errors})
    }
  }
}

export function middlewareValidationToManyRequests(max: number): RequestHandler {
  return rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: max,
    message:
      'Too many requests from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
  });
}

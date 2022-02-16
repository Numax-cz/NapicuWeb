import {RequestHandler, Request, Response, NextFunction} from "express";
import joi, {ValidationErrorItem} from "joi";
import {ExecException} from "child_process";


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
      res.status(400).send({errors: errors})
    }

  }
}

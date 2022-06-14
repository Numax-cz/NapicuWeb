import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation, middlewareValidationToManyRequests} from "../../validation/middleware";
import {PopjonanekService} from "./popjonanek.service";
import {PopJonanekCounterSchema} from "./popjonanek.model";

export class PopjonanekController implements NapicuApiController {
  public path: string = "/popjonanek";
  public router: Router = Router();

  constructor() {
    this.router.post(`${this.path}/counter`, [middlewareValidation(PopJonanekCounterSchema), middlewareValidationToManyRequests(230)], this.post);
  }

  protected async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    let i = await new PopjonanekService().addCount(req.body.clicks);
    res.status(i.status).json(i);
  }
}

import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation, middlewareValidationToManyRequests} from "../../validation/middleware";
import {EmailSchema} from "../Bios/bios.model";
import {BiosService} from "../Bios/bios.service";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {PopjonanekService} from "./popjonanek.service";
import {PopJonanekCounterSchema} from "./popjonanek.model";
import {PostService} from "../PostRequest/post.service";
import rateLimit from 'express-rate-limit'
import {HttpResponse} from "../../util/HttpResponse";
import {NapicuAPIBasicPOSTResponse, PopJonanekGETApiResponse} from "../../interface/Responses";

export class PopjonanekController implements NapicuApiController{
  public path: string = "/popjonanek";
  public router: Router = Router();

  constructor() {
    this.router.post(`${this.path}/counter`, [middlewareValidation(PopJonanekCounterSchema), middlewareValidationToManyRequests(230)], this.post);
  }

  protected async post(req: Request, res: Response, next: NextFunction): Promise<void>{
    let i = await new PopjonanekService().addCount(req.body.clicks);
     res.status(i.code).json(i);
  }
}

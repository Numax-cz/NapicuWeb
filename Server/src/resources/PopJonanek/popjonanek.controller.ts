import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation} from "../../validation/middleware";
import {EmailSchema} from "../Bios/bios.model";
import {BiosService} from "../Bios/bios.service";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {PopjonanekService} from "./popjonanek.service";
import {PopJonanekCounterSchema} from "./popjonanek.model";
import {PostService} from "../PostRequest/post.service";
import rateLimit from 'express-rate-limit'

export class PopjonanekController implements NapicuApiController{
  public path: string = "/popjonanek";
  public router: Router = Router();

  constructor() {
    this.router.get(`${this.path}/counter`, this.get);
    this.router.post(`${this.path}/counter`, middlewareValidation(PopJonanekCounterSchema), this.post);
  }


  protected async get(req: Request, res: Response, next: NextFunction ): Promise<Response | void> {
    try {
      const user = await new PopjonanekService().getCount();
      res.status(HttpStatusCode.created).json({count: user});
    }catch (e){
      //TODO Internal Error;
    }
  }

  protected async post(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
    try {
      let {counter} = req.body;
      const count = await new PopjonanekService().addCount(counter);
      res.status(HttpStatusCode.created).json(count)
    }catch (e){
      //TODO
    }
  }


}

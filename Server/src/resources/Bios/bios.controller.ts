import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation} from "../../validation/middleware";
import {EmailSchema} from "./bios.model";
import {PostService} from "../PostRequest/post.service";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {HttpException} from "../../exceptions/errors";
import {BiosService} from "./bios.service";

export class BiosController implements NapicuApiController{
  public path: string = "/bios";
  public router: Router =  Router();

  constructor() {
    this.router.post(`${this.path}/waitlist`, middlewareValidation(EmailSchema), this.waitlist);
  }


  public async waitlist(req: Request, res: Response, next: NextFunction ): Promise<Response | void> {
    try {
      let {email} = req.body;
      const post = await new BiosService().addToWaitList(email);
      res.status(HttpStatusCode.created).json(post)
    }catch (e){
    }
  }

}

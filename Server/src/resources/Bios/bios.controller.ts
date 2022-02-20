import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {
  middlewareValidation,
  middlewareValidationToManyRequests
} from "../../validation/middleware";
import {EmailSchema} from "./bios.model";
import {PostService} from "../PostRequest/post.service";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {HttpException} from "../../exceptions/errors";
import {BiosService} from "./bios.service";

export class BiosController implements NapicuApiController{
  public path: string = "/bios";
  public router: Router =  Router();

  constructor() {
    this.router.post(`${this.path}/waitlist`, [middlewareValidation(EmailSchema), middlewareValidationToManyRequests(15)], this.post);
  }


  public async post(req: Request, res: Response, next: NextFunction ): Promise<Response> {
    const user = await new BiosService().addToWaitList(req.body.email);
    return res.status(user.code).json(user);
  }

}

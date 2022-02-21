import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {
  middlewareValidation,
  middlewareValidationToManyRequests
} from "../../validation/middleware";
import {EmailSchema} from "./bios.model";

import {BiosService} from "./bios.service";
import {api_bios_main_path, api_bios_wait_list} from "../../config/serverConfig";

export class BiosController implements NapicuApiController{
  public path: string = api_bios_main_path;
  public router: Router =  Router();

  constructor() {
    this.router.post(`${this.path}${api_bios_wait_list}`, [middlewareValidation(EmailSchema), middlewareValidationToManyRequests(15)], this.post);
    console.log(`${this.path}${api_bios_wait_list}`);
  }


  public async post(req: Request, res: Response, next: NextFunction ): Promise<Response> {
    const user = await new BiosService().addToWaitList(req.body.email);
    return res.status(user.code).json(user);
  }

}

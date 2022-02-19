import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation} from "../../validation/middleware";
import {PostService} from "./post.service";
import {PostSchema} from "./post.model";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {HttpException} from "../../exceptions/errors";


export class PostController implements  NapicuApiController{
  public path = '/posts';
  public router = Router();



  constructor() {
    this.router.post(`${this.path}`, middlewareValidation(PostSchema), this.post);
  }

  protected async post(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const post = new PostService().create(req.body.title, req.body.body);
    res.status(HttpStatusCode.created).json(post);
  }
}

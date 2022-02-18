import {Controller} from "../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation} from "../validation/middleware";
import {PostService} from "../service/post";
import {PostSchema} from "../model/post";
import {HttpStatusCode} from "../interface/HttpStatusCode";
import {HttpException} from "../exceptions/errors";
import {Post} from "../interface/post";


export class PostController implements  Controller{
  public path = '/posts';
  public router = Router();


  constructor() {
    this.router.post(`${this.path}`, middlewareValidation(PostSchema), this.post);
  }



  public async post(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let {title, body} = req.body;
      const post = await new PostService().create(title, body);
      res.status(HttpStatusCode.created).json(post)
    }catch (e){
      next(new HttpException("Post error",HttpStatusCode.badRequest ))
    }
  }
}

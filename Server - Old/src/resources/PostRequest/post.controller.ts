import {NapicuApiController} from "../../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {PostService} from "./post.service";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {HttpResponse} from "../../util/HttpResponse";


export class PostController implements NapicuApiController {
  public path = '/posts';
  public router = Router();


  constructor() {
    this.router.post(`${this.path}`, (req: Request, res: Response, next: NextFunction) => {
      next()
    }, this.post);
  }

  protected async post(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const post = await new PostService().post(req.body.title, req.body.body);

    res.status(HttpStatusCode.created).json(new HttpResponse(HttpStatusCode.created, true, post));
  }
}

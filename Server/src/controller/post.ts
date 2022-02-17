import {Controller} from "../interface/controller";
import {NextFunction, Request, Response, Router} from "express";
import {middlewareValidation} from "../validation/middleware";
import {PostService} from "../service/post";
import {PostSchema} from "../model/post";


export class PostController implements  Controller{
  public path = '/posts';
  public router = Router();
  protected service = new PostService();


  constructor() {
    this.initRouter();
  }

  protected  initRouter(): void {

    this.router.post(`${this.path}`, middlewareValidation(PostSchema), this.post);

  }

  private async post(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let {title, body} = req.body;
      let post = await this.service.create(title, body);

      console.log(`post: ${post}`);
      //res.status(HttpStatusCode.created)
    }catch (e){
      // next(new HttpException("Post error", ))
    }
  }
}

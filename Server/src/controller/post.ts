import {Controller} from "../interface/controller";
import {Router} from "express";
import {middlewareValidation} from "../validation/validation";


class PostController implements  Controller{
  public path = '/posts';
  public router = Router();

  constructor() {
    this.initRouter();
  }

  protected  initRouter(): void {

  }
}

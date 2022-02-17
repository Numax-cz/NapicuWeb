import * as express from "express";
import * as mysql from "mysql"
import * as morgan from "morgan"
import * as compression from "compression"

import {api_path} from "./config/serverConfig";
import {Controller} from "./interface/controller";
import {middlewareError} from "./middleware/error";
import helmet from "helmet";
import {serverStartMsg} from "./config/consoleMsg";


export class App{
  public declare express: express.Application;
  public declare port: number;
  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initDatabase();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initError();
  }



  protected initDatabase(): void {
    const {DB_HOST,DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
    mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE
    });
  }

  public run(): void {
    this.express.listen(this.port, () => {
      console.log(`${serverStartMsg} ${this.port}`);
    });
  }


  protected initControllers(controllers: Controller[]): void {
    controllers.forEach((element: Controller) => {
      this.express.use(api_path, element.router);
    });
  }

  protected initError(): void {
    this.express.use(middlewareError);
  }

  protected initMiddleware(): void {
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(express.json);
    this.express.use(helmet);
    this.express.use(morgan("dev"));
    this.express.use(compression());
  }

}

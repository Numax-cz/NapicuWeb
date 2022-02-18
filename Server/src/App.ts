import express, {Application} from 'express';
import mysql from 'mysql';
import morgan from "morgan";
import compression from "compression";

import {api_path} from "./config/serverConfig";
import {Controller} from "./interface/controller";
import {middlewareError} from "./middleware/error";
import helmet from "helmet";
import {
  serverInitControllersMsg,
  serverInitDatabase,
  serverInitDatabaseConnected,
  serverInitDatabaseConnectionError,
  serverInitMiddleware,
  serverStartMsg
} from "./config/consoleMsg";


export class App{
  public declare express: Application;
  public declare port: number;
  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

   // this.initDatabase();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initError();
  }



  protected initDatabase(): void {
    console.log(serverInitDatabase);
    const {DB_HOST,DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
     mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE
    }).connect((e: mysql.MysqlError) => {
      if(e){
       console.log(serverInitDatabaseConnectionError);
       return;
      }
       console.log(serverInitDatabaseConnected);
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
    console.log(serverInitControllersMsg);
  }

  protected initError(): void {
    this.express.use(middlewareError);
  }

  protected initMiddleware(): void {
    this.express.use(helmet());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    console.log(serverInitMiddleware);
  }

}

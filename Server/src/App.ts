import express, {Application} from 'express';
import "reflect-metadata";
import morgan from "morgan";
import compression from "compression";

import {api_path} from "./config/serverConfig";
import {NapicuApiController} from "./interface/controller";
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
import {createConnection} from "typeorm";
import {BiosWaitList} from "./entities/Bios/waitListDB";
import {PopJonanekCounter} from "./entities/PopJonanek/counter";



export class App{
  public declare express: Application;
  public declare port: number;
  protected declare controllers: NapicuApiController[];
  constructor(controllers: NapicuApiController[], port: number) {
    this.express = express();
    this.port = port;
    this.controllers = controllers;

  }

  public async init(): Promise<void> {
    await this.initDatabase();
    this.initMiddleware();
    this.initControllers(this.controllers);
    this.initError();
    this.startServer();
  }



  protected async initDatabase(): Promise<void> {
    console.log(serverInitDatabase);
    const {DB_HOST,DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
    try{
      await createConnection({
        type: "mysql",
        host: DB_HOST,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        logging: true,
        synchronize: true,
        entities: [BiosWaitList, PopJonanekCounter]
      })


    }catch (e){
      console.log(serverInitDatabaseConnectionError);
    }
    // mysql.createConnection({
    //   host: DB_HOST,
    //   user: DB_USER,
    //   password: DB_PASSWORD,
    // }).connect((e: mysql.MysqlError) => {
    //   if(e){
    //     console.log(serverInitDatabaseConnectionError);
    //    return;
    //   }
    //    console.log(serverInitDatabaseConnected);
    //  });
  }

  protected startServer(): void {
    this.express.listen(this.port, () => {
      console.log(`${serverStartMsg} ${this.port}`);
    });
  }


  protected initControllers(controllers: NapicuApiController[]): void {
    controllers.forEach((element: NapicuApiController) => {
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

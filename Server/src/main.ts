import {server_port} from "./config/serverConfig";
import {Application, Response, Request, Router} from "express";
import * as bodyParser from "body-parser";
import {NapicuBiosEmails} from "./interface/Emails";
import {Napicu} from "./Api";



export class Main{
  public ExpressApp: Application = require('express')();

  constructor() {

  }

  public run(): void {
    this.init();

    this.ExpressApp.get(
      "/api/emails/:emails",
      async (req: Request, res: Response): Promise<Response> =>{
        let email: NapicuBiosEmails = {email: req.params.emails};
        if(email?.email) return res.status(200).send(email);
         return res.status(300).send('Email not found');

      }
    )



    // function getPostById(req: Request, res: Response) {
    //   const id = req.params.id;
    //   return res.status(200).send('xd')
    // }
    // this.ExpressApp.get('/posts/:id', getPostById);





  }

  protected init(): void {
    this.ExpressApp.use(bodyParser.json());
    this.ExpressApp.use(bodyParser.urlencoded({extended: false}));
    this.runServer();
  }

  protected runServer(): void {
    this.ExpressApp.listen(server_port, () => {
      console.log(`Server running on port ${server_port}`);
    });
  }

}

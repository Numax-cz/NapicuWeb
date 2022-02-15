import {Request, Response} from "express";
const express = require('express');
export namespace Napicu{



  export class Email{
    public path = '/emails';
    public router = express.Router();

    constructor() {
      this.router.get(`${this.path}/:id`, (req: Request, res: Response) => {
        const id = req.params.id
        res.send(id);
      });
    }
  }





}

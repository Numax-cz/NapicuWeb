import {EmailSchema} from "../Bios/bios.model";
import joi from "joi";
import {HttpException} from "../../exceptions/errors";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import {BiosWaitList} from "../../entities/Bios/waitListDB";
import {PopJonanekCounter} from "../../entities/PopJonanek/counter";
import {PopJonanekCounterSchema} from "./popjonanek.model";
import {PopjonanekController} from "./popjonanek.controller";

export class PopjonanekService{
  public async getCount(){
    let i = PopJonanekCounter.find({where: {id: 0}});

    // await EmailSchema.validateAsync({email: email}).catch((e: joi.ValidationErrorItem) => {
    //   throw new HttpException( 'Invalid email', HttpStatusCode.badRequest);
    // });
    // return await BiosWaitList.insert({email});
  }

  public async addCount(inNum: number){
    await PopJonanekCounterSchema.validateAsync({counter: inNum}).catch((e: joi.ValidationErrorItem) => {
      throw new HttpException( 'Invalid request', HttpStatusCode.badRequest);
    });

    let counts: PopJonanekCounter[] = await PopJonanekCounter.find({where: {id: 0}});
    let num = counts[0].counter + inNum;
    //todo
    //todo
    //todo rewrite
    //todo



    return counts;
   //return await PopJonanekCounter.insert({id: id});
  }
}

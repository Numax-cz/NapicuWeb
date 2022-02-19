import {PostSchema} from "../PostRequest/post.model";
import {EmailSchema} from "./bios.model";
import {HttpException} from "../../exceptions/errors";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import joi from "joi";
import {BiosWaitList} from "../../entities/Bios/waitListDB";



export class BiosService{
  public async addToWaitList(email: string){
    await EmailSchema.validateAsync({email: email}).catch((e: joi.ValidationErrorItem) => {
      throw new HttpException( 'Invalid email', HttpStatusCode.badRequest);
    });
    return await BiosWaitList.insert({email});
  }
}

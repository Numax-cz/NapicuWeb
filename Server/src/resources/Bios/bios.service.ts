import {PostSchema} from "../PostRequest/post.model";
import {EmailSchema} from "./bios.model";
import {HttpException} from "../../exceptions/errors";
import {HttpStatusCode} from "../../interface/HttpStatusCode";
import joi from "joi";
import {BiosWaitList} from "../../entities/Bios/waitListDB";
import {HttpResponse} from "../../util/HttpResponse";
import {BiosWaitListPOSTApiResponse} from "../../interface/Responses";



export class BiosService{
  public async addToWaitList(email: string): Promise<HttpResponse<BiosWaitListPOSTApiResponse>>{
    await EmailSchema.validateAsync({email: email}).catch((e: joi.ValidationErrorItem) => {
      throw new HttpException( 'Invalid email', HttpStatusCode.badRequest);
    });
    let i = await BiosWaitList.findOne({where: {email: email}});
    if(!i){
      await BiosWaitList.insert({email})
      return new HttpResponse<BiosWaitListPOSTApiResponse>(HttpStatusCode.created, true, {emailAlreadyExists: false});
    }
    return new HttpResponse<BiosWaitListPOSTApiResponse>(HttpStatusCode.badRequest, false, {emailAlreadyExists: true});
  }
}

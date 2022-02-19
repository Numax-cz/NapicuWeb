import {PostSchema} from "../PostRequest/post.model";
import {EmailSchema} from "./bios.model";


export class BiosService{
  public async addToWaitList(email: string){
    return await EmailSchema.validateAsync({email: email});
  }
}

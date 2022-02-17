import {PostSchema} from "../model/post";
import joi from "joi";
import {PostController} from "../controller/post";

export class PostService{
  protected postSchema = PostSchema;



  public async create(title: string, body: string): Promise<void>{
    try{
      let i = joi.valid({title: title, body: body}, PostSchema)
      console.log(i);
    }catch (e){
      //TODO ERROR
    }
  }

}

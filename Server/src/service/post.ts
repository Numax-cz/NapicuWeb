import {PostSchema} from "../model/post";
import joi from "joi";
import {PostController} from "../controller/post";
import {Post} from "../interface/post";

export class PostService{
  protected postSchema = PostSchema;



  public  async create(title: string, body: string): Promise<void | Post>{
    console.log('lol')
      let i = await joi.valid({title: title, body: body}, PostSchema)
      if(i){
        return this.postSchema
      }

  }

}

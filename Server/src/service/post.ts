import {PostSchema} from "../model/post";
import joi, {ValidationErrorItem} from "joi";
import {Post} from "../interface/post";


export class PostService{
  protected postSchema = PostSchema;



  public async create(title: string, body: string): Promise<Post>{

    try {
     return await PostSchema.validateAsync({title: title, body: body});
     //throw new Error("Fatal Post Scheme Error")

    }catch (e: any){
      throw new Error('Fatal Post');
    }

  }

}

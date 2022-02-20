import {PostSchema} from "./post.model";


export class PostService{
  public async post(title: string, body: string): Promise<any>{
    return await PostSchema.validateAsync({title: title, body: body});

  }
}

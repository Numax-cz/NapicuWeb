import {PostSchema} from "./post.model";
import {Post} from "./post";


export class PostService{
  public async create(title: string, body: string): Promise<Post>{
     return await PostSchema.validateAsync({title: title, body: body});
  }
}

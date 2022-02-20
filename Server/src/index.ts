import 'dotenv/config'
import {App} from "./App";
import {PostController} from "./resources/PostRequest/post.controller";
import {BiosController} from "./resources/Bios/bios.controller";
import {PopJonanekCounter} from "./entities/PopJonanek/counter";
import {PopjonanekController} from "./resources/PopJonanek/popjonanek.controller";


const i = new App([
  new PostController(),
  new BiosController(),
  new PopjonanekController()
], Number(process.env.PORT));

// i.init();

interface ApiResponse<T>{
  code: number
  value: string
  data: T
}

class TestApp<T> implements ApiResponse<T>{
  public declare code: number;
  public declare value: string;
  public declare data: T ;

  constructor(code: number, value: string, data: T) {
    this.code = code;
    this.value = value;
    this.data = data;
  }

}
interface NapicuBiosAPIResponse{
  name: string,
  username: string
}

const data: NapicuBiosAPIResponse = {
name: 'Marcel', username: 'Numax'
}

const app = new TestApp<NapicuBiosAPIResponse>(1, "This is Test", data);


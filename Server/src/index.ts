import 'dotenv/config'
import {App} from "./App";
import {PostController} from "./controller/post";



const i = new App([new PostController()], Number(process.env.PORT));

i.run();

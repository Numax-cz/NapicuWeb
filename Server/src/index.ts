import 'dotenv/config'
import {App} from "./App";
import {PostController} from "./resources/PostRequest/post.controller";
import {BiosController} from "./resources/Bios/bios.controller";


const i = new App([new PostController(), new BiosController()], Number(process.env.PORT));

i.init();

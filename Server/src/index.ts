import 'dotenv/config'
import {App} from "./App";
import {PostController} from "./resources/PostRequest/post.controller";
import {BiosController} from "./resources/Bios/bios.controller";
import {PopJonanekCounter} from "./entities/PopJonanek/counter";
import {PopjonanekController} from "./resources/PopJonanek/popjonanek.controller";


const i = new App([
  new BiosController(),
], Number(process.env.PORT));

i.init();


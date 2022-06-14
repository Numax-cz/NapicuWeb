import 'dotenv/config'
import {App} from "./App";
import {BiosController} from "./resources/Bios/bios.controller";


const i = new App([
  new BiosController(),
], Number(process.env.PORT));

i.init();


import 'dotenv/config';
import {App} from "./App";



const i = new App([], Number(process.env.PORT));

i.run();

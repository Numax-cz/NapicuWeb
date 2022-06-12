// https://viem.pinktube.eu/api/slova?pocet=num
import {api_bios_main_path, api_bios_wait_list, api_path} from "./Server/src/config/serverConfig";
const mainApiPath: string = "https://api.napicu.eu";


export const biosEmailAPI: string = `${mainApiPath}${api_path}${api_bios_main_path}${api_bios_wait_list}`;





//TODO Move here
export const NapicuApiURLWords: string = 'http://localhost:8080/words';

export const NapicuApiURLWeather: string = 'http://localhost:8080/weather';

export const NapicuApiURLIp: string = "http://localhost:8080/ip"; //TODO

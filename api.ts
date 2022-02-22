// https://viem.pinktube.eu/api/slova?pocet=num
import {api_bios_main_path, api_bios_wait_list, api_path} from "./Server/src/config/serverConfig";

export const WordsAPI: string = 'https://viem.napicu.eu/api/slova';

const mainApiPath: string = "https://api.napicu.eu";


export const biosEmailAPI: string = `${mainApiPath}${api_path}${api_bios_main_path}${api_bios_wait_list}`;

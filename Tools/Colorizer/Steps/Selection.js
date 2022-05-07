
import { relative , dirname , extname } from "https://deno.land/std/path/mod.ts";
import { parse } from 'https://deno.land/std/encoding/yaml.ts'

import { newline , center , red, blue } from '../Pretty.js'
import { build , monochrome } from '../Paths.js'
import * as Print from '../Print.js'


const { readTextFile } = Deno;
const { log , clear } = console;


const toInt = (string) =>
    parseInt(string);


const selection = new Map;


export function isMonochrome(path){
    
    if(extname(path) !== '.svg')
        return false;
        
    const subfolder = relative(build,dirname(path));

    let [ folder , size ] = subfolder.split('/');

    if(!selection.has(folder))
        return false;

    size = parseInt(size);
        
    if(typeof size !== 'number')
        return false;
    
    const [ min , max ] = selection.get(folder);
    
    return min <= size && size <= max;
}


export default async function(){
    
    try {
        const text = await readTextFile(monochrome);
        const yaml = parse(text);
        
        for(const folder in yaml){
            
            let value = yaml[folder];
            
            const range = (typeof value === 'number')
                ? [ value , value ]
                : value
                  .split('-')
                  .map(toInt);
                  
            selection.set(folder,range);
        }
    
    } catch (error) {
        
        printParseError(error);
        exit();
    }
}


function printParseError(error){

    clear();

    Print.header();

    log(red(center(`Couldn't Parse Monochrome Icon Selection`)));

    newline();
    newline();

    log(error);
}

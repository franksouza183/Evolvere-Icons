#!/usr/bin/env -S deno run --allow-read=../ --allow-write=../ --unstable


import { fromFileUrl , dirname , join } from 'https://deno.land/std/path/mod.ts';
import { rgb24 } from 'https://deno.land/std/fmt/colors.ts';


const { consoleSize , stdout } = Deno;
const { log , clear } = console;

const
    blue = { r : 70 , g : 114 , b : 203 };

const cwd = join(dirname(fromFileUrl(import.meta.url)),'..');
const { columns } = consoleSize(stdout.rid);


clear();

log('');
log(rgb24(center('Evolvere Icons Colorizer'),blue));
log(rgb24(center('………………………………………………………………'),blue));
log('');





function center(text){
    
    const { length } = text;
    if(length >= columns)
        return 0;
        
    const padding = (columns - length) * .5 + length;

    return text.padStart(padding,' ');
}

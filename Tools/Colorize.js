#!/usr/bin/env -S deno run --allow-read=../ --allow-write=../ --unstable


import { fromFileUrl , dirname , join , normalize } from 'https://deno.land/std/path/mod.ts';
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts';
import { walk , emptyDir } from 'https://deno.land/std@0.137.0/fs/mod.ts';
import { rgb24 } from 'https://deno.land/std/fmt/colors.ts';


const { consoleSize , stdout } = Deno;
const { log , clear } = console;

const
    yellow = { r : 183 , g : 136 , b :  49 },
    cyan   = { r : 124 , g : 180 , b : 207 },
    blue   = { r :  70 , g : 114 , b : 203 };

const path_root = normalize(join(dirname(fromFileUrl(import.meta.url)),'..'));
const path_icons = join(path_root,'Icons');
const path_build = join(path_root,'Build');

const { columns } = consoleSize(stdout.rid);



let count = 0;

function printHeader(){
    log('');
    log(rgb24(center('Evolvere Icons Colorizer'),blue));
    log(rgb24(center('………………………………………………………………'),blue));
    log('\n');
    log(rgb24('Project Folder:',yellow),rgb24(path_root,cyan));
    log('\n');
}

let printTask = () => {};

function printScreen(){

    clear();
    printHeader();
    printTask();
}


const printer = setInterval(() => {
    printScreen();
},5);

printTask = () => {
    log(rgb24(`Found ${ rgb24(count + '',yellow) } Icons`,blue));
}

const paths = new Set;

for await (const entry of walk(path_icons,{ followSymlinks : false }))
    if(entry.isFile){
        count++;
        paths.add(entry.path);
    }

const found = count;
count = 0;

printTask = () => {
    log(rgb24('Found Icons:',blue),rgb24(found + '',yellow));
    log(rgb24('Checking Monochromaticity:',blue),rgb24((count + '').padStart((found + '').length,' '),yellow),rgb24('/',blue),rgb24(found + '',yellow));
}

for(const path of paths){
    
}

await emptyDir(path_build);


setTimeout(() => {
    clearInterval(printer);    
},100);


function center(text){
    
    const { length } = text;
    if(length >= columns)
        return 0;
        
    const padding = (columns - length) * .5 + length;

    return text.padStart(padding,' ');
}

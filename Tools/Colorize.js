#!/usr/bin/env -S deno run --allow-read=../ --allow-write=../ --unstable


import { fromFileUrl , dirname , join , normalize } from 'https://deno.land/std/path/mod.ts';
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts';
import { walk , emptyDir } from 'https://deno.land/std/fs/mod.ts';
import * as YAML from 'https://deno.land/std/encoding/yaml.ts';
import * as Flags from 'https://deno.land/std/flags/mod.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

const { rgb24 : rgb } = Colors;

const args = Flags.parse(Deno.args);
const templatePath = args._[0];




const { consoleSize , stdout , readTextFile } = Deno;
const { log , clear } = console;

const
    yellow = { r : 183 , g : 136 , b :  49 },
    cyan   = { r : 124 , g : 180 , b : 207 },
    blue   = { r :  70 , g : 114 , b : 203 },
    red    = { r : 197 , g :  23 , b :  75 };

const path_root = normalize(join(dirname(fromFileUrl(import.meta.url)),'..'));
const path_icons = join(path_root,'Icons');
const path_build = join(path_root,'Build');

const { columns } = consoleSize(stdout.rid);

let printTask = () => {};
let count = 0;


function printHeadline(){
    log('');
    log(rgb(center('Evolvere Icons Colorizer'),blue));
    log(rgb(center('………………………………………………………………'),blue));
    log('\n');
}

function printScreen(){
    clear();
    printHeadline();
    printTask();
}

const printer = setInterval(printScreen,5);


if(!templatePath){
    
    printTask = () => {
        log(rgb(center(`No Template Specified`),red),'\n\n');

        log(center(
            rgb(' Syntax:     ',cyan),
            rgb('./Colorize.js <',yellow),
            rgb('Template',red),
            rgb('>',yellow)
        ,36));
        
        log(center(
            rgb('Example: ',cyan),
            rgb('Tools/Colorize.js ',yellow),
            rgb('ThemeA.yaml',red)
        ,36));
        
        log('\n\n');
    }
    
    printScreen();
    Deno.exit();
}

try {
    
    const yaml = await readTextFile(templatePath);
    
    
    
} catch (error) {
    
    printTask = () => {
        log(rgb(center(`Couldn't Parse Template`),red),'\n');
        log(error);
    }
    
    printScreen();
    Deno.exit();
}
    

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(rgb('① ',blue),rgb('Found Icons:',cyan),rgb(count + '',yellow));
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
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(rgb('① ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(rgb('② ',blue),rgb('Checking Monochromaticity:',cyan),rgb((count + '').padStart((found + '').length,' '),yellow),rgb('/',cyan),rgb(found + '',yellow));
}

for(const path of paths){
    
}

await emptyDir(path_build);


setTimeout(() => {
    clearInterval(printer);    
},100);


function center(...args){
    
    let width = args[args.length - 1];
    
    if(typeof width === 'number'){
        args.pop();
    } else {
        width = null;
    }

    const text = args.join('');
    
    width ??= text.length;
    
    if(width >= columns)
        return 0;
        
    const padding = (columns - width) * .5;

    return ' '.repeat(padding) + text;
}

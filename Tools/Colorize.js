#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable


import { join , normalize , relative , resolve } from 'https://deno.land/std/path/mod.ts'
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts'
import { walk , emptyDir , ensureFile , copy } from 'https://deno.land/std/fs/mod.ts'

import { newline , center , yellow , blue , cyan , green , red } from './Colorizer/Pretty.js'
import { templatePath } from './Colorizer/Parameter.js'
import generateCache from './Colorizer/Cache.js'
import * as Colorize from './Colorizer/ModifySVG.js'
import * as Path from './Colorizer/Paths.js'
import loadTemplate from './Colorizer/Template/Parse.js'

const
    task1 = blue('① '),
    task2 = blue('② '),
    task3 = blue('③ ');


const { readTextFile , writeTextFile , symlink , exit } = Deno;
const { log , clear } = console;


clear();

let printTask = () => {};

function printHeadline(){
    log('');
    log(blue(center('Evolvere Icons Colorizer')));
    log(blue(center('………………………………………………………………')));
    log('\n');
}

function printScreen(){
    clear();
    printHeadline();
    printTask();
}

const screen = setInterval(printScreen,5);

function stopScreen(){
    clearInterval(screen);
}


if(!templatePath){
    stopScreen();
    printTemplateMissing();
    exit();
}




const template = await loadTemplate(templatePath);


Colorize.init(template);

printTask = () => {
    
    printProjectFolder();
    
    newline();
    
    log(
        blue('① '),
        cyan('Copying Theme')
    );
}

await emptyDir(Path.build);
await copy(Path.icons,Path.build,{ overwrite : true });


let found = 0;

printTask = () => {
    printProjectFolder();
    newline();
    log(
        blue('① '),
        cyan('Copied Theme')
    );
    log(blue('② '),cyan('Found Icons:'),yellow(found));
}

const paths = new Set;

for await (const entry of walk(Path.build,{ followSymlinks : false })){

    const { isFile , path } = entry;
    
    if(isFile)
        switch(true){
            case path.endsWith('.svg'):
                found++;
                paths.add(path);
                continue;
            case path.endsWith('.directory'):
            case path.endsWith('index.theme'):
                continue;
            default:
                await Deno.remove(path);
        }
}


let colored = 0;

printTask = () => {
    printProjectFolder();
    newline();
    printCopied();
    printIcons();
    printColorized();
}



async function colorizeByPath(path){
    
    let text = await readTextFile(path);
    
    const 
        monochrome = parse(text),
        colorized = Colorize.colorize(monochrome);
    
    text = stringify(colorized);
    
    await writeTextFile(path,text);
    
    colored++;
}


for(const path of paths)
    await colorizeByPath(path);


printTask = () => {
    printProjectFolder();
    newline();
    printCopied();
    printIcons();
    printColorized();
    log(
        blue('④ '),
        cyan('Generating Cache...')
    );
}

await generateCache();

printTask = () => {
    printProjectFolder();
    newline();
    printCopied();
    printIcons();
    printColorized();
    log(
        blue('④ '),
        cyan('Generated Cache')
    );
    newline();
    newline();
    log(green(center('Finished Colorization')));
    newline();
}


setTimeout(() => stopScreen(),100);




function printProjectFolder(){
    log(
        cyan('Project Folder:'),
        yellow(Path.root)
    );
}

function printCopied(){
    log(task1,cyan('Copied Theme'));
}

function printIcons(){
    log(task2,
        cyan('Icons'),
        yellow(found)
    );
}

function printColorized(){
    log(task3,
        cyan('Colorized'),
        yellow(colored),
    );
}

function printTemplateMissing(){
    
    clear();
    
    printHeadline();
    
    log(red(center(`No Template Specified`)),'\n\n');

    log(center(
        cyan(' Syntax:     '),
        yellow('./Colorize.js <'),
        red('Template'),
        yellow('>')
    ,36));
    
    log(center(
        cyan('Example: '),
        yellow('Tools/Colorize.js '),
        red('ThemeA.yaml')
    ,36));
    
    newline();
    newline();
}




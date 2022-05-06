#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable


import { join , normalize , relative , resolve } from 'https://deno.land/std/path/mod.ts'
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts'
import { walk , emptyDir , ensureFile , copy } from 'https://deno.land/std/fs/mod.ts'
import * as YAML from 'https://deno.land/std/encoding/yaml.ts'
import * as Flags from 'https://deno.land/std/flags/mod.ts'

import * as Path from './Colorizer/Paths.js'
import * as Colorize from './Colorizer/ModifySVG.js'
import generateCache from './Colorizer/Cache.js'
import { newline , center , yellow , blue , cyan , green , red } from './Colorizer/Pretty.js'




const
    task1 = blue('① '),
    task2 = blue('② '),
    task3 = blue('③ ');


const args = Flags.parse(Deno.args);
const templatePath = args._[0];




const { readTextFile , writeTextFile , symlink } = Deno;
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

const printer = setInterval(printScreen,5);


if(!templatePath){
    
    printTask = () => {
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
    
    printScreen();
    Deno.exit();
}

import template from './Colorizer/Template/Defaults.js'

try {
    
    const yaml = await readTextFile(templatePath);
    
    const raw = YAML.parse(yaml);
    
    for(const component in template){
        
        const attributes = template[component];
        
        if(component in raw){

            const data = raw[component];
            
            if(data)
                for(const attribute in attributes)
                    if(attribute in data){
                        
                        const value = data[attribute];
                        
                        switch(attribute){
                        case 'Color':
                        
                            if(value === 'None')
                                break;
                            
                            if(/^([0-9a-f]{3}){1,2}$/i.test(value))
                                break;
                                
                            throw `「 ${ component } » ${ attribute } 」 '${ value }' is not a hex color string / 'None'\n`;
                        case 'Alpha':
                            
                            if(typeof value !== 'number')
                                throw `「 ${ component } » ${ attribute } 」 '${ value }' is not a float value\n`
                        
                            if(value > 1 || value < 0)
                                throw `「 ${ component } » ${ attribute } 」 '${ value }' does not fulfill 0 ≤ Alpha ≤ 1\n`
                        
                            break;
                        }
                        
                        attributes[attribute] = data[attribute];
                    }
        }
    }
    
} catch (error) {
    
    printTask = () => {
        log(red(center(`Couldn't Parse Template`)));
        newline();
        newline();
        log(error);
    }
    
    printScreen();
    Deno.exit();
}


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


setTimeout(() => {
    clearInterval(printer);    
},100);




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




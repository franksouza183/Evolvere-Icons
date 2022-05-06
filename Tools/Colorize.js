#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable


import { join , normalize , relative , resolve } from 'https://deno.land/std/path/mod.ts'
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts'
import { walk , emptyDir , ensureFile , copy } from 'https://deno.land/std/fs/mod.ts'
import * as YAML from 'https://deno.land/std/encoding/yaml.ts'
import * as Flags from 'https://deno.land/std/flags/mod.ts'
import * as Colors from 'https://deno.land/std/fmt/colors.ts'

import * as Path from './Colorizer/Paths.js'
import * as Colorize from './Colorizer/ModifySVG.js'

const { rgb24 : rgb } = Colors;

const args = Flags.parse(Deno.args);
const templatePath = args._[0];




const { consoleSize , stdout , readTextFile , writeTextFile , symlink } = Deno;
const { log , clear } = console;

clear();

const
    yellow = { r : 183 , g : 136 , b :  49 },
    green  = { r :  83 , g : 163 , b :  69 },
    cyan   = { r : 124 , g : 180 , b : 207 },
    blue   = { r :  70 , g : 114 , b : 203 },
    red    = { r : 197 , g :  23 , b :  75 };



const { columns } = consoleSize(stdout.rid);

let printTask = () => {};



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
                            
                            if(/^([0-9a-f]{3}){1,2}$/i.test(value))
                                break;
                                
                            throw `「 ${ component } » ${ attribute } 」 '${ value }' is not a hex color string\n`;
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
        log(rgb(center(`Couldn't Parse Template`),red),'\n\n');
        log(error);
    }
    
    printScreen();
    Deno.exit();
}

Colorize.init(template);

    

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(Path.root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copying Theme',cyan)
    );
}

await emptyDir(Path.build);
await copy(Path.icons,Path.build,{ overwrite : true });


let found = 0;

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(Path.root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
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
    log(rgb('Project Folder:',cyan),rgb(Path.root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colored,yellow),
    );
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
    log(rgb('Project Folder:',cyan),rgb(Path.root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colored,yellow),
    );
    log(
        rgb('④ ',blue),
        rgb('Generating Cache...',cyan)
    );
}

const process = Deno.run({ cmd : [ 'gtk-update-icon-cache' , Path.build ] , stdout : 'null' , stderr : 'null' });
await process.status();

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(Path.root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colored,yellow),
    );
    log(
        rgb('④ ',blue),
        rgb('Generated Cache',cyan)
    );
    log('\n\n');
    log(rgb(center('Finished Colorization'),green));
    log('\n');
}


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

#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable


import { fromFileUrl , dirname , join , normalize , relative , resolve } from 'https://deno.land/std/path/mod.ts';
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts';
import { walk , emptyDir , ensureFile , copy } from 'https://deno.land/std/fs/mod.ts';
import * as YAML from 'https://deno.land/std/encoding/yaml.ts';
import * as Flags from 'https://deno.land/std/flags/mod.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

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

const path_root = normalize(join(dirname(fromFileUrl(import.meta.url)),'..'));
const path_icons = resolve(join(path_root,'Icons'));
const path_build = resolve(join(path_root,'Build'));

log(path_icons,path_build);

const { columns } = consoleSize(stdout.rid);

let printTask = () => {};
let count = 0;




// Deno.exit();
// await copy(join(path_icons,'index.theme'),join(path_build,'index.theme'));
// await copy(join(path_icons,'.directory'),join(path_build,'.directory'));



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

const template = {

    Foreground : {
        Color : '090d11' ,
        Alpha : .75
    },

    Background : {
        Color : 'ffffff' ,
        Alpha : .5
    },

    Accent : {
        Color : '2598e4' ,
        Alpha : 1
    },
    
    Success : {
        Color : '42a53b' ,
        Alpha : 1
    },

    Warning : {
        Color : 'f2712c' ,
        Alpha : 1
    },
        
    Error : {
        Color : 'f03489' ,
        Alpha : 1
    }
};

try {
    
    const yaml = await readTextFile(templatePath);
    
    const raw = YAML.parse(yaml);
    
    for(const key in raw)
        log(key,raw[key]);
    
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


    

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copying Theme',cyan)
    );
}

await emptyDir(path_build);
await copy(path_icons,path_build,{ overwrite : true });

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(count + '',yellow));
}

const paths = new Set;

for await (const entry of walk(path_build,{ followSymlinks : false })){

    const { isFile , path } = entry;
    
    if(isFile)
        switch(true){
            case path.endsWith('.svg'):
                count++;
                paths.add(path);
                continue;
            case path.endsWith('.directory'):
            case path.endsWith('index.theme'):
                continue;
            default:
                await Deno.remove(path);
        }
}


const found = count;


const components = {
    Background : 'Background' ,
    Foreground : 'Text' ,
    Success : 'PositiveText' ,
    Warning : 'NeutralText' ,
    Accent : 'Highlight' ,
    Error : 'NegativeText'
};

const style = Object
    .entries(components)
    .map(([ component , name ]) => [ `ColorScheme-${ name }` , `#${ template[component].Color }` ])
    .map(([ classname , color ]) => `.${ classname } { color : ${ color } }`)
    .join('');


const styleTemplate = {
    style : {
        '@id' : 'current-color-scheme' ,
        '@type' : 'text/css' ,
        '#text' : style
    }
};

const classes = {
    'ColorScheme-NegativeText' : 'Error' ,
    'ColorScheme-PositiveText' : 'Success' ,
    'ColorScheme-NeutralText' : 'Warning' ,
    'ColorScheme-Background' : 'Background' ,
    'ColorScheme-Highlight' : 'Accent' ,
    'ColorScheme-Text' : 'Foreground'
};


let colorized = 0;


printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colorized,yellow),
    );
}



// for(const path of paths){
// 
// 
//     // const rel = relative(path_icons,path);
//     // const iconpath = join(path_build,rel);
// 
//     const raw = await readTextFile(path);
//     const xml = parse(raw);
//     const converted = colorize(xml);
//     const svg = stringify(converted);
//     // await ensureFile(iconpath);
//     await writeTextFile(path,svg);
// 
//     colorized++;
// }
// 


printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colorized,yellow),
    );
    log(
        rgb('④ ',blue),
        rgb('Generating Cache...',cyan)
    );
}

const process = Deno.run({ cmd : [ 'gtk-update-icon-cache' , path_build ] });
await process.status();

printTask = () => {
    log(rgb('Project Folder:',cyan),rgb(path_root,yellow));
    log('\n');
    log(
        rgb('① ',blue),
        rgb('Copied Theme',cyan)
    );
    log(rgb('② ',blue),rgb('Found Icons:',cyan),rgb(found + '',yellow));
    log(
        rgb('③ ',blue),
        rgb('Colorized',cyan),
        rgb('' + colorized,yellow),
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





function colorize(svgData){
    
    try {
        
        svgData.svg.defs = styleTemplate;

        const { path : paths } = svgData.svg;
        
        if(paths && Array.isArray(paths))
            for(const path of paths){
                
                const classname = path['@class'];
                
                if(classname in classes){
                    
                    const style = path['@style'] ?? '';
                    
                    const component = classes[classname];
                    
                    const { Color , Alpha } = template[component];
                    
                    path['@style'] = style
                        .split(';')
                        .filter((data) => {
                            return !data.startsWith('fill-opacity')
                                && !data.startsWith('opacity');
                            
                        })
                        .concat([
                            `fill-opacity:${ Alpha }`,
                            (Color === 'None') && 'opacity:0'
                        ])
                        .filter(a => a)
                        .join(';');
                }
            }
    } catch (error) {
        log(svgData);
        throw error;
    }
    
    return svgData;
}


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

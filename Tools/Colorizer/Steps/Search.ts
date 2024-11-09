
import { basename , extname } from 'https://deno.land/std/path/mod.ts';
import { walk } from 'https://deno.land/std/fs/mod.ts'

import { newline , blue , cyan , yellow } from '../Pretty.js'
import { isMonochrome } from './Selection.js'
import { display } from '../Screen.js'
import * as Print from '../Print.js'
import { build } from '../Paths.js'
import Stats from '../Stats.js'

const { remove } = Deno;
const { log } = console;


async function * filesIn(path){
    yield * walk(path,{ includeDirs : false });
}

async function * pathsIn(path){
    for await (const file of filesIn(path))
        yield infoFrom(file.path);
}

function infoFrom(path){
    return { 
        file : basename(path) ,
        path
    }
}


export default async function(){
    
    display(() => {
        
        Print.project_folder();
        
        newline();

        Print.copied();
        Print.icons();
    });
    

    const paths = new Set;

    
    for await (const { path , file } of pathsIn(build)){
        
        if(file === '.directory')
            continue;
            
        if(file === 'index.theme')
            continue;
            
        if(extname(path) === '.svg'){
            
            Stats.icons++;
            
            if(isMonochrome(path)){
                Stats.monochrome++;
                paths.add(path);
            }
            
            continue;
        }
        
        await remove(path);
    }

    
    return paths;
}
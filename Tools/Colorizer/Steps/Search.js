
import { walk } from 'https://deno.land/std/fs/mod.ts'

import { newline , blue , cyan , yellow } from '../Pretty.js'
import { display } from '../Screen.js'
import { update } from '../Stats.js'
import { build } from '../Paths.js'
import * as Print from '../Print.js'

const { remove } = Deno;
const { log } = console;


export default async function(){
    
    display(() => {
        
        Print.project_folder();
        
        newline();
        
        log(
            blue('① '),
            cyan('Copied Theme')
        );
        
        log(
            blue('② '),
            cyan('Found Icons:'),
            yellow(found)
        );
    });
    
    let found = 0;
    
    const paths = new Set;

    for await (const entry of walk(build,{ followSymlinks : false })){

        const { isFile , path } = entry;
        
        if(isFile)
            switch(true){
                case path.endsWith('.svg'):
                    found++;
                    update('found',found);
                    paths.add(path);
                    continue;
                case path.endsWith('.directory'):
                case path.endsWith('index.theme'):
                    continue;
                default:
                    await remove(path);
            }
    }
    
    return paths;
}
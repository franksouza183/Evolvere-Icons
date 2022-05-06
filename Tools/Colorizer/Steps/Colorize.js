
import { parse , stringify } from 'https://deno.land/x/xml/mod.ts'

import { colorize } from '../ModifySVG.js'
import { newline } from '../Pretty.js'
import { display } from '../Screen.js'
import { update } from '../Stats.js'
import * as Print from '../Print.js'


const { readTextFile , writeTextFile } = Deno;


export default async function(paths){
    
    display(() => {
        
        Print.project_folder();
        
        newline();
        
        Print.copied();
        Print.icons();
        Print.colorized();
    });
    
    let colored = 0;
    
    async function colorizeByPath(path){
        
        let text = await readTextFile(path);
        
        const 
            monochrome = parse(text),
            colorized = colorize(monochrome);
        
        text = stringify(colorized);
        
        await writeTextFile(path,text);
        
        colored++;
        update('colored',colored);
    }


    for(const path of paths)
        await colorizeByPath(path);
}
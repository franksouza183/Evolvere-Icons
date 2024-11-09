
import { emptyDir , copy } from 'https://deno.land/std/fs/mod.ts'

import { newline , blue , cyan } from '../Pretty.js'
import { icons , build } from '../Paths.js'
import { display } from '../Screen.js'
import * as Print from '../Print.js'

const { log } = console;


export default async function(){
    
    display(() => {
        
        Print.project_folder();
        
        newline();
        
        log(
            blue('① '),
            cyan('Copying Theme...')
        );
    });
    
    await emptyDir(build);
    
    await copy(icons,build,{ overwrite : true });
}
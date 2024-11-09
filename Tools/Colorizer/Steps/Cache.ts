
import { newline , blue , cyan } from '../Pretty.js'
import generateCache from '../Cache.js'
import { display } from '../Screen.js'
import * as Print from '../Print.js'

const { log } = console;


export default async function(){
    
    display(() => {
    
        Print.project_folder();
    
        newline();
    
        Print.copied();
        Print.icons();
        Print.colorized();
    
        log(
            blue('④ '),
            cyan('Generating Cache...')
        );
    });

    await generateCache();
}
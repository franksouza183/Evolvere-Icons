
import { templatePath } from '../Parameter.js'
import * as Colorize from '../ModifySVG.js'
import loadTemplate from '../Template/Parse.js'
import * as Screen from '../Screen.js'
import * as Print from '../Print.js'

const { exit } = Deno;


export default async function(){
    
    if(templatePath){

        const template = await loadTemplate(templatePath);

        Colorize.init(template);
        
        return;
    }

    
    Screen.off();
    
    Print.template_missing();
    
    exit();
}
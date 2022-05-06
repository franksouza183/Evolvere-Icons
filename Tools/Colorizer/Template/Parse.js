
import { parse } from 'https://deno.land/std/encoding/yaml.ts'

import { newline , center , red, blue } from '../Pretty.js'
import template from './Defaults.js'

const { exit , readTextFile } = Deno;
const { log , clear } = console;


export default async function(path){
    
    try {
        
        const yaml = await readTextFile(path);
        
        const raw = parse(yaml);
        
        
        const normalizeComponent = ([ key , value ]) => 
            [ capitalize(key) , value ];
        
        const isRelevantComponent = ([ key ]) => 
            key in template;
            
        const hasData = ([ _ , value ]) =>
            value;
        
        Object
        .entries(raw)
        .map(normalizeComponent)
        .filter(isRelevantComponent)
        .filter(hasData)
        .forEach(([ component , properties ]) => {
            
            const attributes = template[component];
            
            for(let property in properties){

                let value = properties[property];
                
                property = capitalize(property);
                
                if(!(property in attributes))
                    continue;
                    
                
                switch(property){
                case 'Color':
                
                    if(/^None$/i.test(value)){
                        value = null;
                        break;
                    }
                    
                    if(/^([0-9a-f]{3}){1,2}$/i.test(value))
                        break;
                        
                    throw `「 ${ component } » ${ property } 」 '${ value }' is not a hex color string / 'None'\n`;
                case 'Alpha':
                    
                    if(typeof value !== 'number')
                        throw `「 ${ component } » ${ property } 」 '${ value }' is not a float value\n`
                
                    if(value > 1 || value < 0)
                        throw `「 ${ component } » ${ property } 」 '${ value }' does not fulfill 0 ≤ Alpha ≤ 1\n`
                
                    break;
                }
                
                attributes[property] = value;
            }
        });
        
        return template;
        
    } catch (error) {
        
        printParseError(error);
        exit();
    }
}


function printParseError(error){
    
    clear();
    
    printHeadline();
    
    log(red(center(`Couldn't Parse Template`)));
    
    newline();
    newline();
    
    log(error);
}

function printHeadline(){
    log('');
    log(blue(center('Evolvere Icons Colorizer')));
    log(blue(center('………………………………………………………………')));
    log('\n');
}

function first(string){
    return string.at(0) ?? '';
}

function capitalize(string){
    return first(string).toUpperCase() +
        string.slice(1).toLowerCase();
}
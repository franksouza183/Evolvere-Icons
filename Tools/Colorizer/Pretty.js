
import { rgb24 } from 'https://deno.land/std/fmt/colors.ts'


const { consoleSize , stdout } = Deno;
const { log } = console;

const
    Yellow = { r : 183 , g : 136 , b :  49 },
    Green  = { r :  83 , g : 163 , b :  69 },
    Cyan   = { r : 124 , g : 180 , b : 207 },
    Blue   = { r :  70 , g : 114 , b : 203 },
    Red    = { r : 197 , g :  23 , b :  75 };


function toString(value){
    return '' + value;
}


export function yellow(value){
    return rgb24(toString(value),Yellow);
}

export function green(value){
    return rgb24(toString(value),Green);
}

export function cyan(value){
    return rgb24(toString(value),Cyan);
}

export function blue(value){
    return rgb24(toString(value),Blue);
}

export function red(value){
    return rgb24(toString(value),Red);
}

export function newline(){
    log('\n');
}

export function center(...args){
    
    const { columns } = consoleSize(stdout.rid);
    
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
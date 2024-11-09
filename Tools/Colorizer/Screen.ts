
import { newline , center , yellow , blue , cyan , green , red } from './Pretty.js'
import * as Print from './Print.js'

const { clear , log } = console;


let content , id;


export function on(){
    id = setInterval(render,5);
}

export function off(){
    clearInterval(id);
}

export function display(generateContent){
    content = generateContent;
}


function render(){
    
    clear();
    
    Print.header();
    
    content();
}
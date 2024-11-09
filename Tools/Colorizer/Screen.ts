
export { display , off , on }

import * as Print from './Print.ts'

const { clear } = console


let
    content : () => void ,
    id : number


function on(){
    id = setInterval(render,5)
}

function off(){
    clearInterval(id)
}

function display ( generateContent : () => void ){
    content = generateContent
}


function render(){

    clear()

    Print.header()

    content()
}

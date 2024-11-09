
export { newline , center , yellow , green , cyan , blue , red }

import { rgb24 } from 'Colors'


const { consoleSize } = Deno
const { log } = console

const
    Yellow = { r : 183 , g : 136 , b :  49 } ,
    Green  = { r :  83 , g : 163 , b :  69 } ,
    Cyan   = { r : 124 , g : 180 , b : 207 } ,
    Blue   = { r :  70 , g : 114 , b : 203 } ,
    Red    = { r : 197 , g :  23 , b :  75 }



function yellow ( value : any ){
    return rgb24(String(value),Yellow)
}

function green ( value : any ){
    return rgb24(String(value),Green)
}

function cyan ( value : any ){
    return rgb24(String(value),Cyan)
}

function blue ( value : any ){
    return rgb24(String(value),Blue)
}

function red ( value : any ){
    return rgb24(String(value),Red)
}

function newline (){
    log('\n')
}

function center (
    ... args : Array<any>
){

    const { columns } = consoleSize()

    let width = args[ args.length - 1 ]

    if( typeof width === 'number' )
        args.pop()
    else
        width = null

    const text = args.join('')

    width ??= text.length

    if( width >= columns )
        return 0

    const padding = ( columns - width ) * .5

    return ' '.repeat(padding) + text
}

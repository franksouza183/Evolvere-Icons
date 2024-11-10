
export { isMonochromeSVG , select }

import { newline , center , red } from '../Pretty.ts'
import { build , monochrome } from '../Paths.ts'
import { relative , dirname } from 'Path'
import { parse } from 'YAML'

import * as Print from '../Print.ts'


const { readTextFile , exit } = Deno
const { log , clear } = console



type Range = [ number , number ]

const selection = new Map<string,Range>


function isMonochromeSVG (
    path : string
){

    const subfolder = relative(build,dirname(path))

    const [ folder , size ] = subfolder.split('/')

    if( ! selection.has(folder) )
        return false

    const amount = parseInt(size)

    if( typeof amount !== 'number' )
        return false

    const [ min , max ] =
        selection.get(folder)!

    return (
        min <= amount &&
        max >= amount
    )
}


type MonochromeData = Record<string,string | number>


async function select (){

    try {

        const text = await readTextFile(monochrome)

        const yaml = parse(text,{
            schema : 'json'
        }) as MonochromeData

        for ( const [ folder , value ] of Object.entries(yaml) ){

            const range = ( typeof value === 'number' )
                ? [ value , value ]
                : value
                    .match(/(\d+) *\- *(\d+)/)!
                    .slice(1)
                    .map(( value ) => parseInt(value))

            selection.set(folder,range as Range )
        }

    } catch ( exception ){
        printParseError(exception)
        exit()
    }
}


function printParseError (
    exception : unknown
){

    clear()

    Print.header()

    log(red(center(`Couldn't Parse Monochrome Icon Selection`)))

    newline()
    newline()

    log(exception)
}

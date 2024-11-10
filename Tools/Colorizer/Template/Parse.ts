
import { newline , center , red } from '../Pretty.ts'
import { parse } from 'YAML'

import * as Print from '../Print.ts'
import template from './Defaults.ts'


const { exit , readTextFile } = Deno
const { log , clear } = console


export default async function (
    path : string
){

    try {

        const yaml = await readTextFile(path)

        const raw = parse(yaml) as Record<string,{
            Color : string
            Alpha : number
        }>

        Object
        .entries(raw)
        .map(([ key , value ]) => [ capitalize(key) , value ] as const )
        .filter(([ key ]) => key in template )
        .filter(([ _ , value ]) => value )
        .forEach(([ component , properties ]) => {

            const attributes = template[ component ]

            for ( const key in properties ){

                let property = key as keyof typeof properties

                let value = properties[ property ]

                // @ts-ignore
                property = capitalize(property)

                if( ! ( property in attributes ) )
                    continue


                if( property === 'Color' ){

                    if( /^None$/i.test(value as string) ){
                        attributes.Color = null
                        break
                    }

                    if( /^([0-9a-f]{3}){1,2}$/i.test(value as string) )
                        break

                    throw `「 ${ component } » ${ property } 」 '${ value }' is not a hex color string / 'None'\n`;

                    } else
                if( property === 'Alpha' ){

                    if( typeof value !== 'number' )
                        throw `「 ${ component } » ${ property } 」 '${ value }' is not a float value\n`

                    if( value > 1 || value < 0 )
                        throw `「 ${ component } » ${ property } 」 '${ value }' does not fulfill 0 ≤ Alpha ≤ 1\n`

                    break
                }

            }
        })

        return template

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

    log(red(center(`Couldn't Parse Template`)))

    newline()
    newline()

    log(exception)
}


function first (
    value : string
){
    return value.at(0) ?? ''
}

function capitalize (
    value : string
){
    return first(value).toUpperCase()
         + value.slice(1).toLowerCase()
}

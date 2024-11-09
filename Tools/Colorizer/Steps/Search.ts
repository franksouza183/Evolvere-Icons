
import { basename , extname } from 'Path'
import { walk } from 'Files'

import { isMonochromeSVG } from './Selection.ts'
import { newline } from '../Pretty.ts'
import { display } from '../Screen.ts'
import { build } from '../Paths.ts'

import * as Print from '../Print.ts'
import Stats from '../Stats.ts'


const { remove } = Deno


async function * filesIn (
    path : string
){
    yield * walk(path,{
        includeDirs : false
    })
}

async function * pathsIn (
    path : string
){
    for await ( const file of filesIn(path) )
        yield infoFrom(file.path)
}

function infoFrom (
    path : string
){
    return {
        file : basename(path) ,
        path
    }
}


export default async function (){

    display(() => {

        Print.project_folder()

        newline()

        Print.copied()
        Print.icons()
    })


    const paths = new Set<string>


    for await ( const { path , file } of pathsIn(build) ){

        if( file === '.directory' )
            continue

        if( file === 'index.theme' )
            continue

        if( extname(path) === '.svg' ){

            Stats.icons++

            if( isMonochromeSVG(path) ){
                Stats.monochrome++
                paths.add(path)
            }

            continue
        }

        await remove(path)
    }


    return paths
}

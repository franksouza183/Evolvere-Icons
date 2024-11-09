
import { parse , stringify } from 'XML'

import { colorize } from '../ModifySVG.ts'
import { newline } from '../Pretty.ts'
import { display } from '../Screen.ts'

import * as Print from '../Print.ts'
import Stats from '../Stats.ts'


const { writeTextFile , readTextFile } = Deno


export default async function (
    paths : Set<string>
){

    display(() => {

        Print.project_folder()

        newline()

        Print.copied()
        Print.icons()
        Print.colorized()
    })

    async function colorizeByPath (
        path : string
    ){

        let xml = await readTextFile(path)

        let svg = parse(xml,{
            revive : {
                numbers : false
            }
        })

        svg = colorize(svg)

        xml = stringify(svg)

        await writeTextFile(path,xml)

        Stats.colored++
    }


    for ( const path of paths )
        await colorizeByPath(path)
}

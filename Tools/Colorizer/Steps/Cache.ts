
import { newline , blue , cyan } from '../Pretty.ts'
import { display } from '../Screen.ts'

import generateCache from '../Cache.ts'
import * as Print from '../Print.ts'


const { log } = console


export default async function (){

    display(() => {

        Print.project_folder()

        newline()

        Print.copied()
        Print.icons()
        Print.colorized()

        log(
            blue(`④ `) ,
            cyan(`Generating Cache...`)
        )
    })

    await generateCache()
}

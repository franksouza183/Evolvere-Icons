
import { emptyDir , copy } from 'Files'

import { newline , blue , cyan } from '../Pretty.ts'
import { icons , build } from '../Paths.ts'
import { display } from '../Screen.ts'
import * as Print from '../Print.ts'

const { log } = console


export default async function (){

    display(() => {

        Print.project_folder()

        newline()

        log(
            blue(`① `) ,
            cyan(`Copying Theme ...`)
        )
    })

    await emptyDir(build)

    await copy(icons,build,{
        overwrite : true
    })
}

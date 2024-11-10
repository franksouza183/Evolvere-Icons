
import { templatePath } from '../Parameter.ts'

import loadTemplate from '../Template/Parse.ts'

import * as Colorize from '../ModifySVG.ts'
import * as Screen from '../Screen.ts'
import * as Print from '../Print.ts'


const { exit } = Deno


export default async function(){

    if( templatePath ){

        const template = await loadTemplate(templatePath)

        Colorize.init(template!)

        return
    }


    Screen.off()

    Print.template_missing()

    exit()
}

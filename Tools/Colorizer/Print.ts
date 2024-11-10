
export {
    template_missing , project_folder , colorized ,
    header , copied , icons , done
}

import { newline , center , yellow , blue , cyan , green , red } from './Pretty.ts'
import { root } from './Paths.ts'

import Stats from './Stats.ts'


const { log , clear } = console


const
    task1 = blue('① ') ,
    task2 = blue('② ') ,
    task3 = blue('③ ')



function header (){

    newline()

    log(blue(center(`Evolvere Icons Colorizer`)))
    log(blue(center(`………………………………………………………………`)))

    newline()
}

function project_folder (){
    log(
        cyan(`Project Folder:`) ,
        yellow(root)
    )
}

function copied (){
    log(task1,cyan(`Copied Theme`))
}

function icons (){
    log(task2,blue(`Discovering:`))
    log('  ',
        cyan(`Icons`) ,
        yellow(Stats.icons)
    )
    log('  ',
        cyan(`Monochrome`) ,
        yellow(Stats.monochrome)
    )
}

function colorized (){
    log(task3,
        cyan(`Colorized`) ,
        yellow(Stats.colored)
    )
}

function template_missing (){

    clear()

    header()

    log(red(center(`No Template Specified`)))

    newline()
    newline()

    log(center(
        cyan(` Syntax:     `) ,
        yellow(`./Colorize.js <`) ,
        red(`Template`) ,
        yellow(`>`)
    ,36))

    log(center(
        cyan(`Example: `) ,
        yellow(`Tools/Colorize.js `) ,
        red(`ThemeA.yaml`)
    ,36))

    newline()
    newline()
}

function done (){

    clear()

    project_folder()

    newline()

    copied()
    icons()

    colorized()

    log(
        blue(`④ `) ,
        cyan(`Generated Cache`)
    )

    newline()
    newline()

    log(green(center(`Finished Colorization`)))

    newline()
}


export { colorize , init }


const { isArray } = Array
const { exit } = Deno
const { log } = console


const components = {
    Background : 'Background' ,
    Foreground : 'Text' ,
    Success : 'PositiveText' ,
    Warning : 'NeutralText' ,
    Accent : 'Highlight' ,
    Error : 'NegativeText'
}

const classes = {
    'ColorScheme-NegativeText' : 'Error' ,
    'ColorScheme-PositiveText' : 'Success' ,
    'ColorScheme-NeutralText' : 'Warning' ,
    'ColorScheme-Background' : 'Background' ,
    'ColorScheme-Highlight' : 'Accent' ,
    'ColorScheme-Text' : 'Foreground'
}



let styleClasses : any
let colors : any


function init (
    template : Record<string, {
        Color : null | string
        Alpha : number
    }>
){

    colors = template

    const rules = new Array<string>

    for ( const [ component , name ] of Object.entries(components) ){

        const { Color } = template[ component ]

        rules.push(`
            .ColorScheme-${ name } {
                color : #${ Color } ;
            }
        `)
    }


    styleClasses = {
        style : {
            '@type' : 'text/css' ,
            '#text' : rules.join('') ,
            '@id' : 'current-color-scheme'
        }
    }

    for ( const color in colors ){

        const { Color , Alpha } = colors[ color ]

        colors[ color ].inline = Color
            ? `fill-opacity:${ Alpha }`
            : 'opacity:0'
    }
}



function toProperties (
    style : string
){
    return style
        .split(';')
        .filter(( value ) => !! value )
}


/*
 *  Adjust inline style of path elements
 */

function adjustPath (
    path : {
        '@style' ?: string
        '@class' ?: string
    }
){

    const classname = path[ '@class' ]

    if( ! classname )
        return

    if( ! ( classname in classes ) )
        return

    const style = path[ '@style' ] ?? ''

    // @ts-ignore
    const component = classes[ classname ]

    const { inline , Color } = colors[ component ]


    const isOverridable = ( property : string ) => {

        if( Color && property.startsWith('fill-opacity') )
            return true

        if( property.startsWith('opacity') )
            return true

        return false
    }

    const isUnrelated = ( property : string ) =>
        ! isOverridable(property)


    const adjusted = toProperties(style)
        .filter(isUnrelated)
        .concat([ inline ])
        .join(';')

    path[ '@style' ] = adjusted
}


function toArray (
    value : any
){

    if(isArray(value))
        return value

    return [ value ]
}

function colorizePaths (
    group : any
){

    const { path , g } = group

    if( path )
        toArray(path).forEach(adjustPath)

    if( g )
        toArray(g).forEach(colorizePaths)
}


/*
 *  Add style classes & inject inline style
 */

function colorize (
    svgData : any
){

    const { svg } = svgData

    try {

        svg.defs = styleClasses

        colorizePaths(svg)

    } catch ( exception ){
        log(svgData)
        log(exception)
        exit()
    }

    return svgData
}

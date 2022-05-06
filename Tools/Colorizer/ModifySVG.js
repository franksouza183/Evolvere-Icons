
const { isArray } = Array;
const { exit } = Deno;
const { log } = console;



const components = {
    Background : 'Background' ,
    Foreground : 'Text' ,
    Success : 'PositiveText' ,
    Warning : 'NeutralText' ,
    Accent : 'Highlight' ,
    Error : 'NegativeText'
};

const classes = {
    'ColorScheme-NegativeText' : 'Error' ,
    'ColorScheme-PositiveText' : 'Success' ,
    'ColorScheme-NeutralText' : 'Warning' ,
    'ColorScheme-Background' : 'Background' ,
    'ColorScheme-Highlight' : 'Accent' ,
    'ColorScheme-Text' : 'Foreground'
};



let styleClasses;
let colors;


export function init(template){
    
    colors = template;
    
    const style = Object
        .entries(components)
        .map(([ component , name ]) => [ `ColorScheme-${ name }` , `#${ template[component].Color }` ])
        .map(([ classname , color ]) => `.${ classname } { color : ${ color } }`)
        .join('');
    
    styleClasses = {
        style : {
            '@id' : 'current-color-scheme' ,
            '@type' : 'text/css' ,
            '#text' : style
        }
    };
    
    for(const color in colors){
        
        const { Color , Alpha } = colors[color];
        
        colors[color].inline = Color
            ? `fill-opacity:${ Alpha }`
            : 'opacity:0' ;
    }
}


function toProperties(style){
    return style.split(';');
}

function isUnrelated(property){
    return ! isOverridable(property);
}

function isOverridable(property){
    
    if(property.startsWith('fill-opacity'))
        return true;
        
    if(property.startsWith('opacity'))
        return true;
        
    return false;
}


/*
 *  Adjust inline style of path elements  
 */

function adjustPath(path){
    
    const classname = path['@class'];
    
    if(!(classname in classes))
        return;
        
    const style = path['@style'] ?? '';
    
    const
        component = classes[classname],
        { inline } = colors[component];
    
    path['@style'] = toProperties(style)
        .filter(isUnrelated)
        .concat([ inline ])
        .join(';');
}


/*
 *  Add style classes & inject inline style
 */

export function colorize(svgData){
    
    const { svg } = svgData;
    
    try {
        
        svg.defs = styleClasses;

        const paths = svg.path;
        
        if(paths && isArray(paths))
            for(const path of paths)
                adjustPath(path);
                
    } catch (error) {
        log(svgData);
        log(error);
        exit();
    }
    
    return svgData;
}

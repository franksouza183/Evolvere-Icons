
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
    
    const hasColor = ([ color ]) => 
        color;
        
    const toColor = ([ component , name ]) => 
        [ template[component].Color , name ];
        
    const toProperties = ([ color , name ]) => 
        [ `ColorScheme-${ name }` , `#${ color }` ];
    
    const toStyle = ([ classname , color ]) => 
        `.${ classname } { color : ${ color } }`;
    
    const style = Object
        .entries(components)
        .map(toColor)
        .filter(hasColor)
        .map(toProperties)
        .map(toStyle)
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


function isNotEmpty(value){
    return value;
}

function toProperties(style){
    return style
        .split(';')
        .filter(isNotEmpty);
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
        { inline , Color } = colors[component];
    
    
    const isOverridable = (property) => {
        
        if(Color && property.startsWith('fill-opacity'))
            return true;
            
        if(property.startsWith('opacity'))
            return true;
            
        return false;
    }
    
    const isUnrelated = (property) =>
        ! isOverridable(property);
    
    
    const adjusted = toProperties(style)
        .filter(isUnrelated)
        .concat([ inline ])
        .join(';');
    
    path['@style'] = adjusted;
}


function toArray(value){
    
    if(isArray(value))
        return value;
        
    return [ value ];
}

function colorizePaths(group){
    
    const { g , path } = group;
    
    if(path)
        toArray(path).forEach(adjustPath);
    
    if(g)
        toArray(g).forEach(colorizePaths);
}


/*
 *  Add style classes & inject inline style
 */

export function colorize(svgData){
    
    const { svg } = svgData;
    
    try {
        
        svg.defs = styleClasses;
        
        colorizePaths(svg);
                
    } catch (error) {
        log(svgData);
        log(error);
        exit();
    }
    
    return svgData;
}

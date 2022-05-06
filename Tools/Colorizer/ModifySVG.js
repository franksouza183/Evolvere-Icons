
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



let styleTemplate;
let colors;


export function init(template){
    
    colors = template;
    
    const style = Object
        .entries(components)
        .map(([ component , name ]) => [ `ColorScheme-${ name }` , `#${ template[component].Color }` ])
        .map(([ classname , color ]) => `.${ classname } { color : ${ color } }`)
        .join('');
    
    styleTemplate = {
        style : {
            '@id' : 'current-color-scheme' ,
            '@type' : 'text/css' ,
            '#text' : style
        }
    };
    
    for(const color in colors){
        
        const { Color , Alpha } = colors[color];
        
        colors[color].inline = (Color === 'None')
            ? 'opacity:0'
            : `fill-opacity:${ Alpha }` ;
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

export function colorize(svgData){
    
    try {
        
        svgData.svg.defs = styleTemplate;

        const { path : paths } = svgData.svg;
        
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

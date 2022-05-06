
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
}




export function colorize(svgData){
    
    try {
        
        svgData.svg.defs = styleTemplate;

        const { path : paths } = svgData.svg;
        
        if(paths && Array.isArray(paths))
            for(const path of paths){
                
                const classname = path['@class'];
                
                if(classname in classes){
                    
                    const style = path['@style'] ?? '';
                    
                    const component = classes[classname];
                    
                    const { Color , Alpha } = colors[component];
                    
                    path['@style'] = style
                        .split(';')
                        .filter((data) => {
                            return !data.startsWith('fill-opacity')
                                && !data.startsWith('opacity');
                            
                        })
                        .concat([
                            `fill-opacity:${ Alpha }`,
                            (Color === 'None') && 'opacity:0'
                        ])
                        .filter(a => a)
                        .join(';');
                }
            }
    } catch (error) {
        log(svgData);
        log(error);
        Deno.exit();
    }
    
    return svgData;
}

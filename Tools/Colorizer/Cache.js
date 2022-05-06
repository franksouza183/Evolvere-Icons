
import { build } from './Paths.js'

const { run } = Deno;


const command = {
    stdout : 'null' , 
    stderr : 'null' ,
    cmd : [ 'gtk-update-icon-cache' , build ]
}


export default async function generate(){

    const process = run(command);

    return await process.status();
}
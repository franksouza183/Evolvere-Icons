
export default generate

import { build } from './Paths.ts'


async function generate (){

    const command = new Deno.Command(Deno.execPath(),{
        args : [ 'gtk-update-icon-cache' , build ]
    })

    const { code } = await command.output()

    return code
}

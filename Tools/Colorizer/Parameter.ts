
export { templatePath }

import { parseArgs } from 'Args'


const { args } = Deno

const parameter = parseArgs(args)

const templatePath = parameter._[ 0 ] as string


export { monochrome , icons , build , root }

import { fromFileUrl , dirname , join , resolve } from 'Path'

const { url } = import.meta


const root = resolve(join(dirname(fromFileUrl(url)),'..','..'))


const monochrome = join(root,'Resources','Data','Monochrome.yaml')

const icons = join(root,'Icons')

const build = join(root,'Build')
